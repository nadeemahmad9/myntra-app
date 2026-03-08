import express from "express";
import { 
    getCart, 
    addToCart, 
    removeFromCart, 
    clearCart, 
    updateCartItem 
} from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @route   /api/cart
 * Experienced Dev Touch: Centralized protection middleware
 */

// Cart ke saare operations ke liye login (protect) mandatory hai
router.use(protect);

router.route("/")
    .get(getCart)          // User ki cart fetch karne ke liye
    .post(addToCart)       // Cart mein naya item add karne ke liye
    .delete(clearCart);    // Poori cart khali karne ke liye (Checkout ke baad)

router.route("/:id")
    .put(updateCartItem)    // Specific item ki quantity badalne ke liye
    .delete(removeFromCart); // Cart se specific item remove karne ke liye

export default router;