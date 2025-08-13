const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { protect } = require("../middleware/authMiddleware");
const User = require("../models/userModel");

const router = express.Router();

// @desc   Start Google login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// @desc   Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  async (req, res) => {
    try {
      // Find existing user by email
      let user = await User.findOne({ email: req.user.email });

      if (!user) {
        // Create a new user if not found
        user = await User.create({
          name: req.user.name,
          email: req.user.email,
          password: "google-oauth", // placeholder password
          profilePic: req.user.profilePic || null,
        });
      } else {
        // Update profile picture if changed or missing
        if (req.user.profilePic && user.profilePic !== req.user.profilePic) {
          user.profilePic = req.user.profilePic;
          await user.save();
        }
      }

      // Generate JWT
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "20d",
      });

      // Redirect to frontend with token
res.redirect(`${process.env.frontend_Url}/login?token=${token}`);

    } catch (err) {
      console.error("Google callback error:", err);
      res.redirect(`${process.env.frontend_Url}/login?error=google_auth_failed}`);
    }
  }
);

// @desc   Get logged-in Google user
router.get("/google/user", protect, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(req.user); // full user object without password
  } catch (err) {
    console.error("Error fetching Google user:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// @desc   Logout
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: "Logout error" });
    res.redirect("/");
  });
});

module.exports = router;
