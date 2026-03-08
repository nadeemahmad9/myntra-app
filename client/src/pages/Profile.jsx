import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { User, MapPin, Package, Heart, Settings, LogOut, ChevronRight, X } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { logoutUser, setCredentials, updateAddresses } from "../redux/slices/authSlice"
import api from "../utils/api"
import toast from "react-hot-toast"

const Profile = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    // Redux State
    const { user, isAuthenticated } = useSelector((state) => state.auth)

    // Component States
    const initialTab = searchParams.get("tab") || "profile"
    const [activeTab, setActiveTab] = useState(initialTab)
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [isEditMode, setIsEditMode] = useState(false)
    const [currentAddressId, setCurrentAddressId] = useState(null)
    const [showProfileModal, setShowProfileModal] = useState(false);

    const [profileForm, setProfileForm] = useState({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
    })

    const [addressForm, setAddressForm] = useState({
        name: "",
        phone: "",
        pincode: "",
        address: "",
        city: "",
        state: "Uttar Pradesh",
    })


    // Profile Update karne ka function
    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { data } = await api.put("/users/profile", profileForm);

            // ✅ Check karein ki backend ne success bheja hai
            if (data.success) {
                // 1. Redux Update (data.user bhej rahe hain kyunki aapka response wahi hai)
                dispatch(setCredentials(data.user));

                // 2. Token update (Kyunki backend naya token bhej raha hai)
                localStorage.setItem("token", data.token);

                toast.success("Profile updated successfully!");
                setShowProfileModal(false);
            }
        } catch (error) {
            // Agar yahan error aa rahi hai toh console check karein
            console.error("Frontend Logic Error:", error);
            toast.error(error.response?.data?.message || "Something went wrong while updating UI");
        } finally {
            setLoading(false);
        }
    };

    // 🗑️ Delete Address
    const handleDeleteAddress = async (id) => {
        if (window.confirm("Are you sure you want to delete this address?")) {
            try {
                const { data } = await api.delete(`/users/address/${id}`)
                if (data.success) {
                    dispatch(updateAddresses(data.addresses))
                    toast.success("Address removed")
                }
            } catch (error) {
                toast.error("Failed to delete address")
            }
        }
    }

    // ✏️ Open Edit Modal
    const openEditModal = (addr) => {
        setIsEditMode(true)
        setCurrentAddressId(addr._id)
        setAddressForm({
            name: addr.name,
            phone: addr.phone,
            pincode: addr.pincode,
            address: addr.address,
            city: addr.city,
            state: addr.state,
        })
        setShowModal(true)
    }

    // ➕ Open Add Modal
    const openAddModal = () => {
        setIsEditMode(false)
        setCurrentAddressId(null)
        setAddressForm({
            name: user?.name || "",
            phone: "",
            pincode: "",
            address: "",
            city: "",
            state: "Uttar Pradesh",
        })
        setShowModal(true)
    }

    // ✅ Address Save/Update Logic
    const handleSaveAddress = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            let response

            if (isEditMode) {
                // Update API Call
                response = await api.put(`/users/address/${currentAddressId}`, addressForm)
            } else {
                // Add API Call
                response = await api.post("/users/address", addressForm)
            }

            if (response.data.success) {
                dispatch(updateAddresses(response.data.addresses))
                toast.success(isEditMode ? "Address updated successfully!" : "Address added successfully!")
                setShowModal(false)
                // Form Reset is handled in openAddModal/openEditModal but clean here too
                setAddressForm({ name: "", phone: "", pincode: "", address: "", city: "", state: "Uttar Pradesh" })
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Failed to process request"
            toast.error(errorMsg)
        } finally {
            setLoading(false)
        }
    }

    // Sync tabs
    useEffect(() => {
        const urlTab = searchParams.get("tab")
        if (urlTab) setActiveTab(urlTab)
    }, [searchParams])

    // Fetch Orders
    useEffect(() => {
        if (isAuthenticated && activeTab === "orders") {
            const fetchOrders = async () => {
                try {
                    setLoading(true)
                    const { data } = await api.get("/orders/mine")
                    setOrders(data.orders || data)
                } catch (error) {
                    console.error("Error fetching orders", error)
                } finally {
                    setLoading(false)
                }
            }
            fetchOrders()
        }
    }, [activeTab, isAuthenticated])

    const handleTabChange = (tabId) => {
        setActiveTab(tabId)
        navigate(`/profile?tab=${tabId}`)
    }

    const handleLogout = () => {
        dispatch(logoutUser())
        toast.success("Logged out successfully")
        navigate("/")
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
            <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
                <div className="bg-pink-50 p-6 rounded-full mb-4">
                    <User size={60} className="text-pink-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Please login to view profile</h2>
                <Link to="/login" className="bg-pink-500 text-white px-8 py-2.5 rounded shadow-lg font-bold">LOGIN</Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-4">
                        <div className="bg-white p-6 rounded shadow-sm border border-gray-100">
                            <div className="flex flex-col items-center mb-8 pb-6 border-b border-gray-50">
                                {user?.profilePic ? (
                                    <img src={user.profilePic} className="w-20 h-20 rounded-full object-cover border-2 border-pink-100 mb-3" alt="Profile" />
                                ) : (
                                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                                        <User size={40} className="text-gray-400" />
                                    </div>
                                )}
                                <h3 className="font-bold text-gray-800 uppercase tracking-tight">{user?.name}</h3>
                                <p className="text-xs text-gray-500">{user?.email}</p>
                            </div>
                            <nav className="space-y-1">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => handleTabChange(tab.id)}
                                        className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded transition-all ${activeTab === tab.id ? "bg-pink-50 text-pink-500" : "text-gray-600 hover:bg-gray-50"}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <tab.icon size={18} /> {tab.label}
                                        </div>
                                        {activeTab === tab.id && <ChevronRight size={14} />}
                                    </button>
                                ))}
                                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded mt-4">
                                    <LogOut size={18} /> Logout
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="lg:col-span-3">
                        <div className="bg-white p-8 rounded shadow-sm border border-gray-100 min-h-[500px]">
                            {activeTab === "profile" && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    <h2 className="text-xl font-bold border-b pb-4 mb-6">Profile Details</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-1">
                                            <p className="text-xs font-bold text-gray-400 uppercase">Full Name</p>
                                            <p className="text-gray-800 font-medium">{user?.name}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-xs font-bold text-gray-400 uppercase">Email Address</p>
                                            <p className="text-gray-800 font-medium">{user?.email}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-xs font-bold text-gray-400 uppercase">Mobile Number</p>
                                            <p className="text-gray-800 font-medium">{user?.phone || "Not provided"}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setProfileForm({ name: user.name, email: user.email, phone: user.phone || "" });
                                            setShowProfileModal(true);
                                        }}
                                        className="mt-10 bg-gray-900 text-white px-10 py-3 text-sm font-bold rounded hover:bg-gray-800 transition-all uppercase tracking-wider"
                                    >
                                        Edit Details
                                    </button>

                                </motion.div>
                            )}

                            {activeTab === "orders" && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    <h2 className="text-xl font-bold border-b pb-4 mb-6">Past Orders</h2>
                                    {loading ? (
                                        <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-pink-500"></div></div>
                                    ) : orders.length === 0 ? (
                                        <div className="text-center py-20">
                                            <Package size={50} className="mx-auto text-gray-200 mb-4" />
                                            <p className="text-gray-500">No orders yet.</p>
                                            <Link to="/" className="text-pink-500 font-bold mt-2 inline-block">START SHOPPING</Link>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {orders.map((order) => (
                                                <div key={order._id} className="border p-4 rounded hover:border-pink-200 transition-colors">
                                                    <div className="flex justify-between items-start mb-4">
                                                        <div>
                                                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Order ID: #{order._id.slice(-8)}</p>
                                                            <p className="text-xs text-gray-400">{new Date(order.createdAt).toDateString()}</p>
                                                        </div>
                                                        <p className="font-bold text-gray-800">₹{order.totalPrice}</p>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        {order.orderItems.map((item, i) => (
                                                            <img key={i} src={item.image} className="w-12 h-16 object-cover rounded shadow-sm border" alt={item.name} />
                                                        ))}
                                                    </div>
                                                    <Link to={`/order/${order._id}`} className="mt-4 inline-block text-xs font-bold text-pink-500 hover:underline">VIEW FULL DETAILS</Link>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            )}

                            {activeTab === "addresses" && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    <div className="flex justify-between items-center border-b pb-4 mb-6">
                                        <h2 className="text-xl font-bold">Saved Addresses</h2>
                                        <button onClick={openAddModal} className="text-pink-500 font-bold text-xs border border-pink-500 px-4 py-2 rounded-sm hover:bg-pink-50 transition-all">
                                            + ADD NEW ADDRESS
                                        </button>
                                    </div>
                                    {user?.addresses?.length === 0 ? (
                                        <div className="text-center py-20">
                                            <MapPin size={50} className="mx-auto text-gray-200 mb-4" />
                                            <p className="text-gray-500">No addresses saved yet.</p>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {user?.addresses?.map((addr, index) => (
                                                <div key={index} className="border p-5 rounded-md relative hover:shadow-sm transition-all">
                                                    {addr.isDefault && (
                                                        <span className="absolute top-0 right-0 bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-1 rounded-bl-md uppercase">Default</span>
                                                    )}
                                                    <h3 className="font-bold text-gray-800 mb-1 uppercase text-sm">{addr.name}</h3>
                                                    <p className="text-sm text-gray-600 leading-relaxed">
                                                        {addr.address}, <br /> {addr.city}, {addr.state} - <span className="font-bold">{addr.pincode}</span>
                                                    </p>
                                                    <p className="text-sm font-bold text-gray-700 mt-4">Mobile: <span className="font-medium">{addr.phone}</span></p>
                                                    <div className="mt-6 flex gap-4 border-t pt-4">
                                                        <button onClick={() => openEditModal(addr)} className="text-xs font-bold text-pink-500 hover:underline">EDIT</button>
                                                        <button onClick={() => handleDeleteAddress(addr._id)} className="text-xs font-bold text-gray-400 hover:text-red-500">REMOVE</button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            )}

                            {activeTab === "wishlist" && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    <h2 className="text-xl font-bold border-b pb-4 mb-6">Saved Items</h2>
                                    <div className="text-center py-20">
                                        <Heart size={50} className="mx-auto text-pink-100 mb-4" />
                                        <p className="text-gray-500 mb-4">Move your favorites to bag!</p>
                                        <Link to="/wishlist" className="bg-pink-500 text-white px-8 py-2 font-bold text-xs">GO TO WISHLIST</Link>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* ✅ Address Modal */}
            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-50 p-4">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white w-full max-w-lg rounded-lg shadow-xl p-6"
                        >
                            <div className="flex justify-between items-center mb-6 border-b pb-4">
                                <h2 className="text-lg font-bold uppercase">{isEditMode ? "Edit Address" : "Add New Address"}</h2>
                                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-black transition-colors">
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSaveAddress} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase">Contact Name</label>
                                        <input type="text" placeholder="Name*" required className="w-full border p-2.5 rounded text-sm outline-none focus:border-pink-500"
                                            onChange={(e) => setAddressForm({ ...addressForm, name: e.target.value })} value={addressForm.name} />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase">Mobile No</label>
                                        <input type="text" placeholder="Mobile No*" required className="w-full border p-2.5 rounded text-sm outline-none focus:border-pink-500"
                                            onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })} value={addressForm.phone} />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Pincode</label>
                                    <input type="text" placeholder="Pincode*" required className="border p-2.5 w-full rounded text-sm outline-none focus:border-pink-500"
                                        onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })} value={addressForm.pincode} />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Address Detail</label>
                                    <input type="text" placeholder="Address (House No, Building, Street)*" required className="border p-2.5 w-full rounded text-sm outline-none focus:border-pink-500"
                                        onChange={(e) => setAddressForm({ ...addressForm, address: e.target.value })} value={addressForm.address} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase">City</label>
                                        <input type="text" placeholder="City*" required className="w-full border p-2.5 rounded text-sm outline-none focus:border-pink-500"
                                            onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })} value={addressForm.city} />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase">State</label>
                                        <input type="text" placeholder="State*" required className="w-full border p-2.5 rounded text-sm outline-none focus:border-pink-500"
                                            onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })} value={addressForm.state} />
                                    </div>
                                </div>

                                <button type="submit" disabled={loading} className="w-full bg-pink-500 text-white py-3 rounded font-bold hover:bg-pink-600 transition-colors mt-4 disabled:bg-pink-300">
                                    {loading ? "SAVING..." : (isEditMode ? "UPDATE ADDRESS" : "ADD ADDRESS")}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
            {/* ✅ Profile Edit Modal */}
            <AnimatePresence>
                {showProfileModal && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-50 p-4">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white w-full max-w-md rounded-lg shadow-xl p-8"
                        >
                            <div className="flex justify-between items-center mb-6 border-b pb-4">
                                <h2 className="text-lg font-bold uppercase tracking-tight">Edit Profile</h2>
                                <button onClick={() => setShowProfileModal(false)}>
                                    <X size={24} className="text-gray-400 hover:text-black" />
                                </button>
                            </div>

                            <form onSubmit={handleUpdateProfile} className="space-y-5">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Full Name</label>
                                    <input
                                        type="text"
                                        value={profileForm.name}
                                        required
                                        className="w-full border-b-2 p-2 outline-none focus:border-pink-500 transition-all text-sm font-medium"
                                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Email Address</label>
                                    <input
                                        type="email"
                                        value={profileForm.email}
                                        required
                                        className="w-full border-b-2 p-2 outline-none focus:border-pink-500 transition-all text-sm font-medium"
                                        onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Mobile Number</label>
                                    <input
                                        type="text"
                                        value={profileForm.phone}
                                        placeholder="Add your mobile number"
                                        className="w-full border-b-2 p-2 outline-none focus:border-pink-500 transition-all text-sm font-medium"
                                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-pink-500 text-white py-3 rounded font-bold mt-4 shadow-lg hover:bg-pink-600 disabled:bg-pink-300 transition-all uppercase text-sm"
                                >
                                    {loading ? "Saving Changes..." : "Save Details"}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Profile