import { useState } from "react"
// import { motion } from "framer-motion"
// import { Eye, EyeOff } from "lucide-react"
// import { useApp } from "../context/AppContext"
// import { Link, useNavigate } from "react-router-dom"

// const Register = () => {
//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//         phone: "",
//     })
//     const [showPassword, setShowPassword] = useState(false)
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false)
//     const [errors, setErrors] = useState({})
//     const { register, loading } = useApp()
//     const navigate = useNavigate()

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         })
//         // Clear error when user starts typing
//         if (errors[e.target.name]) {
//             setErrors({
//                 ...errors,
//                 [e.target.name]: "",
//             })
//         }
//     }

//     const validateForm = () => {
//         const newErrors = {}

//         if (!formData.name) {
//             newErrors.name = "Name is required"
//         }

//         if (!formData.email) {
//             newErrors.email = "Email is required"
//         } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//             newErrors.email = "Email is invalid"
//         }

//         if (!formData.password) {
//             newErrors.password = "Password is required"
//         } else if (formData.password.length < 6) {
//             newErrors.password = "Password must be at least 6 characters"
//         }

//         if (!formData.confirmPassword) {
//             newErrors.confirmPassword = "Please confirm your password"
//         } else if (formData.password !== formData.confirmPassword) {
//             newErrors.confirmPassword = "Passwords do not match"
//         }

//         setErrors(newErrors)
//         return Object.keys(newErrors).length === 0
//     }

//     // const handleSubmit = (e) => {
//     //     e.preventDefault()
//     //     if (validateForm()) {
//     //         // Mock registration - in real app, this would be an API call
//     //         const userData = {
//     //             id: Date.now(),
//     //             name: formData.name,
//     //             email: formData.email,
//     //         }
//     //         login(userData)
//     //         navigate("/")
//     //     }
//     // }

//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         if (validateForm()) {
//             try {
//                 await register(formData)
//                 navigate("/")
//             } catch (error) {
//                 // Error is handled in the register function
//             }
//         }
//     }


//     return (
//         <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
//             <motion.div
//                 className="max-w-md w-full bg-white rounded-lg shadow-md p-8"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//             >
//                 <div className="text-center mb-8">
//                     <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
//                     <p className="text-gray-600 mt-2">Join Myntra today</p>
//                 </div>

//                 <form onSubmit={handleSubmit} className="space-y-6">
//                     <div>
//                         <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
//                             Full Name
//                         </label>
//                         <input
//                             type="text"
//                             id="name"
//                             name="name"
//                             value={formData.name}
//                             onChange={handleChange}
//                             className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 ${errors.name ? "border-red-500" : "border-gray-300"
//                                 }`}
//                             placeholder="Enter your full name"
//                         />
//                         {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
//                     </div>

//                     <div>
//                         <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//                             Email Address
//                         </label>
//                         <input
//                             type="email"
//                             id="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 ${errors.email ? "border-red-500" : "border-gray-300"
//                                 }`}
//                             placeholder="Enter your email"
//                         />
//                         {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
//                     </div>

//                     <div>
//                         <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
//                             Password
//                         </label>
//                         <div className="relative">
//                             <input
//                                 type={showPassword ? "text" : "password"}
//                                 id="password"
//                                 name="password"
//                                 value={formData.password}
//                                 onChange={handleChange}
//                                 className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 ${errors.password ? "border-red-500" : "border-gray-300"
//                                     }`}
//                                 placeholder="Enter your password"
//                             />
//                             <button
//                                 type="button"
//                                 onClick={() => setShowPassword(!showPassword)}
//                                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                             >
//                                 {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                             </button>
//                         </div>
//                         {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
//                     </div>

//                     <div>
//                         <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
//                             Confirm Password
//                         </label>
//                         <div className="relative">
//                             <input
//                                 type={showConfirmPassword ? "text" : "password"}
//                                 id="confirmPassword"
//                                 name="confirmPassword"
//                                 value={formData.confirmPassword}
//                                 onChange={handleChange}
//                                 className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 ${errors.confirmPassword ? "border-red-500" : "border-gray-300"
//                                     }`}
//                                 placeholder="Confirm your password"
//                             />
//                             <button
//                                 type="button"
//                                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                             >
//                                 {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                             </button>
//                         </div>
//                         {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
//                     </div>

//                     <motion.button
//                         type="submit"
//                         disabled={loading}
//                         className="w-full bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 font-medium disabled:opacity-50"
//                         whileHover={{ scale: 1.02 }}
//                         whileTap={{ scale: 0.98 }}
//                     >
//                         {loading ? "Creating Account..." : "Create Account"}
//                     </motion.button>
//                 </form>

//                 <div className="mt-6 text-center">
//                     <p className="text-sm text-gray-600">
//                         Already have an account?{" "}
//                         <Link to="/login" className="font-medium text-pink-600 hover:text-pink-500">
//                             Sign in
//                         </Link>
//                     </p>
//                 </div>
//             </motion.div>
//         </div>
//     )
// }

// export default Register


import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react"
import { useApp } from "../context/AppContext"

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [errors, setErrors] = useState({})

    const { register, loading } = useApp()
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }))
        }
    }

    const validateForm = () => {
        const newErrors = {}

        if (!formData.name.trim()) {
            newErrors.name = "Name is required"
        }

        if (!formData.email) {
            newErrors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid"
        }

        if (!formData.phone) {
            newErrors.phone = "Phone number is required"
        } else if (!/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = "Phone number must be 10 digits"
        }

        if (!formData.password) {
            newErrors.password = "Password is required"
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters"
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password"
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) return

        try {
            await register({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                password: formData.password,
            })
            navigate("/")
        } catch (error) {
            console.error("Registration error:", error)
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
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Or{" "}
                        <Link to="/login" className="font-medium text-pink-600 hover:text-pink-500">
                            sign in to your existing account
                        </Link>
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Full Name
                            </label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`appearance-none relative block w-full pl-10 pr-3 py-2 border ${errors.name ? "border-red-300" : "border-gray-300"
                                        } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm`}
                                    placeholder="Enter your full name"
                                />
                            </div>
                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                        </div>

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
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                Phone Number
                            </label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Phone className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    autoComplete="tel"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={`appearance-none relative block w-full pl-10 pr-3 py-2 border ${errors.phone ? "border-red-300" : "border-gray-300"
                                        } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm`}
                                    placeholder="Enter your phone number"
                                />
                            </div>
                            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
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
                                    autoComplete="new-password"
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

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className={`appearance-none relative block w-full pl-10 pr-10 py-2 border ${errors.confirmPassword ? "border-red-300" : "border-gray-300"
                                        } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm`}
                                    placeholder="Confirm your password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-400" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400" />
                                    )}
                                </button>
                            </div>
                            {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
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
                            {loading ? "Creating account..." : "Create account"}
                        </motion.button>
                    </div>
                </form>
            </motion.div>
        </div>
    )
}

export default Register
