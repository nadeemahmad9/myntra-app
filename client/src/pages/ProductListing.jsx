import { useEffect, useState } from "react"
import { useParams, useSearchParams, Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { listProducts } from "../redux/slices/productSlice"
import { motion } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

const ProductListing = ({ categoryProp }) => {
    const dispatch = useDispatch()
    const { category: categoryFromURL } = useParams()
    const [searchParams, setSearchParams] = useSearchParams()

    const searchQuery = searchParams.get("q") || ""
    const pageNumber = searchParams.get("page") || 1
    const category = categoryProp || categoryFromURL || ""

    const { products, loading, error, pages, page } = useSelector((state) => state.products)

    const [filters, setFilters] = useState({ brand: [], discount: "" })
    const [sortBy, setSortBy] = useState("recommended")

    useEffect(() => {
        dispatch(listProducts({
            keyword: searchQuery,
            category: category,
            pageNumber: pageNumber
        }))
    }, [dispatch, searchQuery, category, pageNumber])

    // ✅ FIXED: Filter + Sort Logic
    const filteredProducts = products?.filter(p => {
        const brandMatch = filters.brand.length === 0 || filters.brand.includes(p.brand)
        const discountMatch = !filters.discount || p.discount >= +filters.discount
        return brandMatch && discountMatch
    }).sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price
        if (sortBy === "price-high") return b.price - a.price
        return 0
    }) || []

    const handleFilterChange = (type, value) => {
        setFilters(prev => ({
            ...prev,
            [type]: prev[type].includes(value)
                ? prev[type].filter(v => v !== value)
                : [...prev[type], value]
        }))
    }

    // ✅ FIXED: Pagination Handler
    const handlePageChange = (p) => {
        setSearchParams({ q: searchQuery, page: p })
    }

    if (loading) return <div className="p-10 text-center">Loading...</div>
    if (error) return <div className="p-10 text-red-500 text-center">{error}</div>

    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto px-4 py-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold uppercase">{category || "All Products"}</h1>
                        <p className="text-gray-500 text-sm">{filteredProducts.length} items found</p>
                    </div>
                    {/* Filter Active Chips */}
                    <div className="flex gap-2">
                        {filters.brand.map(b => (
                            <span key={b} className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-xs">
                                {b} <X size={14} className="cursor-pointer" onClick={() => handleFilterChange("brand", b)} />
                            </span>
                        ))}
                    </div>
                    <select
                        className="border p-2 rounded text-sm"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="recommended">Recommended</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                    </select>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    <aside className="w-full lg:w-64 space-y-6">
                        <div className="border-b pb-4">
                            <h3 className="font-bold mb-3">BRANDS</h3>
                            {["Nike", "Adidas", "Puma", "Roadster"].map(brand => (
                                <label key={brand} className="flex items-center space-x-2 mb-1 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={filters.brand.includes(brand)}
                                        onChange={() => handleFilterChange("brand", brand)}
                                    />
                                    <span className="text-sm">{brand}</span>
                                </label>
                            ))}
                        </div>
                    </aside>

                    <main className="flex-1">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {filteredProducts.map((p, idx) => (
                                <motion.div key={p._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.05 }} className="group">
                                    <Link to={`/product/${p._id}`}>
                                        <div className="relative overflow-hidden bg-gray-100 aspect-[3/4]">
                                            <img src={p.images?.[0] || p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                                        </div>
                                        <div className="mt-3">
                                            <h3 className="font-bold text-sm">{p.brand}</h3>
                                            <p className="text-gray-600 text-xs truncate">{p.name}</p>
                                            <div className="flex items-center space-x-2 mt-1">
                                                <span className="font-bold text-sm">Rs. {p.price}</span>
                                                <span className="text-orange-500 text-xs">({p.discount}% OFF)</span>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        {/* ✅ FIXED: Actual Pagination UI */}
                        {pages > 1 && (
                            <div className="mt-12 flex justify-center items-center space-x-4">
                                <button
                                    disabled={page === 1}
                                    onClick={() => handlePageChange(page - 1)}
                                    className="p-2 border rounded disabled:opacity-30"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <span className="text-sm font-medium">Page {page} of {pages}</span>
                                <button
                                    disabled={page === pages}
                                    onClick={() => handlePageChange(page + 1)}
                                    className="p-2 border rounded disabled:opacity-30"
                                >
                                    <ChevronRight size={20} />
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