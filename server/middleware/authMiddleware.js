import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/userModel.js";

/**
 * @desc    Protect routes - Verify JWT in Cookie or Header
 */
const protect = asyncHandler(async (req, res, next) => {
    let token;

    // 2+ Year Exp Touch: Dono jagah check karna (Cookie aur Auth Header)
    // Professional apps mein cookies zyada use hoti hain security ke liye
    if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    } 
    else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        throw new ApiError(401, "Not authorized to access this route");
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // User fetch karna aur request object mein attach karna
        // model mein select: false hai toh yahan password apne aap nahi aayega
        req.user = await User.findById(decoded.id);

        if (!req.user) {
            throw new ApiError(404, "No user found with this id");
        }

        next();
    } catch (error) {
        throw new ApiError(401, "Not authorized, token failed");
    }
});

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