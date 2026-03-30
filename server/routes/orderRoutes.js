import express from "express";
import {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getMyOrders,
    getOrders,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @route   /api/orders
 */

router.use(protect);

router.route("/")
    .post(addOrderItems)              // Create new order
    .get(admin, getOrders);           // Admin: Get all orders

router.route("/mine")
    .get(getMyOrders);                // User: Get logged in user orders

router.route("/:id")
    .get(getOrderById);               // Get order by ID

router.route("/:id/pay")
    .put(updateOrderToPaid);          // Update order status to paid

router.route("/:id/deliver")
    .put(admin, updateOrderToDelivered); // Admin: Update order status to delivered

export default router;
