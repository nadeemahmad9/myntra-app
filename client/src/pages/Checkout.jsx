// import { useState } from "react"
// import { motion } from "framer-motion"
// import { MapPin, CreditCard, Truck } from "lucide-react"
// import { useCart } from "../context/CartContext"
// import { useAuth } from "../context/AuthContext"
// import { useNavigate } from "react-router-dom"

// const Checkout = () => {
//     const { cart, getCartTotal, clearCart } = useCart()
//     const { user } = useAuth()
//     const navigate = useNavigate()
//     const [currentStep, setCurrentStep] = useState(1)
//     const [orderPlaced, setOrderPlaced] = useState(false)

//     const [shippingAddress, setShippingAddress] = useState({
//         name: user?.name || "",
//         phone: "",
//         address: "",
//         city: "",
//         state: "",
//         pincode: "",
//     })

//     const [paymentMethod, setPaymentMethod] = useState("cod")

//     const handleAddressChange = (e) => {
//         setShippingAddress({
//             ...shippingAddress,
//             [e.target.name]: e.target.value,
//         })
//     }

//     const handlePlaceOrder = () => {
//         // Mock order placement
//         setOrderPlaced(true)
//         clearCart()
//         setTimeout(() => {
//             navigate("/")
//         }, 3000)
//     }

//     if (orderPlaced) {
//         return (
//             <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//                 <motion.div
//                     className="text-center bg-white p-8 rounded-lg shadow-md"
//                     initial={{ opacity: 0, scale: 0.8 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                 >
//                     <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                         <span className="text-2xl">✓</span>
//                     </div>
//                     <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h2>
//                     <p className="text-gray-600 mb-4">
//                         Thank you for your purchase. You will receive a confirmation email shortly.
//                     </p>
//                     <p className="text-sm text-gray-500">Redirecting to home page...</p>
//                 </motion.div>
//             </div>
//         )
//     }

//     return (
//         <div className="min-h-screen bg-gray-50">
//             <div className="container mx-auto px-4 py-8">
//                 <h1 className="text-2xl font-bold mb-8">Checkout</h1>

//                 {/* Progress Steps */}
//                 <div className="flex items-center justify-center mb-8">
//                     <div className="flex items-center space-x-4">
//                         <div className={`flex items-center ${currentStep >= 1 ? "text-pink-500" : "text-gray-400"}`}>
//                             <div
//                                 className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? "bg-pink-500 text-white" : "bg-gray-200"}`}
//                             >
//                                 1
//                             </div>
//                             <span className="ml-2">Address</span>
//                         </div>
//                         <div className="w-12 h-0.5 bg-gray-300"></div>
//                         <div className={`flex items-center ${currentStep >= 2 ? "text-pink-500" : "text-gray-400"}`}>
//                             <div
//                                 className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? "bg-pink-500 text-white" : "bg-gray-200"}`}
//                             >
//                                 2
//                             </div>
//                             <span className="ml-2">Payment</span>
//                         </div>
//                         <div className="w-12 h-0.5 bg-gray-300"></div>
//                         <div className={`flex items-center ${currentStep >= 3 ? "text-pink-500" : "text-gray-400"}`}>
//                             <div
//                                 className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? "bg-pink-500 text-white" : "bg-gray-200"}`}
//                             >
//                                 3
//                             </div>
//                             <span className="ml-2">Review</span>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                     {/* Main Content */}
//                     <div className="lg:col-span-2">
//                         {/* Step 1: Address */}
//                         {currentStep === 1 && (
//                             <motion.div
//                                 className="bg-white rounded-lg p-6 shadow-sm"
//                                 initial={{ opacity: 0, x: -20 }}
//                                 animate={{ opacity: 1, x: 0 }}
//                             >
//                                 <div className="flex items-center mb-4">
//                                     <MapPin className="w-5 h-5 text-pink-500 mr-2" />
//                                     <h2 className="text-xl font-bold">Shipping Address</h2>
//                                 </div>

