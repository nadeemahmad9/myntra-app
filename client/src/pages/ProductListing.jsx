// import { useState, useEffect } from "react"
// import { useParams, useSearchParams, Link } from "react-router-dom"
// import { motion } from "framer-motion"
// import { Search, X, ChevronLeft, ChevronRight } from "lucide-react"

// const ProductListing = () => {
//     const { category } = useParams()
//     const [searchParams, setSearchParams] = useSearchParams()
//     const [products, setProducts] = useState([])
//     const [filteredProducts, setFilteredProducts] = useState([])
//     const [filters, setFilters] = useState({
//         brand: [],
//         price: "",
//         color: [],
//         discount: "",
//     })
//     const [sortBy, setSortBy] = useState("recommended")
//     const [currentPage, setCurrentPage] = useState(1)
//     const [searchQuery, setSearchQuery] = useState("")
//     const productsPerPage = 12

//     // Mock product data
//     const mockProducts = [
//         {
//             id: 1,
//             name: "Men Printed Sliders",
//             brand: "WROGN",
//             price: 492,
//             originalPrice: 899,
//             discount: 45,
//             rating: 4.0,
//             reviews: 43,
//             image: "/placeholder.svg?height=300&width=250",
//             colors: ["Black", "White"],
//             category: "flip-flops",
//         },
//         {
//             id: 2,
//             name: "Men Self Design Rubber Clogs",
//             brand: "HRX by Hrithik Roshan",
//             price: 482,
//             originalPrice: 899,
//             discount: 46,
//             rating: 3.4,
//             reviews: 111,
//             image: "/placeholder.svg?height=300&width=250",
//             colors: ["Grey", "White"],
//             category: "flip-flops",
//         },
//         {
//             id: 3,
//             name: "Men Fashion Flip Flops",
//             brand: "FLITE",
//             price: 249,
//             originalPrice: 499,
//             discount: 50,
//             rating: 4.2,
//             reviews: 157,
//             image: "/placeholder.svg?height=300&width=250",
//             colors: ["Green", "Black"],
//             category: "flip-flops",
//         },
//         {
//             id: 4,
//             name: "Men Thong Flip-Flops",
//             brand: "Woodland",
//             price: 374,
//             originalPrice: 499,
//             discount: 25,
//             rating: 3.9,
//             reviews: 93,
//             image: "/placeholder.svg?height=300&width=250",
//             colors: ["Blue", "Yellow"],
//             category: "flip-flops",
//         },
//         {
//             id: 5,
//             name: "Men Rubber Slip-On",
//             brand: "Koburg",
//             price: 499,
//             originalPrice: 799,
//             discount: 38,
//             rating: 3.9,
//             reviews: 93,
//             image: "/placeholder.svg?height=300&width=250",
//             colors: ["Black", "Red"],
//             category: "flip-flops",
//         },
//         {
//             id: 6,
//             name: "Men Thong Flip-Flops",
//             brand: "max",
//             price: 349,
//             originalPrice: 699,
//             discount: 50,
//             rating: 4.2,
//             reviews: 548,
//             image: "/placeholder.svg?height=300&width=250",
//             colors: ["Black", "Green"],
//             category: "flip-flops",
//         },
//     ]

//     const brands = [
//         "WROGN",
//         "HRX by Hrithik Roshan",
//         "FLITE",
//         "Woodland",
//         "Koburg",
//         "max",
//         "BERSACHE",
//         "PENNE",
//         "DRAGONFOOT",
//     ]
//     const colors = ["Black", "Grey", "White", "Navy Blue", "Blue", "Green", "Olive"]
//     const discountRanges = [
//         { label: "10% and above", value: "10" },
//         { label: "20% and above", value: "20" },
//         { label: "30% and above", value: "30" },
//         { label: "40% and above", value: "40" },
//         { label: "50% and above", value: "50" },
//         { label: "60% and above", value: "60" },
//         { label: "70% and above", value: "70" },
//         { label: "80% and above", value: "80" },
//         { label: "90% and above", value: "90" },
//     ]

//     useEffect(() => {
//         // Simulate API call
//         setProducts(mockProducts)
//         setFilteredProducts(mockProducts)
//     }, [category])

//     useEffect(() => {
//         applyFilters()
//     }, [filters, searchQuery, products])

//     const applyFilters = () => {
//         let filtered = [...products]

//         // Search filter
//         if (searchQuery) {
//             filtered = filtered.filter(
//                 (product) =>
//                     product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                     product.brand.toLowerCase().includes(searchQuery.toLowerCase()),
//             )
//         }

//         // Brand filter
//         if (filters.brand.length > 0) {
//             filtered = filtered.filter((product) => filters.brand.includes(product.brand))
//         }

//         // Price filter
//         if (filters.price) {
//             const [min, max] = filters.price.split("-").map(Number)
//             filtered = filtered.filter((product) => product.price >= min && product.price <= max)
//         }

//         // Color filter
//         if (filters.color.length > 0) {
//             filtered = filtered.filter((product) => product.colors.some((color) => filters.color.includes(color)))
//         }

