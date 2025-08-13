import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"


const SubcategoryListing = () => {
    const { subcategory } = useParams()
    const [allProducts, setAllProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [filters, setFilters] = useState({
        brand: [],
        price: "",
        color: [],
        discount: "",
    })
    const [sortBy, setSortBy] = useState("recommended")
    const [currentPage, setCurrentPage] = useState(1)
    const productsPerPage = 12

    // Get unique brands and colors from current products
    const getBrands = () => {
        const brands = [...new Set(allProducts.map((product) => product.brand))]
        return brands.sort()
    }

    const getColors = () => {
        const colors = [...new Set(allProducts.flatMap((product) => product.colors))]
        return colors.sort()
    }

    const discountRanges = [
        { label: "10% and above", value: "10" },
        { label: "20% and above", value: "20" },
        { label: "30% and above", value: "30" },
        { label: "40% and above", value: "40" },
        { label: "50% and above", value: "50" },
        { label: "60% and above", value: "60" },
        { label: "70% and above", value: "70" },
        { label: "80% and above", value: "80" },
        { label: "90% and above", value: "90" },
    ]

    // useEffect(() => {
    //     const productList = getProductsBySubcategory(subcategory)
    //     setAllProducts(productList)
    //     setFilteredProducts(productList)
    // }, [subcategory])


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products/subcategory/${subcategory}`)
                const data = await res.json()
                setAllProducts(data)
                setFilteredProducts(data)
            } catch (error) {
                console.error("Error fetching products:", error)
            }
        }

        fetchProducts()
    }, [subcategory])

    useEffect(() => {
        applyFilters()
    }, [filters, sortBy, allProducts])

    const applyFilters = () => {
        let filtered = [...allProducts]

        // Brand filter
        if (filters.brand.length > 0) {
            filtered = filtered.filter((product) => filters.brand.includes(product.brand))
        }

        // Price filter
        if (filters.price) {
            const [min, max] = filters.price.split("-").map(Number)
            filtered = filtered.filter((product) => product.price >= min && product.price <= max)
        }

        // Color filter
        if (filters.color.length > 0) {
            filtered = filtered.filter((product) => product.colors.some((color) => filters.color.includes(color)))
        }

        // Discount filter
        if (filters.discount) {
            filtered = filtered.filter((product) => product.discount >= Number.parseInt(filters.discount))
        }

        // Sort
        switch (sortBy) {
            case "price-low":
                filtered.sort((a, b) => a.price - b.price)
                break
            case "price-high":
                filtered.sort((a, b) => b.price - a.price)
                break
            case "discount":
                filtered.sort((a, b) => b.discount - a.discount)
                break
            case "rating":
                filtered.sort((a, b) => b.rating - a.rating)
                break
            default:
                // Keep original order for recommended
                break
        }

        setFilteredProducts(filtered)
        setCurrentPage(1)
    }

    const handleFilterChange = (filterType, value) => {
        setFilters((prev) => {
            if (filterType === "brand" || filterType === "color") {
                const currentValues = prev[filterType]
                const newValues = currentValues.includes(value)
                    ? currentValues.filter((v) => v !== value)
                    : [...currentValues, value]
                return { ...prev, [filterType]: newValues }
            } else {
                return { ...prev, [filterType]: value }
            }
        })
    }

    const clearAllFilters = () => {
        setFilters({
            brand: [],
            price: "",
            color: [],
            discount: "",
        })
    }

    // Pagination
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
    const startIndex = (currentPage - 1) * productsPerPage
    const endIndex = startIndex + productsPerPage
    const currentProducts = filteredProducts.slice(startIndex, endIndex)

    const getSubcategoryTitle = () => {
        return subcategory
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Breadcrumb */}
            <div className="bg-gray-50 py-3">
                <div className="container mx-auto px-4">
                    <nav className="text-sm text-gray-600">
                        <Link to="/" className="hover:text-pink-500">
                            Home
                        </Link>
                        <span className="mx-2">/</span>
                        <span className="font-medium">{getSubcategoryTitle()}</span>
                    </nav>
                </div>
            </div>

            <div className="container mx-auto px-4 py-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold mb-2">{getSubcategoryTitle()}</h1>
                        <p className="text-gray-600">{filteredProducts.length} items</p>
                    </div>

                    {/* Sort Dropdown */}
                    <div className="mt-4 md:mt-0">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        >
                            <option value="recommended">Sort by: Recommended</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="discount">Discount</option>
                            <option value="rating">Customer Rating</option>
                        </select>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Filters Sidebar */}
                    <div className="lg:w-1/4">
                        <div className="bg-white border border-gray-200 rounded-lg p-4 sticky top-4">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-lg">FILTERS</h3>
                                <button onClick={clearAllFilters} className="text-pink-500 text-sm hover:underline">
                                    CLEAR ALL
                                </button>
                            </div>

                            {/* Filter Tags */}
                            <div className="mb-4">
                                <div className="flex flex-wrap gap-2">
                                    {filters.price && (
                                        <span className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
                                            Rs. {filters.price}
                                            <X className="w-4 h-4 ml-1 cursor-pointer" onClick={() => handleFilterChange("price", "")} />
                                        </span>
                                    )}
                                    {filters.brand.map((brand) => (
                                        <span key={brand} className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
                                            {brand}
                                            <X className="w-4 h-4 ml-1 cursor-pointer" onClick={() => handleFilterChange("brand", brand)} />
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Brand Filter */}
                            {getBrands().length > 0 && (
                                <div className="mb-6">
                                    <h4 className="font-medium mb-3">BRAND</h4>
                                    <div className="space-y-2 max-h-48 overflow-y-auto">
                                        {getBrands().map((brand) => (
                                            <label key={brand} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={filters.brand.includes(brand)}
                                                    onChange={() => handleFilterChange("brand", brand)}
                                                    className="mr-2"
                                                />
                                                <span className="text-sm">{brand}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Price Filter */}
                            <div className="mb-6">
                                <h4 className="font-medium mb-3">PRICE</h4>
                                <div className="space-y-2">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="price"
                                            value="100-500"
                                            checked={filters.price === "100-500"}
                                            onChange={(e) => handleFilterChange("price", e.target.value)}
                                            className="mr-2"
                                        />
                                        <span className="text-sm">Rs. 100 to Rs. 500</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="price"
                                            value="500-1000"
                                            checked={filters.price === "500-1000"}
                                            onChange={(e) => handleFilterChange("price", e.target.value)}
                                            className="mr-2"
                                        />
                                        <span className="text-sm">Rs. 500 to Rs. 1000</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="price"
                                            value="1000-2000"
                                            checked={filters.price === "1000-2000"}
                                            onChange={(e) => handleFilterChange("price", e.target.value)}
                                            className="mr-2"
                                        />
                                        <span className="text-sm">Rs. 1000 to Rs. 2000</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="price"
                                            value="2000-5000"
                                            checked={filters.price === "2000-5000"}
                                            onChange={(e) => handleFilterChange("price", e.target.value)}
                                            className="mr-2"
                                        />
                                        <span className="text-sm">Rs. 2000 to Rs. 5000</span>
                                    </label>
                                </div>
                            </div>

                            {/* Color Filter */}
                            {getColors().length > 0 && (
                                <div className="mb-6">
                                    <h4 className="font-medium mb-3">COLOR</h4>
                                    <div className="space-y-2">
                                        {getColors().map((color) => (
                                            <label key={color} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={filters.color.includes(color)}
                                                    onChange={() => handleFilterChange("color", color)}
                                                    className="mr-2"
                                                />
                                                <span className="text-sm">{color}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Discount Filter */}
                            <div className="mb-6">
                                <h4 className="font-medium mb-3">DISCOUNT RANGE</h4>
                                <div className="space-y-2">
                                    {discountRanges.map((range) => (
                                        <label key={range.value} className="flex items-center">
                                            <input
                                                type="radio"
                                                name="discount"
                                                value={range.value}
                                                checked={filters.discount === range.value}
                                                onChange={(e) => handleFilterChange("discount", e.target.value)}
                                                className="mr-2"
                                            />
                                            <span className="text-sm">{range.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="lg:w-3/4">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {currentProducts.map((product, index) => (
                                <motion.div
                                    key={product._id}
                                    className="bg-white   rounded-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link to={`/product/${product._id}`}>
                                        <div className="relative">
                                            <img
                                                src={product.image || "/placeholder.svg"}
                                                alt={product.name}
                                                className="w-full h-full object-contain "
                                            />
                                            <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1">
                                                <span className="text-xs font-bold text-green-600">{product.discount}% OFF</span>
                                            </div>
                                        </div>
                                        <div className="p-2">
                                            <h3 className="font-medium text-sm mb-1">{product.brand}</h3>
                                            <p className="text-xs text-gray-600 mb-2 line-clamp-2">{product.name}</p>
                                            <div className="flex items-center mb-2">
                                                <span className="text-sm font-bold">Rs. {product.price}</span>
                                                <span className="text-xs text-gray-500 line-through ml-2">Rs. {product.originalPrice}</span>
                                                <span className="text-xs text-orange-500 ml-2">({product.discount}% OFF)</span>
                                            </div>
                                            {/* <div className="flex items-center ">
                                                <div className="flex items-center">
                                                    <span className="text-xs font-medium">{product.rating}</span>
                                                    <span className="text-yellow-400 ml-1 ">★★★★</span>
                                                </div>
                                                <span className="text-xs text-gray-500 ml-2">
                                                    ({Array.isArray(product.reviews) ? product.reviews.length : (typeof product.reviews === "number" ? product.reviews : 0)})
                                                </span>

                                            </div> */}
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        {/* No Products Found */}
                        {currentProducts.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-gray-500 text-lg">No products found in this category.</p>
                                <Link
                                    to="/"
                                    className="mt-4 inline-block px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
                                >
                                    Continue Shopping
                                </Link>
                            </div>
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center mt-8 space-x-2">
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="flex items-center px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                >
                                    <ChevronLeft className="w-4 h-4 mr-1" />
                                    Previous
                                </button>

                                {[...Array(totalPages)].map((_, index) => (
                                    <button
                                        key={index + 1}
                                        onClick={() => setCurrentPage(index + 1)}
                                        className={`px-4 py-2 rounded-lg ${currentPage === index + 1 ? "bg-pink-500 text-white" : "border border-gray-300 hover:bg-gray-50"
                                            }`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}

                                <button
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="flex items-center px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                >
                                    Next
                                    <ChevronRight className="w-4 h-4 ml-1" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SubcategoryListing
