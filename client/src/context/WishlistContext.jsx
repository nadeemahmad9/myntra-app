import { createContext, useContext, useReducer, useEffect } from "react"

const WishlistContext = createContext()

const wishlistReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_WISHLIST":
            return {
                ...state,
                items: [...state.items, action.payload],
            }
        case "REMOVE_FROM_WISHLIST":
            return {
                ...state,
                items: state.items.filter((item) => item.id !== action.payload.id),
            }
        case "CLEAR_WISHLIST":
            return {
                ...state,
                items: [],
            }
        case "LOAD_WISHLIST":
            return {
                ...state,
                items: action.payload,
            }
        default:
            return state
    }
}

export const WishlistProvider = ({ children }) => {
    const [state, dispatch] = useReducer(wishlistReducer, { items: [] })

    useEffect(() => {
        // Load wishlist from localStorage
        const savedWishlist = localStorage.getItem("wishlist")
        if (savedWishlist) {
            dispatch({ type: "LOAD_WISHLIST", payload: JSON.parse(savedWishlist) })
        }
    }, [])

    useEffect(() => {
        // Save wishlist to localStorage whenever it changes
        localStorage.setItem("wishlist", JSON.stringify(state.items))
    }, [state.items])

    const addToWishlist = (product) => {
        dispatch({ type: "ADD_TO_WISHLIST", payload: product })
    }

    const removeFromWishlist = (productId) => {
        dispatch({ type: "REMOVE_FROM_WISHLIST", payload: { id: productId } })
    }

    const isInWishlist = (productId) => {
        return state.items.some((item) => item.id === productId)
    }

    const clearWishlist = () => {
        dispatch({ type: "CLEAR_WISHLIST" })
    }

    return (
        <WishlistContext.Provider
            value={{
                wishlist: state,
                addToWishlist,
                removeFromWishlist,
                isInWishlist,
                clearWishlist,
            }}
        >
            {children}
        </WishlistContext.Provider>
    )
}

export const useWishlist = () => {
    const context = useContext(WishlistContext)
    if (!context) {
        throw new Error("useWishlist must be used within a WishlistProvider")
    }
    return context
}