//         // Discount filter
//         if (filters.discount) {
//             filtered = filtered.filter((product) => product.discount >= Number.parseInt(filters.discount))
//         }

//         // Sort
//         switch (sortBy) {
//             case "price-low":
//                 filtered.sort((a, b) => a.price - b.price)
//                 break
//             case "price-high":
//                 filtered.sort((a, b) => b.price - a.price)
//                 break
//             case "discount":
//                 filtered.sort((a, b) => b.discount - a.discount)
//                 break
//             case "rating":
//                 filtered.sort((a, b) => b.rating - a.rating)
//                 break
//             default:
//                 // Keep original order for recommended
//                 break
//         }

//         setFilteredProducts(filtered)
//         setCurrentPage(1)
//     }

//     const handleFilterChange = (filterType, value) => {
//         setFilters((prev) => {
//             if (filterType === "brand" || filterType === "color") {
//                 const currentValues = prev[filterType]
//                 const newValues = currentValues.includes(value)
//                     ? currentValues.filter((v) => v !== value)
//                     : [...currentValues, value]
//                 return { ...prev, [filterType]: newValues }
//             } else {
//                 return { ...prev, [filterType]: value }
//             }
//         })
//     }

//     const clearAllFilters = () => {
//         setFilters({
//             brand: [],
//             price: "",
//             color: [],
//             discount: "",
//         })
//         setSearchQuery("")
//     }

//     // Pagination
//     const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
//     const startIndex = (currentPage - 1) * productsPerPage
//     const endIndex = startIndex + productsPerPage
//     const currentProducts = filteredProducts.slice(startIndex, endIndex)

//     return (
//         <div className="min-h-screen bg-white">
//             {/* Breadcrumb */}
//             <div className="bg-gray-50 py-3">
//                 <div className="container mx-auto px-4">
//                     <nav className="text-sm text-gray-600">
//                         <Link to="/" className="hover:text-pink-500">
//                             Home
//                         </Link>
//                         <span className="mx-2">/</span>
//                         <Link to="/footwear" className="hover:text-pink-500">
//                             Footwear
//                         </Link>
//                         <span className="mx-2">/</span>
//                         <Link to="/flip-flops" className="hover:text-pink-500">
//                             Flip Flops
//                         </Link>
//                         <span className="mx-2">/</span>
//                         <span className="font-medium">Men Flip Flops</span>
//                     </nav>
//                 </div>
//             </div>

//             <div className="container mx-auto px-4 py-6">
//                 {/* Header */}
//                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
//                     <div>
//                         <h1 className="text-2xl font-bold mb-2">Men Flip Flops</h1>
//                         <p className="text-gray-600">{filteredProducts.length} items</p>
//                     </div>

//                     {/* Search Bar */}
//                     <div className="relative mt-4 md:mt-0">
//                         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                         <input
//                             type="text"
//                             placeholder="Search products..."
//                             value={searchQuery}
//                             onChange={(e) => setSearchQuery(e.target.value)}
//                             className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 w-64"
//                         />
//                     </div>
//                 </div>

//                 <div className="flex flex-col lg:flex-row gap-6">
//                     {/* Filters Sidebar */}
//                     <div className="lg:w-1/4">
//                         <div className="bg-white border border-gray-200 rounded-lg p-4 sticky top-4">
//                             <div className="flex justify-between items-center mb-4">
//                                 <h3 className="font-bold text-lg">FILTERS</h3>
//                                 <button onClick={clearAllFilters} className="text-pink-500 text-sm hover:underline">
//                                     CLEAR ALL
//                                 </button>
//                             </div>

//                             {/* Filter Tags */}
//                             <div className="mb-4">
//                                 <div className="flex flex-wrap gap-2">
//                                     {filters.price && (
//                                         <span className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
//                                             Rs. {filters.price}
//                                             <X className="w-4 h-4 ml-1 cursor-pointer" onClick={() => handleFilterChange("price", "")} />
//                                         </span>
//                                     )}
//                                     {filters.brand.map((brand) => (
//                                         <span key={brand} className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
//                                             {brand}
//                                             <X className="w-4 h-4 ml-1 cursor-pointer" onClick={() => handleFilterChange("brand", brand)} />
//                                         </span>
//                                     ))}
//                                 </div>
//                             </div>

//                             {/* Sort */}
//                             <div className="mb-6">
//                                 <label className="block text-sm font-medium mb-2">Sort by:</label>
//                                 <select
//                                     value={sortBy}
//                                     onChange={(e) => setSortBy(e.target.value)}
//                                     className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
//                                 >
//                                     <option value="recommended">Recommended</option>
//                                     <option value="price-low">Price: Low to High</option>
//                                     <option value="price-high">Price: High to Low</option>
//                                     <option value="discount">Discount</option>
//                                     <option value="rating">Customer Rating</option>
//                                 </select>
//                             </div>

