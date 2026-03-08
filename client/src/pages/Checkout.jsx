// import { useState, useEffect } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { useDispatch, useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"
// import { Trash2, MapPin, CreditCard, ChevronRight } from "lucide-react"
// import api from "../utils/api"
// import toast from "react-hot-toast"

// const Checkout = () => {
//     const dispatch = useDispatch()
//     const navigate = useNavigate()

//     // Redux State integration
//     const { cartItems } = useSelector((state) => state.cart)
//     const { user } = useSelector((state) => state.auth)

//     const [selectedAddress, setSelectedAddress] = useState(null)
//     const [paymentMethod, setPaymentMethod] = useState("COD")
//     const [loading, setLoading] = useState(false)
//     const [showAddressForm, setShowAddressForm] = useState(false)

//     // Form State
//     const [newAddress, setNewAddress] = useState({
//         name: user?.name || "",
//         address: "",
//         city: "",
//         state: "",
//         pincode: "",
//         phone: user?.phone || "",
//     })

//     useEffect(() => {
//         if (!cartItems || cartItems.length === 0) {
//             navigate("/cart")
//         }
//         // Agar user ka already address saved hai toh default select karein
//         if (user?.address?.street) {
//             setSelectedAddress(user.address)
//         }
//     }, [cartItems, navigate, user])

//     // Calculations
//     const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)
//     const shipping = subtotal > 1000 ? 0 : 99
//     const total = subtotal + shipping

//     // const handlePlaceOrder = async () => {
//     //     if (!selectedAddress) {
//     //         return toast.error("Please select or add a delivery address")
//     //     }

//     //     try {
//     //         setLoading(true)
//     //         const orderData = {
//     //             orderItems: cartItems.map(item => ({
//     //                 product: item.product._id || item.product,
//     //                 name: item.name,
//     //                 qty: item.qty,
//     //                 price: item.price,
//     //                 image: item.image,
//     //                 size: item.size
//     //             })),
//     //             shippingAddress: selectedAddress,
//     //             paymentMethod,
//     //             itemsPrice: subtotal,
//     //             shippingPrice: shipping,
//     //             totalPrice: total
//     //         }

//     //         const { data } = await api.post("/orders", orderData)

//     //         if (data.success) {
//     //             toast.success("Order Placed Successfully!")
//     //             // dispatch(clearCart()) // Redux action to clear cart
//     //             navigate(`/order/${data.order._id}`)
//     //         }
//     //     } catch (error) {
//     //         toast.error(error.response?.data?.message || "Order failed")
//     //     } finally {
//     //         setLoading(false)
//     //     }
//     // }

//     const handlePlaceOrder = async () => {
//         if (!selectedAddress) {
//             return toast.error("Please select or add a delivery address")
//         }

//         try {
//             setLoading(true)
//             const orderData = {
//                 orderItems: cartItems.map(item => ({
//                     product: item.product._id || item.product,
//                     name: item.name,
//                     qty: Number(item.qty),
//                     price: Number(item.price),
//                     image: item.image,
//                     size: item.size
//                 })),
//                 shippingAddress: {
//                     name: selectedAddress.name, // ✅ Model expects 'name'
//                     address: selectedAddress.address,
//                     city: selectedAddress.city,
//                     state: selectedAddress.state || "Uttar Pradesh",
//                     pincode: selectedAddress.pincode,
//                     // Note: Phone model mein nahi hai, toh use address string mein add kar sakte hain 
//                     // ya model update kar sakte hain.
//                 },
//                 paymentMethod: paymentMethod, // Ensure it's "COD", "PayPal", etc. (Enum check)
//                 itemsPrice: subtotal,
//                 taxPrice: 0, // ✅ Required field as per your model
//                 shippingPrice: shipping,
//                 totalPrice: total
//             }

//             const { data } = await api.post("/orders", orderData)

