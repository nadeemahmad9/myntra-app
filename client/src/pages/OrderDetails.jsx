// import { useEffect } from "react"
// import { useParams, Link } from "react-router-dom"
// import { useDispatch, useSelector } from "react-redux"
// import { motion } from "framer-motion"
// import { Package, Truck, CheckCircle, Clock, MapPin } from "lucide-react"
// import api from "../utils/api"
// import { useState } from "react"
// import toast from "react-hot-toast"

// const OrderDetails = () => {
//     const { id } = useParams()
//     const [order, setOrder] = useState(null)
//     const [loading, setLoading] = useState(true)

//     useEffect(() => {
//         const fetchOrder = async () => {
//             try {
//                 const { data } = await api.get(`/orders/${id}`)
//                 setOrder(data.order)
//             } catch (err) {
//                 toast.error("Failed to fetch order details")
//             } finally {
//                 setLoading(false)
//             }
//         }
//         fetchOrder()
//     }, [id])

//     if (loading) return <div className="p-20 text-center">Loading Tracking Details...</div>
//     if (!order) return <div className="p-20 text-center">Order Not Found</div>

//     // Stepper Logic: Based on orderStatus from Backend
//     const steps = [
//         { label: "Placed", icon: Clock, completed: true },
//         { label: "Processing", icon: Package, completed: order.orderStatus !== "Cancelled" },
//         { label: "Shipped", icon: Truck, completed: ["Shipped", "Delivered"].includes(order.orderStatus) },
//         { label: "Delivered", icon: CheckCircle, completed: order.orderStatus === "Delivered" }
//     ]

//     return (
//         <div className="min-h-screen bg-gray-50 py-10">
//             <div className="max-w-4xl mx-auto px-4">

//                 {/* 1. Header & ID */}
//                 <div className="bg-white p-6 rounded-t-lg border-b flex justify-between items-center">
//                     <div>
//                         <h1 className="text-xl font-bold">Order Details</h1>
//                         <p className="text-sm text-gray-500">ID: #{order._id.toUpperCase()}</p>
//                     </div>
//                     <Link to="/orders/mine" className="text-pink-500 font-bold text-sm">VIEW ALL ORDERS</Link>
//                 </div>

//                 {/* 2. Professional Stepper (Status Tracker) */}
//                 <div className="bg-white p-8 border-b">
//                     <div className="flex justify-between items-center relative">
//                         {steps.map((step, index) => (
//                             <div key={index} className="flex flex-col items-center z-10">
//                                 <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 
//                                     ${step.completed ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-gray-200 text-gray-300'}`}>
//                                     <step.icon size={20} />
//                                 </div>
//                                 <span className={`text-xs mt-2 font-bold ${step.completed ? 'text-gray-800' : 'text-gray-400'}`}>
//                                     {step.label}
//                                 </span>
//                             </div>
//                         ))}
//                         {/* Connecting Line */}
//                         <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-100 -z-0"></div>
//                     </div>
//                 </div>



//                 {/* 3. Shipping & Payment Summary */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-100 border-b">
//                     <div className="bg-white p-6">
//                         <h3 className="text-sm font-bold text-gray-400 uppercase mb-3 flex items-center gap-2">
//                             <MapPin size={16} /> Delivery Address
//                         </h3>
//                         <p className="font-bold text-sm">{order.shippingAddress.name}</p>
//                         <p className="text-sm text-gray-600 leading-relaxed">
//                             {order.shippingAddress.address}, {order.shippingAddress.city}<br />
//                             {order.shippingAddress.state} - {order.shippingAddress.pincode}
//                         </p>
//                     </div>
//                     <div className="bg-white p-6">
//                         <h3 className="text-sm font-bold text-gray-400 uppercase mb-3">Total Amount</h3>
//                         <p className="text-2xl font-bold text-gray-800">₹{order.totalPrice}</p>
//                         <p className="text-xs text-green-600 font-bold mt-1">
//                             Payment Mode: {order.paymentMethod}
//                         </p>
//                     </div>
//                 </div>

//                 {/* 4. Items List */}
//                 <div className="bg-white p-6 rounded-b-lg">
//                     <h3 className="text-sm font-bold text-gray-400 uppercase mb-4">Items ({order.orderItems.length})</h3>
//                     <div className="space-y-6">
//                         {order.orderItems.map((item, i) => (
//                             <div key={i} className="flex gap-4 border-b pb-4 last:border-0">
//                                 <img src={item.image} alt={item.name} className="w-16 h-20 object-cover rounded bg-gray-50" />
//                                 <div className="flex-1">
//                                     <h4 className="font-bold text-sm uppercase">{item.name}</h4>
//                                     <p className="text-xs text-gray-500">Size: {item.size} | Qty: {item.qty}</p>
//                                     <p className="font-bold text-sm mt-2">₹{item.price}</p>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//             </div>
//         </div>
//     )
// }

// export default OrderDetails

import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Package, Truck, CheckCircle, Clock, MapPin, ChevronLeft, Download, CreditCard } from "lucide-react"
import api from "../utils/api"
import toast from "react-hot-toast"