//                             {/* Brand Filter */}
//                             <div className="mb-6">
//                                 <h4 className="font-medium mb-3">BRAND</h4>
//                                 <div className="space-y-2 max-h-48 overflow-y-auto">
//                                     {brands.map((brand) => (
//                                         <label key={brand} className="flex items-center">
//                                             <input
//                                                 type="checkbox"
//                                                 checked={filters.brand.includes(brand)}
//                                                 onChange={() => handleFilterChange("brand", brand)}
//                                                 className="mr-2"
//                                             />
//                                             <span className="text-sm">{brand}</span>
//                                         </label>
//                                     ))}
//                                 </div>
//                             </div>

//                             {/* Price Filter */}
//                             <div className="mb-6">
//                                 <h4 className="font-medium mb-3">PRICE</h4>
//                                 <div className="space-y-2">
//                                     <label className="flex items-center">
//                                         <input
//                                             type="radio"
//                                             name="price"
//                                             value="100-500"
//                                             checked={filters.price === "100-500"}
//                                             onChange={(e) => handleFilterChange("price", e.target.value)}
//                                             className="mr-2"
//                                         />
//                                         <span className="text-sm">Rs. 100 to Rs. 500</span>
//                                     </label>
//                                     <label className="flex items-center">
//                                         <input
//                                             type="radio"
//                                             name="price"
//                                             value="500-1000"
//                                             checked={filters.price === "500-1000"}
//                                             onChange={(e) => handleFilterChange("price", e.target.value)}
//                                             className="mr-2"
//                                         />
//                                         <span className="text-sm">Rs. 500 to Rs. 1000</span>
//                                     </label>
//                                     <label className="flex items-center">
//                                         <input
//                                             type="radio"
//                                             name="price"
//                                             value="1000-2000"
//                                             checked={filters.price === "1000-2000"}
//                                             onChange={(e) => handleFilterChange("price", e.target.value)}
//                                             className="mr-2"
//                                         />
//                                         <span className="text-sm">Rs. 1000 to Rs. 2000</span>
//                                     </label>
//                                 </div>
//                             </div>

//                             {/* Color Filter */}
//                             <div className="mb-6">
//                                 <h4 className="font-medium mb-3">COLOR</h4>
//                                 <div className="space-y-2">
//                                     {colors.map((color) => (
//                                         <label key={color} className="flex items-center">
//                                             <input
//                                                 type="checkbox"
//                                                 checked={filters.color.includes(color)}
//                                                 onChange={() => handleFilterChange("color", color)}
//                                                 className="mr-2"
//                                             />
//                                             <span className="text-sm">{color}</span>
//                                         </label>
//                                     ))}
//                                 </div>
//                             </div>

//                             {/* Discount Filter */}
//                             <div className="mb-6">
//                                 <h4 className="font-medium mb-3">DISCOUNT RANGE</h4>
//                                 <div className="space-y-2">
//                                     {discountRanges.map((range) => (
//                                         <label key={range.value} className="flex items-center">
//                                             <input
//                                                 type="radio"
//                                                 name="discount"
//                                                 value={range.value}
//                                                 checked={filters.discount === range.value}
//                                                 onChange={(e) => handleFilterChange("discount", e.target.value)}
//                                                 className="mr-2"
//                                             />
//                                             <span className="text-sm">{range.label}</span>
//                                         </label>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Products Grid */}
//                     <div className="lg:w-3/4">
//                         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                             {currentProducts.map((product, index) => (
//                                 <motion.div
//                                     key={product.id}
//                                     className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
//                                     initial={{ opacity: 0, y: 20 }}
//                                     animate={{ opacity: 1, y: 0 }}
//                                     transition={{ delay: index * 0.1 }}
//                                     onClick={() => (window.location.href = `/product/${product.id}`)}
//                                 >
//                                     <div className="relative">
//                                         <img
//                                             src={product.image || "/placeholder.svg"}
//                                             alt={product.name}
//                                             className="w-full h-48 object-cover"
//                                         />
//                                         <div className="absolute top-2 right-2 bg-white rounded-full p-1">
//                                             <span className="text-xs font-bold text-green-600">{product.discount}% OFF</span>
//                                         </div>
//                                     </div>
//                                     <div className="p-3">
//                                         <h3 className="font-medium text-sm mb-1">{product.brand}</h3>
//                                         <p className="text-xs text-gray-600 mb-2 line-clamp-2">{product.name}</p>
//                                         <div className="flex items-center mb-2">
//                                             <span className="text-sm font-bold">Rs. {product.price}</span>
//                                             <span className="text-xs text-gray-500 line-through ml-2">Rs. {product.originalPrice}</span>
//                                             <span className="text-xs text-orange-500 ml-2">({product.discount}% OFF)</span>
//                                         </div>
//                                         <div className="flex items-center">
//                                             <div className="flex items-center">
//                                                 <span className="text-xs font-medium">{product.rating}</span>
//                                                 <span className="text-yellow-400 ml-1">★</span>
//                                             </div>
//                                             <span className="text-xs text-gray-500 ml-2">({product.reviews})</span>
//                                         </div>
//                                     </div>
//                                 </motion.div>
//                             ))}
//                         </div>