//             if (data.success) {
//                 toast.success("Order Placed Successfully!")
//                 // dispatch(clearCartLocally()) 
//                 navigate(`/order-success/${data.order._id}`)
//             }
//         } catch (error) {
//             // Professional Debugging: Terminal mein check karein exact field name
//             console.error("Order Failed Details:", error.response?.data);
//             toast.error(error.response?.data?.message || "Order failed: Check required fields");
//         } finally {
//             setLoading(false)
//         }
//     }

//     return (
//         <div className="min-h-screen bg-gray-50 py-10">
//             <div className="max-w-6xl mx-auto px-4">
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

//                     {/* LEFT: Address & Payment */}
//                     <div className="lg:col-span-2 space-y-6">

//                         {/* 1. Address Section */}
//                         <div className="bg-white p-6 rounded-lg shadow-sm">
//                             <div className="flex justify-between items-center mb-6">
//                                 <h2 className="text-lg font-bold flex items-center gap-2">
//                                     <MapPin size={20} className="text-pink-500" />
//                                     Select Delivery Address
//                                 </h2>
//                                 <button
//                                     onClick={() => setShowAddressForm(!showAddressForm)}
//                                     className="text-pink-500 font-bold text-sm border border-pink-500 px-3 py-1 rounded"
//                                 >
//                                     {showAddressForm ? "Cancel" : "+ Add New"}
//                                 </button>
//                             </div>

//                             <AnimatePresence>
//                                 {showAddressForm && (
//                                     <motion.div
//                                         initial={{ opacity: 0, y: -20 }}
//                                         animate={{ opacity: 1, y: 0 }}
//                                         exit={{ opacity: 0, y: -20 }}
//                                         className="mb-6 p-4 border-2 border-dashed rounded-lg bg-gray-50"
//                                     >
//                                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                             <input type="text" placeholder="Contact Name" className="border p-2 rounded"
//                                                 onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })} />
//                                             <input type="text" placeholder="Phone Number" className="border p-2 rounded"
//                                                 onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })} />
//                                             <input type="text" placeholder="Address (House No, Building, Street)" className="border p-2 rounded md:col-span-2"
//                                                 onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })} />
//                                             <input type="text" placeholder="City" className="border p-2 rounded"
//                                                 onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })} />
//                                             <input type="text" placeholder="Pincode" className="border p-2 rounded"
//                                                 onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })} />
//                                         </div>
//                                         <button
//                                             onClick={() => { setSelectedAddress(newAddress); setShowAddressForm(false); }}
//                                             className="mt-4 bg-gray-800 text-white px-6 py-2 rounded font-bold text-sm"
//                                         >
//                                             USE THIS ADDRESS
//                                         </button>
//                                     </motion.div>
//                                 )}
//                             </AnimatePresence>

//                             {selectedAddress && (
//                                 <div className="p-4 border-2 border-pink-500 bg-pink-50 rounded-lg relative">
//                                     <span className="absolute top-2 right-2 bg-pink-500 text-white text-[10px] px-2 py-0.5 rounded">SELECTED</span>
//                                     <h3 className="font-bold">{selectedAddress.name}</h3>
//                                     <p className="text-sm text-gray-600 mt-1">
//                                         {selectedAddress.address}, {selectedAddress.city}, {selectedAddress.state} - {selectedAddress.pincode}
//                                     </p>
//                                     <p className="text-sm font-bold mt-2">Mobile: {selectedAddress.phone}</p>
//                                 </div>
//                             )}
//                         </div>

//                         {/* 2. Payment Section */}
//                         <div className="bg-white p-6 rounded-lg shadow-sm">
//                             <h2 className="text-lg font-bold flex items-center gap-2 mb-6">
//                                 <CreditCard size={20} className="text-pink-500" /> Payment Options
//                             </h2>
//                             <div className="space-y-3">
//                                 <label className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === 'COD' ? 'border-pink-500 bg-pink-50' : ''}`}>
//                                     <div className="flex items-center gap-3">
//                                         <input type="radio" name="pay" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} />
//                                         <span className="font-bold text-sm">Cash On Delivery (Cash/UPI)</span>
//                                     </div>
//                                     <span className="text-gray-400 text-xs">Pay at your doorstep</span>
//                                 </label>

