import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ShoppingBag, ChevronRight, Package, Calendar } from "lucide-react"
import api from "../utils/api"
import toast from "react-hot-toast"

const MyOrders = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        const fetchMyOrders = async () => {
            try {
                const { data } = await api.get("/orders/mine")
                // 2+ Year Exp Touch: Latest orders hamesha upar hone chahiye
                setOrders(data.orders)
            } catch (error) {
                toast.error("Failed to load your orders")
            } finally {
                setLoading(false)
            }
        }

        if (user) fetchMyOrders()
    }, [user])

    if (loading) return <div className="p-20 text-center">Fetching your orders...</div>

    if (orders.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
                <ShoppingBag size={60} className="text-gray-300 mb-4" />
                <h2 className="text-xl font-bold">You haven't placed any orders yet!</h2>
                <Link to="/" className="mt-4 bg-pink-500 text-white px-8 py-2 rounded font-bold hover:bg-pink-600 transition-all">
                    START SHOPPING
                </Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-2xl font-bold mb-8 flex items-center gap-2">
                    My Orders <span className="text-sm font-normal text-gray-500">({orders.length} items)</span>
                </h1>

                <div className="space-y-4">
                    {orders.map((order, idx) => (
                        <motion.div
                            key={order._id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white border rounded-lg shadow-sm overflow-hidden hover:border-pink-200 transition-all"
                        >
                            <Link to={`/order/${order._id}`}>
                                {/* Order Header */}
                                <div className="bg-gray-50 px-6 py-3 border-b flex justify-between items-center">
                                    <div className="flex gap-6 text-xs font-bold text-gray-500 uppercase">
                                        <div>
                                            <p>Order Placed</p>
                                            <p className="text-gray-800 mt-1">{new Date(order.createdAt).toDateString()}</p>
                                        </div>
                                        <div>
                                            <p>Total Amount</p>
                                            <p className="text-gray-800 mt-1">₹{order.totalPrice}</p>
                                        </div>
                                    </div>
                                    <div className="text-xs font-bold text-pink-500 flex items-center gap-1">
                                        ID: #{order._id.slice(-8).toUpperCase()} <ChevronRight size={14} />
                                    </div>
                                </div>

                                {/* Order Content (Images preview) */}
                                <div className="p-6 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="flex -space-x-4">
                                            {order.orderItems.slice(0, 3).map((item, i) => (
                                                <img
                                                    key={i}
                                                    src={item.image}
                                                    alt="product"
                                                    className="w-16 h-20 object-cover rounded border-2 border-white shadow-sm bg-gray-100"
                                                />
                                            ))}
                                            {order.orderItems.length > 3 && (
                                                <div className="w-16 h-20 bg-gray-200 rounded border-2 border-white flex items-center justify-center text-xs font-bold text-gray-600">
                                                    +{order.orderItems.length - 3}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm text-gray-800">
                                                {order.orderItems[0].name} {order.orderItems.length > 1 ? `& ${order.orderItems.length - 1} more items` : ''}
                                            </p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <span className={`w-2 h-2 rounded-full ${order.isDelivered ? 'bg-green-500' : 'bg-orange-400'}`}></span>
                                                <span className="text-xs font-bold text-gray-600 uppercase tracking-tight">
                                                    Status: {order.orderStatus}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="hidden md:block border border-gray-300 px-4 py-2 rounded text-sm font-bold hover:bg-gray-50 transition-all">
                                        TRACK ORDER
                                    </button>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MyOrders