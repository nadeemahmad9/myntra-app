// controllers/adminController.js
const asyncHandler = require("express-async-handler")
const Order = require("../models/orderModel")
const Product = require("../models/productModel")
const User = require("../models/userModel")

// GET /api/admin/stats
// Private/Admin
export const getAdminStats = asyncHandler(async (req, res) => {
  // Totals
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
  ])

  const totals = ordersAgg[0] || { totalOrders: 0, totalRevenue: 0 }

  // Sales by day (last 7 days)
  const fromDate = new Date()
  fromDate.setDate(fromDate.getDate() - 6) // include today
  fromDate.setHours(0, 0, 0, 0)

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
  ])

  // Normalize to 7 days array
  const days = [...Array(7)].map((_, i) => {
    const d = new Date(fromDate)
    d.setDate(fromDate.getDate() + i)
    const label = d.toISOString().slice(0, 10)
    const found = salesByDayAgg.find((x) => x._id === label)
    return {
      date: label,
      orders: found?.orders || 0,
      revenue: found?.revenue || 0,
    }
  })

  // Top categories by product count
  const topCategoriesAgg = await Product.aggregate([
    { $group: { _id: "$category", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 8 },
  ])

  res.json({
    totals: {
      totalUsers,
      totalProducts,
      totalOrders: totals.totalOrders || 0,
      totalRevenue: totals.totalRevenue || 0,
    },
    salesByDay: days,
    topCategories: topCategoriesAgg.map((x) => ({
      category: typeof x._id === "object" && x._id?.name ? x._id.name : String(x._id),
      count: x.count,
    })),
  })
})

