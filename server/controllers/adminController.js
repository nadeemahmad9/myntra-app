import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";

// @desc    Get Admin Dashboard Stats
// @route   GET /api/admin/stats
// @access  Private/Admin
export const getAdminStats = asyncHandler(async (req, res) => {
    // 1. Dropdown se aane wali value (Default 7 days)
    const rangeInDays = Number(req.query.days) || 7;

    // Totals Calculation (Promise.all use kiya hai performance ke liye)
    const [totalUsers, totalProducts, ordersAgg] = await Promise.all([
        User.countDocuments({}),
        Product.countDocuments({}),
        Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalOrders: { $sum: 1 },
                    // totalRevenue calculate karte waqt ensure karein totalPrice number ho
                    totalRevenue: { $sum: { $toDouble: "$totalPrice" } },
                },
            },
        ]),
    ]);

    const totalsData = ordersAgg[0] || { totalOrders: 0, totalRevenue: 0 };

    // 2. Dynamic Date Range Setup
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - (rangeInDays - 1));
    fromDate.setHours(0, 0, 0, 0);

    // Sales Aggregation for Graph (Date-wise)
    const salesByDayAgg = await Order.aggregate([
        { $match: { createdAt: { $gte: fromDate } } },
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                orders: { $sum: 1 },
                revenue: { $sum: { $toDouble: "$totalPrice" } },
            },
        },
        { $sort: { _id: 1 } },
    ]);

    // 3. Normalize Array: Har din ka data fill karein (chahe wo 0 hi kyun na ho)
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

    // Top categories logic fix (Handling Object vs String)
    const topCategoriesAgg = await Product.aggregate([
        { $group: { _id: "$category", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 8 },
    ]);

    res.json({
        totals: {
            totalUsers,
            totalProducts,
            totalOrders: totalsData.totalOrders || 0,
            totalRevenue: Number((totalsData.totalRevenue || 0).toFixed(2)),
        },
        salesByDay,
        topCategories: topCategoriesAgg.map((x) => ({
            category: typeof x._id === "object" ? (x._id?.name || "Unknown") : String(x._id),
            count: x.count,
        })),
    });
});

// @desc    Create a new product
// @route   POST /api/admin/products
// @access  Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
    const { name, price, description, images, brand, category, subcategory, countInStock, sizes } = req.body;

    // Validation: Check karein ki zaroori fields missing na hon
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
