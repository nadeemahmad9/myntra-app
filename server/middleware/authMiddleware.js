import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/userModel.js";

/**
 * @desc    Protect routes - Verify JWT in Cookie or Header
 */
const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log("Token Received:", token); // 👈 Log 1

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded Token Data:", decoded); // 👈 Log 2 (Check karein ki 'id' hai ya '_id')

      // Yahan check karein ki 'id' field sahi hai ya nahi
      req.user = await User.findById(decoded.id || decoded._id).select("-password");
      console.log("User Found in DB:", req.user); // 👈 Log 3

      if (!req.user) {
        res.status(401);
        throw new Error("User not found in Database");
      }

      next();
    } catch (error) {
      console.error("JWT Error:", error.message); // 👈 Log 4
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

/**
 * @desc    Admin access middleware
 */
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        throw new ApiError(403, "Access denied. Admin only route.");
    }
};

export { protect, admin };
