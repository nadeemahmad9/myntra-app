// import { useEffect } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { Link, useNavigate } from "react-router-dom"
// import { motion } from "framer-motion"
// import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react"
// import { fetchCart, updateCartItem, removeFromCart } from "../redux/slices/cartSlice"
// import toast from "react-hot-toast"

// const Cart = () => {
//     const dispatch = useDispatch()
//     const navigate = useNavigate()

//     // Redux State
//     const { cartItems, loading } = useSelector((state) => state.cart)
//     const { user } = useSelector((state) => state.auth)

//     useEffect(() => {
//         if (user) {
//             dispatch(fetchCart())
//         }
//     }, [dispatch, user])

//     // Quantity Handlers
//     const handleQtyChange = (id, currentQty, delta, stock) => {
//         const newQty = currentQty + delta
//         if (newQty > stock) {
//             toast.error("Exceeds available stock")
//             return
//         }
//         if (newQty < 1) return

//         dispatch(updateCartItem({ id, qty: newQty }))
//     }

//     // Totals Calculation (Memoized logic industry standard)
//     const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0)
//     const shipping = subtotal > 1000 ? 0 : 99
//     const total = subtotal + shipping

//     if (loading && cartItems.length === 0) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-pink-500"></div>
//             </div>
//         )
//     }

//     if (!cartItems || cartItems.length === 0) {
//         return (
//             <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
//                 <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
//                     <ShoppingBag size={80} className="text-gray-200 mb-4" />
//                 </motion.div>
//                 <h2 className="text-xl font-bold text-gray-800">Hey, it feels so light!</h2>
//                 <p className="text-gray-500 mt-2 mb-6">There is nothing in your bag. Let's add some items.</p>
//                 <Link to="/" className="border border-pink-500 text-pink-500 px-10 py-3 rounded font-bold hover:bg-pink-50 transition-all">
//                     ADD ITEMS FROM WISHLIST
//                 </Link>
//             </div>
//         )
//     }

//     return (
//         <div className="min-h-screen bg-white py-10">
//             <div className="max-w-6xl mx-auto px-4">
//                 <div className="flex flex-col lg:flex-row gap-10">

//                     {/* Left: Cart Items */}
//                     <div className="flex-1 space-y-4">
//                         <div className="flex justify-between items-center border-b pb-4">
//                             <h1 className="text-lg font-bold">Check Bag ({cartItems.length} Items)</h1>
//                         </div>

//                         {cartItems.map((item) => (
//                             <motion.div
//                                 key={item._id}
//                                 layout
//                                 className="flex gap-4 border p-4 rounded-md relative group"
//                             >
//                                 <img
//                                     src={item.image}
//                                     alt={item.name}
//                                     className="w-24 h-32 object-cover bg-gray-50"
//                                 />

//                                 <div className="flex-1 space-y-1">
//                                     <h3 className="font-bold text-sm uppercase">{item.brand || 'Brand'}</h3>
//                                     <p className="text-gray-600 text-sm">{item.name}</p>
//                                     <p className="text-xs bg-gray-100 w-fit px-2 py-1 rounded mt-1">Size: {item.size}</p>

//                                     <div className="flex items-center gap-4 mt-4">
//                                         <div className="flex items-center border rounded">
//                                             <button
//                                                 onClick={() => handleQtyChange(item._id, item.qty, -1)}
//                                                 className="p-1 hover:bg-gray-100"><Minus size={14} /></button>
//                                             <span className="px-3 text-sm font-bold">{item.qty}</span>
//                                             <button
//                                                 onClick={() => handleQtyChange(item._id, item.qty, 1, 10)}
//                                                 className="p-1 hover:bg-gray-100"><Plus size={14} /></button>
//                                         </div>
//                                         <div className="font-bold text-sm">₹{item.price * item.qty}</div>
//                                     </div>
//                                 </div>

//                                 <button
//                                     onClick={() => dispatch(removeFromCart(item._id))}
//                                     className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
//                                 >
//                                     <Trash2 size={18} />
//                                 </button>
//                             </motion.div>
//                         ))}
//                     </div>

//                     {/* Right: Price Details */}
//                     <div className="w-full lg:w-96">
//                         <div className="border p-6 rounded-md sticky top-24">
//                             <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Price Details ({cartItems.length} Items)</h2>

//                             <div className="space-y-3 text-sm border-b pb-4">
//                                 <div className="flex justify-between">
//                                     <span>Total MRP</span>
//                                     <span>₹{subtotal}</span>
//                                 </div>
//                                 <div className="flex justify-between">
//                                     <span>Convenience Fee</span>
//                                     <span className={shipping === 0 ? "text-green-600" : ""}>
//                                         {shipping === 0 ? "FREE" : `₹${shipping}`}
//                                     </span>
//                                 </div>
//                             </div>

//                             <div className="flex justify-between font-bold text-base py-4">
//                                 <span>Total Amount</span>
//                                 <span>₹{total}</span>
//                             </div>

