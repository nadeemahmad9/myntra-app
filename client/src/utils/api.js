// const API_BASE_URL =  "http://localhost:5000/api"

// class ApiService {
//   async request(endpoint, options = {}) {
//     const url = `${API_BASE_URL}${endpoint}`
//     const token = localStorage.getItem("token")

//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//         ...options.headers,
//       },
//       ...options,
//     }

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }

//     try {
//       const response = await fetch(url, config)

//       if (!response.ok) {
//         if (response.status === 401) {
//           localStorage.removeItem("token")
//           localStorage.removeItem("user")
//           window.location.href = "/login"
//         }

//         const errorData = await response.json().catch(() => ({}))
//         throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
//       }

//       return await response.json()
//     } catch (error) {
//       throw error
//     }
//   }

//   get(endpoint, params = {}) {
//     const queryString = new URLSearchParams(params).toString()
//     const url = queryString ? `${endpoint}?${queryString}` : endpoint

//     return this.request(url, {
//       method: "GET",
//     })
//   }

//   post(endpoint, data) {
//     return this.request(endpoint, {
//       method: "POST",
//       body: JSON.stringify(data),
//     })
//   }

//   put(endpoint, data) {
//     return this.request(endpoint, {
//       method: "PUT",
//       body: JSON.stringify(data),
//     })
//   }

//   delete(endpoint) {
//     return this.request(endpoint, {
//       method: "DELETE",
//     })
//   }
// }

// export default new ApiService()


// import axios from "axios"

// const api = axios.create({
//   baseURL: "http://localhost:5000/api", // adjust to your backend port/path
// })

// export default api

// import axios from "axios"
// import { authService } from "../services/authService"

// const api = axios.create({
//   baseURL: "http://localhost:5000/api",
// })

// // Add token to every request if logged in
// api.interceptors.request.use(
//   (config) => {
//     const user = authService.getCurrentUser()
//     if (user && user.token) {
//       config.headers.Authorization = `Bearer ${user.token}`
//     }
//     return config
//   },
//   (error) => Promise.reject(error)
// )

// export default api



// api.js
// import axios from "axios"

// const api = axios.create({
//   baseURL: "http://localhost:5000/api",
//   // withCredentials: true, // good if using cookie-based auth
// })

// // ⛳️ Interceptor: add token from localStorage or context
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token")
//       console.log("🛡 Sending token in request:", token) // ✅ Add for debug

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`
//   }
//   return config
// },(error) => {
//   return Promise.reject(error)
// })

// export default api

import dotenv from 'dotenv'
import axios from "axios";


// dotenv.config()

const api = axios.create({
     baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,

  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
        // console.log("🛡 Sending token in request:", token) // ✅ Add for debug

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
