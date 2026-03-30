import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/userModel.js";

/**
 * @desc Protect routes - Verify JWT in Header
 */
const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            // console.log("Token Received:", token); 

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // console.log("Decoded Token Data:", decoded);

            // 'id' ya '_id' dono check karein safely
            const userId = decoded.id || decoded._id || decoded.sub;
            
            req.user = await User.findById(userId).select("-password");
            // console.log("User Found in DB:", req.user);

            if (!req.user) {
                return next(new ApiError(401, "User not found in Database"));
            }

            return next(); // 👈 Agle middleware par bhejein
        } catch (error) {
            console.error("JWT Error:", error.message);
            return next(new ApiError(401, "Not authorized, token failed"));
        }
    }

    if (!token) {
        return next(new ApiError(401, "Not authorized, no token"));
    }
}); // 👈 Yeh bracket missing tha pehle

/**
 * @desc Admin access middleware
 */
/**
 * @desc Admin access middleware - INTERVIEW BYPASS VERSION
 */
const admin = (req, res, next) => {
    console.log("Admin Check for User:", req.user?.email);

    // TEMPORARY: Agar user login hai (ya sirf testing ke liye hamesha), next() kar dein
    if (req.user || process.env.NODE_ENV === 'development') {
        return next(); 
    } else {
        return next(new ApiError(403, "Access denied. Admin only route."));
    }
};

export { protect, admin };
