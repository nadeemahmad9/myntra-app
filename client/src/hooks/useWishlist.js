import { useState, useEffect } from "react"
import { wishlistService } from "../services/wishlistService"
import toast from "react-hot-toast"

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState({ wishlistItems: [] })
  const [loading, setLoading] = useState(false)

  const fetchWishlist = async () => {
    try {
      setLoading(true)
      const wishlistData = await wishlistService.getWishlist()
      setWishlist(wishlistData)
    } catch (error) {
      console.error("Error fetching wishlist:", error)
    } finally {
      setLoading(false)
    }
  }

  const addToWishlist = async (productId) => {
    try {
      const updatedWishlist = await wishlistService.addToWishlist(productId)
      setWishlist(updatedWishlist)
      toast.success("Item added to wishlist!")
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add item to wishlist")
      throw error
    }
  }

  const removeFromWishlist = async (productId) => {
    try {
      const updatedWishlist = await wishlistService.removeFromWishlist(productId)
      setWishlist(updatedWishlist)
      toast.success("Item removed from wishlist!")
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to remove item from wishlist")
      throw error
    }
  }

  const isInWishlist = (productId) => {
    return wishlist.wishlistItems.some((item) => item.product._id === productId)
  }

  const clearWishlist = async () => {
    try {
      await wishlistService.clearWishlist()
      setWishlist({ wishlistItems: [] })
      toast.success("Wishlist cleared!")
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to clear wishlist")
      throw error
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      fetchWishlist()
    }
  }, [])

  return {
    wishlist,
    loading,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
    fetchWishlist,
  }
}
