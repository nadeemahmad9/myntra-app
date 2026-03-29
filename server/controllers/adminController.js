import asyncHandler from "express-async-handler";
import mongoose from "mongoose"; // 👈 Ye missing tha, isliye crash ho raha tha
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";

// @desc    Get Admin Dashboard Stats
// @route   GET /api/admin/stats
// @access  Private/Admin
export const getAdminStats = asyncHandler(async (req, res) => {
    // 1. Database Connection Check (Debug Logs)
    const count = await Order.countDocuments();
    console.log("Total Orders Found:", count);

    const rangeInDays = Number(req.query.days) || 7;

    // 2. Totals Calculation - Promise.all for speed
    const [totalUsers, totalProducts, ordersAgg] = await Promise.all([
        User.countDocuments({}),
        Product.countDocuments({}),
        Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalOrders: { $sum: 1 },
                    // $toDouble ensure karta hai ki string price bhi number ban jaye
                    totalRevenue: { $sum: { $convert: { input: "$totalPrice", to: "double", onError: 0 } } },
                },
            },
        ]),
    ]);

    const totalsData = ordersAgg[0] || { totalOrders: 0, totalRevenue: 0 };

    // 3. Dynamic Date Range Setup
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - (rangeInDays - 1));
    fromDate.setHours(0, 0, 0, 0);

    // 4. Sales Aggregation for Graph
    const salesByDayAgg = await Order.aggregate([
        { $match: { createdAt: { $gte: fromDate } } },
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                orders: { $sum: 1 },
                revenue: { $sum: { $convert: { input: "$totalPrice", to: "double", onError: 0 } } },
            },
        },
        { $sort: { _id: 1 } },
    ]);

    // 5. Normalize Array: Khali dino ko 0 se bharna
    const salesByDay = Array.from({ length: rangeInDays }).map((_, i) => {
        const d = new Date(fromDate);
        d.setDate(fromDate.getDate() + i);
        const label = d.toISOString().split('T')[0];
        
        const found = salesByDayAgg.find((x) => x._id === label);
        
        return {
            date: label,
            orders: found?.orders || 0,
            revenue: Number((found?.revenue || 0).toFixed(2)),
        };
    });

    // 6. Top categories logic
    const topCategoriesAgg = await Product.aggregate([
        { $group: { _id: "$category", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 8 },
    ]);

    // 7. Final Response
    res.json({
        totals: {
            totalUsers,
            totalProducts,
            totalOrders: totalsData.totalOrders || 0,
            totalRevenue: Number((totalsData.totalRevenue || 0).toFixed(2)),
        },
        salesByDay,
        topCategories: topCategoriesAgg.map((x) => ({
            category: typeof x._id === "object" ? (x._id?.name || "Uncategorized") : String(x._id || "Uncategorized"),
            count: x.count,
        })),
    });
});

// @desc    Create a new product
export const createProduct = asyncHandler(async (req, res) => {
    const { name, price, description, images, brand, category, subcategory, countInStock, sizes } = req.body;

    if (!name || !price || !images) {
        res.status(400);
        throw new Error("Please provide all required fields (Name, Price, Images)");
    }

    const product = new Product({
        user: req.user._id, 
        name,
        price,
        description,
        images,
        brand,
        category,
        subcategory,
        countInStock,
        sizes
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});
