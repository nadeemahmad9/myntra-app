import axios from "axios"
import { createContext, useContext, useReducer, useEffect, useCallback, useState } from "react"


const AuthContext = createContext()

const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
            }
        case "LOGOUT":
            return {
                ...state,
                user: null,
                isAuthenticated: false,
            }
        case "UPDATE_PROFILE":
            return {
                ...state,
                user: { ...state.user, ...action.payload },
            }
        default:
            return state
    }
}

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        isAuthenticated: false,
    })


    // useEffect(() => {
    //     // Check if user is logged in from localStorage
    //     const savedUser = localStorage.getItem("user")
    //     if (savedUser) {
    //         dispatch({ type: "LOGIN", payload: JSON.parse(savedUser) || null })
    //     }
    // }, [])

    useEffect(() => {
        // Check if user is logged in from localStorage
        const savedUser = localStorage.getItem("user")

        try {
            const parsedUser = savedUser ? JSON.parse(savedUser) : null

            if (parsedUser) {
                dispatch({ type: "LOGIN", payload: parsedUser })
            }
        } catch (err) {
            console.error("Failed to parse user from localStorage", err)
            localStorage.removeItem("user") // cleanup
        }
    }, [])

    const fetchUser = useCallback(async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/google/user`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // ✅ Update reducer state
            dispatch({ type: "LOGIN", payload: res.data });

            // ✅ Keep localStorage in sync
            localStorage.setItem("user", JSON.stringify(res.data));
        } catch (err) {
            console.error("Error fetching user:", err);
        }
    }, []);



    const login = (userData) => {
        localStorage.setItem("user", JSON.stringify(userData))
        if (userData?.token) {
            localStorage.setItem("token", userData.token)
        }
        dispatch({ type: "LOGIN", payload: userData })
    }

    const logout = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        dispatch({ type: "LOGOUT" })
    }

    const updateProfile = (profileData) => {
        const updatedUser = { ...state.user, ...profileData }
        localStorage.setItem("user", JSON.stringify(updatedUser))
        dispatch({ type: "UPDATE_PROFILE", payload: profileData })
    }

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                isAuthenticated: state.isAuthenticated,
                login,
                fetchUser,
                logout,
                updateProfile,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
