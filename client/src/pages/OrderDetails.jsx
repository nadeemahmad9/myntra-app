import { useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { motion } from "framer-motion"
import { Package, Truck, CheckCircle, Clock, MapPin } from "lucide-react"
import api from "../utils/api"
import { useState } from "react"
import toast from "react-hot-toast"

const OrderDetails = () => {
    const { id } = useParams()
    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const { data } = await api.get(`/orders/${id}`)
                setOrder(data.order)
            } catch (err) {
                toast.error("Failed to fetch order details")
            } finally {
                setLoading(false)
            }
        }
        fetchOrder()
    }, [id])

    if (loading) return <div className="p-20 text-center">Loading Tracking Details...</div>
    if (!order) return <div className="p-20 text-center">Order Not Found</div>

    // Stepper Logic: Based on orderStatus from Backend
    const steps = [
        { label: "Placed", icon: Clock, completed: true },
        { label: "Processing", icon: Package, completed: order.orderStatus !== "Cancelled" },
        { label: "Shipped", icon: Truck, completed: ["Shipped", "Delivered"].includes(order.orderStatus) },
        { label: "Delivered", icon: CheckCircle, completed: order.orderStatus === "Delivered" }
    ]

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-4xl mx-auto px-4">

                {/* 1. Header & ID */}
                <div className="bg-white p-6 rounded-t-lg border-b flex justify-between items-center">
                    <div>
                        <h1 className="text-xl font-bold">Order Details</h1>
                        <p className="text-sm text-gray-500">ID: #{order._id.toUpperCase()}</p>
                    </div>
                    <Link to="/orders/mine" className="text-pink-500 font-bold text-sm">VIEW ALL ORDERS</Link>
                </div>

                {/* 2. Professional Stepper (Status Tracker) */}
                <div className="bg-white p-8 border-b">
                    <div className="flex justify-between items-center relative">
                        {steps.map((step, index) => (
                            <div key={index} className="flex flex-col items-center z-10">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 
                                    ${step.completed ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-gray-200 text-gray-300'}`}>
                                    <step.icon size={20} />
                                </div>
                                <span className={`text-xs mt-2 font-bold ${step.completed ? 'text-gray-800' : 'text-gray-400'}`}>
                                    {step.label}
                                </span>
                            </div>
                        ))}
                        {/* Connecting Line */}
                        <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-100 -z-0"></div>
                    </div>
                </div>



                {/* 3. Shipping & Payment Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-100 border-b">
                    <div className="bg-white p-6">
                        <h3 className="text-sm font-bold text-gray-400 uppercase mb-3 flex items-center gap-2">
                            <MapPin size={16} /> Delivery Address
                        </h3>
                        <p className="font-bold text-sm">{order.shippingAddress.name}</p>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            {order.shippingAddress.address}, {order.shippingAddress.city}<br />
                            {order.shippingAddress.state} - {order.shippingAddress.pincode}
                        </p>
                    </div>
                    <div className="bg-white p-6">
                        <h3 className="text-sm font-bold text-gray-400 uppercase mb-3">Total Amount</h3>
                        <p className="text-2xl font-bold text-gray-800">₹{order.totalPrice}</p>
                        <p className="text-xs text-green-600 font-bold mt-1">
                            Payment Mode: {order.paymentMethod}
                        </p>
                    </div>
                </div>

                {/* 4. Items List */}
                <div className="bg-white p-6 rounded-b-lg">
                    <h3 className="text-sm font-bold text-gray-400 uppercase mb-4">Items ({order.orderItems.length})</h3>
                    <div className="space-y-6">
                        {order.orderItems.map((item, i) => (
                            <div key={i} className="flex gap-4 border-b pb-4 last:border-0">
                                <img src={item.image} alt={item.name} className="w-16 h-20 object-cover rounded bg-gray-50" />
                                <div className="flex-1">
                                    <h4 className="font-bold text-sm uppercase">{item.name}</h4>
                                    <p className="text-xs text-gray-500">Size: {item.size} | Qty: {item.qty}</p>
                                    <p className="font-bold text-sm mt-2">₹{item.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default OrderDetails