//                         {/* Pagination */}
//                         {totalPages > 1 && (
//                             <div className="flex justify-center items-center mt-8 space-x-2">
//                                 <button
//                                     onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                                     disabled={currentPage === 1}
//                                     className="flex items-center px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//                                 >
//                                     <ChevronLeft className="w-4 h-4 mr-1" />
//                                     Previous
//                                 </button>

//                                 {[...Array(totalPages)].map((_, index) => (
//                                     <button
//                                         key={index + 1}
//                                         onClick={() => setCurrentPage(index + 1)}
//                                         className={`px-4 py-2 rounded-lg ${currentPage === index + 1 ? "bg-pink-500 text-white" : "border border-gray-300 hover:bg-gray-50"
//                                             }`}
//                                     >
//                                         {index + 1}
//                                     </button>
//                                 ))}

//                                 <button
//                                     onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//                                     disabled={currentPage === totalPages}
//                                     className="flex items-center px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//                                 >
//                                     Next
//                                     <ChevronRight className="w-4 h-4 ml-1" />
//                                 </button>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ProductListing


// import { useState, useEffect } from "react"
// import { useParams, useSearchParams, Link } from "react-router-dom"
// import { motion } from "framer-motion"
// import { X, ChevronLeft, ChevronRight } from "lucide-react"
// import { productService } from "../services/productService" // Adjust import

// const ProductListing = () => {
//     const { category } = useParams()
//     const [searchParams] = useSearchParams()
//     const searchQuery = searchParams.get("q")
//     const [allProducts, setAllProducts] = useState([])
//     const [filteredProducts, setFilteredProducts] = useState([])
//     const [filters, setFilters] = useState({
//         brand: [],
//         price: "",
//         color: [],
//         discount: "",
//     })
//     const [sortBy, setSortBy] = useState("recommended")
//     const [currentPage, setCurrentPage] = useState(1)
//     const productsPerPage = 12

//     // Get unique brands and colors from current products
//     const getBrands = () => {
//         const brands = [...new Set(allProducts.map((product) => product.brand))]
//         return brands.sort()
//     }

//     const getColors = () => {
//         const colors = [...new Set(allProducts.flatMap((product) => product.colors))]
//         return colors.sort()
//     }

//     const discountRanges = [
//         { label: "10% and above", value: "10" },
//         { label: "20% and above", value: "20" },
//         { label: "30% and above", value: "30" },
//         { label: "40% and above", value: "40" },
//         { label: "50% and above", value: "50" },
//         { label: "60% and above", value: "60" },
//         { label: "70% and above", value: "70" },
//         { label: "80% and above", value: "80" },
//         { label: "90% and above", value: "90" },
//     ]

//     // useEffect(() => {
//     //     let productList = []

//     //     if (searchQuery) {
//     //         productList = searchProducts(searchQuery)
//     //     } else if (category) {
//     //         productList = getProductsByCategory(category)
//     //     } else {
//     //         productList = products
//     //     }

//     //     setAllProducts(productList)
//     //     setFilteredProducts(productList)
//     // }, [category, searchQuery])

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 let productList = []

//                 if (searchQuery) {
//                     productList = await productService.searchProducts(searchQuery)
//                 } else if (category) {
//                     productList = await productService.getProductsByCategory(category)
//                 } else {
//                     productList = await productService.getAllProducts()
//                 }

//                 setAllProducts(productList)
//                 setFilteredProducts(productList)
//             } catch (error) {
//                 console.error("Error fetching products:", error)
//             }
//         }

//         fetchProducts()
//     }, [category, searchQuery])
//     useEffect(() => {
//         applyFilters()
//     }, [filters, sortBy, allProducts])

//     const applyFilters = () => {
//         let filtered = [...allProducts]

//         // Brand filter
//         if (filters.brand.length > 0) {
//             filtered = filtered.filter((product) => filters.brand.includes(product.brand))
//         }

//         // Price filter
//         if (filters.price) {
//             const [min, max] = filters.price.split("-").map(Number)
//             filtered = filtered.filter((product) => product.price >= min && product.price <= max)
//         }

//         // Color filter
//         if (filters.color.length > 0) {
//             filtered = filtered.filter((product) => product.colors.some((color) => filters.color.includes(color)))
//         }

//         // Discount filter
//         if (filters.discount) {
//             filtered = filtered.filter((product) => product.discount >= Number.parseInt(filters.discount))
//         }

//         // Sort
//         switch (sortBy) {
//             case "price-low":
//                 filtered.sort((a, b) => a.price - b.price)
//                 break
//             case "price-high":
//                 filtered.sort((a, b) => b.price - a.price)
//                 break
//             case "discount":
//                 filtered.sort((a, b) => b.discount - a.discount)
//                 break
//             case "rating":
//                 filtered.sort((a, b) => b.rating - a.rating)
//                 break
//             default:
//                 // Keep original order for recommended
//                 break
//         }

//         setFilteredProducts(filtered)
//         setCurrentPage(1)
//     }

