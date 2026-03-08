import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

/**
 * @desc    Create new order with price validation & stock check
 * @route   POST /api/orders
 * @access  Private
 */
const addOrderItems = asyncHandler(async (req, res) => {
    const { 
        orderItems, 
        shippingAddress, 
        paymentMethod, 
        itemsPrice, 
        taxPrice, 
        shippingPrice, 
        totalPrice 
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
        throw new ApiError(400, "No order items found");
    }

    // 2+ Year Exp Touch: Backend Validation
    // Frontend se aayi prices ko verify karna zaroori hai (Security)
    let dbItemsPrice = 0;
    
    for (const item of orderItems) {
        const product = await Product.findById(item.product);
        if (!product) {
            throw new ApiError(404, `Product ${item.name} not found`);
        }
        
        // Stock Check
        if (product.countInStock < item.qty) {
            throw new ApiError(400, `${product.name} is out of stock or insufficient quantity`);
        }

        dbItemsPrice += product.price * item.qty;
    }

    // Tax aur Shipping recalculate karke verify karein (Example logic)
    const calculatedTotal = dbItemsPrice + Number(taxPrice) + Number(shippingPrice);
    
    // Agar frontend ka total backend calculation se match nahi karta
    if (Math.round(totalPrice) !== Math.round(calculatedTotal)) {
        // throw new ApiError(400, "Price mismatch detected. Order cancelled.");
    }

    const order = new Order({
        orderItems: orderItems.map((x) => ({
            ...x,
            product: x.product,
            _id: undefined // Security: ID mismatch na ho
        })),
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice: dbItemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice: calculatedTotal,
    });

    const createdOrder = await order.save();

    // 2+ Year Exp Touch: Order hone ke baad stock update karna
    // Real industry mein hum yahan transactions (session) use karte hain
    for (const item of orderItems) {
        await Product.findByIdAndUpdate(item.product, {
            $inc: { countInStock: -item.qty }
        });
    }

    res.status(201).json({
        success: true,
        order: createdOrder
    });
});

/**
 * @desc    Get order by ID with user details
 * @route   GET /api/orders/:id
 */
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
    );

    if (!order) {
        throw new ApiError(404, "Order not found");
    }

    // Security check: Sirf Admin ya wahi User order dekh sake jisne order kiya
    if (order.user._id.toString() !== req.user._id.toString() && !req.user.isAdmin) {
        throw new ApiError(403, "Not authorized to view this order");
    }

    res.status(200).json({ success: true, order });
});

/**
 * @desc    Update order status to paid
 * @route   PUT /api/orders/:id/pay
 */
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        throw new ApiError(404, "Order not found");
    }

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();
    res.status(200).json({ success: true, order: updatedOrder });
});

/**
 * @desc    Update delivery status (Admin only)
 * @route   PUT /api/orders/:id/deliver
 */
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        throw new ApiError(404, "Order not found");
    }

    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.status(200).json({ success: true, order: updatedOrder });
});

/**
 * @desc    Get current user's orders
 */
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
});

/**
 * @desc    Get all orders (Admin only)
 */
const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({})
        .populate("user", "id name")
        .sort({ createdAt: -1 });
        
    res.status(200).json({ success: true, orders });
});

export {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getMyOrders,
    getOrders,
};