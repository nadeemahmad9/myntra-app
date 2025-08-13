

import { createContext, useContext, useReducer, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { authService } from "../services/authService";
import { cartService } from "../services/cartService";
import { wishlistService } from "../services/wishlistService";
import { productService } from "../services/productService";
import axios from "axios";

const AppContext = createContext();

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    cart: { items: [] },
    wishlistItems: [],
    cartLoading: false,
    wishlistLoading: false,
};

const appReducer = (state, action) => {
    switch (action.type) {
        case "SET_LOADING":
            return { ...state, loading: action.payload };
        case "SET_USER":
            return { ...state, user: action.payload, isAuthenticated: !!action.payload };
        case "LOGOUT":
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                cart: { items: [] },
                wishlist: { wishlistItems: [] },
            };
        case "SET_CART":
            return { ...state, cart: action.payload };
        case "SET_CART_LOADING":
            return { ...state, cartLoading: action.payload };
        case "SET_WISHLIST":
            return { ...state, wishlistItems: action.payload.wishlistItems };
        case "SET_WISHLIST_LOADING":
            return { ...state, wishlistLoading: action.payload };
        default:
            return state;
    }
};

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    // ✅ Auto-login for Google OAuth (or any stored token)
    useEffect(() => {
        const token = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");

        if (savedUser && savedUser !== "undefined") {
            dispatch({ type: "SET_USER", payload: JSON.parse(savedUser) });
            return;
        }

        if (token) {
            axios
                .get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/me`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((res) => {
                    localStorage.setItem("user", JSON.stringify(res.data));
                    dispatch({ type: "SET_USER", payload: res.data });
                })
                .catch(() => {
                    localStorage.removeItem("token");
                });
        } else {
            const guestCart = cartService.getGuestCart();
            dispatch({ type: "SET_CART", payload: { items: guestCart } });
        }
    }, []);

    useEffect(() => {
        if (state.isAuthenticated) {
            fetchCart();
            fetchWishlist();
        }
    }, [state.isAuthenticated]);

    const login = async (email, password) => {
        try {
            dispatch({ type: "SET_LOADING", payload: true });
            const userData = await authService.login(email, password);
            localStorage.setItem("user", JSON.stringify(userData));
            dispatch({ type: "SET_USER", payload: userData });

            await cartService.syncGuestCartWithUser();
            await fetchCart();
            await fetchWishlist();
            toast.success("Login successful!");
            return userData;
        } catch (error) {
            toast.error(error.message || "Login failed");
            throw error;
        } finally {
            dispatch({ type: "SET_LOADING", payload: false });
        }
    };



    // inside AppContext.js (or wherever you keep auth logic)
    // const googleLogin = async (token) => {
    //     try {
    //         // Save token to localStorage (for persistence)
    //         localStorage.setItem("token", token)

    //         // Fetch user profile from backend
    //         const res = await fetch("http://localhost:5000/api/auth/google", {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         })

    //         if (!res.ok) throw new Error("Failed to fetch user profile")

    //         const userData = await res.json()

    //         // Save user in state + localStorage
    //         setUser(userData)
    //         localStorage.setItem("user", JSON.stringify(userData))

    //     } catch (err) {

    //         console.error("Google login failed:", err)
    //         // logout()
    //     }
    // }




    // const googleLogin = async (token) => {
    //     try {
    //         localStorage.setItem("token", token);

    //         const res = await fetch("http://localhost:5000/api/auth/google", {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         });

    //         if (!res.ok) throw new Error("Failed to fetch user profile");

    //         const userData = await res.json();

    //         // ✅ Update global state via reducer
    //         dispatch({ type: "SET_USER", payload: userData });

    //         // Save user to localStorage
    //         localStorage.setItem("user", JSON.stringify(userData));

    //     } catch (err) {
    //         console.error("Google login failed:", err);
    //     }
    // };

    const googleLogin = async (token) => {
        try {
            localStorage.setItem("token", token);

            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/google`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) throw new Error("Failed to fetch user profile");

            const userData = await res.json();
            dispatch({ type: "SET_USER", payload: userData });
            localStorage.setItem("user", JSON.stringify(userData));

            // ✅ Keep cart and wishlist in sync immediately
            await cartService.syncGuestCartWithUser();
            await fetchCart();
            await fetchWishlist();

        } catch (err) {
            console.error("Google login failed:", err);
        }
    };




    const register = async (userData) => {
        try {
            dispatch({ type: "SET_LOADING", payload: true });
            const user = await authService.register(userData);
            localStorage.setItem("user", JSON.stringify(user));
            dispatch({ type: "SET_USER", payload: user });

            await cartService.syncGuestCartWithUser();
            await fetchCart();
            await fetchWishlist();
            toast.success("Registration successful!");
            return user;
        } catch (error) {
            toast.error(error.message || "Registration failed");
            throw error;
        } finally {
            dispatch({ type: "SET_LOADING", payload: false });
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        authService.logout();
        dispatch({ type: "LOGOUT" }); // This sets user = null in your global state

        const guestCart = cartService.getGuestCart();
        dispatch({ type: "SET_CART", payload: { items: guestCart } });

        toast.success("Logged out successfully!");
    };


    const fetchCart = async () => {
        if (!state.isAuthenticated) return;

        try {
            dispatch({ type: "SET_CART_LOADING", payload: true });
            const cartData = await cartService.getCart();
            dispatch({ type: "SET_CART", payload: cartData });
        } catch (error) {
            console.error("Error fetching cart:", error);
        } finally {
            dispatch({ type: "SET_CART_LOADING", payload: false });
        }
    };

    const addToCart = async (productId, qty = 1, size = "M") => {
        try {
            if (state.isAuthenticated) {
                await cartService.addToCart(productId, qty, size);
                await fetchCart();
            } else {
                const product = await productService.getProductById(productId);
                const updatedCart = cartService.addToGuestCart(product, qty, size);
                dispatch({ type: "SET_CART", payload: { items: updatedCart } });
            }
            toast.success("Item added to cart!");
        } catch (error) {
            toast.error(error.message || "Failed to add item to cart");
            throw error;
        }
    };

    const updateCartItem = async (cartItemId, qty) => {
        try {
            if (state.isAuthenticated) {
                await cartService.updateCartItem(cartItemId, qty);
                await fetchCart();
            } else {
                const updatedCart = cartService.updateGuestCartItem(cartItemId, qty);
                dispatch({ type: "SET_CART", payload: { items: updatedCart } });
            }
        } catch (error) {
            toast.error(error.message || "Failed to update cart item");
            throw error;
        }
    };

    const removeFromCart = async (cartItemId) => {
        try {
            if (state.isAuthenticated) {
                await cartService.removeFromCart(cartItemId);
                await fetchCart();
            } else {
                const updatedCart = cartService.removeFromGuestCart(cartItemId);
                dispatch({ type: "SET_CART", payload: { items: updatedCart } });
            }
            toast.success("Item removed from cart!");
        } catch (error) {
            toast.error(error.message || "Failed to remove item from cart");
            throw error;
        }
    };

    const clearCart = async () => {
        try {
            if (state.isAuthenticated) {
                await cartService.clearCart();
            } else {
                cartService.clearGuestCart();
            }
            dispatch({ type: "SET_CART", payload: { items: [] } });
            toast.success("Cart cleared!");
        } catch (error) {
            toast.error(error.message || "Failed to clear cart");
            throw error;
        }
    };

    const getCartTotal = () => {
        return state.cart.items.reduce((total, item) => total + item.product.price * item.qty, 0);
    };

    const getCartItemsCount = () => {
        return state.cart.items.reduce((total, item) => total + item.qty, 0);
    };

    const fetchWishlist = async () => {
        if (!state.isAuthenticated) return;
        try {
            dispatch({ type: "SET_WISHLIST_LOADING", payload: true });
            const response = await wishlistService.getWishlist();
            dispatch({ type: "SET_WISHLIST", payload: { wishlistItems: response.data } });
        } catch (error) {
            console.error("Error fetching wishlist:", error);
        } finally {
            dispatch({ type: "SET_WISHLIST_LOADING", payload: false });
        }
    };

    const addToWishlist = async (productId) => {
        if (!state.isAuthenticated) {
            toast.error("Please login to add items to wishlist");
            return;
        }
        try {
            const response = await wishlistService.addToWishlist(productId);
            dispatch({ type: "SET_WISHLIST", payload: { wishlistItems: response.data } });
            toast.success("Item added to wishlist!");
        } catch (error) {
            toast.error(error.message || "Failed to add item to wishlist");
            throw error;
        }
    };

    const removeFromWishlist = async (productId) => {
        try {
            const response = await wishlistService.removeFromWishlist(productId);
            dispatch({ type: "SET_WISHLIST", payload: { wishlistItems: response.data } });
            toast.success("Item removed from wishlist!");
        } catch (error) {
            toast.error(error.message || "Failed to remove item from wishlist");
            throw error;
        }
    };

    const isInWishlist = (productId) => {
        return (
            Array.isArray(state.wishlist?.wishlistItems) &&
            state.wishlist.wishlistItems.some((item) => item._id === productId)
        );
    };

    return (
        <AppContext.Provider
            value={{
                ...state,
                login,
                googleLogin,
                register,
                logout,
                addToCart,
                updateCartItem,
                removeFromCart,
                clearCart,
                getCartTotal,
                getCartItemsCount,
                addToWishlist,
                removeFromWishlist,
                isInWishlist,
                fetchCart,
                fetchWishlist,
                dispatch // ✅ so LoginSuccess can call SET_USER
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useApp must be used within an AppProvider");
    }
    return context;
};
