const asyncHandler = require("express-async-handler")
const Wishlist = require("../models/wishlistModel")

// @desc    Get user wishlist
// @route   GET /api/wishlist
// @access  Private
const getWishlist = asyncHandler(async (req, res) => {
  const wishlist = await Wishlist.findOne({ user: req.user._id }).populate("products")

  if (wishlist) {
    res.json(wishlist.products)
  } else {
    res.json([])
  }
})

// @desc    Add item to wishlist
// @route   POST /api/wishlist
// @access  Private
const addToWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.body

  let wishlist = await Wishlist.findOne({ user: req.user._id })

  if (!wishlist) {
    wishlist = new Wishlist({
      user: req.user._id,
      products: [],
    })
  }

  if (!wishlist.products.includes(productId)) {
    wishlist.products.push(productId)
    await wishlist.save()
  }

  const populatedWishlist = await Wishlist.findById(wishlist._id).populate("products")
  res.json(populatedWishlist.products)
})

// @desc    Remove item from wishlist
// @route   DELETE /api/wishlist/:id
// @access  Private
const removeFromWishlist = asyncHandler(async (req, res) => {
  const wishlist = await Wishlist.findOne({ user: req.user._id })

  if (wishlist) {
    wishlist.products = wishlist.products.filter((x) => x.toString() !== req.params.id)
    await wishlist.save()

    const populatedWishlist = await Wishlist.findById(wishlist._id).populate("products")
    res.json(populatedWishlist.products)
  } else {
    res.status(404)
    throw new Error("Wishlist not found")
  }
})

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
}