//     const handleFilterChange = (filterType, value) => {
//         setFilters((prev) => {
//             if (filterType === "brand" || filterType === "color") {
//                 const currentValues = prev[filterType]
//                 const newValues = currentValues.includes(value)
//                     ? currentValues.filter((v) => v !== value)
//                     : [...currentValues, value]
//                 return { ...prev, [filterType]: newValues }
//             } else {
//                 return { ...prev, [filterType]: value }
//             }
//         })
//     }

//     const clearAllFilters = () => {
//         setFilters({
//             brand: [],
//             price: "",
//             color: [],
//             discount: "",
//         })
//     }

//     // Pagination
//     const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
//     const startIndex = (currentPage - 1) * productsPerPage
//     const endIndex = startIndex + productsPerPage
//     const currentProducts = filteredProducts.slice(startIndex, endIndex)

//     const getCategoryTitle = () => {
//         if (searchQuery) return `Search results for "${searchQuery}"`
//         switch (category) {
//             case "men":
//                 return "Men's Fashion"
//             case "women":
//                 return "Women's Fashion"
//             case "kids":
//                 return "Kids Fashion"
//             case "home":
//                 return "Home & Living"
//             case "beauty":
//                 return "Beauty & Personal Care"
//             case "genz":
//                 return "GenZ Fashion"
//             default:
//                 return "Products"
//         }
//     }

//     return (
//         <div className="min-h-screen bg-white">
//             {/* Breadcrumb */}
//             <div className="bg-gray-50 py-3">
//                 <div className="container mx-auto px-4">
//                     <nav className="text-sm text-gray-600">
//                         <Link to="/" className="hover:text-pink-500">
//                             Home
//                         </Link>
//                         <span className="mx-2">/</span>
//                         <span className="font-medium">{getCategoryTitle()}</span>
//                     </nav>
//                 </div>
//             </div>

//             <div className="container mx-auto px-4 py-6">
//                 {/* Header */}
//                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
//                     <div>
//                         <h1 className="text-2xl font-bold mb-2">{getCategoryTitle()}</h1>
//                         <p className="text-gray-600">{filteredProducts.length} items</p>
//                     </div>

//                     {/* Sort Dropdown */}
//                     <div className="mt-4 md:mt-0">
//                         <select
//                             value={sortBy}
//                             onChange={(e) => setSortBy(e.target.value)}
//                             className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
//                         >
//                             <option value="recommended">Sort by: Recommended</option>
//                             <option value="price-low">Price: Low to High</option>
//                             <option value="price-high">Price: High to Low</option>
//                             <option value="discount">Discount</option>
//                             <option value="rating">Customer Rating</option>
//                         </select>
//                     </div>
//                 </div>

//                 <div className="flex flex-col lg:flex-row gap-6">
//                     {/* Filters Sidebar */}
//                     <div className="lg:w-1/4">
//                         <div className="bg-white border border-gray-200 rounded-lg p-4 sticky top-4">
//                             <div className="flex justify-between items-center mb-4">
//                                 <h3 className="font-bold text-lg">FILTERS</h3>
//                                 <button onClick={clearAllFilters} className="text-pink-500 text-sm hover:underline">
//                                     CLEAR ALL
//                                 </button>
//                             </div>

//                             {/* Filter Tags */}
//                             <div className="mb-4">
//                                 <div className="flex flex-wrap gap-2">
//                                     {filters.price && (
//                                         <span className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
//                                             Rs. {filters.price}
//                                             <X className="w-4 h-4 ml-1 cursor-pointer" onClick={() => handleFilterChange("price", "")} />
//                                         </span>
//                                     )}
//                                     {filters.brand.map((brand) => (
//                                         <span key={brand} className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
//                                             {brand}
//                                             <X className="w-4 h-4 ml-1 cursor-pointer" onClick={() => handleFilterChange("brand", brand)} />
//                                         </span>
//                                     ))}
//                                 </div>
//                             </div>

//                             {/* Brand Filter */}
//                             {getBrands().length > 0 && (
//                                 <div className="mb-6">
//                                     <h4 className="font-medium mb-3">BRAND</h4>
//                                     <div className="space-y-2 max-h-48 overflow-y-auto">
//                                         {getBrands().map((brand) => (
//                                             <label key={brand} className="flex items-center">
//                                                 <input
//                                                     type="checkbox"
//                                                     checked={filters.brand.includes(brand)}
//                                                     onChange={() => handleFilterChange("brand", brand)}
//                                                     className="mr-2"
//                                                 />
//                                                 <span className="text-sm">{brand}</span>
//                                             </label>
//                                         ))}
//                                     </div>
//                                 </div>
//                             )}

