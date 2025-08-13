import api from "../utils/api"

// import axios from "axios"

export const wishlistService = {
  // Get user wishlist
  getWishlist: async () => {
    return await api.get("/wishlist")
  },

  // Add item to wishlist
  addToWishlist: async (productId) => {
    return await api.post("/wishlist", { productId })
  },

  // Remove item from wishlist
  removeFromWishlist: async (productId) => {
    return await api.delete(`/wishlist/${productId}`)
  },
}