//                             <button
//                                 onClick={() => navigate('/checkout')}
//                                 className="w-full bg-pink-500 text-white py-3 rounded font-bold flex items-center justify-center gap-2 hover:bg-pink-600 transition-all uppercase tracking-tight"
//                             >
//                                 Place Order <ArrowRight size={18} />
//                             </button>
//                         </div>
//                     </div>

//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Cart



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

    // Cart.jsx ke andar handleQtyChange function:
    const handleQtyChange = (item, delta) => {
        const id = item._id; // ✅ Hamesha item._id hi use karein update ke liye
        if (!id) return toast.error("Item ID not found");

        const newQty = item.qty + delta;
        const stock = item.countInStock || 10;

        if (newQty > stock) return toast.error(`Only ${stock} units available`);
        if (newQty < 1) return;

        // ✅ Dispatch with 'id' key
        dispatch(updateCartItem({ id, qty: newQty }))
            .unwrap()
            .catch((err) => toast.error(err));
    };

    // Totals Calculation
    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0)
    const shipping = subtotal > 1000 || subtotal === 0 ? 0 : 99
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
            <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4 text-center">
                <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
                    <ShoppingBag size={80} className="text-gray-200 mb-4 mx-auto" />
                </motion.div>
                <h2 className="text-xl font-bold text-gray-800 tracking-tight">Hey, it feels so light!</h2>
                <p className="text-gray-500 mt-2 mb-6">There is nothing in your bag. Let's add some items.</p>
                <Link to="/" className="border-2 border-pink-500 text-pink-500 px-10 py-3 rounded font-bold hover:bg-pink-500 hover:text-white transition-all">
                    CONTINUE SHOPPING
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
                            <h1 className="text-lg font-bold uppercase tracking-tight text-gray-800">Check Bag ({cartItems.length} Items)</h1>
                        </div>

                        {cartItems.map((item) => (
                            <motion.div
                                key={item._id}
                                layout
                                className="flex gap-4 border p-4 rounded-md relative group hover:shadow-sm transition-shadow"
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-24 h-32 object-cover bg-gray-50 rounded"
                                />

                                <div className="flex-1 space-y-1">
                                    <h3 className="font-bold text-sm uppercase text-gray-900">{item.brand || 'Brand'}</h3>
                                    <p className="text-gray-600 text-sm line-clamp-1">{item.name}</p>
                                    <p className="text-[10px] font-bold bg-gray-100 w-fit px-2 py-1 rounded mt-1 uppercase">Size: {item.size}</p>

                                    <div className="flex items-center gap-6 mt-4">
                                        {/* ✅ Quantity Selector UI */}
                                        <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                                            <button
                                                onClick={() => handleQtyChange(item, -1)} // ✅ Poora item bhejein
                                                className="p-1.5 px-2 hover:bg-gray-100 border-r"
                                            >
                                                <Minus size={12} />
                                            </button>

                                            <span className="px-4 text-xs font-black">{item.qty}</span>

                                            <button
                                                onClick={() => handleQtyChange(item, 1)} // ✅ Poora item bhejein
                                                className="p-1.5 px-2 hover:bg-gray-100 border-l"
                                            >
                                                <Plus size={12} />
                                            </button>

                                            {/* Remove button fix */}
                                            <button
                                                onClick={() => dispatch(removeFromCart(item._id))} // ✅ item._id use karein
                                                className="absolute top-4 right-4 text-gray-300 hover:text-red-500"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                        <div className="font-black text-sm text-gray-900">₹{item.price * item.qty}</div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => dispatch(removeFromCart(item.productId || item._id))}
                                    className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors p-1"
                                    title="Remove Item"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right: Price Details */}
                    <div className="w-full lg:w-96">
                        <div className="border border-gray-100 p-6 rounded-lg sticky top-24 bg-gray-50/50">
                            <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 border-b pb-2">Price Details ({cartItems.length} Items)</h2>

                            <div className="space-y-4 text-sm text-gray-600">
                                <div className="flex justify-between">
                                    <span>Total MRP</span>
                                    <span className="text-gray-900 font-medium">₹{subtotal}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Convenience Fee</span>
                                    <span className={shipping === 0 ? "text-green-600 font-bold" : "text-gray-900"}>
                                        {shipping === 0 ? "FREE" : `₹${shipping}`}
                                    </span>
                                </div>
                            </div>

                            <div className="flex justify-between font-black text-lg py-5 mt-4 border-t border-gray-200 text-gray-900">
                                <span>Total Amount</span>
                                <span className="text-pink-600">₹{total}</span>
                            </div>

                            <button
                                onClick={() => navigate('/checkout')}
                                className="w-full bg-pink-500 text-white py-4 rounded font-black flex items-center justify-center gap-2 hover:bg-pink-600 shadow-lg shadow-pink-200 transition-all uppercase tracking-tighter text-sm"
                            >
                                Place Order <ArrowRight size={18} />
                            </button>

                            <p className="text-[10px] text-gray-400 text-center mt-4">
                                100% Secure Payments | Genuine Products
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Cart