//                                 <label className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all opacity-50 cursor-not-allowed`}>
//                                     <div className="flex items-center gap-3">
//                                         <input type="radio" disabled name="pay" />
//                                         <span className="font-bold text-sm">Online Payment (Razorpay)</span>
//                                     </div>
//                                     <span className="text-pink-500 text-[10px] font-bold">COMING SOON</span>
//                                 </label>
//                             </div>
//                         </div>
//                     </div>

//                     {/* RIGHT: Price Details */}
//                     <div className="space-y-4">
//                         <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
//                             <h2 className="text-xs font-bold text-gray-500 uppercase mb-4">Price Summary</h2>
//                             <div className="space-y-3 text-sm border-b pb-4">
//                                 <div className="flex justify-between">
//                                     <span>Bag Total</span>
//                                     <span>₹{subtotal}</span>
//                                 </div>
//                                 <div className="flex justify-between">
//                                     <span>Delivery Fee</span>
//                                     <span className="text-green-600 font-bold">{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
//                                 </div>
//                             </div>
//                             <div className="flex justify-between font-bold text-lg py-4">
//                                 <span>Total Amount</span>
//                                 <span>₹{total}</span>
//                             </div>
//                             <button
//                                 onClick={handlePlaceOrder}
//                                 disabled={loading}
//                                 className="w-full bg-pink-500 text-white py-4 rounded font-bold shadow-lg shadow-pink-200 hover:bg-pink-600 transition-all flex items-center justify-center gap-2"
//                             >
//                                 {loading ? "PROCESSING..." : "PLACE ORDER"} <ChevronRight size={18} />
//                             </button>
//                         </div>
//                     </div>

//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Checkout


// import { useState, useEffect } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { useDispatch, useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"
// import { MapPin, CreditCard, ChevronRight, Loader2 } from "lucide-react"
// import api from "../utils/api"
// import toast from "react-hot-toast"
// import { clearCartLocally } from "../redux/slices/cartSlice"

// const Checkout = () => {
//     const dispatch = useDispatch()
//     const navigate = useNavigate()

//     const { cartItems } = useSelector((state) => state.cart)
//     const { user } = useSelector((state) => state.auth)

//     const [selectedAddress, setSelectedAddress] = useState(null)
//     const [paymentMethod, setPaymentMethod] = useState("COD")
//     const [loading, setLoading] = useState(false)
//     const [showAddressForm, setShowAddressForm] = useState(false)

//     // Form State - Matches Order Model Fields
//     const [newAddress, setNewAddress] = useState({
//         name: user?.name || "",
//         address: "",
//         city: "Lucknow",
//         state: "Uttar Pradesh",
//         pincode: "",
//         phone: user?.phone || "",
//     })

//     useEffect(() => {
//         if (!cartItems || cartItems.length === 0) {
//             navigate("/cart")
//         }
//         // Auto-select if user has an address (adjust based on your user model)
//         if (user?.address?.address) {
//             setSelectedAddress(user.address)
//         }
//     }, [cartItems, navigate, user])

//     const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)
//     const shipping = subtotal > 1000 ? 0 : 99
//     const total = subtotal + shipping

//     const handlePlaceOrder = async () => {
//         if (!selectedAddress || !selectedAddress.address || !selectedAddress.pincode) {
//             return toast.error("Please provide a complete delivery address")
//         }

//         try {
//             setLoading(true)

