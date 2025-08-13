const asyncHandler = require("express-async-handler")
const Product = require("../models/productModel")



const getProductsBySubcategory = async (req, res) => {
  try {
    const { subcategory } = req.params
    const products = await Product.find({ subcategory })
    res.json(products)
  } catch (error) {
    console.error("Failed to fetch products by subcategory", error)
    res.status(500).json({ message: "Server error" })
  }
}
// @desc    Fetch all products
// @route   GET /api/products
// @access  Public

const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 12
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { brand: { $regex: req.query.search, $options: "i" } },
          { category: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {}

  const category = req.query.category ? { category: req.query.category } : {}
  const featured = req.query.featured ? { isFeatured: true } : {}

  const count = await Product.countDocuments({ ...keyword, ...category, ...featured })
  const products = await Product.find({ ...keyword, ...category, ...featured })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ products, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
// const getProductById = asyncHandler(async (req, res) => {
//   const product = await Product.findById(req.params.id)

//   if (product) {
//     res.json(product)
//   } else {
//     res.status(404)
//     throw new Error("Product not found")
//   }
// })

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product); // ✅ Make sure this returns full object
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await Product.findByIdAndDelete(req.params.id)
    res.json({ message: "Product removed" })
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
})


// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const { name, brand, description, images, category, subcategory, price, originalPrice, countInStock, sizes } =
    req.body

  const product = new Product({
    name,
    brand,
    description,
    images,
    category,
    subcategory,
    price,
    originalPrice,
    discount: Math.round(((originalPrice - price) / originalPrice) * 100),
    countInStock,
    sizes,
    numReviews: 0,
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, brand, description, images, category, subcategory, price, originalPrice, countInStock, sizes } =
    req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.brand = brand
    product.description = description
    product.images = images
    product.category = category
    product.subcategory = subcategory
    product.price = price
    product.originalPrice = originalPrice
    product.discount = Math.round(((originalPrice - price) / originalPrice) * 100)
    product.countInStock = countInStock
    product.sizes = sizes

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
})

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find((r) => r.user.toString() === req.user._id.toString())

    if (alreadyReviewed) {
      res.status(400)
      throw new Error("Product already reviewed")
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review)

    product.numReviews = product.reviews.length

    product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

    await product.save()
    res.status(201).json({ message: "Review added" })
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
})

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)

  res.json(products)
})

module.exports = {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
  getProductsBySubcategory,
}