//                             {/* Price Filter */}
//                             <div className="mb-6">
//                                 <h4 className="font-medium mb-3">PRICE</h4>
//                                 <div className="space-y-2">
//                                     <label className="flex items-center">
//                                         <input
//                                             type="radio"
//                                             name="price"
//                                             value="100-500"
//                                             checked={filters.price === "100-500"}
//                                             onChange={(e) => handleFilterChange("price", e.target.value)}
//                                             className="mr-2"
//                                         />
//                                         <span className="text-sm">Rs. 100 to Rs. 500</span>
//                                     </label>
//                                     <label className="flex items-center">
//                                         <input
//                                             type="radio"
//                                             name="price"
//                                             value="500-1000"
//                                             checked={filters.price === "500-1000"}
//                                             onChange={(e) => handleFilterChange("price", e.target.value)}
//                                             className="mr-2"
//                                         />
//                                         <span className="text-sm">Rs. 500 to Rs. 1000</span>
//                                     </label>
//                                     <label className="flex items-center">
//                                         <input
//                                             type="radio"
//                                             name="price"
//                                             value="1000-2000"
//                                             checked={filters.price === "1000-2000"}
//                                             onChange={(e) => handleFilterChange("price", e.target.value)}
//                                             className="mr-2"
//                                         />
//                                         <span className="text-sm">Rs. 1000 to Rs. 2000</span>
//                                     </label>
//                                 </div>
//                             </div>

//                             {/* Color Filter */}
//                             {getColors().length > 0 && (
//                                 <div className="mb-6">
//                                     <h4 className="font-medium mb-3">COLOR</h4>
//                                     <div className="space-y-2">
//                                         {getColors().map((color) => (
//                                             <label key={color} className="flex items-center">
//                                                 <input
//                                                     type="checkbox"
//                                                     checked={filters.color.includes(color)}
//                                                     onChange={() => handleFilterChange("color", color)}
//                                                     className="mr-2"
//                                                 />
//                                                 <span className="text-sm">{color}</span>
//                                             </label>
//                                         ))}
//                                     </div>
//                                 </div>
//                             )}

//                             {/* Discount Filter */}
//                             <div className="mb-6">
//                                 <h4 className="font-medium mb-3">DISCOUNT RANGE</h4>
//                                 <div className="space-y-2">
//                                     {discountRanges.map((range) => (
//                                         <label key={range.value} className="flex items-center">
//                                             <input
//                                                 type="radio"
//                                                 name="discount"
//                                                 value={range.value}
//                                                 checked={filters.discount === range.value}
//                                                 onChange={(e) => handleFilterChange("discount", e.target.value)}
//                                                 className="mr-2"
//                                             />
//                                             <span className="text-sm">{range.label}</span>
//                                         </label>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Products Grid */}
//                     <div className="lg:w-3/4">
//                         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                             {currentProducts.map((product, index) => (
//                                 <motion.div
//                                     key={product._id}
//                                     className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
//                                     initial={{ opacity: 0, y: 20 }}
//                                     animate={{ opacity: 1, y: 0 }}
//                                     transition={{ delay: index * 0.1 }}
//                                 >
//                                     <Link to={`/product/${product._id}`}>
//                                         <div className="relative">
//                                             <img
//                                                 src={product.image || "/placeholder.svg"}
//                                                 alt={product.name}
//                                                 className="w-full h-48 object-cover"
//                                             />
//                                             <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1">
//                                                 <span className="text-xs font-bold text-green-600">{product.discount}% OFF</span>
//                                             </div>
//                                         </div>
//                                         <div className="p-3">
//                                             <h3 className="font-medium text-sm mb-1">{product.brand}</h3>
//                                             <p className="text-xs text-gray-600 mb-2 line-clamp-2">{product.name}</p>
//                                             <div className="flex items-center mb-2">
//                                                 <span className="text-sm font-bold">Rs. {product.price}</span>
//                                                 <span className="text-xs text-gray-500 line-through ml-2">Rs. {product.originalPrice}</span>
//                                                 <span className="text-xs text-orange-500 ml-2">({product.discount}% OFF)</span>
//                                             </div>
//                                             <div className="flex items-center">
//                                                 <div className="flex items-center">
//                                                     <span className="text-xs font-medium">{product.rating}</span>
//                                                     <span className="text-yellow-400 ml-1">★</span>
//                                                 </div>
//                                                 <span className="text-xs text-gray-500 ml-2">({product.reviews})</span>
//                                             </div>
//                                         </div>
//                                     </Link>
//                                 </motion.div>
//                             ))}
//                         </div>

//                         {/* No Products Found */}
//                         {currentProducts.length === 0 && (
//                             <div className="text-center py-12">
//                                 <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
//                                 <button
//                                     onClick={clearAllFilters}
//                                     className="mt-4 px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
//                                 >
//                                     Clear All Filters
//                                 </button>
//                             </div>
//                         )}

//                         {/* Pagination */}
//                         {totalPages > 1 && (
//                             <div className="flex justify-center items-center mt-8 space-x-2">
//                                 <button
//                                     onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                                     disabled={currentPage === 1}
//                                     className="flex items-center px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//                                 >
//                                     <ChevronLeft className="w-4 h-4 mr-1" />
//                                     Previous
//                                 </button>

//                                 {[...Array(totalPages)].map((_, index) => (
//                                     <button
//                                         key={index + 1}
//                                         onClick={() => setCurrentPage(index + 1)}
//                                         className={`px-4 py-2 rounded-lg ${currentPage === index + 1 ? "bg-pink-500 text-white" : "border border-gray-300 hover:bg-gray-50"
//                                             }`}
//                                     >
//                                         {index + 1}
//                                     </button>
//                                 ))}

