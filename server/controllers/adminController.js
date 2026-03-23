// controllers/adminController.js
import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";

export const getAdminStats = asyncHandler(async (req, res) => {
  // 1. Dropdown se aane wali value pakdein (Default 7 days)
  const rangeInDays = Number(req.query.days) || 7;

  // Totals (Ye hamesha total hi dikhayenge)
  const [totalUsers, totalProducts, ordersAgg] = await Promise.all([
    User.countDocuments({}),
    Product.countDocuments({}),
    Order.aggregate([
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: "$totalPrice" },
        },
      },
    ]),
  ]);

  const totals = ordersAgg[0] || { totalOrders: 0, totalRevenue: 0 };

  // 2. Dynamic Date Range Set Karein
  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - (rangeInDays - 1)); // Din ke hisab se piche jayein
  fromDate.setHours(0, 0, 0, 0);

  // Aggregation for Sales
  const salesByDayAgg = await Order.aggregate([
    { $match: { createdAt: { $gte: fromDate } } },
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
        },
        orders: { $sum: 1 },
        revenue: { $sum: "$totalPrice" },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  // 3. Normalize Array (Ab ye 7 ki jagah 'rangeInDays' ka array banayega)
  const salesByDay = [...Array(rangeInDays)].map((_, i) => {
    const d = new Date(fromDate);
    d.setDate(fromDate.getDate() + i);
    const label = d.toISOString().slice(0, 10);
    const found = salesByDayAgg.find((x) => x._id === label);
    return {
      date: label,
      orders: found?.orders || 0,
      revenue: found?.revenue || 0,
    };
  });

  // Top categories
  const topCategoriesAgg = await Product.aggregate([
    { $group: { _id: "$category", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 8 },
  ]);

  res.json({
    totals: {
      totalUsers,
      totalProducts,
      totalOrders: totals.totalOrders || 0,
      totalRevenue: totals.totalRevenue || 0,
    },
    salesByDay: salesByDay, // Ab ye dynamic hai!
    topCategories: topCategoriesAgg.map((x) => ({
      category: typeof x._id === "object" && x._id?.name ? x._id.name : String(x._id),
      count: x.count,
    })),
  });
});
