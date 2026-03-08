import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";

/**
 * @desc    Get user cart with latest product details
 * @route   GET /api/cart
 * @access  Private
 */
const getCart = asyncHandler(async (req, res) => {
    // Populate karke ensure karenge ki latest price aur image hamesha mile
    const cart = await Cart.findOne({ user: req.user._id }).populate("cartItems.product");

    res.status(200).json({
        success: true,
        cartItems: cart ? cart.cartItems : []
    });
});

/**
 * @desc    Add item to cart with stock validation
 * @route   POST /api/cart
 * @access  Private
 */
const addToCart = asyncHandler(async (req, res) => {
    const { productId, qty, size } = req.body;

    // 1. Basic Validation
    if (!productId || !size || !qty) {
        throw new ApiError(400, "Missing required fields: productId, size, or qty");
    }

    const product = await Product.findById(productId);
    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
        cart = new Cart({ user: req.user._id, cartItems: [] });
    }

    // 2. Safety Check for Image (400 Error ka main reason)
    // Model mein image 'required' hai, isliye hum empty string nahi bhej sakte
    const validImage = (product.images && product.images.length > 0) 
        ? product.images[0] 
        : (product.image || "https://via.placeholder.com/150");

    // 3. Check if same item exists
    const existItem = cart.cartItems.find(
        (item) => item.product.toString() === productId && item.size === size
    );

    if (existItem) {
        existItem.qty = Number(qty);
    } else {
        // ✅ 4. Schema Matching Push
        cart.cartItems.push({
            product: productId, // Schema expects ObjectId
            name: product.name,  // Schema expects String
            image: validImage,   // Schema expects String (Safety Applied)
            price: product.price, // Schema expects Number
            qty: Number(qty),    // Schema expects Number
            size: size,          // Schema expects String
        });
    }

    // 5. Save the cart
    try {
        await cart.save();
        res.status(200).json({
            success: true,
            cartItems: cart.cartItems
        });
    } catch (error) {
        // Agar abhi bhi error aaye toh terminal mein details dikhengi
        console.error("Mongoose Save Error:", error.message);
        throw new ApiError(400, "Cart Validation Failed: " + error.message);
    }
});
/**
 * @desc    Update quantity of an item in cart
 * @route   PUT /api/cart/:id
 */
const updateCartItem = asyncHandler(async (req, res) => {
    const { qty } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) throw new ApiError(404, "Cart not found");

    const item = cart.cartItems.id(req.params.id); 
    if (!item) throw new ApiError(404, "Cart item not found");

    const product = await Product.findById(item.product);
    if (!product) throw new ApiError(404, "Product no longer exists");

    if (product.countInStock < qty) {
        throw new ApiError(400, "Insufficient stock for this quantity");
    }

    item.qty = Number(qty);
    await cart.save();

    // ✅ Redux Slice ke index.findIndex logic se bachne ke liye poora array return karein
    res.status(200).json({ success: true, cartItems: cart.cartItems });
});

/**
 * @desc    Remove item from cart
 * @route   DELETE /api/cart/:id
 */
const removeFromCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) throw new ApiError(404, "Cart not found");

    cart.cartItems = cart.cartItems.filter((x) => x._id.toString() !== req.params.id);
    await cart.save();

    res.status(200).json({ success: true, cartItems: cart.cartItems });
});

/**
 * @desc    Clear entire cart after successful order
 * @route   DELETE /api/cart
 */
const clearCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
        cart.cartItems = [];
        await cart.save();
    }

    res.status(200).json({ success: true, message: "Cart cleared" });
});

export { getCart, addToCart, removeFromCart, clearCart, updateCartItem };