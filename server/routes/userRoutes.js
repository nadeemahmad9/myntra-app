import express from "express";
import {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
    googleAuth,
    logout,
    addUserAddress,
    deleteAddress,
    updateAddress
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public Routes
router.post("/", registerUser);
router.post("/login", authUser);
router.post("/google", googleAuth);
router.get("/logout", logout);
// userRoutes.js
router.route("/address").post(protect, addUserAddress);

// Private Routes (Logged in users only)
router.route("/profile")
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

// Admin Routes (Admin only)
router.route("/")
    .get(protect, admin, getUsers);

router.route("/:id")
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser)
    .delete(protect, admin, deleteUser);
router.route("/address/:id").delete(protect, deleteAddress).put(protect, updateAddress)

export default router;