//                                 <form className="space-y-4">
//                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                         <div>
//                                             <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
//                                             <input
//                                                 type="text"
//                                                 name="name"
//                                                 value={shippingAddress.name}
//                                                 onChange={handleAddressChange}
//                                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
//                                                 required
//                                             />
//                                         </div>
//                                         <div>
//                                             <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
//                                             <input
//                                                 type="tel"
//                                                 name="phone"
//                                                 value={shippingAddress.phone}
//                                                 onChange={handleAddressChange}
//                                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
//                                                 required
//                                             />
//                                         </div>
//                                     </div>

//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
//                                         <textarea
//                                             name="address"
//                                             value={shippingAddress.address}
//                                             onChange={handleAddressChange}
//                                             rows={3}
//                                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
//                                             required
//                                         />
//                                     </div>

//                                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                                         <div>
//                                             <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
//                                             <input
//                                                 type="text"
//                                                 name="city"
//                                                 value={shippingAddress.city}
//                                                 onChange={handleAddressChange}
//                                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
//                                                 required
//                                             />
//                                         </div>
//                                         <div>
//                                             <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
//                                             <input
//                                                 type="text"
//                                                 name="state"
//                                                 value={shippingAddress.state}
//                                                 onChange={handleAddressChange}
//                                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
//                                                 required
//                                             />
//                                         </div>
//                                         <div>
//                                             <label className="block text-sm font-medium text-gray-700 mb-2">Pincode</label>
//                                             <input
//                                                 type="text"
//                                                 name="pincode"
//                                                 value={shippingAddress.pincode}
//                                                 onChange={handleAddressChange}
//                                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
//                                                 required
//                                             />
//                                         </div>
//                                     </div>
//                                 </form>

//                                 <button
//                                     onClick={() => setCurrentStep(2)}
//                                     className="mt-6 bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors"
//                                 >
//                                     Continue to Payment
//                                 </button>
//                             </motion.div>
//                         )}

//                         {/* Step 2: Payment */}
//                         {currentStep === 2 && (
//                             <motion.div
//                                 className="bg-white rounded-lg p-6 shadow-sm"
//                                 initial={{ opacity: 0, x: -20 }}
//                                 animate={{ opacity: 1, x: 0 }}
//                             >
//                                 <div className="flex items-center mb-4">
//                                     <CreditCard className="w-5 h-5 text-pink-500 mr-2" />
//                                     <h2 className="text-xl font-bold">Payment Method</h2>
//                                 </div>

//                                 <div className="space-y-4">
//                                     <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
//                                         <input
//                                             type="radio"
//                                             name="payment"
//                                             value="cod"
//                                             checked={paymentMethod === "cod"}
//                                             onChange={(e) => setPaymentMethod(e.target.value)}
//                                             className="mr-3"
//                                         />
//                                         <div>
//                                             <div className="font-medium">Cash on Delivery</div>
//                                             <div className="text-sm text-gray-600">Pay when you receive your order</div>
//                                         </div>
//                                     </label>

//                                     <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
//                                         <input
//                                             type="radio"
//                                             name="payment"
//                                             value="card"
//                                             checked={paymentMethod === "card"}
//                                             onChange={(e) => setPaymentMethod(e.target.value)}
//                                             className="mr-3"
//                                         />
//                                         <div>
//                                             <div className="font-medium">Credit/Debit Card</div>
//                                             <div className="text-sm text-gray-600">Pay securely with your card</div>
//                                         </div>
//                                     </label>

//                                     <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
//                                         <input
//                                             type="radio"
//                                             name="payment"
//                                             value="upi"
//                                             checked={paymentMethod === "upi"}
//                                             onChange={(e) => setPaymentMethod(e.target.value)}
//                                             className="mr-3"
//                                         />
//                                         <div>
//                                             <div className="font-medium">UPI</div>
//                                             <div className="text-sm text-gray-600">Pay using UPI apps</div>
//                                         </div>
//                                     </label>
//                                 </div>

