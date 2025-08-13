
// const mongoose = require("mongoose");

// function validateObjectId(req, res, next) {
//   if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//     return res.status(400).json({ message: "Invalid Product ID" });
//   }
//   next();
// }
// const express = require("express")
// const {
//   getProducts,
//   getProductById,
//   deleteProduct,
//   createProduct,
//   updateProduct,
//   createProductReview,
//   getTopProducts,
// } = require("../controllers/productController")
// const { protect, admin } = require("../middleware/authMiddleware")

// const router = express.Router()

// router.route("/").get(getProducts).post(protect, admin, createProduct)
// router.route("/:id/reviews").post(protect, createProductReview)
// router.get("/top", getTopProducts)
// router.route("/:id").get(getProductById).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct)

// module.exports = router


const express = require("express")
const mongoose = require("mongoose")
const Product = require("../models/products");

const {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
  getProductsBySubcategory,
} = require("../controllers/productController")
const { protect, admin } = require("../middleware/authMiddleware")

// Validate ObjectId middleware
function validateObjectId(req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid Product ID" });
  }
  next();
}

const router = express.Router()

// Routes
// router.route("/")
//   .get(getProducts)
//   .post(protect, admin, createProduct)
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

router.get("/top", getTopProducts)
router.get("/subcategory/:subcategory", getProductsBySubcategory)

router.route("/:id/reviews")
  .post(protect, validateObjectId, createProductReview)

router.route("/:id")
  .get(validateObjectId, getProductById)
  .delete(protect, admin, validateObjectId, deleteProduct)
  .put(protect, admin, validateObjectId, updateProduct)

module.exports = router
