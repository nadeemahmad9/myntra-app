const asyncHandler = require("express-async-handler")
const Cart = require("../models/cartModel")
const Product = require("../models/productModel")

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate("cartItems.product")

  if (cart) {
    res.json(cart.cartItems)
  } else {
    res.json([])
  }
})

// const getCart = async (req, res) => {
//   try {
//     const cart = await Cart.findOne({ user: req.user._id }).populate("cartItems.product")
    
//     if (!cart) {
//       return res.status(200).json({ cartItems: [] })
//     }
//     res.status(200).json(cart)
//   } catch (error) {
//     console.error("Error fetching cart:", error)
//     res.status(500).json({ message: "Server error" })
//   }
// }

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
const addToCart = asyncHandler(async (req, res) => {
  const { productId, qty, size } = req.body

  const product = await Product.findById(productId)

  if (!product) {
    res.status(404)
    throw new Error("Product not found")
  }

  let cart = await Cart.findOne({ user: req.user._id })

  if (!cart) {
    cart = new Cart({
      user: req.user._id,
      cartItems: [],
    })
  }

  const existItem = cart.cartItems.find((x) => x.product.toString() === productId && x.size === size)

  if (existItem) {
    existItem.qty = qty
  } else {
    cart.cartItems.push({
      product: productId,
      name: product.name,
      image: product.images[0],
      price: product.price,
      qty,
      size,
    })
  }

  await cart.save()
  res.status(201).json(cart.cartItems)
})



// //update cart

// const updateCartItem = async (req, res) => {
//   try {
//     const cartItem = await Cart.findById(req.params.id)

//     if (!cartItem) {
//       return res.status(404).json({ message: "Cart item not found" })
//     }

//     // Ensure only the owner can update
//     if (cartItem.user.toString() !== req.user.id) {
//       return res.status(401).json({ message: "Not authorized" })
//     }

//     cartItem.qty = req.body.qty
//     await cartItem.save()

//     res.json(cartItem)
//   } catch (error) {
//     console.error("Error updating cart item:", error)
//     res.status(500).json({ message: "Server error" })
//   }
// }


// @desc    Update cart item quantity
// @route   PUT /api/cart/:id
// @access  Private
const updateCartItem = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  const item = cart.cartItems.find((x) => x._id.toString() === req.params.id);

  if (!item) {
    return res.status(404).json({ message: "Cart item not found" });
  }

  item.qty = req.body.qty;

  await cart.save();
  res.json(item);
});




// @desc    Remove item from cart
// @route   DELETE /api/cart/:id
// @access  Private
const removeFromCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id })

  if (cart) {
    cart.cartItems = cart.cartItems.filter((x) => x._id.toString() !== req.params.id)
    await cart.save()
    res.json(cart.cartItems)
  } else {
    res.status(404)
    throw new Error("Cart not found")
  }
})

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
const clearCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id })

  if (cart) {
    cart.cartItems = []
    await cart.save()
    res.json({ message: "Cart cleared" })
  } else {
    res.status(404)
    throw new Error("Cart not found")
  }
})

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
  updateCartItem,

}
