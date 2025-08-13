const asyncHandler = require("express-async-handler")
const Category = require("../models/categoryModel")

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({})
  res.json(categories)
})

// @desc    Get single category
// @route   GET /api/categories/:id
// @access  Public
const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id)

  if (category) {
    res.json(category)
  } else {
    res.status(404)
    throw new Error("Category not found")
  }
})

// @desc    Create a category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = asyncHandler(async (req, res) => {
  const { name, description, image, subcategories } = req.body

  // Create slug from name
  const slug = name.toLowerCase().replace(/[^a-z0-9]/g, "-")

  // Check if category with same name or slug exists
  const categoryExists = await Category.findOne({
    $or: [{ name }, { slug }],
  })

  if (categoryExists) {
    res.status(400)
    throw new Error("Category already exists")
  }

  // Process subcategories if provided
  const processedSubcategories = subcategories
    ? subcategories.map((sub) => ({
        ...sub,
        slug: sub.name.toLowerCase().replace(/[^a-z0-9]/g, "-"),
      }))
    : []

  const category = new Category({
    name,
    slug,
    description,
    image,
    subcategories: processedSubcategories,
  })

  const createdCategory = await category.save()
  res.status(201).json(createdCategory)
})

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Private/Admin
const updateCategory = asyncHandler(async (req, res) => {
  const { name, description, image, subcategories } = req.body

  const category = await Category.findById(req.params.id)

  if (category) {
    // If name is being updated, create a new slug
    const slug = name ? name.toLowerCase().replace(/[^a-z0-9]/g, "-") : category.slug

    // If name is changing, check if the new name already exists
    if (name && name !== category.name) {
      const categoryExists = await Category.findOne({
        _id: { $ne: req.params.id },
        $or: [{ name }, { slug }],
      })

      if (categoryExists) {
        res.status(400)
        throw new Error("Category with this name already exists")
      }
    }

    // Process subcategories if provided
    const processedSubcategories = subcategories
      ? subcategories.map((sub) => ({
          ...sub,
          slug: sub.name.toLowerCase().replace(/[^a-z0-9]/g, "-"),
        }))
      : category.subcategories

    category.name = name || category.name
    category.slug = slug
    category.description = description || category.description
    category.image = image || category.image
    category.subcategories = processedSubcategories

    const updatedCategory = await category.save()
    res.json(updatedCategory)
  } else {
    res.status(404)
    throw new Error("Category not found")
  }
})

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id)

  if (category) {
    await category.remove()
    res.json({ message: "Category removed" })
  } else {
    res.status(404)
    throw new Error("Category not found")
  }
})

// @desc    Add subcategory to a category
// @route   POST /api/categories/:id/subcategories
// @access  Private/Admin
const addSubcategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body

  const category = await Category.findById(req.params.id)

  if (category) {
    // Create slug from name
    const slug = name.toLowerCase().replace(/[^a-z0-9]/g, "-")

    // Check if subcategory with same name or slug exists
    const subcategoryExists = category.subcategories.find((sub) => sub.name === name || sub.slug === slug)

    if (subcategoryExists) {
      res.status(400)
      throw new Error("Subcategory already exists")
    }

    category.subcategories.push({
      name,
      slug,
      description,
    })

    const updatedCategory = await category.save()
    res.status(201).json(updatedCategory)
  } else {
    res.status(404)
    throw new Error("Category not found")
  }
})

// @desc    Update subcategory
// @route   PUT /api/categories/:id/subcategories/:subcategoryId
// @access  Private/Admin
const updateSubcategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body

  const category = await Category.findById(req.params.id)

  if (category) {
    const subcategoryIndex = category.subcategories.findIndex((sub) => sub._id.toString() === req.params.subcategoryId)

    if (subcategoryIndex !== -1) {
      // If name is being updated, create a new slug
      const slug = name ? name.toLowerCase().replace(/[^a-z0-9]/g, "-") : category.subcategories[subcategoryIndex].slug

      // If name is changing, check if the new name already exists
      if (name && name !== category.subcategories[subcategoryIndex].name) {
        const subcategoryExists = category.subcategories.find(
          (sub) => sub._id.toString() !== req.params.subcategoryId && (sub.name === name || sub.slug === slug),
        )

        if (subcategoryExists) {
          res.status(400)
          throw new Error("Subcategory with this name already exists")
        }
      }

      category.subcategories[subcategoryIndex] = {
        ...category.subcategories[subcategoryIndex],
        name: name || category.subcategories[subcategoryIndex].name,
        slug,
        description: description || category.subcategories[subcategoryIndex].description,
      }

      const updatedCategory = await category.save()
      res.json(updatedCategory)
    } else {
      res.status(404)
      throw new Error("Subcategory not found")
    }
  } else {
    res.status(404)
    throw new Error("Category not found")
  }
})

// @desc    Delete subcategory
// @route   DELETE /api/categories/:id/subcategories/:subcategoryId
// @access  Private/Admin
const deleteSubcategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id)

  if (category) {
    const subcategoryIndex = category.subcategories.findIndex((sub) => sub._id.toString() === req.params.subcategoryId)

    if (subcategoryIndex !== -1) {
      category.subcategories.splice(subcategoryIndex, 1)
      const updatedCategory = await category.save()
      res.json(updatedCategory)
    } else {
      res.status(404)
      throw new Error("Subcategory not found")
    }
  } else {
    res.status(404)
    throw new Error("Category not found")
  }
})

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  addSubcategory,
  updateSubcategory,
  deleteSubcategory,
}
