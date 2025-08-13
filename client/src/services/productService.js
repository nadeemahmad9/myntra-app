// import api from "../utils/api"

import api from "../utils/api"

export const productService = {
  // Get all products with filters
  getProducts: async (params = {}) => {
    return await api.get("/products", params)
  },

  // Get product by ID
  getProductById: async (id) => {
    return await api.get(`/products/${id}`)
  },

  // Search products
  searchProducts: async (query, filters = {}) => {
    return await api.get("/products", { search: query, ...filters })
  },

  // Get products by category
  getProductsByCategory: async (category, filters = {}) => {
    return await api.get("/products", { category, ...filters })
  },

  // Get featured products
  getFeaturedProducts: async () => {
    return await api.get("/products", { featured: true })
  },

  // Create product review
  createReview: async (productId, reviewData) => {
    return await api.post(`/products/${productId}/reviews`, reviewData)
  },

  // Admin: Create product
  createProduct: async (productData) => {
    return await api.post("/products", productData)
  },

  // Admin: Update product
  updateProduct: async (id, productData) => {
    return await api.put(`/products/${id}`, productData)
  },

  // Admin: Delete product
  deleteProduct: async (id) => {
    return await api.delete(`/products/${id}`)
  },
}
