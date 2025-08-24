// import { useState, useEffect } from "react"
// import { cartService } from "../services/cartService"
// import toast from "react-hot-toast"

// export const useCart = () => {
//   const [cart, setCart] = useState({ cartItems: [] })
//   const [loading, setLoading] = useState(false)

//   const fetchCart = async () => {
//     try {
//       setLoading(true)
//       const cartData = await cartService.getCart()
//       setCart(cartData)
//     } catch (error) {
//       console.error("Error fetching cart:", error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const addToCart = async (productId, qty = 1, size) => {
//     try {
//       const updatedCart = await cartService.addToCart(productId, qty, size)
//       setCart(updatedCart)
//       toast.success("Item added to cart!")
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to add item to cart")
//       throw error
//     }
//   }

//   const updateCartItem = async (cartItemId, qty) => {
//     try {
//       const updatedCart = await cartService.updateCartItem(cartItemId, qty)
//       setCart(updatedCart)
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to update cart item")
//       throw error
//     }
//   }

//   const removeFromCart = async (cartItemId) => {
//     try {
//       const updatedCart = await cartService.removeFromCart(cartItemId)
//       setCart(updatedCart)
//       toast.success("Item removed from cart!")
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to remove item from cart")
//       throw error
//     }
//   }

//   const clearCart = async () => {
//     try {
//       await cartService.clearCart()
//       setCart({ cartItems: [] })
//       toast.success("Cart cleared!")
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to clear cart")
//       throw error
//     }
//   }

//   const getCartTotal = () => {
//     return cart.cartItems.reduce((total, item) => total + item.price * item.qty, 0)
//   }

//   const getCartItemsCount = () => {
//     return cart.cartItems.reduce((total, item) => total + item.qty, 0)
//   }

//   useEffect(() => {
//     const token = localStorage.getItem("token")
//     if (token) {
//       fetchCart()
//     }
//   }, [])

//   return {
//     cart,
//     loading,
//     addToCart,
//     updateCartItem,
//     removeFromCart,
//     clearCart,
//     getCartTotal,
//     getCartItemsCount,
//     fetchCart,
//   }
// }


import { useState, useEffect } from "react"
import { cartService } from "../services/cartService"
import toast from "react-hot-toast"

export const useCart = () => {
  const [cart, setCart] = useState({ cartItems: [] })
  const [loading, setLoading] = useState(false)

  const saveGuestCart = (items) => {
    localStorage.setItem("guest_cart", JSON.stringify(items))
  }

  const getGuestCart = () => {
    const stored = localStorage.getItem("guest_cart")
    return stored ? JSON.parse(stored) : []
  }

  const isLoggedIn = () => {
    const token = localStorage.getItem("token")
    return !!token
  }

  const fetchCart = async () => {
    setLoading(true)
    try {
      if (isLoggedIn()) {
        const cartData = await cartService.getCart()
        console.log("Fetched cart data:", cartData) // <-- ADD THIS

setCart({ cartItems: cartData.data }) // ✅ FIX: wrap in correct shape
      } else {
        // Load guest cart from localStorage
        setCart({ cartItems: getGuestCart() })
      }
    } catch (error) {
      console.error("Error fetching cart:", error)
      setCart({ cartItems: [] }) // fallback
    } finally {
      setLoading(false)
    }
  }

  // const addToCart = async (productId, qty = 1, size) => {
  //   try {
  //     if (isLoggedIn()) {
  //       const updatedCart = await cartService.addToCart(productId, qty, size)
  //       setCart(updatedCart)
  //     } else {
  //       // Guest logic
  //       const newItem = { productId, qty, size, _id: Date.now().toString(), price: 100 } // dummy price, replace dynamically if needed
  //       const updatedItems = [...getGuestCart(), newItem]
  //       saveGuestCart(updatedItems)
  //       setCart({ cartItems: updatedItems })
  //     }
  //     toast.success("Item added to cart!")
  //   } catch (error) {
  //     toast.error(error?.response?.data?.message || "Failed to add item to cart")
  //   }
  // }


   useEffect(() => {
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart))
      } catch (e) {
        console.error("Invalid cart data", e)
      }
    }
  }, [])

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])


//   const addToCart = async (productId, qty = 1, size) => {
//   try {
//     if (isLoggedIn()) {
//       const { data } = await cartService.addToCart(productId, qty, size)
//       setCart({ cartItems: data })
//     } else {
//       const newItem = { productId, qty, size, _id: Date.now().toString(), price: 100 }
//       const updatedItems = [...getGuestCart(), newItem]
//       saveGuestCart(updatedItems)
//       setCart({ cartItems: updatedItems })
//     }
//     toast.success("Item added to cart!")
//   } catch (error) {
//     toast.error(error?.response?.data?.message || "Failed to add item to cart")
//   }
// }

const addToCart = async (productId, qty = 1, size) => {
  try {
    const tempId = Date.now().toString();
    const newItem = { productId, qty, size, _id: tempId, price: 100 };

    // 🔥 Optimistically update state (instant UI)
    setCart(prev => ({
      cartItems: [...(prev?.cartItems || []), newItem],
    }));

    if (isLoggedIn()) {
      // Save to backend
      const { data } = await cartService.addToCart(productId, qty, size);

      // ✅ Sync with real cart from backend
      setCart({ cartItems: data });
    } else {
      // Guest logic stays the same
      const updatedItems = [...getGuestCart(), newItem];
      saveGuestCart(updatedItems);
      setCart({ cartItems: updatedItems });
    }

    toast.success("Item added to cart!");
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to add item to cart");

    // ❌ Rollback optimistic update if failed
    setCart(prev => ({
      cartItems: prev.cartItems.filter(item => item._id !== tempId),
    }));
  }
};


  const updateCartItem = async (cartItemId, qty) => {
    try {
      if (isLoggedIn()) {
        const updatedCart = await cartService.updateCartItem(cartItemId, qty)
        setCart(updatedCart)
      } else {
        const updated = getGuestCart().map(item =>
          item._id === cartItemId ? { ...item, qty } : item
        )
        saveGuestCart(updated)
        setCart({ cartItems: updated })
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update item")
    }
  }

  const removeFromCart = async (cartItemId) => {
    try {
      if (isLoggedIn()) {
        const updatedCart = await cartService.removeFromCart(cartItemId)
        setCart(updatedCart)
      } else {
        const filtered = getGuestCart().filter(item => item._id !== cartItemId)
        saveGuestCart(filtered)
        setCart({ cartItems: filtered })
      }
      toast.success("Item removed from cart!")
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to remove item")
    }
  }

  const clearCart = async () => {
    try {
      if (isLoggedIn()) {
        await cartService.clearCart()
        setCart({ cartItems: [] })
      } else {
        localStorage.removeItem("guest_cart")
        setCart({ cartItems: [] })
      }
      toast.success("Cart cleared!")
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to clear cart")
    }
  }

  const getCartTotal = () => {
    return cart.cartItems?.reduce((total, item) => total + (item.price || 0) * item.qty, 0) || 0
  }

  // const getCartItemsCount = () => {
  //   return cart.cartItems?.reduce((total, item) => total + item.qty, 0) || 0
  // }

//   const getCartItemsCount = () => {
//   return Array.isArray(state.items)
//     ? state.items.reduce((total, item) => total + item.qty, 0)
//     : 0
// }


const getCartItemsCount = () => {
  return Array.isArray(cart.cartItems)
    ? cart.cartItems.reduce((total, item) => total + item.qty, 0)
    : 0
}


  useEffect(() => {
    fetchCart()
  }, [])

  return {
    cart,
    loading,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    fetchCart,
  }
}
