import express from "express";
import {
    getWishlist,
    addToWishlist,
    removeFromWishlist
} from "../controllers/wishlistController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @route   /api/wishlist
 * Experienced Dev Touch: Centralized protection middleware for all user-specific resources
 */

// Wishlist ke saare operations ke liye login hona zaroori hai
router.use(protect);

router.route("/")
    .get(getWishlist)      // User ki saved wishlist fetch karne ke liye
    .post(addToWishlist);  // Naya product wishlist mein add karne ke liye

router.route("/:id")
    .delete(removeFromWishlist); // Wishlist se item remove karne ke liye

export default router;