//                                 <div className="flex space-x-4 mt-6">
//                                     <button
//                                         onClick={() => setCurrentStep(1)}
//                                         className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//                                     >
//                                         Back
//                                     </button>
//                                     <button
//                                         onClick={() => setCurrentStep(3)}
//                                         className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors"
//                                     >
//                                         Review Order
//                                     </button>
//                                 </div>
//                             </motion.div>
//                         )}

//                         {/* Step 3: Review */}
//                         {currentStep === 3 && (
//                             <motion.div
//                                 className="bg-white rounded-lg p-6 shadow-sm"
//                                 initial={{ opacity: 0, x: -20 }}
//                                 animate={{ opacity: 1, x: 0 }}
//                             >
//                                 <div className="flex items-center mb-4">
//                                     <Truck className="w-5 h-5 text-pink-500 mr-2" />
//                                     <h2 className="text-xl font-bold">Review Your Order</h2>
//                                 </div>

//                                 {/* Address Summary */}
//                                 <div className="mb-6 p-4 bg-gray-50 rounded-lg">
//                                     <h3 className="font-medium mb-2">Shipping Address</h3>
//                                     <p className="text-sm text-gray-600">
//                                         {shippingAddress.name}
//                                         <br />
//                                         {shippingAddress.address}
//                                         <br />
//                                         {shippingAddress.city}, {shippingAddress.state} - {shippingAddress.pincode}
//                                         <br />
//                                         Phone: {shippingAddress.phone}
//                                     </p>
//                                 </div>

//                                 {/* Payment Summary */}
//                                 <div className="mb-6 p-4 bg-gray-50 rounded-lg">
//                                     <h3 className="font-medium mb-2">Payment Method</h3>
//                                     <p className="text-sm text-gray-600">
//                                         {paymentMethod === "cod" && "Cash on Delivery"}
//                                         {paymentMethod === "card" && "Credit/Debit Card"}
//                                         {paymentMethod === "upi" && "UPI"}
//                                     </p>
//                                 </div>

//                                 <div className="flex space-x-4">
//                                     <button
//                                         onClick={() => setCurrentStep(2)}
//                                         className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//                                     >
//                                         Back
//                                     </button>
//                                     <button
//                                         onClick={handlePlaceOrder}
//                                         className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors"
//                                     >
//                                         Place Order
//                                     </button>
//                                 </div>
//                             </motion.div>
//                         )}
//                     </div>

//                     {/* Order Summary */}
//                     <div className="lg:col-span-1">
//                         <div className="bg-white rounded-lg p-6 shadow-sm sticky top-4">
//                             <h2 className="text-xl font-bold mb-4">Order Summary</h2>

//                             <div className="space-y-4 mb-4">
//                                 {cart.items.map((item) => (
//                                     <div key={`${item.id}-${item.size}`} className="flex space-x-3">
//                                         <img
//                                             src={item.image || "/placeholder.svg"}
//                                             alt={item.name}
//                                             className="w-16 h-16 object-cover rounded-lg"
//                                         />
//                                         <div className="flex-1">
//                                             <h3 className="font-medium text-sm">{item.brand}</h3>
//                                             <p className="text-xs text-gray-600">{item.name}</p>
//                                             <p className="text-xs text-gray-500">
//                                                 Size: {item.size} | Qty: {item.quantity}
//                                             </p>
//                                             <p className="font-bold text-sm">₹{item.price * item.quantity}</p>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>

//                             <div className="space-y-2 border-t pt-4">
//                                 <div className="flex justify-between">
//                                     <span>Subtotal</span>
//                                     <span>₹{getCartTotal()}</span>
//                                 </div>
//                                 <div className="flex justify-between">
//                                     <span>Shipping</span>
//                                     <span className="text-green-600">FREE</span>
//                                 </div>
//                                 <div className="flex justify-between font-bold text-lg border-t pt-2">
//                                     <span>Total</span>
//                                     <span>₹{getCartTotal()}</span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Checkout


import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useApp } from "../context/AppContext"
import { useNavigate } from "react-router-dom"
import { orderService } from "../services/orderService"
import toast from "react-hot-toast"

