const express = require("express")
const { getCart, addToCart, removeFromCart, clearCart, updateCartItem } = require("../controllers/cartController")
const { protect } = require("../middleware/authMiddleware")

const router = express.Router()

router.route("/").get(protect, getCart).post(protect, addToCart).delete(protect, clearCart)
router.route("/:id").delete(protect, removeFromCart).put(protect, updateCartItem)

module.exports = router
