import api from "../utils/api"


export const cartService = {
  // Get user cart (for authenticated users)
getCart: async () => {
    const res =  await api.get("/cart")
  return { cartItems: res.data } // ✅ Now it matches what UI expects
  },

  // Add item to cart (for authenticated users)
   addToCart: async (productId, qty, size) => {
    const res = await api.post("/cart", { productId, qty, size }) // ✅ Token will be attached
        return res.data

  },

  updateItem: async (itemId, qty) => {
    const res = await api.put(`/cart/${itemId}`, { qty });
    return res.data;
},

  // Remove item from cart (for authenticated users)
  removeFromCart: async (itemId) => {
    const res =  await api.delete(`/cart/${itemId}`)
    return res.data
  },

  // Clear cart (for authenticated users)
  clearCart: async () => {
    return await api.delete("/cart")
  },

  // Guest cart functions (localStorage)
  getGuestCart: () => {
    const cart = localStorage.getItem("guestCart")
    return cart ? JSON.parse(cart) : { cartItems: [] }
  },

  addToGuestCart: (product, qty, size) => {
    const cart = cartService.getGuestCart()
    const existingItem = cart.cartItems.find((item) => item.product._id === product._id && item.size === size)

    if (existingItem) {
      existingItem.qty += qty
    } else {
      cart.cartItems.push({
        _id: Date.now().toString(),
        product,
        name: product.name,
        image: product.images[0],
        price: product.price,
        qty,
        size,
      })
    }

    localStorage.setItem("guestCart", JSON.stringify(cart))
    return cart
  },

  updateGuestCartItem: (cartItemId, qty) => {
    const cart = cartService.getGuestCart()
    const item = cart.cartItems.find((item) => item._id === cartItemId)

    if (item) {
      if (qty <= 0) {
        cart.cartItems = cart.cartItems.filter((item) => item._id !== cartItemId)
      } else {
        item.qty = qty
      }
      localStorage.setItem("guestCart", JSON.stringify(cart))
    }

    return cart
  },

  removeFromGuestCart: (cartItemId) => {
    const cart = cartService.getGuestCart()
    cart.cartItems = cart.cartItems.filter((item) => item._id !== cartItemId)
    localStorage.setItem("guestCart", JSON.stringify(cart))
    return cart
  },

  clearGuestCart: () => {
    localStorage.removeItem("guestCart")
    return { cartItems: [] }
  },

  // Sync guest cart with user cart after login
  syncGuestCartWithUser: async () => {
    const guestCart = cartService.getGuestCart()

    if (guestCart.cartItems.length > 0) {
      // Add each guest cart item to user cart
      for (const item of guestCart.cartItems) {
        try {
          await cartService.addToCart(item.product._id, item.qty, item.size)
        } catch (error) {
          console.error("Error syncing cart item:", error)
        }
      }

      // Clear guest cart after sync
      cartService.clearGuestCart()
    }
  },
}