const Checkout = () => {
    const { cart, user, isAuthenticated, clearCart } = useApp()
    const navigate = useNavigate()

    const [addresses, setAddresses] = useState([])
    const [selectedAddress, setSelectedAddress] = useState(null)
    const [paymentMethod, setPaymentMethod] = useState("cod")
    const [loading, setLoading] = useState(false)
    const [newAddress, setNewAddress] = useState({
        name: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        phone: "",
    })
    const [showAddressForm, setShowAddressForm] = useState(false)

    // const cart = cart?.cartItems?.length || 0;

    // useEffect(() => {
    //     if (!isAuthenticated) {
    //         navigate("/login?redirect=checkout")
    //         return
    //     }

    //     // if (cart.cartItems.length === 0) {
    //     //     navigate("/cart")
    //     //     return
    //     // }

    //     if ((cart?.cartItems?.length || 0) === 0) {
    //         navigate("/cart")
    //         return
    //     }


    //     // Load user addresses
    //     if (user?.addresses) {
    //         setAddresses(user.addresses)
    //         const defaultAddress = user.addresses.find((addr) => addr.isDefault)
    //         if (defaultAddress) {
    //             setSelectedAddress(defaultAddress)
    //         }
    //     }

    // }, [isAuthenticated, cartLength, user, navigate])

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login?redirect=checkout")
            return
        }

        // Wait until cart is loaded before checking items
        if (!cart || !Array.isArray(cart.cartItems)) return

        if (cart.cartItems.length === 0) {
            navigate("/cart")
            return
        }

        // Load addresses
        if (user?.addresses) {
            setAddresses(user.addresses)
            const defaultAddress = user.addresses.find((addr) => addr.isDefault)
            if (defaultAddress) {
                setSelectedAddress(defaultAddress)
            }
        }
    }, [isAuthenticated, cart, user, navigate])


    const handleAddressSubmit = async (e) => {
        e.preventDefault()
        try {
            // In a real app, you would call the API to add address
            const addressWithId = { ...newAddress, _id: Date.now().toString() }
            setAddresses([...addresses, addressWithId])
            setSelectedAddress(addressWithId)
            setShowAddressForm(false)
            setNewAddress({
                name: "",
                address: "",
                city: "",
                state: "",
                pincode: "",
                phone: "",
            })
            toast.success("Address added successfully!")
        } catch (error) {
            toast.error("Failed to add address")
        }
    }

    const handlePlaceOrder = async () => {
        if (!selectedAddress) {
            toast.error("Please select a delivery address")
            return
        }

        try {
            setLoading(true)

            const orderData = {
                orderItems: cart.cartItems.map((item) => ({
                    product: item.product._id || item.product,
                    name: item.name,
                    qty: item.qty,
                    price: item.price,
                    image: item.image,
                    size: item.size,
                })),
                shippingAddress: selectedAddress,
                paymentMethod,
                itemsPrice: cart.cartItems.reduce((acc, item) => acc + item.qty * item.price, 0),
                shippingPrice: 0,
                taxPrice: 0,
                totalPrice: cart.cartItems.reduce((acc, item) => acc + item.qty * item.price, 0),
            }

            const order = await orderService.createOrder(orderData)

            // Clear cart after successful order
            await clearCart()

            toast.success("Order placed successfully!")
            navigate(`/order/${order._id}`)
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to place order")
        } finally {
            setLoading(false)
        }
    }

    // const subtotal = cart.cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)
    // const shipping = 0
    // const tax = 0
    // const total = subtotal + shipping + tax

    const subtotal = (cart.cartItems || []).reduce((acc, item) => acc + item.qty * item.price, 0)
    const shipping = 0
    const tax = 0
    const total = subtotal + shipping + tax
    // console.log(subtotal);



    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-8">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Address & Payment */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Delivery Address */}
                        <div className="bg-white rounded-lg p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold">Delivery Address</h2>
                                <button
                                    onClick={() => setShowAddressForm(!showAddressForm)}
                                    className="text-pink-500 hover:text-pink-600 font-medium"
                                >
                                    + Add New Address
                                </button>
                            </div>

                            {showAddressForm && (
                                <motion.form
                                    onSubmit={handleAddressSubmit}
                                    className="mb-6 p-4 border rounded-lg"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            placeholder="Full Name"
                                            value={newAddress.name}
                                            onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                                            required
                                        />
                                        <input
                                            type="tel"
                                            placeholder="Phone Number"
                                            value={newAddress.phone}
                                            onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="Address"
                                            value={newAddress.address}
                                            onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 md:col-span-2"
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="City"
                                            value={newAddress.city}
                                            onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="State"
                                            value={newAddress.state}
                                            onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="Pincode"
                                            value={newAddress.pincode}
                                            onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                                            required
                                        />
                                    </div>
                                    <div className="flex space-x-3 mt-4">
                                        <button type="submit" className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600">
                                            Save Address
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setShowAddressForm(false)}
                                            className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </motion.form>
                            )}

                            <div className="space-y-3">
                                {addresses.map((address) => (
                                    <div
                                        key={address._id}
                                        className={`p-4 border rounded-lg cursor-pointer ${selectedAddress?._id === address._id
                                            ? "border-pink-500 bg-pink-50"
                                            : "border-gray-300 hover:border-gray-400"
                                            }`}
                                        onClick={() => setSelectedAddress(address)}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="font-medium">{address.name}</h3>
                                                <p className="text-gray-600 text-sm mt-1">
                                                    {address.address}, {address.city}, {address.state} - {address.pincode}
                                                </p>
                                                <p className="text-gray-600 text-sm">Phone: {address.phone}</p>
                                            </div>
                                            <input
                                                type="radio"
                                                checked={selectedAddress?._id === address._id}
                                                onChange={() => setSelectedAddress(address)}
                                                className="mt-1"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white rounded-lg p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                            <div className="space-y-3">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        value="cod"
                                        checked={paymentMethod === "cod"}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="mr-3"
                                    />
                                    <span>Cash on Delivery</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        value="online"
                                        checked={paymentMethod === "online"}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="mr-3"
                                    />
                                    <span>Online Payment (UPI/Card)</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg p-6 shadow-sm sticky top-4">
                            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                            <div className="space-y-3 mb-4">
                                {/* {cart.cartItems.map((item) => (
                                    <div key={`${item._id}-${item.size}`} className="flex items-center space-x-3">
                                        <img
                                            src={item.image || "/placeholder.svg"}
                                            alt={item.name}
                                            className="w-12 h-12 object-cover rounded"
                                        />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium">{item.name}</p>
                                            <p className="text-xs text-gray-500">
                                                Size: {item.size} | Qty: {item.qty}
                                            </p>
                                        </div>
                                        <span className="text-sm font-medium">₹{item.price * item.qty}</span>
                                    </div>
                                ))} */}

                                {(cart?.cartItems || []).map((item) => (
                                    <div key={`${item._id}-${item.size}`} className="flex items-center space-x-3">
                                        <img
                                            src={item.image || "/placeholder.svg"}
                                            alt={item.name}
                                            className="w-12 h-12 object-cover rounded"
                                        />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium">{item.name}</p>
                                            <p className="text-xs text-gray-500">
                                                Size: {item.size} | Qty: {item.qty}
                                            </p>
                                        </div>
                                        <span className="text-sm font-medium">₹{item.price * item.qty}</span>
                                    </div>
                                ))}

                            </div>

                            <div className="border-t pt-4 space-y-2">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span className="text-green-600">FREE</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax</span>
                                    <span>₹{tax}</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg border-t pt-2">
                                    <span>Total</span>
                                    <span>₹{total}</span>
                                </div>
                            </div>

                            <button
                                onClick={handlePlaceOrder}
                                disabled={loading || !selectedAddress}
                                className="w-full bg-pink-500 text-white py-3 rounded-lg font-medium hover:bg-pink-600 transition-colors mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "Placing Order..." : "Place Order"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout
