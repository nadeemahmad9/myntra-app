// import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// import Header from "./components/Header"
// import Home from "./pages/Home"
// import Footer from "./components/Footer"
// import "./App.css"
// import Men from "./pages/Men"
// import Women from "./pages/Women"
// import ProductListing from "./pages/ProductListing"
// import ProductDetail from "./pages/ProductDetail"
// import Cart from "./pages/Cart"
// import Beauty from "./pages/Beauty"
// import Kids from "./pages/Kids"
// import Wishlist from "./pages/Wishlist"
// // import { AuthProvider } from "./context/AuthContext"
// // import { CartProvider } from "./context/CartContext"
// // import { WishlistProvider } from "./context/WishlistContext"
// import HomeCategory from "./pages/HomeCategory"
// import SubcategoryListing from "./pages/SubCategoryListing"
// import Checkout from "./pages/Checkout"
// import Register from "./pages/Register"
// import Login from "./pages/Login"
// import Profile from "./pages/Profile"
// import { AppProvider } from "./context/AppContext"

// function App() {
//   return (
//     <AppProvider>


//       <div className="App">
//         <Header />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/men" element={<Men />} />
//           <Route path="/women" element={<Women />} />
//           <Route path="/kids" element={<Kids />} />
//           <Route path="/home" element={<HomeCategory />} />
//           <Route path="/beauty" element={<Beauty />} />
//           {/* <Route path="/genz" element={<Genz />} /> */}
//           <Route path="/products/:category" element={<ProductListing />} />
//           <Route path="/products/subcategory/:subcategory" element={<SubcategoryListing />} />
//           <Route path="/products/search" element={<ProductListing />} />

//           <Route path="/product/:id" element={<ProductDetail />} />
//           <Route path="/cart" element={<Cart />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/wishlist" element={<Wishlist />} />
//           <Route path="/checkout" element={<Checkout />} />
//           <Route path="/profile" element={<Profile />} />
//         </Routes>
//         <Footer />
//       </div>


//     </AppProvider>
//   )
// }

// export default App


import { Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { AppProvider } from "./context/AppContext"

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
// import AdminDashboard from "./pages/Admin/AdminDashboard"

// Category Pages
import Men from "./pages/Men"
import Women from "./pages/Women"
import Kids from "./pages/Kids"
import HomeCategory from "./pages/HomeCategory"
import Beauty from "./pages/Beauty"
// import Genz from "./pages/Genz"

import "./App.css"
import SubcategoryListing from "./pages/SubCategoryListing"
import { CartProvider } from "./context/CartContext"

function App() {
  return (
    <AppProvider>

      <div className="App">
        <CartProvider>
          <Header />
          <main>
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

              <Route path="/products/subcategory/:subcategory" element={<SubcategoryListing />} />

              <Route path="/men" element={<Men />} />
              <Route path="/women" element={<Women />} />
              <Route path="/kids" element={<Kids />} />
              <Route path="/home" element={<HomeCategory />} />
              <Route path="/beauty" element={<Beauty />} />
              {/* <Route path="/products/genz" element={<Genz />} /> */}
              {/* <Route path="/admin" element={<AdminDashboard />} /> */}
            </Routes>
          </main>
        </CartProvider>
        <Footer />
        <Toaster
          position="top-left"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#363636",
              color: "#fff",
            },
            success: {
              duration: 3000,
              theme: {
                primary: "#4aed88",
              },
            },
          }}
        />
      </div>
    </AppProvider>
  )
}

export default App
