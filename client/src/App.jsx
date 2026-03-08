import { Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

// Components
import Header from "./components/Header"
import Footer from "./components/Footer"

// Pages
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ProductDetail from "./pages/ProductDetail"
import Cart from "./pages/Cart"
import Wishlist from "./pages/Wishlist"
import Checkout from "./pages/Checkout"
import Profile from "./pages/Profile"
import ProductListing from "./pages/ProductListing"
import SubcategoryListing from "./pages/SubCategoryListing"
import OrderSuccess from "./pages/OrderSuccess"
import OrderDetails from "./pages/OrderDetails"
import MyOrders from "./pages/myOrders"

// Category Pages
import Men from "./pages/Men"
import Women from "./pages/Women"
import Kids from "./pages/Kids"
import HomeCategory from "./pages/HomeCategory"
import Beauty from "./pages/Beauty"

// Redux Actions (Taaki app load hote hi cart/user sync ho jaye)
import { fetchCart } from "./redux/slices/cartSlice"

import "./App.css"
import ScrollToTop from "./components/ScrollToTop"

function App() {
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector((state) => state.auth)

  // ✅ App load hote hi Cart fetch karein agar user logged in hai
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart())
    }
  }, [isAuthenticated, dispatch])

  return (
    <div className="App">
      <ScrollToTop />
      {/* ✅ No more CartProvider or AppProvider here */}
      <Header />

      <main className="min-h-[80vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/products/search" element={<ProductListing />} />

          {/* Subcategory Route */}
          <Route path="/products/subcategory/:subcategory" element={<SubcategoryListing />} />

          {/* Categories */}
          <Route path="/men" element={<Men />} />
          <Route path="/women" element={<Women />} />
          <Route path="/kids" element={<Kids />} />
          <Route path="/home" element={<HomeCategory />} />
          <Route path="/beauty" element={<Beauty />} />

          {/* Orders */}
          <Route path="/orders/mine" element={<MyOrders />} />
          <Route path="/order/:id" element={<OrderDetails />} />
          <Route path="/order-success/:id" element={<OrderSuccess />} />
        </Routes>
      </main>

      <Footer />

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
            borderRadius: '8px',
          },
          success: {
            iconTheme: {
              primary: "#22c55e", // Myntra Pink
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: '#ff4b4b', // Isse Red error icon aayega
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  )
}

export default App