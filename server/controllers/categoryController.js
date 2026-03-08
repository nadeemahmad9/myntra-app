import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import Category from "../models/categoryModel.js";

/**
 * @desc    Get all categories
 * @route   GET /api/categories
 * @access  Public
 */
const getCategories = asyncHandler(async (req, res) => {
    // Sirf active categories dikhana production standard hai
    const categories = await Category.find({ isActive: true });
    
    res.status(200).json({
        success: true,
        categories
    });
});

/**
 * @desc    Get single category by ID
 * @route   GET /api/categories/:id
 */
const getCategoryById = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);

    if (!category) {
        throw new ApiError(404, "Category not found");
    }

    res.status(200).json({
        success: true,
        category
    });
});

/**
 * @desc    Create a category (Admin only)
 * @route   POST /api/categories
 */
const createCategory = asyncHandler(async (req, res) => {
    const { name, description, image, subcategories } = req.body;

    // 2+ Year Exp Touch: Automated Slug generation
    const slug = name.toLowerCase().replace(/[^a-z0-9]/g, "-");

    const categoryExists = await Category.findOne({ slug });
    if (categoryExists) {
        throw new ApiError(400, "Category already exists");
    }

    const processedSubcategories = subcategories?.map(sub => ({
        ...sub,
        slug: sub.name.toLowerCase().replace(/[^a-z0-9]/g, "-")
    })) || [];

    const category = await Category.create({
        name,
        slug,
        description,
        image,
        subcategories: processedSubcategories
    });

    res.status(201).json({
        success: true,
        category
    });
});

/**
 * @desc    Update category
 * @route   PUT /api/categories/:id
 */
const updateCategory = asyncHandler(async (req, res) => {
    const { name, description, image, subcategories, isActive } = req.body;
    const category = await Category.findById(req.params.id);

    if (!category) {
        throw new ApiError(404, "Category not found");
    }

    if (name) {
        category.name = name;
        category.slug = name.toLowerCase().replace(/[^a-z0-9]/g, "-");
    }

    category.description = description || category.description;
    category.image = image || category.image;
    category.isActive = isActive !== undefined ? isActive : category.isActive;

    if (subcategories) {
        category.subcategories = subcategories.map(sub => ({
            ...sub,
            slug: sub.name.toLowerCase().replace(/[^a-z0-9]/g, "-")
        }));
    }

    const updatedCategory = await category.save();
    res.status(200).json({ success: true, category: updatedCategory });
});

/**
 * @desc    Delete category
 * @route   DELETE /api/categories/:id
 */
const deleteCategory = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category) throw new ApiError(404, "Category not found");

    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Category removed" });
});

export { 
    getCategories, 
    getCategoryById, 
    createCategory, 
    updateCategory, 
    deleteCategory 
};