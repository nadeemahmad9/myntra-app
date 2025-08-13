

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, User, Heart, ShoppingBag, Menu, X } from "lucide-react"
import { useCart } from "../context/CartContext"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useWishlist } from "../context/WishlistContext"
import { useApp } from "../context/AppContext"
import axios from "axios"
import { dropdownData } from "../data/dropdownData"



const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [hoveredItem, setHoveredItem] = useState(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [profileHovered, setProfileHovered] = useState(false)


    const { getCartItemsCount } = useCart()
    const { wishlist } = useWishlist()
    const { isAuthenticated, user, logout, fetchUser } = useAuth()


    const navigate = useNavigate()




    const [placeholderText, setPlaceholderText] = useState("")
    const [wordIndex, setWordIndex] = useState(0)
    const [charIndex, setCharIndex] = useState(0)
    const [isDeleting, setIsDeleting] = useState(false)


    const texts = ["Search for T-shirts", "Search for Sneakers", "Search for Jeans", "Search for Perfumes", "Search for accessories"]

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            fetchUser();
        }
    }, [fetchUser]);


    useEffect(() => {
        const currentWord = texts[wordIndex]
        const speed = isDeleting ? 50 : 100

        const timer = setTimeout(() => {
            setPlaceholderText(
                isDeleting
                    ? currentWord.substring(0, charIndex - 1)
                    : currentWord.substring(0, charIndex + 1)
            )

            setCharIndex((prev) => prev + (isDeleting ? -1 : 1))

            if (!isDeleting && charIndex === currentWord.length) {
                setTimeout(() => setIsDeleting(true), 1000)
            }

            if (isDeleting && charIndex === 12) {
                setIsDeleting(false)
                setWordIndex((prev) => (prev + 1) % texts.length)
            }
        }, speed)

        return () => clearTimeout(timer)
    }, [charIndex, isDeleting, wordIndex])

    const navItems = [
        { name: "MEN", href: "/men" },
        { name: "WOMEN", href: "/women" },
        { name: "KIDS", href: "/kids" },
        { name: "HOME", href: "/home" },
        { name: "BEAUTY", href: "/beauty" },
        { name: "GENZ", href: "/genz" },
        // { name: "STUDIO", href: "/studio", isNew: true },
    ]




    const handleSearch = (e) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            navigate(`/products/search?q=${encodeURIComponent(searchQuery)}`)
        }
    }

    const handleUserClick = () => {
        if (isAuthenticated) {
            navigate("/profile")
        } else {
            navigate("/login")
        }
    }

    const handleCartClick = () => {
        navigate("/cart")
    }

    const handleWishlistClick = () => {
        if (isAuthenticated) {
            navigate("/wishlist")
        } else {
            navigate("/login")
        }
    }






    const renderProfileDropdown = () => (
        <motion.div
            className="absolute top-12 right-20 w-64 bg-white shadow-xl rounded-md z-40 p-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => setProfileHovered(true)}
            onMouseLeave={() => setProfileHovered(false)}
        >
            <div className="text-sm text-gray-800">
                <div className="flex items-center mb-2">
                    <User className="w-5 h-5 mr-2 text-pink-500" />
                    <div>
                        <p className="font-semibold">Welcome {user?.name}</p>
                        <p className="text-xs text-gray-500">To access account and manage orders</p>
                        {!isAuthenticated && (
                            <Link to="/login" className="text-pink-500 text-xs underline">Login / Signup</Link>
                        )}
                    </div>
                </div>
                <hr className="my-2" />
                <ul className="space-y-1">
                    <li><Link to="/profile/orders" className="hover:text-pink-500 text-sm block">Orders</Link></li>
                    <li><Link to="/wishlist" className="hover:text-pink-500 text-sm block">Wishlist</Link></li>
                    <li><Link to="/profile/cards" className="hover:text-pink-500 text-sm block">Saved Cards</Link></li>
                    <li><Link to="/profile/address" className="hover:text-pink-500 text-sm block">Saved Addresses</Link></li>
                    <li><Link to="/profile/coupons" className="hover:text-pink-500 text-sm block">Coupons</Link></li>
                </ul>
            </div>
        </motion.div>
    );

    const renderDropdown = () => {
        const data = dropdownData[hoveredItem]
        if (!data) return null

        return (
            <motion.div
                className="absolute top-full  left-10 h-100 right-30  bg-white shadow-lg"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                onMouseEnter={() => setHoveredItem(hoveredItem)}
                onMouseLeave={() => setHoveredItem(null)}
            >
                <div className="container mx-auto  px-4 py-2  ">
                    <div className="flex flex-row gap-3">
                        {Object.entries(data).map(([section, items]) => (
                            <div key={section} className=" space-y-0">
                                <h3 className="text-pink-500 text-sm uppercase tracking-wide">
                                    {section}
                                </h3>
                                <hr />
                                <ul className="space-y-0">
                                    {items.map((item) => (
                                        <li key={item}>
                                            <a
                                                href={`/${hoveredItem.toLowerCase()}/${item.toLowerCase().replace(/\s+/g, '-')}`}
                                                className="text-gray-700 hover:text-gray-900 text-sm transition-colors duration-200"
                                            >
                                                {item}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        )
    }

    return (
        <motion.header
            className="bg-gray-50 shadow-md sticky top-0 z-50"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container mx-auto px-6 relative">
                <div className="flex items-center justify-between py-4">
                    {/* Logo */}
                    <motion.div whileHover={{ scale: 1.05 }}>
                        <Link to="/" className="flex items-center">
                            <img src="/myntraLogo.png" alt="Logo" className="h-6 px-3" />
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex space-x-8 mx-10">
                        {navItems.map((item) => (
                            <motion.div
                                key={item.name}
                                className="relative"
                                onMouseEnter={() => setHoveredItem(item.name)}
                                onMouseLeave={() => setHoveredItem(null)}
                            >
                                <motion.a
                                    href={item.href}
                                    className="text-gray-700 hover:text-pink-500 font-medium relative inline-block py-2"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    {item.name}
                                    {item.isNew && (
                                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded">NEW</span>
                                    )}
                                </motion.a>
                            </motion.div>
                        ))}
                    </nav>

                    {/* Search Bar */}
                    <form
                        onSubmit={handleSearch}
                        className="hidden md:flex items-center  bg-gray-100 rounded-lg px-4 py-2 flex-1 max-w-md mx-8"
                    >
                        <Search className="w-5 h-5 text-gray-400 mr-2" />
                        <input
                            type="text"
                            placeholder={placeholderText + "|"}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-transparent outline-none flex-1 text-sm"
                        />
                    </form>

                    {/* Right Icons */}
                    <div className="flex items-center space-x-6">



                        <div
                            className="relative hidden md:flex items-center gap-2 cursor-pointer"
                            onMouseEnter={() => setProfileHovered(true)}
                            onMouseLeave={() => setProfileHovered(false)}
                            onClick={handleUserClick}
                        >

                            <motion.div
                                className="hidden md:flex flex-col items-center cursor-pointer relative"
                                whileHover={{ scale: 1.1 }}
                            >
                                {user ? (
                                    user?.profilePic && user.profilePic.trim() !== "" ? (
                                        <img
                                            src={user.profilePic}
                                            alt={user.name || "User"}
                                            className="w-6 h-6 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold text-white">
                                            {user?.name?.[0]?.toUpperCase() || "?"}
                                        </div>
                                    )
                                ) : (
                                    <User className="w-6 h-6" />
                                )}

                                <span className="text-xs mt-1 font-medium">
                                    {isAuthenticated ? `Hi, ${user?.name?.split(" ")[0]}` : "Profile"}
                                </span>
                            </motion.div>





                            <AnimatePresence>
                                {profileHovered && renderProfileDropdown()}
                            </AnimatePresence>
                        </div>



                        <motion.div
                            className="hidden md:flex flex-col items-center cursor-pointer relative"
                            whileHover={{ scale: 1.1 }}
                            onClick={handleWishlistClick}
                        >
                            <Heart className="w-5 h-5" />
                            <span className="text-xs font-medium">Wishlist</span>
                            {wishlist.items.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                    {wishlist.items.length}
                                </span>
                            )}
                        </motion.div>


                        <motion.div
                            className="flex flex-col items-center cursor-pointer relative"
                            whileHover={{ scale: 1.1 }}
                            onClick={handleCartClick}
                        >
                            <div className="relative">
                                <ShoppingBag className="w-5 h-5" />
                                {/* {getCartItemsCount() > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                        {getCartItemsCount()}
                                    </span>
                                )} */}
                                {getCartItemsCount() > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                        {getCartItemsCount()}
                                    </span>
                                )}



                            </div>
                            <span className="text-xs font-medium">Bag</span>
                        </motion.div>

                        {/* Mobile Menu Button */}
                        <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Search */}

                <form onSubmit={handleSearch} className="md:hidden pb-4">
                    <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2">
                        <Search className="w-5 h-5 text-gray-400 mr-2" />
                        <input
                            type="text"
                            placeholder={placeholderText + "|"}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-transparent outline-none flex-1 text-sm"
                        />
                    </div>
                </form>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <motion.div
                        className="lg:hidden pb-4"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        <nav className="flex flex-col space-y-4">
                            {navItems.map((item) => (
                                <a key={item.name} href={item.href} className="text-gray-700 hover:text-pink-500 font-medium">
                                    {item.name}
                                    {item.isNew && <span className="ml-2 bg-red-500 text-white text-xs px-1 rounded">NEW</span>}
                                </a>
                            ))}
                        </nav>
                    </motion.div>
                )}

                {/* Dropdown Menu */}
                <AnimatePresence>
                    {renderDropdown()}
                </AnimatePresence>
            </div>
        </motion.header>
    )
}

export default Header