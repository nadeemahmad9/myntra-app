import { useState, useEffect } from "react"
import { authService } from "../services/authService"
import toast from "react-hot-toast"
import axios from "axios"

export const useAuth = () => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

   useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      setUser(JSON.parse(userData));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/google/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  }, []);


const login = async (credentials) => {
  try {
    setLoading(true)
    const userData = await authService.login(credentials)

    localStorage.setItem("token", userData.token)
    localStorage.setItem("user", JSON.stringify(userData.user)) // ✅ FIXED HERE

    setUser(userData.user) // ✅ SET ONLY THE USER OBJECT
    setIsAuthenticated(true)
    toast.success("Login successful!")
    return userData
  } catch (error) {
    toast.error(error.response?.data?.message || "Login failed")
    throw error
  } finally {
    setLoading(false)
  }
}



  
  const register = async (userData) => {
  try {
    setLoading(true)
    const newUser = await authService.register(userData)

    // ✅ Save to localStorage
    localStorage.setItem("token", newUser.token)
    localStorage.setItem("user", JSON.stringify(newUser.user))

    setUser(newUser.user)
    setIsAuthenticated(true)
    toast.success("Registration successful!")
    return newUser
  } catch (error) {
    toast.error(error.response?.data?.message || "Registration failed")
    throw error
  } finally {
    setLoading(false)
  }
}

  const logout = () => {
    authService.logout()
    setUser(null)
    setIsAuthenticated(false)
    toast.success("Logged out successfully!")
  }

  const updateProfile = async (profileData) => {
    try {
      const updatedUser = await authService.updateProfile(profileData)
      setUser(updatedUser)
      toast.success("Profile updated successfully!")
      return updatedUser
    } catch (error) {
      toast.error(error.response?.data?.message || "Profile update failed")
      throw error
    }
  }

  return {
    user,
    isAuthenticated,
    loading,
    fetchUser,
    login,
    register,
    logout,
    updateProfile,
  }
}