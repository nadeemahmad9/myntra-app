



import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import Product from "../models/productModel.js";

/**
 * @desc    Fetch all products with advanced filtering, search & pagination
 * @route   GET /api/products
 * @access  Public
 */
const getProducts = asyncHandler(async (req, res) => {
    const pageSize = Number(req.query.pageSize) || 12;
    const page = Number(req.query.pageNumber) || 1;

    // Search query logic (Advanced: searching in multiple fields)
    const keyword = req.query.search
        ? {
            $or: [
                { name: { $regex: req.query.search, $options: "i" } },
                { brand: { $regex: req.query.search, $options: "i" } },
                { category: { $regex: req.query.search, $options: "i" } },
            ],
        }
        : {};

    // Filters logic
    const categoryFilter = req.query.category ? { category: req.query.category } : {};
    const subcategoryFilter = req.query.subcategory ? { subcategory: req.query.subcategory } : {};
    const featuredFilter = req.query.featured ? { isFeatured: true } : {};

    // Combine all filters
    const filters = { ...keyword, ...categoryFilter, ...subcategoryFilter, ...featuredFilter };

    const count = await Product.countDocuments(filters);
    const products = await Product.find(filters)
        .sort({ createdAt: -1 }) // Newest first
        .limit(pageSize)
        .skip(pageSize * (page - 1));

    res.status(200).json({
        success: true,
        products,
        page,
        pages: Math.ceil(count / pageSize),
        totalProducts: count
    });
});

/**
 * @desc    Fetch single product by ID
 * @route   GET /api/products/:id
 */
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    res.status(200).json({
        success: true,
        product
    });
});

/**
 * @desc    Create a product (Admin only)
 */
const createProduct = asyncHandler(async (req, res) => {
    const { name, brand, description, images, category, subcategory, price, originalPrice, countInStock, sizes } = req.body;

    // Auto-calculate discount percentage
    const discount = originalPrice > price 
        ? Math.round(((originalPrice - price) / originalPrice) * 100) 
        : 0;

    const product = new Product({
        user: req.user._id, // Adding owner info
        name,
        brand,
        description,
        images,
        category,
        subcategory,
        price,
        originalPrice,
        discount,
        countInStock,
        sizes,
        numReviews: 0,
    });

    const createdProduct = await product.save();
    res.status(201).json({ success: true, product: createdProduct });
});

/**
 * @desc    Update a product (Admin only)
 */
const updateProduct = asyncHandler(async (req, res) => {
    const { name, brand, description, images, category, subcategory, price, originalPrice, countInStock, sizes } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    product.name = name || product.name;
    product.brand = brand || product.brand;
    product.description = description || product.description;
    product.images = images || product.images;
    product.category = category || product.category;
    product.subcategory = subcategory || product.subcategory;
    product.price = price || product.price;
    product.originalPrice = originalPrice || product.originalPrice;
    product.countInStock = countInStock || product.countInStock;
    product.sizes = sizes || product.sizes;
    
    // Recalculate discount
    product.discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

    const updatedProduct = await product.save();
    res.status(200).json({ success: true, product: updatedProduct });
});

/**
 * @desc    Delete a product (Admin only)
 */
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Product removed successfully" });
});

/**
 * @desc    Create new review
 */
const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
        throw new ApiError(400, "You have already reviewed this product");
    }

    const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

    await product.save();
    res.status(201).json({ success: true, message: "Review added" });
});

/**
 * @desc    Get top rated products
 */
const getTopProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(5);
    res.status(200).json({ success: true, products });
});

export {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
    createProductReview,
    getTopProducts
};