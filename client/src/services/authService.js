// import api from "../utils/api"

// import axios from "axios"

// export const authService = {
//   // Login user
//   login: async (email, password) => {
//     return await api.post("/users/login", { email, password })
//   },

//   // Register user
//   register: async (name, email, password) => {
//     return await api.post("/users", { name, email, password })
//   },

//   // Get user profile
//   getProfile: async () => {
//     return await api.get("/users/profile")
//   },

//   // Update user profile
//   updateProfile: async (userData) => {
//     return await api.put("/users/profile", userData)
//   },
// }



import api from "../utils/api"

export const authService = {
  // Login user
  // login: async (email, password) => {
  //   return await api.post("/users/login", { email, password })
    

  // },

  // authService.js

// login: async (email, password) => {
//   const response = await api.post("/users/login", { email, password });

//   const token = response.data.token;
//   if (token) {
//     localStorage.setItem("token", token); // ✅ store token for Axios to pick
//   }

// localStorage.setItem("user", JSON.stringify(response.data.user)); // ✅ correct
// return response.data.user; // ✅ just return the user, not whole response
// },

// login: async (email, password) => {
//   const response = await api.post("/users/login", { email, password });

//   const token = response.data.token;
//   const user = response.data.user;

//   if (token) {
//     localStorage.setItem("token", token);
//   }

//   localStorage.setItem("user", JSON.stringify(user)); // ✅ only save user
//   console.log("Local user:", localStorage.getItem("user"));

//   return user; // ✅ return just the user object
// },

login: async (email, password) => {
  const response = await api.post("/users/login", { email, password });

  console.log("Login Response:", response.data); // <== 🔍 Add this line

  const token = response.data.token;
  const user = response.data.user;

  if (token) {
    localStorage.setItem("token", token);
  }

  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
    console.log("✅ Local user set:", user);
  } else {
    console.log("❌ No user returned from backend!");
  }

  return user;
},


  
logout:  async () => {
    localStorage.removeItem("user")
},

  // Register user
  // register: async (name, email, password) => {
  //   return await api.post("/users", { name, email, password })
  // },

  register: async (userData) => {
  const response = await api.post("/users", userData);

  const token = response.data.token;
  const user = response.data.user;

  if (token) {
    localStorage.setItem("token", token);
  }

  localStorage.setItem("user", JSON.stringify(user)); // ✅ Fix here too
  return user;
},

  // Get user profile
  getProfile: async () => {
    return await api.get("/users/profile")
  },

  // Update user profile
  updateProfile: async (userData) => {
    return await api.put("/users/profile", userData)
  },

  // ✅ Add this function to fix your error
  getCurrentUser: () => {
    const user = localStorage.getItem("user")
    return user ? JSON.parse(user) : null
  },
  
}
