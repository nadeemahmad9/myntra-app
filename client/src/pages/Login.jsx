

import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import { useApp } from "../context/AppContext"

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState({})

    const { login, googleLogin, loading } = useApp() // ✅ added googleLogin
    const navigate = useNavigate()
    const location = useLocation()

    const from = location.state?.from?.pathname || "/"
    const redirect = new URLSearchParams(location.search).get("redirect")

    // ✅ Detect Google OAuth token on page load
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search)
        const token = queryParams.get("token")

        if (token) {
            googleLogin(token)
                .then(() => {
                    navigate("/") // Redirect to homepage after login
                })
                .catch(() => {
                    navigate("/login")
                })
        }
    }, [location.search, googleLogin, navigate])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }))
        }
    }

    const validateForm = () => {
        const newErrors = {}

        if (!formData.email) {
            newErrors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid"
        }

        if (!formData.password) {
            newErrors.password = "Password is required"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) return

        try {
            await login(formData.email, formData.password)
            navigate(redirect ? `/${redirect}` : from, { replace: true })
        } catch (error) {
            console.error("Login error:", error)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <motion.div
                className="max-w-md w-full space-y-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Or{" "}
                        <Link to="/register" className="font-medium text-pink-600 hover:text-pink-500">
                            create a new account
                        </Link>
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`appearance-none relative block w-full pl-10 pr-3 py-2 border ${errors.email ? "border-red-300" : "border-gray-300"
                                        } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm`}
                                    placeholder="Enter your email"
                                />
                            </div>
                            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`appearance-none relative block w-full pl-10 pr-10 py-2 border ${errors.password ? "border-red-300" : "border-gray-300"
                                        } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm`}
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-400" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400" />
                                    )}
                                </button>
                            </div>
                            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="text-sm">
                            <Link to="/forgot-password" className="font-medium text-pink-600 hover:text-pink-500">
                                Forgot your password?
                            </Link>
                        </div>
                    </div>

                    <div>
                        <motion.button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {loading ? "Signing in..." : "Sign in"}
                        </motion.button>

                        {/* Google Login Button */}
                        <div className="mt-6">
                            <a
                                href={`${import.meta.env.VITE_BACKEND_URL}/auth/google`}

                                className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                <img
                                    src="https://developers.google.com/identity/images/g-logo.png"
                                    alt="Google"
                                    className="w-5 h-5 mr-2"
                                />
                                Sign in with Google
                            </a>
                        </div>
                    </div>
                </form>
            </motion.div>
        </div>
    )
}

export default Login
