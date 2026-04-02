import express from "express";
import passport from "passport";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/userModel.js";

const router = express.Router();

// @desc    Start Google login
router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

// @desc    Google callback
// Senior Dev Touch: Token ko URL mein nahi, Cookie mein bhejna
router.get(
    "/google/callback",
    passport.authenticate("google", { session: false, failureRedirect: "/login" }),
    asyncHandler(async (req, res) => {
        // req.user Passport se aata hai
        let user = await User.findOne({ email: req.user.email });

        if (!user) {
            user = await User.create({
                name: req.user.displayName || req.user.name,
                email: req.user.email,
                password: Math.random().toString(36).slice(-10), // Secure random password
                profilePic: req.user.photos?.[0]?.value || req.user.profilePic,
            });
        } else {
            // Update profile pic if changed
            const newPic = req.user.photos?.[0]?.value || req.user.profilePic;
            if (newPic && user.profilePic !== newPic) {
                user.profilePic = newPic;
                await user.save();
            }
        }

        // Generate JWT using our model method
        const token = user.generateToken();

        // Cookie options
       const options = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true, 
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", 
};

        // Redirect with Cookie (Secure Way)
        res.cookie("token", token, options)
           .redirect(`${process.env.FRONTEND_URL}/dashboard`); 
    })
);

export default router;
