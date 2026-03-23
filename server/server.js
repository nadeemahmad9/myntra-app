

// const express = require("express")
// const dotenv = require("dotenv")
// const cors = require("cors")
// const connectDB = require("./config/db")
// const { notFound, errorHandler } = require("./middleware/errorMiddleware")
// const session = require("express-session");
// const passport = require("./config/google");
// const { protect } = require("./middleware/authMiddleware");

// // Routes
// const productRoutes = require("./routes/productRoutes")
// const userRoutes = require("./routes/userRoutes")
// const orderRoutes = require("./routes/orderRoutes")
// const cartRoutes = require("./routes/cartRoutes")
// const wishlistRoutes = require("./routes/wishlistRoutes")
// const adminRoutes = require('./routes/admin')

// dotenv.config()


// const app = express()
// app.use(express.json())
// connectDB()



// // Middleware
// app.use(cors({
//      origin: ["http://localhost:5173", "http://localhost:5174"],
//     credentials: true,
//       methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
// }))



// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
//   })
// );

// // Passport middleware
// app.use(passport.initialize());
// app.use(passport.session());

// app.use("/auth", require("./routes/googleAuth"));



// // Routes

// app.use("/api/products", productRoutes)
// app.use("/api/users", userRoutes)
// app.use("/api/orders", orderRoutes)
// app.use("/api/cart", cartRoutes)
// app.use("/api/wishlist", wishlistRoutes)
// app.use("/api/admin", adminRoutes)
// app.get("/api/auth/me", protect, (req, res) => {
//     res.json(req.user);
// });


// app.get("/", (req, res) => {
//   res.send("API is running...")
// })

// // Error Middleware
// app.use(notFound)
// app.use(errorHandler)

// const PORT = process.env.PORT || 5000

// app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))



import express from "express";
import dotenv from "dotenv";
import morgan from "morgan"; // Logging ke liye zaroori hai
import cors from "cors";
import session from "express-session";
import path from "path";
import connectDB from "./config/db.js";
import passport from "./config/google.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

// Route Imports
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import googleAuthRoutes from "./routes/googleAuth.js";
import adminRoutes from "./routes/adminRoutes.js"


// Load env vars early
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// 1. Request Logger (Industry Standard)
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// 2. Security & Parsers
app.use(express.json({ limit: "16kb" })); // Body size limit for security
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
// 2. Security & Parsers (Updated for Production)
const allowedOrigins = [
    "http://localhost:5173", 
    "http://localhost:5174", 
    "https://zyntrashop.netlify.app" // Aapka Netlify URL
];

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
// 3. Session Configuration (Experienced Dev Approach)
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false, // Production mein false rakhna security ke liye behtar hai
        cookie: {
            secure: process.env.NODE_ENV === "production", // HTTPS only in production
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        }
    })
);

// 4. Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// 5. Routes API
app.use("/auth", googleAuthRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/admin", adminRoutes) 


// Healthy check route
app.get("/health", (req, res) => res.status(200).json({ status: "OK" }));

// 6. Error Handling Middleware (Always at the end)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
