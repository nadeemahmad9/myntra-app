const express = require("express")
const asyncHandler = require("express-async-handler")
const Category = require("../models/categoryModel")
const { protect, admin } = require("../middleware/authMiddleware")

const router = express.Router()

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({ isActive: true })
  res.json(categories)
})

// @desc    Get category by ID
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

// @desc    Create category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = asyncHandler(async (req, res) => {
  const { name, slug, description, image, subcategories } = req.body

  const categoryExists = await Category.findOne({ slug })

  if (categoryExists) {
    res.status(400)
    throw new Error("Category already exists")
  }

  const category = await Category.create({
    name,
    slug,
    description,
    image,
    subcategories,
  })

  res.status(201).json(category)
})

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private/Admin
const updateCategory = asyncHandler(async (req, res) => {
  const { name, slug, description, image, subcategories, isActive } = req.body

  const category = await Category.findById(req.params.id)

  if (category) {
    category.name = name || category.name
    category.slug = slug || category.slug
    category.description = description || category.description
    category.image = image || category.image
    category.subcategories = subcategories || category.subcategories
    category.isActive = isActive !== undefined ? isActive : category.isActive

    const updatedCategory = await category.save()
    res.json(updatedCategory)
  } else {
    res.status(404)
    throw new Error("Category not found")
  }
})

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id)

  if (category) {
    await Category.findByIdAndDelete(req.params.id)
    res.json({ message: "Category removed" })
  } else {
    res.status(404)
    throw new Error("Category not found")
  }
})

router.route("/").get(getCategories).post(protect, admin, createCategory)
router.route("/:id").get(getCategoryById).put(protect, admin, updateCategory).delete(protect, admin, deleteCategory)

module.exports = router
