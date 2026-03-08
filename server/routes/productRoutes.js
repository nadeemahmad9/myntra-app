import express from "express";
import { 
    getProducts, 
    getProductById, 
    createProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    getTopProducts
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public Routes
router.route("/").get(getProducts);
router.get("/top", getTopProducts);
router.route("/:id").get(getProductById);

// Private Routes
router.route("/:id/reviews").post(protect, createProductReview);

// Admin Routes
router.route("/")
    .post(protect, admin, createProduct);

router.route("/:id")
    .put(protect, admin, updateProduct)
    .delete(protect, admin, deleteProduct);

export default router;