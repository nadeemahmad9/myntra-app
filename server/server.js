

const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const connectDB = require("./config/db")
const { notFound, errorHandler } = require("./middleware/errorMiddleware")
const session = require("express-session");
const passport = require("./config/google");
const { protect } = require("./middleware/authMiddleware");

// Routes
const productRoutes = require("./routes/productRoutes")
const userRoutes = require("./routes/userRoutes")
const orderRoutes = require("./routes/orderRoutes")
const cartRoutes = require("./routes/cartRoutes")
const wishlistRoutes = require("./routes/wishlistRoutes")


dotenv.config()

connectDB()

const app = express()

// Middleware
app.use(cors({
     origin: ["https://zyntrashop.netlify.app/"],
    credentials: true,
      exposedHeaders: ["Content-Type", "Authorization"]

}))

// Session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json())


app.use("/auth", require("./routes/googleAuth"));

// app.get("/products", async (req, res) => {
//   try {
//     const { category, minPrice, maxPrice, brand, rating } = req.query;

//     let query = {};

//     if (category) query.category = category;
//     if (brand) query.brand = { $regex: brand, $options: "i" };
//     if (rating) query.rating = { $gte: Number(rating) };
//     if (minPrice || maxPrice) {
//       query.price = {};
//       if (minPrice) query.price.$gte = Number(minPrice);
//       if (maxPrice) query.price.$lte = Number(maxPrice);
//     }

//     const products = await Product.find(query);
//     res.json(products);
//   } catch (err) {
//     console.error("Error fetching products:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });


// Routes

app.use("/api/products", productRoutes)
app.use("/api/users", userRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/wishlist", wishlistRoutes)
app.get("/api/auth/me", protect, (req, res) => {
    res.json(req.user);
});


app.get("/", (req, res) => {
  res.send("API is running...")
})

// Error Middleware
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
