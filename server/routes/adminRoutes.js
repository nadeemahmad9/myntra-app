// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { getAdminStats } = require("../controllers/adminController.js");
const { protect, admin } = require("../middleware/authMiddleware.js");

router.get("/stats", protect, admin, getAdminStats); 

export default router; 
