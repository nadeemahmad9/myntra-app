// import api from "../utils/api"

import api from "../utils/api"


export const orderService = {
  // Create order
  createOrder: async (orderData) => {
          console.log(orderData);

    return await api.post("/orders", orderData)
    
  },


  // Get order by ID
  getOrderById: async (id) => {
    return await api.get(`/orders/${id}`)
  },

  // Get user orders
  getMyOrders: async () => {
    return await api.get("/orders/myorders")
  },

  // Update order to paid
  updateOrderToPaid: async (id, paymentResult) => {
    return await api.put(`/orders/${id}/pay`, paymentResult)
  },
}
