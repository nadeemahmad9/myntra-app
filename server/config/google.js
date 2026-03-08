import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/userModel.js";
import dotenv from "dotenv";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        if (!email) {
          return done(new Error("No email found in Google profile"), null);
        }

        // Find existing user
        let user = await User.findOne({ email });

        if (!user) {
          // Create new user
          user = await User.create({
            name: profile.displayName,
            email: email,
            // 2+ Year Exp Tip: Password ko random string rakhein taaki hashing middleware 
            // isse normal login ki tarah treat na kare
            password: Math.random().toString(36).slice(-10), 
            profilePic: profile.photos?.[0]?.value || "",
          });
        } else {
          // Update profile picture if different or missing
          if (profile.photos?.[0]?.value && user.profilePic !== profile.photos[0].value) {
            user.profilePic = profile.photos[0].value;
            await user.save();
          }
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// Serialize user into session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport; // ✅ Changed from module.exports