//             const orderData = {
//                 orderItems: cartItems.map(item => ({
//                     product: item.product._id || item.product,
//                     name: item.name,
//                     qty: Number(item.qty),
//                     price: Number(item.price),
//                     image: item.image,
//                     size: item.size
//                 })),
//                 shippingAddress: {
//                     name: selectedAddress.name || user?.name || "Customer",
//                     address: selectedAddress.address,
//                     city: selectedAddress.city,
//                     state: selectedAddress.state || "Uttar Pradesh",
//                     pincode: selectedAddress.pincode
//                 },
//                 paymentMethod: paymentMethod,
//                 itemsPrice: subtotal,
//                 taxPrice: 0,
//                 shippingPrice: shipping,
//                 totalPrice: total
//             }

//             // 1. Order Place karein
//             const { data } = await api.post("/orders", orderData)
//             console.log("Full Server Response:", data); // Check karein ID kahan hai

//             if (data) {
//                 // ✅ Trick: ID ko pehle hi nikaal lein
//                 const orderId = data._id || data.order?._id || data.order;

//                 toast.success("Order Placed Successfully!")

//                 // 2. Cart Clear (Safe call)
//                 try {
//                     await api.delete("/cart")
//                     dispatch(clearCartLocally())
//                 } catch (cartErr) {
//                     console.error("Cart clear failed but order was placed", cartErr)
//                     // Cart clear fail bhi ho toh bhi user ko redirect hona chahiye
//                 }

//                 // 3. Final Redirection Logic
//                 if (orderId) {
//                     // setTimeout use karne se Redux state update hone ka time mil jata hai
//                     setTimeout(() => {
//                         navigate(`/order-success/${orderId}`);
//                     }, 100);
//                 } else {
//                     console.warn("No Order ID found, redirecting to My Orders");
//                     navigate("/orders/mine");
//                 }
//             }
//         } catch (error) {
//             const errorMsg = error.response?.data?.message || "Order failed"
//             console.error("Order Error Trace:", error.response?.data)
//             toast.error(errorMsg)
//         } finally {
//             setLoading(false)
//         }
//     }

//     return (
//         <div className="min-h-screen bg-gray-50 py-10">
//             <div className="max-w-6xl mx-auto px-4">
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

//                     {/* LEFT: Address & Payment */}
//                     <div className="lg:col-span-2 space-y-6">
//                         <div className="bg-white p-6 rounded-lg shadow-sm">
//                             <div className="flex justify-between items-center mb-6">
//                                 <h2 className="text-lg font-bold flex items-center gap-2">
//                                     <MapPin size={20} className="text-pink-500" />
//                                     Delivery Address
//                                 </h2>
//                                 <button
//                                     onClick={() => setShowAddressForm(!showAddressForm)}
//                                     className="text-pink-500 font-bold text-sm border border-pink-500 px-3 py-1 rounded"
//                                 >
//                                     {showAddressForm ? "Cancel" : "+ Add New"}
//                                 </button>
//                             </div>

//                             <AnimatePresence>
//                                 {showAddressForm && (
//                                     <motion.div
//                                         initial={{ opacity: 0, height: 0 }}
//                                         animate={{ opacity: 1, height: "auto" }}
//                                         exit={{ opacity: 0, height: 0 }}
//                                         className="mb-6 p-4 border-2 border-dashed rounded-lg bg-gray-50 overflow-hidden"
//                                     >
//                                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                             <input type="text" placeholder="Contact Name" className="border p-2 rounded focus:ring-1 focus:ring-pink-500 outline-none"
//                                                 value={newAddress.name}
//                                                 onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })} />
//                                             <input type="text" placeholder="Phone Number" className="border p-2 rounded focus:ring-1 focus:ring-pink-500 outline-none"
//                                                 value={newAddress.phone}
//                                                 onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })} />
//                                             <input type="text" placeholder="Flat, House no, Building, Street" className="border p-2 rounded md:col-span-2 focus:ring-1 focus:ring-pink-500 outline-none"
//                                                 value={newAddress.address}
//                                                 onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })} />
//                                             <input type="text" placeholder="City" className="border p-2 rounded focus:ring-1 focus:ring-pink-500 outline-none"
//                                                 value={newAddress.city}
//                                                 onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })} />
//                                             <input type="text" placeholder="State" className="border p-2 rounded focus:ring-1 focus:ring-pink-500 outline-none"
//                                                 value={newAddress.state}
//                                                 onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })} />
//                                             <input type="text" placeholder="Pincode" className="border p-2 rounded focus:ring-1 focus:ring-pink-500 outline-none"
//                                                 value={newAddress.pincode}
//                                                 onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })} />
//                                         </div>
//                                         <button
//                                             onClick={() => { setSelectedAddress(newAddress); setShowAddressForm(false); }}
//                                             className="mt-4 bg-gray-800 text-white px-6 py-2 rounded font-bold text-sm hover:bg-black transition-colors"
//                                         >
//                                             USE THIS ADDRESS
//                                         </button>
//                                     </motion.div>
//                                 )}
//                             </AnimatePresence>