//                                 <button
//                                     onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//                                     disabled={currentPage === totalPages}
//                                     className="flex items-center px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//                                 >
//                                     Next
//                                     <ChevronRight className="w-4 h-4 ml-1" />
//                                 </button>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ProductListing


// src/pages/ProductListing.jsx
import { useState, useEffect } from "react"
import { useParams, useSearchParams, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { productService } from "../services/productService"

const ProductListing = ({ categoryProp }) => {
    const { category: categoryFromURL } = useParams()
    const [searchParams] = useSearchParams()
    const searchQuery = searchParams.get("q")

    const category = categoryProp || categoryFromURL; // use prop if available

    const [allProducts, setAllProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const [filters, setFilters] = useState({
        brand: [],
        price: "",
        color: [],
        discount: "",
    })
    const [sortBy, setSortBy] = useState("recommended")
    const [currentPage, setCurrentPage] = useState(1)
    const productsPerPage = 12

    // const getBrands = () =>
    //     [...new Set(allProducts.map((p) => p.brand))].sort()
    // const getColors = () =>
    //     [...new Set(allProducts.flatMap((p) => p.colors))].sort()

    const getBrands = () =>
        Array.isArray(allProducts)
            ? [...new Set(allProducts.map((p) => p.brand))].sort()
            : [];

    const getColors = () =>
        Array.isArray(allProducts)
            ? [...new Set(allProducts.flatMap((p) => p.colors))].sort()
            : [];


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
    //     setLoading(true)
    //     const fetchProducts = async () => {
    //         try {
    //             let productList = []

    //             if (searchQuery) {
    //                 productList = await productService.searchProducts(searchQuery)
    //             } else if (category) {
    //                 productList = await productService.getProductsByCategory(category)
    //             } else {
    //                 productList = await productService.getProducts()
    //             }

    //             setAllProducts(productList)
    //             setFilteredProducts(productList)
    //         } catch (e) {
    //             console.error("Error fetching products:", e)
    //             setError(e.message || "Failed to fetch products")
    //         } finally {
    //             setLoading(false)
    //         }
    //     }

    //     fetchProducts()
    // }, [category, searchQuery])

    useEffect(() => {
        setLoading(true);
        const fetchProducts = async () => {
            try {
                let productList = [];

                if (searchQuery) {
                    productList = await productService.searchProducts(searchQuery);
                } else if (category) {
                    productList = await productService.getProductsByCategory(category);
                } else {
                    productList = await productService.getProducts();
                }

                console.log("Fetched products for category:", category, productList); // ✅ Debug log

                setAllProducts(productList);
                setFilteredProducts(productList);
            } catch (e) {
                console.error("Error fetching products:", e);
                setError(e.message || "Failed to fetch products");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [category, searchQuery]); // ✅ Keep using `category` (from prop or URL)

    useEffect(() => {
        const applyFilters = () => {
            // let updated = [...allProducts]

            let updated = Array.isArray(allProducts) ? [...allProducts] : [];


            if (filters.brand.length) {
                updated = updated.filter((p) => filters.brand.includes(p.brand))
            }
            if (filters.price) {
                const [min, max] = filters.price.split("-").map(Number)
                updated = updated.filter((p) => p.price >= min && p.price <= max)
            }
            if (filters.color.length) {
                updated = updated.filter((p) =>
                    p.colors.some((c) => filters.color.includes(c))
                )
            }
            if (filters.discount) {
                updated = updated.filter((p) => p.discount >= +filters.discount)
            }

            switch (sortBy) {
                case "price-low":
                    updated.sort((a, b) => a.price - b.price)
                    break
                case "price-high":
                    updated.sort((a, b) => b.price - a.price)
                    break
                case "discount":
                    updated.sort((a, b) => b.discount - a.discount)
                    break
                case "rating":
                    updated.sort((a, b) => b.rating - a.rating)
                    break
                default:
                    break
            }

            setFilteredProducts(updated)
            setCurrentPage(1)
        }

        applyFilters()
    }, [filters, sortBy, allProducts])

    const handleFilterChange = (type, value) => {
        setFilters((prev) => {
            if (type === "brand" || type === "color") {
                const arr = prev[type]
                return {
                    ...prev,
                    [type]: arr.includes(value)
                        ? arr.filter((v) => v !== value)
                        : [...arr, value],
                }
            }
            return { ...prev, [type]: value }
        })
    }

    const clearAllFilters = () => {
        setFilters({ brand: [], price: "", color: [], discount: "" })
        setSortBy("recommended")
    }

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
    const start = (currentPage - 1) * productsPerPage
    // const currentProducts = filteredProducts.slice(start, start + productsPerPage)

    const currentProducts = Array.isArray(filteredProducts)
        ? filteredProducts.slice(start, start + productsPerPage)
        : [];


    const getTitle = () => {
        if (searchQuery) return `Search results for "${searchQuery}"`
        if (category) return category.charAt(0).toUpperCase() + category.slice(1)
        return "All Products"
    }

    if (loading) return <div className="p-4">Loading products...</div>
    if (error) return <div className="p-4 text-red-600">Error: {error}</div>

    return (
        <div className="min-h-screen bg-white">
            {/* Breadcrumb */}
            <div className="bg-gray-50 py-3">
                <div className="container mx-auto px-4">
                    <nav className="text-sm text-gray-600">
                        <Link to="/" className="hover:text-pink-500">Home</Link>
                        <span className="mx-2">/</span>
                        <span className="font-medium">{getTitle()}</span>
                    </nav>
                </div>
            </div>

            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                    <h1 className="text-2xl font-bold">{getTitle()}</h1>
                    <p className="text-gray-600">{filteredProducts.length} items</p>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-2 border rounded-lg"
                    >
                        <option value="recommended">Recommended</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="discount">Discount</option>
                        <option value="rating">Rating</option>
                    </select>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Sidebar */}
                    <aside className="lg:w-1/4">
                        <div className="border p-4 rounded sticky top-4 bg-white">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold">FILTERS</h3>
                                <button className="text-pink-500" onClick={clearAllFilters}>CLEAR ALL</button>
                            </div>

                            <div className="mb-4">
                                {filters.brand.map((b) => (
                                    <span key={b} className="bg-gray-100 px-2 py-1 rounded mr-2">
                                        {b} <X className="inline cursor-pointer" onClick={() => handleFilterChange("brand", b)} />
                                    </span>
                                ))}
                            </div>

                            {getBrands().length > 0 && (
                                <div className="mb-4">
                                    <h4 className="font-medium">Brand</h4>
                                    {getBrands().map((b) => (
                                        <label key={b} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={filters.brand.includes(b)}
                                                onChange={() => handleFilterChange("brand", b)}
                                                className="mr-2"
                                            />
                                            {b}
                                        </label>
                                    ))}
                                </div>
                            )}

                            <div className="mb-4">
                                <h4 className="font-medium">Price</h4>
                                {["100-500", "500-1000", "1000-2000"].map((v) => (
                                    <label key={v} className="flex items-center">
                                        <input
                                            type="radio"
                                            name="price"
                                            value={v}
                                            checked={filters.price === v}
                                            onChange={(e) => handleFilterChange("price", e.target.value)}
                                            className="mr-2"
                                        />
                                        Rs. {v.replace("-", " to ")}
                                    </label>
                                ))}
                            </div>

                            {getColors().length > 0 && (
                                <div className="mb-4">
                                    <h4 className="font-medium">Color</h4>
                                    {getColors().map((c) => (
                                        <label key={c} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={filters.color.includes(c)}
                                                onChange={() => handleFilterChange("color", c)}
                                                className="mr-2"
                                            />
                                            {c}
                                        </label>
                                    ))}
                                </div>
                            )}

                            <div className="mb-4">
                                <h4 className="font-medium">Discount</h4>
                                {discountRanges.map((r) => (
                                    <label key={r.value} className="flex items-center">
                                        <input
                                            type="radio"
                                            name="discount"
                                            value={r.value}
                                            checked={filters.discount === r.value}
                                            onChange={(e) => handleFilterChange("discount", e.target.value)}
                                            className="mr-2"
                                        />
                                        {r.label}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Products */}
                    <main className="lg:w-3/4">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {currentProducts.map((p, idx) => (
                                <motion.div
                                    key={p._id}
                                    className="border rounded overflow-hidden hover:shadow-lg cursor-pointer"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                >
                                    <Link to={`/product/${p._id}`}>
                                        <img
                                            src={p.image || "/placeholder.svg"}
                                            alt={p.name}
                                            className="w-full h-40 object-cover"
                                        />
                                        <div className="p-2">
                                            <h3 className="font-semibold text-sm">{p.brand}</h3>
                                            <p className="text-xs text-gray-600 line-clamp-2">{p.name}</p>
                                            <div className="flex items-center">
                                                <span className="font-bold">Rs. {p.price}</span>
                                                <span className="text-gray-500 line-through ml-2">Rs. {p.originalPrice}</span>
                                                <span className="text-orange-500 ml-2">({p.discount}% OFF)</span>
                                            </div>
                                            <div className="flex items-center text-xs text-gray-600">
                                                <span>{p.rating} ★</span>
                                                <span className="ml-2">({p.reviews})</span>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        {/* Empty state */}
                        {currentProducts.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-gray-600">No products found.</p>
                            </div>
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center mt-6 space-x-2">
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                >
                                    <ChevronLeft />
                                </button>

                                {Array.from({ length: totalPages }, (_, i) => (
                                    <button
                                        key={i + 1}
                                        className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-pink-500 text-white" : "border"}`}
                                        onClick={() => setCurrentPage(i + 1)}
                                    >
                                        {i + 1}
                                    </button>
                                ))}

                                <button
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                >
                                    <ChevronRight />
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    )
}

export default ProductListing
