import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import Wishlist from "../models/wishlistModel.js";
import Product from "../models/productModel.js";

/**
 * @desc    Get user wishlist with populated product details
 * @route   GET /api/wishlist
 * @access  Private
 */
const getWishlist = asyncHandler(async (req, res) => {
    const wishlist = await Wishlist.findOne({ user: req.user._id }).populate({
        path: "products",
        select: "name price images brand countInStock" // Sirf zaroori fields fetch karein
    });

    res.status(200).json({
        success: true,
        wishlist: wishlist ? wishlist.products : []
    });
});

/**
 * @desc    Add item to wishlist (using Atomic Operators)
 * @route   POST /api/wishlist
 */
const addToWishlist = asyncHandler(async (req, res) => {
    const { productId } = req.body;

    // Validate if product exists
    const product = await Product.findById(productId);
    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    // 2+ Year Exp Touch: findOneAndUpdate with $addToSet
    // $addToSet ensure karta hai ki duplicate item add na ho, bina manual loop ke
    const wishlist = await Wishlist.findOneAndUpdate(
        { user: req.user._id },
        { $addToSet: { products: productId } },
        { upsert: true, new: true } // Agar wishlist nahi hai toh create kar do
    ).populate("products");

    res.status(201).json({
        success: true,
        wishlist: wishlist.products,
        message: "Product added to wishlist"
    });
});

/**
 * @desc    Remove item from wishlist (using $pull)
 * @route   DELETE /api/wishlist/:id
 */
const removeFromWishlist = asyncHandler(async (req, res) => {
    // 2+ Year Exp Touch: $pull operator for atomic removal
    // Database level par delete karna fast aur secure hota hai
    const wishlist = await Wishlist.findOneAndUpdate(
        { user: req.user._id },
        { $pull: { products: req.params.id } },
        { new: true }
    ).populate("products");

    if (!wishlist) {
        throw new ApiError(404, "Wishlist not found");
    }

    res.status(200).json({
        success: true,
        wishlist: wishlist.products,
        message: "Product removed from wishlist"
    });
});

export { getWishlist, addToWishlist, removeFromWishlist };