//                             {selectedAddress && (
//                                 <div className="p-4 border-2 border-pink-500 bg-pink-50 rounded-lg relative">
//                                     <span className="absolute top-2 right-2 bg-pink-500 text-white text-[10px] px-2 py-0.5 rounded">SELECTED</span>
//                                     <h3 className="font-bold">{selectedAddress.name}</h3>
//                                     <p className="text-sm text-gray-600 mt-1">
//                                         {selectedAddress.address}, {selectedAddress.city}, {selectedAddress.state} - {selectedAddress.pincode}
//                                     </p>
//                                     <p className="text-sm font-bold mt-2">Mobile: {selectedAddress.phone}</p>
//                                 </div>
//                             )}
//                         </div>

//                         {/* Payment Section */}
//                         <div className="bg-white p-6 rounded-lg shadow-sm">
//                             <h2 className="text-lg font-bold flex items-center gap-2 mb-6">
//                                 <CreditCard size={20} className="text-pink-500" /> Payment Options
//                             </h2>
//                             <div className="space-y-3">
//                                 <label className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === 'COD' ? 'border-pink-500 bg-pink-50' : ''}`}>
//                                     <div className="flex items-center gap-3">
//                                         <input type="radio" name="pay" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} className="accent-pink-500" />
//                                         <span className="font-bold text-sm">Cash On Delivery (Cash/UPI)</span>
//                                     </div>
//                                     <span className="text-gray-400 text-xs">Pay at your doorstep</span>
//                                 </label>
//                             </div>
//                         </div>
//                     </div>

//                     {/* RIGHT: Price Details */}
//                     <div className="space-y-4">
//                         <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
//                             <h2 className="text-xs font-bold text-gray-500 uppercase mb-4">Price Summary ({cartItems.length} Items)</h2>
//                             <div className="space-y-3 text-sm border-b pb-4">
//                                 <div className="flex justify-between">
//                                     <span>Bag Total</span>
//                                     <span>₹{subtotal}</span>
//                                 </div>
//                                 <div className="flex justify-between">
//                                     <span>Delivery Fee</span>
//                                     <span className={shipping === 0 ? "text-green-600 font-bold" : ""}>
//                                         {shipping === 0 ? "FREE" : `₹${shipping}`}
//                                     </span>
//                                 </div>
//                             </div>
//                             <div className="flex justify-between font-bold text-lg py-4">
//                                 <span>Total Amount</span>
//                                 <span>₹{total}</span>
//                             </div>
//                             <button
//                                 onClick={handlePlaceOrder}
//                                 disabled={loading}
//                                 className="w-full bg-pink-500 text-white py-4 rounded font-bold shadow-lg shadow-pink-200 hover:bg-pink-600 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
//                             >
//                                 {loading ? (
//                                     <> <Loader2 className="animate-spin" size={20} /> PROCESSING... </>
//                                 ) : (
//                                     <> PLACE ORDER <ChevronRight size={18} /> </>
//                                 )}
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Checkout


import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { MapPin, CreditCard, ChevronRight, Loader2, Plus, CheckCircle2 } from "lucide-react"
import api from "../utils/api"
import toast from "react-hot-toast"
import { clearCartLocally } from "../redux/slices/cartSlice"

