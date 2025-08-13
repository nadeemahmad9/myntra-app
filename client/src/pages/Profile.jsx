

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { User, MapPin, Package, Heart, Settings, LogOut } from "lucide-react"
import { useApp } from "../context/AppContext"
import { orderService } from "../services/orderService"
import { Link } from "react-router-dom"



const Profile = () => {
    const { user, logout, isAuthenticated, wishlistItems } = useApp()
    const [activeTab, setActiveTab] = useState("profile")
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!isAuthenticated) {
            return
        }

        if (activeTab === "orders") {
            fetchOrders()
        }
    }, [activeTab, isAuthenticated])






    const fetchOrders = async () => {
        try {
            const response = await orderService.getMyOrders()
            console.log("Fetched orders:", response)
            setOrders(response.data || [])  // ✅ this line is important
        } catch (error) {
            console.error("Error fetching orders", error)
        }
    }


    const tabs = [
        { id: "profile", label: "Profile", icon: User },
        { id: "orders", label: "Orders", icon: Package },
        { id: "addresses", label: "Addresses", icon: MapPin },
        { id: "wishlist", label: "Wishlist", icon: Heart },
        { id: "settings", label: "Settings", icon: Settings },
    ]

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <User className="w-24 h-24 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Please login to view your profile</h2>
                    <Link to="/login" className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors">
                        Login
                    </Link>
                </div>
            </div>
        )
    }


    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <div className="text-center mb-6">
                                {/* <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <User className="w-10 h-10 text-pink-500" />
                                </div> */}

                                {user?.profilePic ? (
                                    <img
                                        src={user.profilePic}
                                        alt={user.name}
                                        className="w-20 h-20 rounded-full object-cover mx-auto mb-3"
                                    />
                                ) : (
                                    <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <User className="w-10 h-10 text-pink-500" />
                                    </div>
                                )}

                                <h2 className="text-xl font-semibold">{user?.name}</h2>
                                <p className="text-gray-600 text-sm">{user?.email}</p>
                            </div>

                            <nav className="space-y-2">
                                {tabs.map((tab) => {
                                    const Icon = tab.icon
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === tab.id
                                                ? "bg-pink-50 text-pink-600 border-r-2 border-pink-500"
                                                : "text-gray-600 hover:bg-gray-50"
                                                }`}
                                        >
                                            <Icon className="w-5 h-5" />
                                            <span>{tab.label}</span>
                                        </button>
                                    )
                                })}
                                <button
                                    onClick={logout}
                                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-red-600 hover:bg-red-50 transition-colors"
                                >
                                    <LogOut className="w-5 h-5" />
                                    <span>Logout</span>
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            {activeTab === "profile" && (
                                <div>
                                    <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                            <input
                                                type="text"
                                                value={user?.name || ""}
                                                readOnly
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                            <input
                                                type="email"
                                                value={user?.email || ""}
                                                readOnly
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                                            <input
                                                type="tel"
                                                value={user?.phone || ""}
                                                readOnly
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Member Since</label>
                                            <input
                                                type="text"
                                                value={user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                                                readOnly
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === "orders" && (
                                <div>
                                    <h2 className="text-2xl font-bold mb-6">My Orders</h2>
                                    {loading ? (
                                        <div className="text-center py-8">
                                            <div className="spinner mx-auto mb-4"></div>
                                            <p>Loading orders...</p>
                                        </div>
                                    ) : orders.length === 0 ? (
                                        <div className="text-center py-8">
                                            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                            <p className="text-gray-600">No orders found</p>
                                            <Link to="/" className="text-pink-500 hover:underline mt-2 inline-block">
                                                Start Shopping
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {orders.map((order) => (
                                                <motion.div
                                                    key={order._id}
                                                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                >
                                                    <div className="flex items-center justify-between mb-3">
                                                        <div>
                                                            <h3 className="font-semibold">Order #{order._id.slice(-8)}</h3>
                                                            <p className="text-sm text-gray-600">
                                                                Placed on {new Date(order.createdAt).toLocaleDateString()}
                                                            </p>
                                                        </div>
                                                        <div className="text-right">
                                                            <span
                                                                className={`px-3 py-1 rounded-full text-sm font-medium ${order.isDelivered
                                                                    ? "bg-green-100 text-green-800"
                                                                    : order.isPaid
                                                                        ? "bg-blue-100 text-blue-800"
                                                                        : "bg-yellow-100 text-yellow-800"
                                                                    }`}
                                                            >
                                                                {order.isDelivered ? "Delivered" : order.isPaid ? "Paid" : "Pending"}
                                                            </span>
                                                            <p className="text-lg font-bold mt-1">₹{order.totalPrice}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center space-x-4">
                                                        <div className="flex -space-x-2">
                                                            {order.orderItems.slice(0, 3).map((item, index) => (
                                                                <img
                                                                    key={index}
                                                                    src={item.image || "/placeholder.svg"}
                                                                    alt={item.name}
                                                                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                                                                />
                                                            ))}
                                                            {order.orderItems.length > 3 && (
                                                                <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-medium">
                                                                    +{order.orderItems.length - 3}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="text-sm text-gray-600">
                                                                {order.orderItems.length} item{order.orderItems.length > 1 ? "s" : ""}
                                                            </p>
                                                        </div>
                                                        <Link
                                                            to={`/order/${order._id}`}
                                                            className="text-pink-500 hover:text-pink-600 font-medium text-sm"
                                                        >
                                                            View Details
                                                        </Link>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === "addresses" && (
                                <div>
                                    <h2 className="text-2xl font-bold mb-6">Saved Addresses</h2>
                                    {user?.addresses?.length === 0 ? (
                                        <div className="text-center py-8">
                                            <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                            <p className="text-gray-600">No addresses saved</p>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {user?.addresses?.map((address) => (
                                                <div key={address._id} className="border rounded-lg p-4">
                                                    <div className="flex items-start justify-between mb-2">
                                                        <h3 className="font-medium">{address.name}</h3>
                                                        {address.isDefault && (
                                                            <span className="bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded">Default</span>
                                                        )}
                                                    </div>
                                                    <p className="text-gray-600 text-sm mb-2">
                                                        {address.address}, {address.city}
                                                    </p>
                                                    <p className="text-gray-600 text-sm mb-2">
                                                        {address.state} - {address.pincode}
                                                    </p>
                                                    <p className="text-gray-600 text-sm">Phone: {address.phone}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* {activeTab === "wishlist" && (
                                <div>
                                    <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>
                                    <p className="text-gray-600">
                                        <Link to="/wishlist" className="text-pink-500 hover:underline">
                                            View your wishlist →
                                        </Link>
                                    </p>
                                </div>
                            )} */}


                            {activeTab === "wishlist" && (
                                <div>
                                    <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>
                                    {wishlistItems.length === 0 ? (
                                        <div className="text-center py-8">
                                            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                            <p className="text-gray-600">Your wishlist is empty.</p>
                                            <Link to="/" className="text-pink-500 hover:underline mt-2 inline-block">
                                                Browse Products
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                            {wishlistItems.map((item) => (
                                                <div key={item._id} className="border rounded-lg p-4 shadow-sm">
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="w-full h-40 object-cover rounded"
                                                    />
                                                    <h3 className="text-lg font-medium mt-2">{item.title}</h3>
                                                    <p className="text-gray-600 text-sm">{item.brand}</p>
                                                    <p className="font-bold text-pink-600 mt-1">₹{item.price}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}


                            {activeTab === "settings" && (
                                <div>
                                    <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-lg font-medium mb-3">Notifications</h3>
                                            <div className="space-y-3">
                                                <label className="flex items-center">
                                                    <input type="checkbox" className="mr-3" defaultChecked />
                                                    <span>Email notifications for orders</span>
                                                </label>
                                                <label className="flex items-center">
                                                    <input type="checkbox" className="mr-3" defaultChecked />
                                                    <span>SMS notifications for delivery</span>
                                                </label>
                                                <label className="flex items-center">
                                                    <input type="checkbox" className="mr-3" />
                                                    <span>Promotional emails</span>
                                                </label>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-medium mb-3">Privacy</h3>
                                            <div className="space-y-3">
                                                <label className="flex items-center">
                                                    <input type="checkbox" className="mr-3" defaultChecked />
                                                    <span>Make my profile public</span>
                                                </label>
                                                <label className="flex items-center">
                                                    <input type="checkbox" className="mr-3" />
                                                    <span>Share data for personalized recommendations</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile





// import React, { useState, useEffect } from "react"
// import { useSearchParams, useNavigate } from "react-router-dom"

// const Profile = () => {
//     const [searchParams] = useSearchParams()
//     const navigate = useNavigate()

//     // Get tab from URL or default to 'profile'
//     const initialTab = searchParams.get("tab") || "profile"
//     const [activeTab, setActiveTab] = useState(initialTab)

//     // Update tab state when URL changes
//     useEffect(() => {
//         const tabParam = searchParams.get("tab")
//         if (tabParam && tabParam !== activeTab) {
//             setActiveTab(tabParam)
//         }
//     }, [searchParams])

//     // Update both state and URL when user clicks a tab
//     const handleTabChange = (tab) => {
//         setActiveTab(tab)
//         navigate(`/profile?tab=${tab}`)
//     }

//     const renderContent = () => {
//         switch (activeTab) {
//             case "profile":
//                 return (
//                     <div className="p-4 bg-white shadow rounded">
//                         <h2 className="text-xl font-bold mb-2">User Profile</h2>
//                         <p>Name: John Doe</p>
//                         <p>Email: john@example.com</p>
//                     </div>
//                 )
//             case "orders":
//                 return (
//                     <div className="p-4 bg-white shadow rounded">
//                         <h2 className="text-xl font-bold mb-2">Your Orders</h2>
//                         <p>Order #1</p>
//                         <p>Order #2</p>
//                     </div>
//                 )
//             case "addresses":
//                 return (
//                     <div className="p-4 bg-white shadow rounded">
//                         <h2 className="text-xl font-bold mb-2">Saved Addresses</h2>
//                         <p>123 Main Street</p>
//                         <p>456 Another Ave</p>
//                     </div>
//                 )
//             case "wishlist":
//                 return (
//                     <div className="p-4 bg-white shadow rounded">
//                         <h2 className="text-xl font-bold mb-2">Your Wishlist</h2>
//                         <p>Product A</p>
//                         <p>Product B</p>
//                     </div>
//                 )
//             default:
//                 return (
//                     <div className="p-4 bg-white shadow rounded">
//                         <h2 className="text-xl font-bold mb-2">Not Found</h2>
//                         <p>The selected tab does not exist.</p>
//                     </div>
//                 )
//         }
//     }

//     return (
//         <div className="max-w-4xl mx-auto p-4">
//             <h1 className="text-3xl font-bold mb-6">My Account</h1>
//             <div className="flex space-x-4 mb-6">
//                 <button
//                     className={`px-4 py-2 rounded ${activeTab === "profile" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
//                     onClick={() => handleTabChange("profile")}
//                 >
//                     Profile
//                 </button>
//                 <button
//                     className={`px-4 py-2 rounded ${activeTab === "orders" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
//                     onClick={() => handleTabChange("orders")}
//                 >
//                     Orders
//                 </button>
//                 <button
//                     className={`px-4 py-2 rounded ${activeTab === "addresses" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
//                     onClick={() => handleTabChange("addresses")}
//                 >
//                     Addresses
//                 </button>
//                 <button
//                     className={`px-4 py-2 rounded ${activeTab === "wishlist" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
//                     onClick={() => handleTabChange("wishlist")}
//                 >
//                     Wishlist
//                 </button>
//             </div>

//             {renderContent()}
//         </div>
//     )
// }

// export default Profile




// import React, { useState, useEffect } from "react"
// import { useNavigate, useSearchParams, Link } from "react-router-dom"
// import { motion } from "framer-motion"
// import { User, MapPin, Package, Heart, Settings, LogOut } from "lucide-react"
// import { useApp } from "../context/AppContext"
// import { orderService } from "../services/orderService"

// const Profile = () => {
//     const { user, logout, isAuthenticated } = useApp()
//     const [orders, setOrders] = useState([])
//     const [loading, setLoading] = useState(false)

//     const [searchParams] = useSearchParams()
//     const navigate = useNavigate()

//     // Initial tab comes from URL or defaults to 'profile'
//     const initialTab = searchParams.get("tab") || "profile"
//     const [activeTab, setActiveTab] = useState(initialTab)

//     // Sync tab when URL changes
//     useEffect(() => {
//         const urlTab = searchParams.get("tab")
//         if (urlTab && urlTab !== activeTab) {
//             setActiveTab(urlTab)
//         }
//     }, [searchParams])

//     // Update tab in both state + URL
//     const handleTabChange = (tab) => {
//         setActiveTab(tab)
//         navigate(`/profile?tab=${tab}`)
//     }

//     // Fetch orders only when needed
//     useEffect(() => {
//         if (!isAuthenticated) return

//         if (activeTab === "orders") {
//             fetchOrders()
//         }
//     }, [activeTab, isAuthenticated])

//     const fetchOrders = async () => {
//         try {
//             setLoading(true)
//             const response = await orderService.getMyOrders()
//             setOrders(response.data || [])
//         } catch (error) {
//             console.error("Error fetching orders", error)
//         } finally {
//             setLoading(false)
//         }
//     }

//     const tabs = [
//         { id: "profile", label: "Profile", icon: User },
//         { id: "orders", label: "Orders", icon: Package },
//         { id: "addresses", label: "Addresses", icon: MapPin },
//         { id: "wishlist", label: "Wishlist", icon: Heart },
//         { id: "settings", label: "Settings", icon: Settings },
//     ]

//     if (!isAuthenticated) {
//         return (
//             <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//                 <div className="text-center">
//                     <User className="w-24 h-24 text-gray-300 mx-auto mb-4" />
//                     <h2 className="text-2xl font-bold text-gray-800 mb-2">Please login to view your profile</h2>
//                     <Link to="/login" className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors">
//                         Login
//                     </Link>
//                 </div>
//             </div>
//         )
//     }

//     return (
//         <div className="min-h-screen bg-gray-50">
//             <div className="container mx-auto px-4 py-8">
//                 <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//                     {/* Sidebar */}
//                     <div className="lg:col-span-1">
//                         <div className="bg-white rounded-lg shadow-sm p-6">
//                             <div className="text-center mb-6">
//                                 {user?.profilePic ? (
//                                     <img
//                                         src={user.profilePic}
//                                         alt={user.name}
//                                         className="w-20 h-20 rounded-full object-cover mx-auto mb-3"
//                                     />
//                                 ) : (
//                                     <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
//                                         <User className="w-10 h-10 text-pink-500" />
//                                     </div>
//                                 )}
//                                 <h2 className="text-xl font-semibold">{user?.name}</h2>
//                                 <p className="text-gray-600 text-sm">{user?.email}</p>
//                             </div>

//                             <nav className="space-y-2">
//                                 {tabs.map((tab) => {
//                                     const Icon = tab.icon
//                                     return (
//                                         <button
//                                             key={tab.id}
//                                             onClick={() => handleTabChange(tab.id)}
//                                             className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === tab.id
//                                                 ? "bg-pink-50 text-pink-600 border-r-2 border-pink-500"
//                                                 : "text-gray-600 hover:bg-gray-50"
//                                                 }`}
//                                         >
//                                             <Icon className="w-5 h-5" />
//                                             <span>{tab.label}</span>
//                                         </button>
//                                     )
//                                 })}
//                                 <button
//                                     onClick={logout}
//                                     className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-red-600 hover:bg-red-50 transition-colors"
//                                 >
//                                     <LogOut className="w-5 h-5" />
//                                     <span>Logout</span>
//                                 </button>
//                             </nav>
//                         </div>
//                     </div>

//                     {/* Main Content */}
//                     <div className="lg:col-span-3">
//                         <div className="bg-white rounded-lg shadow-sm p-6">
//                             {/* 🔁 Keep all your tab content exactly the same as before */}
//                             {/* Copy and paste your existing tab content here */}
//                             {/* ⬇️ Existing tab rendering is preserved ⬇️ */}

//                             {/* Example (just for context): */}
//                             {activeTab === "profile" && (
//                                 <div>
//                                     <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
//                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                         <div>
//                                             <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
//                                             <input
//                                                 type="text"
//                                                 value={user?.name || ""}
//                                                 readOnly
//                                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
//                                             />
//                                         </div>
//                                         <div>
//                                             <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
//                                             <input
//                                                 type="email"
//                                                 value={user?.email || ""}
//                                                 readOnly
//                                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
//                                             />
//                                         </div>
//                                         <div>
//                                             <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
//                                             <input
//                                                 type="tel"
//                                                 value={user?.phone || ""}
//                                                 readOnly
//                                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
//                                             />
//                                         </div>
//                                         <div>
//                                             <label className="block text-sm font-medium text-gray-700 mb-2">Member Since</label>
//                                             <input
//                                                 type="text"
//                                                 value={user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
//                                                 readOnly
//                                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}

//                             {/* ⬆️ Also keep orders, addresses, wishlist, settings exactly same as in your original */}

//                             {/* Paste all other tab rendering logic here unchanged */}
//                             {/* "orders", "addresses", "wishlist", "settings" logic — same as before */}

//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Profile






// import React, { useState } from "react"
// import { User, LogOut, Map, Heart, Lock, Unlock } from "lucide-react"
// import ProfileDropdown from "../components/ProfileDropDown"

// const Profile = () => {
//     const user = JSON.parse(localStorage.getItem("user"))
//     const [activeTab, setActiveTab] = useState("orders")

//     const handleTabChange = (tab) => setActiveTab(tab)

//     return (
//         <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
//             <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">

//                 {/* Sidebar Navigation */}
//                 <aside className="bg-white rounded-xl shadow-md p-4">
//                     <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
//                         <User className="w-5 h-5" /> Account
//                     </h2>
//                     <ul className="space-y-3">
//                         <li
//                             onClick={() => handleTabChange("orders")}
//                             className={`cursor-pointer p-2 rounded-lg flex items-center gap-2 ${activeTab === "orders" ? "bg-gray-200 font-medium" : "hover:bg-gray-100"
//                                 }`}
//                         >
//                             <Map className="w-4 h-4" />
//                             My Orders
//                         </li>
//                         <li
//                             onClick={() => handleTabChange("wishlist")}
//                             className={`cursor-pointer p-2 rounded-lg flex items-center gap-2 ${activeTab === "wishlist" ? "bg-gray-200 font-medium" : "hover:bg-gray-100"
//                                 }`}
//                         >
//                             <Heart className="w-4 h-4" />
//                             Wishlist
//                         </li>
//                         <li
//                             onClick={() => handleTabChange("security")}
//                             className={`cursor-pointer p-2 rounded-lg flex items-center gap-2 ${activeTab === "security" ? "bg-gray-200 font-medium" : "hover:bg-gray-100"
//                                 }`}
//                         >
//                             <Lock className="w-4 h-4" />
//                             Security
//                         </li>
//                         <li
//                             onClick={() => handleTabChange("logout")}
//                             className="cursor-pointer p-2 rounded-lg flex items-center gap-2 text-red-500 hover:bg-red-100"
//                         >
//                             <LogOut className="w-4 h-4" />
//                             Logout
//                         </li>
//                     </ul>
//                 </aside>

//                 {/* Main Content */}
//                 <main className="lg:col-span-3 bg-white rounded-xl shadow-md p-6">
//                     <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
//                         <div className="flex items-center gap-4">
//                             {user?.profilePic ? (
//                                 <img
//                                     src={user.profilePic}
//                                     alt="Profile"
//                                     className="w-14 h-14 rounded-full object-cover"
//                                 />
//                             ) : (
//                                 <User className="w-10 h-10" />
//                             )}
//                             <div>
//                                 <h3 className="text-xl font-semibold">{user?.name}</h3>
//                                 <p className="text-sm text-gray-600">{user?.email}</p>
//                             </div>
//                         </div>
//                     </div>

//                     {/* 👇 ProfileDropdown inserted statically here */}
//                     <div className="mb-6">
//                         <ProfileDropdown isLoggedIn={!!user} />
//                     </div>

//                     {/* Tabs Content */}
//                     {activeTab === "orders" && (
//                         <div>
//                             <h4 className="text-lg font-semibold mb-2">My Orders</h4>
//                             <p className="text-sm text-gray-600">You have no orders yet.</p>
//                         </div>
//                     )}
//                     {activeTab === "wishlist" && (
//                         <div>
//                             <h4 className="text-lg font-semibold mb-2">My Wishlist</h4>
//                             <p className="text-sm text-gray-600">Your wishlist is empty.</p>
//                         </div>
//                     )}
//                     {activeTab === "security" && (
//                         <div>
//                             <h4 className="text-lg font-semibold mb-2">Security Settings</h4>
//                             <p className="text-sm text-gray-600">Update your password and security preferences.</p>
//                             <div className="mt-4 flex gap-3">
//                                 <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-1">
//                                     <Unlock className="w-4 h-4" />
//                                     Change Password
//                                 </button>
//                             </div>
//                         </div>
//                     )}
//                     {activeTab === "logout" && (
//                         <div>
//                             <h4 className="text-lg font-semibold mb-2 text-red-600">Are you sure you want to logout?</h4>
//                             <button className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
//                                 Confirm Logout
//                             </button>
//                         </div>
//                     )}
//                 </main>
//             </div>
//         </div>
//     )
// }

// export default Profile
