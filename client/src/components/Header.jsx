


import { useEffect, useState } from "react"
import { useNavigate, Link, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { motion, AnimatePresence } from "framer-motion"
import { Search, User, Heart, ShoppingBag, LogOut, ChevronRight } from "lucide-react"
import { logoutUser } from "../redux/slices/authSlice" // ✅ Ensure this action exists
import { clearCartLocally } from "../redux/slices/cartSlice"
import toast from "react-hot-toast"

const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const { cartItems } = useSelector((state) => state.cart)
    const { wishlist } = useSelector((state) => state.wishlist || { wishlist: [] })
    const { user, isAuthenticated } = useSelector((state) => state.auth || { user: null, isAuthenticated: false });

    const [hoveredItem, setHoveredItem] = useState(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [profileHovered, setProfileHovered] = useState(false)

    // Typing effect logic
    const [placeholderText, setPlaceholderText] = useState("")
    const [wordIndex, setWordIndex] = useState(0)
    const [charIndex, setCharIndex] = useState(0)
    const [isDeleting, setIsDeleting] = useState(false)
    const texts = ["Search for T-shirts", "Search for Sneakers", "Search for Jeans", "Search for accessories"]

    useEffect(() => {
        const currentWord = texts[wordIndex]
        const speed = isDeleting ? 50 : 100
        const timer = setTimeout(() => {
            setPlaceholderText(isDeleting ? currentWord.substring(0, charIndex - 1) : currentWord.substring(0, charIndex + 1))
            setCharIndex((prev) => prev + (isDeleting ? -1 : 1))
            if (!isDeleting && charIndex === currentWord.length) {
                setTimeout(() => setIsDeleting(true), 1000)
            }
            if (isDeleting && charIndex === 0) {
                setIsDeleting(false)
                setWordIndex((prev) => (prev + 1) % texts.length)
            }
        }, speed)
        return () => clearTimeout(timer)
    }, [charIndex, isDeleting, wordIndex])

    const handleSearch = (e) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            navigate(`/products/search?q=${encodeURIComponent(searchQuery)}`)
        }
    }

    // ✅ Logout Handler
    const handleLogout = () => {
        dispatch(logoutUser());
        dispatch(clearCartLocally());
        toast.success("Logged out successfully");
        navigate("/");
    }

    const renderProfileDropdown = () => (
        <motion.div
            className="absolute top-12 right-[-20px] w-72 bg-white shadow-2xl rounded-sm z-50 p-6 border border-gray-100"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onMouseEnter={() => setProfileHovered(true)}
            onMouseLeave={() => setProfileHovered(false)}
        >
            <div className="text-sm">
                <div className="mb-4">
                    <p className="font-bold text-gray-800 text-sm">
                        {isAuthenticated ? `Hello ${user?.name?.split(" ")[0]}` : "Welcome"}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">To access account and manage orders</p>
                </div>

                {!isAuthenticated ? (
                    <Link to="/login" className="block text-center border border-gray-200 text-pink-500 py-2.5 rounded-sm font-bold text-xs hover:border-pink-500 transition-all">
                        LOGIN / SIGNUP
                    </Link>
                ) : (
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-gray-700 font-bold text-xs hover:text-pink-500 transition-colors"
                    >
                        <LogOut size={14} /> LOGOUT
                    </button>
                )}

                <hr className="my-4 border-gray-100" />

                <ul className="space-y-3.5 text-gray-600 text-[13px]">
                    <li><Link to="/orders/mine" className="hover:font-bold hover:text-gray-900 transition-all flex justify-between items-center group">Orders <ChevronRight size={14} className="opacity-0 group-hover:opacity-100" /></Link></li>
                    <li><Link to="/wishlist" className="hover:font-bold hover:text-gray-900 transition-all flex justify-between items-center group">Wishlist <ChevronRight size={14} className="opacity-0 group-hover:opacity-100" /></Link></li>
                    <li><Link to="/contact" className="hover:font-bold hover:text-gray-900 transition-all">Contact Us</Link></li>
                    {isAuthenticated && (
                        <li><Link to="/profile" className="hover:font-bold hover:text-gray-900 transition-all">Edit Profile</Link></li>
                    )}
                </ul>
            </div>
        </motion.div>
    );

    return (
        <motion.header
            className="bg-white sticky top-0 z-50 border-b border-gray-100 h-20"
            initial={{ y: -100 }} animate={{ y: 0 }}
        >
            <div className="container mx-auto px-4 h-full lg:px-10">
                <div className="flex items-center justify-between h-full">

                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0 flex items-center">
    <span className="text-2xl md:text-3xl font-[900] italic tracking-tighter bg-gradient-to-tr from-[#ff3f6c] via-[#ff3f6c] to-[#ffb31a] bg-clip-text text-transparent uppercase">
        Zyntra
    </span>
</Link>

                    {/* Nav Items */}
                    <nav className="hidden lg:flex space-x-7 ml-10 uppercase text-[13px] font-bold tracking-tight text-gray-800 h-full items-center">
                        {["MEN", "WOMEN", "KIDS", "HOME", "BEAUTY"].map((item) => (
                            <div
                                key={item}
                                className={`h-full flex items-center border-b-4 transition-all cursor-pointer px-1 mt-1 ${location.pathname.includes(item.toLowerCase()) ? 'border-pink-500' : 'border-transparent hover:border-pink-500'
                                    }`}
                                onMouseEnter={() => setHoveredItem(item)}
                                onMouseLeave={() => setHoveredItem(null)}
                            >
                                <Link to={`/${item.toLowerCase()}`}>{item}</Link>
                            </div>
                        ))}
                    </nav>

                    {/* Search */}
                    <div className="flex-1 max-w-sm lg:max-w-md mx-8 hidden md:block">
                        <form onSubmit={handleSearch} className="relative group">
                            <Search className="absolute left-3 top-2.5 text-gray-400 group-focus-within:text-gray-600" size={16} />
                            <input
                                type="text"
                                placeholder={placeholderText}
                                className="w-full bg-gray-100 py-2.5 pl-10 pr-4 rounded-sm text-xs focus:bg-white border border-transparent focus:border-gray-200 outline-none transition-all placeholder:text-gray-500"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </form>
                    </div>

                    {/* Action Icons */}
                    <div className="flex items-center space-x-6 lg:space-x-8">
                        {/* Profile */}
                        <Link to="/profile"
                            className="relative flex flex-col items-center cursor-pointer group pt-1"
                            onMouseEnter={() => setProfileHovered(true)}
                            onMouseLeave={() => setProfileHovered(false)}
                        >
                            {/* ✅ Updated Profile Pic Logic */}
                            <div className="w-5 h-5 flex items-center justify-center overflow-hidden">
                                {isAuthenticated && user?.profilePic ? (
                                    <img
                                        src={user.profilePic}
                                        alt="profile"
                                        className="w-full h-full rounded-full object-cover border border-gray-200"
                                    />
                                ) : (
                                    <User
                                        size={20}
                                        className={`text-gray-700 group-hover:text-pink-500 ${isAuthenticated && 'text-pink-500'}`}
                                    />
                                )}
                            </div>

                            <span className="text-[10px] font-bold mt-1 text-gray-700">Profile</span>
                            <AnimatePresence>{profileHovered && renderProfileDropdown()}</AnimatePresence>
                        </Link>

                        {/* Wishlist */}
                        <Link to="/wishlist" className="flex flex-col items-center cursor-pointer relative group pt-1">
                            <Heart size={20} className="text-gray-700 group-hover:text-pink-500" />
                            <span className="text-[10px] font-bold mt-1 text-gray-700">Wishlist</span>
                            {wishlist?.length > 0 && (
                                <span className="absolute top-0 -right-1.5 bg-pink-500 text-white text-[9px] rounded-full h-4 w-4 flex items-center justify-center font-bold">
                                    {wishlist.length}
                                </span>
                            )}
                        </Link>

                        {/* Bag */}
                        <Link to="/cart" className="flex flex-col items-center cursor-pointer relative group pt-1">
                            <ShoppingBag size={20} className="text-gray-700 group-hover:text-pink-500" />
                            <span className="text-[10px] font-bold mt-1 text-gray-700">Bag</span>
                            {cartItems?.length > 0 && (
                                <span className="absolute top-0 -right-1.5 bg-pink-500 text-white text-[9px] rounded-full h-4 w-4 flex items-center justify-center font-bold">
                                    {cartItems.length}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </div>
        </motion.header>
    )
}

export default Header