const Checkout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { cartItems } = useSelector((state) => state.cart)
    const { user } = useSelector((state) => state.auth)

    const [selectedAddress, setSelectedAddress] = useState(null)
    const [paymentMethod, setPaymentMethod] = useState("COD")
    const [loading, setLoading] = useState(false)
    const [showAddressForm, setShowAddressForm] = useState(false)

    // Form State for "Add New"
    const [newAddress, setNewAddress] = useState({
        name: user?.name || "",
        address: "",
        city: "Lucknow",
        state: "Uttar Pradesh",
        pincode: "",
        phone: user?.phone || "",
    })

    useEffect(() => {
        if (!cartItems || cartItems.length === 0) {
            navigate("/cart")
        }

        // ✅ Auto-select default address if available
        if (user?.addresses?.length > 0) {
            const defaultAddr = user.addresses.find(addr => addr.isDefault) || user.addresses[0]
            setSelectedAddress(defaultAddr)
        }
    }, [cartItems, navigate, user])

    const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)
    const shipping = subtotal > 1000 ? 0 : 99
    const total = subtotal + shipping

    const handlePlaceOrder = async () => {
        if (!selectedAddress) {
            return toast.error("Please select a delivery address");
        }

        try {
            setLoading(true);

            const orderData = {
                orderItems: cartItems.map(item => ({
                    product: item.product?._id || item.product || item._id,
                    name: item.name,
                    qty: Number(item.qty),
                    price: Number(item.price),
                    image: item.image,
                    size: item.size
                })),
                shippingAddress: {
                    name: selectedAddress.name,
                    address: selectedAddress.address,
                    city: selectedAddress.city,
                    state: selectedAddress.state,
                    pincode: selectedAddress.pincode,
                    phone: selectedAddress.phone
                },
                paymentMethod: paymentMethod,
                itemsPrice: Number(subtotal),
                shippingPrice: Number(shipping),
                taxPrice: 0,
                totalPrice: Number(total)
            };

            // 1. Order Place Karein
            const { data } = await api.post("/orders", orderData);

            if (data) {
                const orderId = data._id || data.order?._id;
                toast.success("Order Placed Successfully!");

                // 2. Cart Clear Karein (Pehle Local Redux phir API)
                // Note: Agar API delete fail bhi ho, tab bhi user ka cart local se khali hona chahiye
                try {
                    dispatch(clearCartLocally()); // Redux clear
                    await api.delete("/cart");    // Database clear
                } catch (cartErr) {
                    console.error("Backend Cart Clear Failed:", cartErr);
                }

                // 3. Success Page par Redirect
                if (orderId) {
                    navigate(`/order-success/${orderId}`);
                } else {
                    navigate("/orders/mine"); // Fallback agar ID na mile
                }
            }
        } catch (error) {
            console.error("Order Error:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT: Address & Payment */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Saved Addresses Section */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg font-bold flex items-center gap-2 uppercase tracking-tight">
                                    <MapPin size={20} className="text-pink-500" /> Select Delivery Address
                                </h2>
                                <button
                                    onClick={() => setShowAddressForm(!showAddressForm)}
                                    className="text-pink-500 font-bold text-xs border border-pink-500 px-4 py-2 rounded hover:bg-pink-50 transition-all flex items-center gap-1"
                                >
                                    {showAddressForm ? "CANCEL" : <><Plus size={14} /> ADD NEW</>}
                                </button>
                            </div>

                            {/* Address List */}
                            {!showAddressForm && (
                                <div className="grid grid-cols-1 gap-4">
                                    {user?.addresses?.map((addr) => (
                                        <div
                                            key={addr._id}
                                            onClick={() => setSelectedAddress(addr)}
                                            className={`p-4 border-2 rounded-lg cursor-pointer transition-all relative ${selectedAddress?._id === addr._id ? 'border-pink-500 bg-pink-50/50' : 'border-gray-100 hover:border-gray-200'}`}
                                        >
                                            {selectedAddress?._id === addr._id && (
                                                <CheckCircle2 size={20} className="absolute top-4 right-4 text-pink-500" />
                                            )}
                                            <h3 className="font-bold text-gray-800 uppercase text-sm">{addr.name}</h3>
                                            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                                                {addr.address}, <br />
                                                {addr.city}, {addr.state} - <span className="font-bold">{addr.pincode}</span>
                                            </p>
                                            <p className="text-sm font-bold text-gray-700 mt-3">Mobile: {addr.phone}</p>
                                        </div>
                                    ))}
                                    {(!user?.addresses || user.addresses.length === 0) && !showAddressForm && (
                                        <p className="text-center py-4 text-gray-500 italic">No saved addresses found. Please add one.</p>
                                    )}
                                </div>
                            )}

                            {/* Add New Address Form Inline */}
                            <AnimatePresence>
                                {showAddressForm && (
                                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-6 border rounded-lg bg-gray-50">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <input type="text" placeholder="Name" className="p-3 border rounded outline-none focus:border-pink-500 text-sm" onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })} />
                                            <input type="text" placeholder="Phone" className="p-3 border rounded outline-none focus:border-pink-500 text-sm" onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })} />
                                            <input type="text" placeholder="Address" className="p-3 border rounded md:col-span-2 outline-none focus:border-pink-500 text-sm" onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })} />
                                            <input type="text" placeholder="City" className="p-3 border rounded outline-none focus:border-pink-500 text-sm" value={newAddress.city} onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })} />
                                            <input type="text" placeholder="Pincode" className="p-3 border rounded outline-none focus:border-pink-500 text-sm" onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })} />
                                        </div>
                                        <div className="mt-6 flex gap-3">
                                            <button
                                                onClick={() => { setSelectedAddress(newAddress); setShowAddressForm(false); }}
                                                className="bg-gray-900 text-white px-6 py-2 rounded font-bold text-xs"
                                            >
                                                USE THIS ADDRESS
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Payment Options */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <h2 className="text-lg font-bold flex items-center gap-2 mb-6 uppercase tracking-tight">
                                <CreditCard size={20} className="text-pink-500" /> Payment Method
                            </h2>
                            <label className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${paymentMethod === 'COD' ? 'border-pink-500 bg-pink-50/50' : 'border-gray-100'}`}>
                                <div className="flex items-center gap-3">
                                    <input type="radio" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} className="accent-pink-500 w-4 h-4" />
                                    <span className="font-bold text-sm">Cash On Delivery (COD)</span>
                                </div>
                                <span className="text-xs text-gray-500">Pay at your doorstep</span>
                            </label>
                        </div>
                    </div>

                    {/* RIGHT: Price Details */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 sticky top-24">
                            <h2 className="text-xs font-bold text-gray-500 uppercase mb-6">Order Summary</h2>
                            <div className="space-y-4 border-b pb-6">
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Bag Total</span>
                                    <span>₹{subtotal}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Delivery Fee</span>
                                    <span className={shipping === 0 ? "text-green-600 font-bold" : ""}>
                                        {shipping === 0 ? "FREE" : `₹${shipping}`}
                                    </span>
                                </div>
                            </div>
                            <div className="flex justify-between font-bold text-lg py-6">
                                <span>Total Amount</span>
                                <span>₹{total}</span>
                            </div>
                            <button
                                onClick={handlePlaceOrder}
                                disabled={loading}
                                className="w-full bg-pink-500 text-white py-4 rounded font-bold shadow-lg shadow-pink-100 hover:bg-pink-600 transition-all flex items-center justify-center gap-2 disabled:bg-gray-300"
                            >
                                {loading ? <><Loader2 className="animate-spin" /> PROCESSING...</> : <>PLACE ORDER <ChevronRight size={18} /></>}
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Checkout