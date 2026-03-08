import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react"
import { fetchCart, updateCartItem, removeFromCart } from "../redux/slices/cartSlice"
import toast from "react-hot-toast"

const Cart = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // Redux State
    const { cartItems, loading } = useSelector((state) => state.cart)
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        if (user) {
            dispatch(fetchCart())
        }
    }, [dispatch, user])

    // Quantity Handlers
    const handleQtyChange = (id, currentQty, delta, stock) => {
        const newQty = currentQty + delta
        if (newQty > stock) {
            toast.error("Exceeds available stock")
            return
        }
        if (newQty < 1) return

        dispatch(updateCartItem({ id, qty: newQty }))
    }

    // Totals Calculation (Memoized logic industry standard)
    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0)
    const shipping = subtotal > 1000 ? 0 : 99
    const total = subtotal + shipping

    if (loading && cartItems.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-pink-500"></div>
            </div>
        )
    }

    if (!cartItems || cartItems.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
                <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
                    <ShoppingBag size={80} className="text-gray-200 mb-4" />
                </motion.div>
                <h2 className="text-xl font-bold text-gray-800">Hey, it feels so light!</h2>
                <p className="text-gray-500 mt-2 mb-6">There is nothing in your bag. Let's add some items.</p>
                <Link to="/" className="border border-pink-500 text-pink-500 px-10 py-3 rounded font-bold hover:bg-pink-50 transition-all">
                    ADD ITEMS FROM WISHLIST
                </Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white py-10">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-10">

                    {/* Left: Cart Items */}
                    <div className="flex-1 space-y-4">
                        <div className="flex justify-between items-center border-b pb-4">
                            <h1 className="text-lg font-bold">Check Bag ({cartItems.length} Items)</h1>
                        </div>

                        {cartItems.map((item) => (
                            <motion.div
                                key={item._id}
                                layout
                                className="flex gap-4 border p-4 rounded-md relative group"
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-24 h-32 object-cover bg-gray-50"
                                />

                                <div className="flex-1 space-y-1">
                                    <h3 className="font-bold text-sm uppercase">{item.brand || 'Brand'}</h3>
                                    <p className="text-gray-600 text-sm">{item.name}</p>
                                    <p className="text-xs bg-gray-100 w-fit px-2 py-1 rounded mt-1">Size: {item.size}</p>

                                    <div className="flex items-center gap-4 mt-4">
                                        <div className="flex items-center border rounded">
                                            <button
                                                onClick={() => handleQtyChange(item._id, item.qty, -1)}
                                                className="p-1 hover:bg-gray-100"><Minus size={14} /></button>
                                            <span className="px-3 text-sm font-bold">{item.qty}</span>
                                            <button
                                                onClick={() => handleQtyChange(item._id, item.qty, 1, 10)}
                                                className="p-1 hover:bg-gray-100"><Plus size={14} /></button>
                                        </div>
                                        <div className="font-bold text-sm">₹{item.price * item.qty}</div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => dispatch(removeFromCart(item._id))}
                                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right: Price Details */}
                    <div className="w-full lg:w-96">
                        <div className="border p-6 rounded-md sticky top-24">
                            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Price Details ({cartItems.length} Items)</h2>

                            <div className="space-y-3 text-sm border-b pb-4">
                                <div className="flex justify-between">
                                    <span>Total MRP</span>
                                    <span>₹{subtotal}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Convenience Fee</span>
                                    <span className={shipping === 0 ? "text-green-600" : ""}>
                                        {shipping === 0 ? "FREE" : `₹${shipping}`}
                                    </span>
                                </div>
                            </div>

                            <div className="flex justify-between font-bold text-base py-4">
                                <span>Total Amount</span>
                                <span>₹{total}</span>
                            </div>

                            <button
                                onClick={() => navigate('/checkout')}
                                className="w-full bg-pink-500 text-white py-3 rounded font-bold flex items-center justify-center gap-2 hover:bg-pink-600 transition-all uppercase tracking-tight"
                            >
                                Place Order <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Cart