const OrderDetails = () => {
    const { id } = useParams()
    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const { data } = await api.get(`/orders/${id}`)
                // Backend response structure ke hisaab se check karein (data ya data.order)
                setOrder(data.order || data)
            } catch (err) {
                toast.error("Failed to fetch order details")
            } finally {
                setLoading(false)
            }
        }
        fetchOrder()
    }, [id])

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    )

    if (!order) return <div className="p-20 text-center font-bold text-gray-600">Order Not Found</div>

    // Stepper Logic: Based on orderStatus
    const steps = [
        { label: "Placed", icon: Clock, status: "Placed" },
        { label: "Processing", icon: Package, status: "Processing" },
        { label: "Shipped", icon: Truck, status: "Shipped" },
        { label: "Delivered", icon: CheckCircle, status: "Delivered" }
    ]

    const currentStepIndex = steps.findIndex(s => s.status === order.orderStatus)
    const progressWidth = (currentStepIndex / (steps.length - 1)) * 100

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Top Navigation */}
            <div className="bg-white border-b sticky top-0 z-20">
                <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
                    <Link to="/orders/mine" className="flex items-center gap-1 text-gray-600 hover:text-pink-600 transition-colors">
                        <ChevronLeft size={20} />
                        <span className="text-sm font-bold">BACK TO ORDERS</span>
                    </Link>
                    <button className="text-pink-600 text-xs font-bold border border-pink-600 px-3 py-1.5 rounded hover:bg-pink-50 transition-all flex items-center gap-1">
                        <Download size={14} /> INVOICE
                    </button>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto px-4 mt-6 space-y-4"
            >
                {/* 1. Order ID & Summary Header */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Order ID</p>
                        <h1 className="text-lg font-black text-gray-900">#{order._id.toUpperCase()}</h1>
                    </div>
                    <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-lg">
                        <CreditCard size={18} className="text-gray-400" />
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase">Payment Mode</p>
                            <p className="text-sm font-bold text-gray-800">{order.paymentMethod}</p>
                        </div>
                    </div>
                </div>

                {/* 2. Professional Stepper (Status Tracker) */}
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                    <div className="relative flex justify-between items-center">
                        {/* Static Background Line */}
                        <div className="absolute top-5 left-0 w-full h-1 bg-gray-100 rounded-full"></div>

                        {/* Dynamic Progress Line */}
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progressWidth}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="absolute top-5 left-0 h-1 bg-green-500 rounded-full z-0"
                        ></motion.div>

                        {steps.map((step, index) => {
                            const isCompleted = index <= currentStepIndex;
                            return (
                                <div key={index} className="flex flex-col items-center z-10">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all duration-500
                                        ${isCompleted ? 'bg-green-500 border-white text-white shadow-md' : 'bg-white border-gray-100 text-gray-300'}`}>
                                        <step.icon size={18} />
                                    </div>
                                    <span className={`text-[10px] mt-2 font-black uppercase tracking-tighter ${isCompleted ? 'text-gray-800' : 'text-gray-400'}`}>
                                        {step.label}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* 3. Grid: Address & Price Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Shipping Address */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xs font-black text-pink-600 uppercase mb-4 flex items-center gap-2">
                            <MapPin size={16} /> Shipping Details
                        </h3>
                        <div className="space-y-1">
                            <p className="font-bold text-gray-900">{order.shippingAddress.name}</p>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {order.shippingAddress.address}<br />
                                {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                            </p>
                            <p className="text-sm text-gray-800 font-bold mt-2 pt-2 border-t border-dashed">
                                Phone: {order.shippingAddress.phone}
                            </p>
                        </div>
                    </div>

                    {/* Price Breakdown */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xs font-black text-pink-600 uppercase mb-4">Price Breakdown</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Total MRP</span>
                                <span className="font-medium">₹{order.itemsPrice}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Shipping Fee</span>
                                <span className="text-green-600 font-bold">{order.shippingPrice === 0 ? "FREE" : `₹${order.shippingPrice}`}</span>
                            </div>
                            <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
                                <span className="font-black text-gray-900">Total Amount</span>
                                <span className="text-xl font-black text-pink-600">₹{order.totalPrice}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. Items List */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-gray-50 px-6 py-3 border-b border-gray-100">
                        <h3 className="text-xs font-black text-gray-500 uppercase">Items in this order ({order.orderItems.length})</h3>
                    </div>
                    <div className="divide-y divide-gray-50">
                        {order.orderItems.map((item, i) => (
                            <div key={i} className="p-6 flex gap-6 hover:bg-gray-50 transition-colors">
                                <div className="relative">
                                    <img src={item.image} alt={item.name} className="w-20 h-24 object-cover rounded shadow-sm" />
                                    <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                                        {item.qty}
                                    </span>
                                </div>
                                <div className="flex-1 space-y-1">
                                    <h4 className="font-bold text-sm text-gray-800 uppercase leading-tight">{item.name}</h4>
                                    <p className="text-[10px] font-bold text-gray-400">SIZE: {item.size}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="text-sm font-black text-gray-900">₹{item.price}</span>
                                        {item.oldPrice && <span className="text-xs text-gray-400 line-through">₹{item.oldPrice}</span>}
                                    </div>
                                    <div className="pt-2">
                                        <span className="text-[10px] bg-green-50 text-green-700 px-2 py-0.5 rounded font-bold">
                                            14 Days Return Available
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Help Section */}
                <div className="text-center py-6 text-gray-400 text-xs font-medium">
                    Need help with your order? <Link to="/contact" className="text-pink-600 font-bold underline">Contact Support</Link>
                </div>
            </motion.div>
        </div>
    )
}

export default OrderDetails