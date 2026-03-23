// routes/adminRoutes.js
import express from 'express';
const router = express.Router();

// Note: Controllers aur Middleware ke aage .js extension zaroori hai
import { getAdminStats } from "../controllers/adminController.js";
// import { protect, admin } from "../middleware/authMiddleware.js";

// Route definition
router.get("/stats", getAdminStats); 

export default router;
