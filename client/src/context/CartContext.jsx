// import { createContext, useContext, useReducer, useEffect } from "react"
// import { cartService } from "../services/cartService"
// import { useAuth } from "./AuthContext"
// import toast from "react-hot-toast"

// const CartContext = createContext()

// const cartReducer = (state, action) => {
//     switch (action.type) {
//         case "SET_LOADING":
//             return { ...state, loading: action.payload }
//         // case "SET_CART":
//         //     return { ...state, items: action.payload, loading: false }
//         case "SET_CART":
//             return {
//                 ...state,
//                 items: Array.isArray(action.payload)
//                     ? action.payload
//                     : action.payload.cartItems || action.payload.items || [], // normalize
//                 loading: false,
//             }

//         case "ADD_TO_CART":
//             const existingItem = state.items.find(
//                 (item) => item.product._id === action.payload.product._id && item.size === action.payload.size,
//             )
//             if (existingItem) {
//                 return {
//                     ...state,
//                     items: state.items.map((item) =>
//                         item.product._id === action.payload.product._id && item.size === action.payload.size
//                             ? { ...item, qty: action.payload.qty }
//                             : item,
//                     ),
//                 }
//             } else {
//                 return { ...state, items: [...state.items, action.payload] }
//             }
//         case "REMOVE_FROM_CART":
//             return {
//                 ...state,
//                 items: state.items.filter((item) => item._id !== action.payload),
//             }
//         case "CLEAR_CART":
//             return { ...state, items: [] }
//         case "SYNC_GUEST_CART":
//             return { ...state, items: action.payload }
//         default:
//             return state
//     }
// }

// export const CartProvider = ({ children }) => {
//     const [state, dispatch] = useReducer(cartReducer, {
//         items: [],
//         loading: false,
//     })

//     const { user } = useAuth()

//     // Load cart on mount
//     useEffect(() => {
//         loadCart()
//     }, [user])

//     // const loadCart = async () => {
//     //     try {
//     //         dispatch({ type: "SET_LOADING", payload: true })

//     //         if (user) {
//     //             // Load from API for authenticated users
//     //             const cartItems = await cartService.getCart()
//     //             dispatch({ type: "SET_CART", payload: cartItems })
//     //         } else {
//     //             // Load from localStorage for guests
//     //             const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]")
//     //             dispatch({ type: "SET_CART", payload: guestCart })
//     //         }
//     //     } catch (error) {
//     //         console.error("Error loading cart:", error)
//     //         dispatch({ type: "SET_LOADING", payload: false })
//     //     }
//     // }

//     const loadCart = async () => {
//         try {
//             dispatch({ type: "SET_LOADING", payload: true });

//             if (user) {
//                 console.log("User is logged in");
//                 console.log("Token in localStorage:", localStorage.getItem("token"));

//                 const cartItems = await cartService.getCart();
//                 dispatch({ type: "SET_CART", payload: cartItems });
//             } else {
//                 console.log("User is guest, loading guest cart");
//                 const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
//                 dispatch({ type: "SET_CART", payload: guestCart });
//             }
//         } catch (error) {
//             console.error("Error loading cart:", error);
//         } finally {
//             dispatch({ type: "SET_LOADING", payload: false });
//         }
//     };

//     const addToCart = async (product, qty, size) => {
//         try {
//             const cartItem = {
//                 product,
//                 qty,
//                 size,
//                 name: product.name,
//                 image: product.images[0],
//                 price: product.price,
//             }

//             if (user) {
//                 // Add to API for authenticated users
//                 const updatedCart = await cartService.addToCart(product._id, qty, size)
//                 dispatch({ type: "SET_CART", payload: updatedCart })
//             } else {
//                 // Add to localStorage for guests
//                 const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]")
//                 const existingItem = guestCart.find((item) => item.product._id === product._id && item.size === size)

//                 if (existingItem) {
//                     existingItem.qty = qty
//                 } else {
//                     guestCart.push({ ...cartItem, _id: Date.now().toString() })
//                 }

//                 localStorage.setItem("guestCart", JSON.stringify(guestCart))
//                 dispatch({ type: "SET_CART", payload: guestCart })
//             }

//             toast.success("Added to cart!")
//         } catch (error) {
//             toast.error("Failed to add to cart")
//             console.error("Error adding to cart:", error)
//         }
//     }

//     const removeFromCart = async (itemId) => {
//         try {
//             if (user) {
//                 // Remove from API for authenticated users
//                 const updatedCart = await cartService.removeFromCart(itemId)
//                 dispatch({ type: "SET_CART", payload: updatedCart })
//             } else {
//                 // Remove from localStorage for guests
//                 const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]")
//                 const updatedCart = guestCart.filter((item) => item._id !== itemId)
//                 localStorage.setItem("guestCart", JSON.stringify(updatedCart))
//                 dispatch({ type: "REMOVE_FROM_CART", payload: itemId })
//             }

//             toast.success("Removed from cart!")
//         } catch (error) {
//             toast.error("Failed to remove from cart")
//             console.error("Error removing from cart:", error)
//         }
//     }

//     const clearCart = async () => {
//         try {
//             if (user) {
//                 // Clear API cart for authenticated users
//                 await cartService.clearCart()
//             } else {
//                 // Clear localStorage for guests
//                 localStorage.removeItem("guestCart")
//             }

//             dispatch({ type: "CLEAR_CART" })
//             toast.success("Cart cleared!")
//         } catch (error) {
//             toast.error("Failed to clear cart")
//             console.error("Error clearing cart:", error)
//         }
//     }

//     const syncGuestCart = async () => {
//         try {
//             const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]")

//             if (guestCart.length > 0 && user) {
//                 // Sync guest cart with user cart
//                 for (const item of guestCart) {
//                     await cartService.addToCart(item.product._id, item.qty, item.size)
//                 }

//                 // Clear guest cart
//                 localStorage.removeItem("guestCart")

//                 // Reload user cart
//                 const updatedCart = await cartService.getCart()
//                 dispatch({ type: "SET_CART", payload: updatedCart })

//                 toast.success("Cart synced successfully!")
//             }
//         } catch (error) {
//             console.error("Error syncing cart:", error)
//         }
//     }

//     const getCartItemsCount = () => {
//         return state.items.reduce((total, item) => total + item.qty, 0)
//     }

//     const getTotalPrice = () => {
//         return state.items.reduce((total, item) => total + item.price * item.qty, 0)
//     }

//     const value = {
//         ...state,
//         addToCart,
//         removeFromCart,
//         clearCart,
//         syncGuestCart,
//         getCartItemsCount,
//         getTotalPrice,
//     }

//     return <CartContext.Provider value={value}>{children}</CartContext.Provider>
// }

// export const useCart = () => {
//     const context = useContext(CartContext)
//     if (!context) {
//         throw new Error("useCart must be used within a CartProvider")
//     }
//     return context
// }



import { createContext, useContext, useReducer, useEffect, useState } from "react"
import { cartService } from "../services/cartService"
import { useAuth } from "./AuthContext"
import toast from "react-hot-toast"
import api from "../utils/api"

const CartContext = createContext()


const cartReducer = (state, action) => {
    switch (action.type) {
        case "SET_LOADING":
            return { ...state, loading: action.payload }

        // case "SET_CART":
        //     return {
        //         ...state,
        //         items: Array.isArray(action.payload)
        //             ? action.payload
        //             : action.payload.cartItems || action.payload.items || [],
        //         loading: false,
        //     }

        case "SET_CART":
            const items = Array.isArray(action.payload)
                ? action.payload
                : action.payload.cartItems || action.payload.items || [];

            // 🧹 Filter out items with null product or missing qty/price
            const validItems = items.filter(item =>
                item &&
                item.qty &&
                item.price &&
                item.product !== null
            );

            return {
                ...state,
                items: validItems,
                loading: false,
            };


        // case "ADD_TO_CART":
        //     const existingItem = state.items.find(
        //         (item) => item.product._id === action.payload.product._id && item.size === action.payload.size
        //     )
        //     if (existingItem) {
        //         return {
        //             ...state,
        //             items: state.items.map((i) =>
        //                 i.product._id === existingItem.product._id ? item : i
        //             ),
        //         };
        //         // } else {
        //         //     return { ...state, items: [...state.items, action.payload] }
        //         // }
        //     } else {
        //         return {
        //             ...state,
        //             items: [...state.items, item]
        //         }
        //     }

        // case "ADD_TO_CART":
        //     const existingItem = state.items.find(
        //         (item) => item.product._id === action.payload.product._id && item.size === action.payload.size
        //     )
        //     if (existingItem) {
        //         return {
        //             ...state,
        //             items: state.items.map((i) =>
        //                 i.product._id === existingItem.product._id ? action.payload : i
        //             ),
        //         }
        //     } else {
        //         return {
        //             ...state,
        //             items: [...state.items, action.payload], // 🔧 was using 'item' which is undefined
        //         }
        //     }

        case "ADD_TO_CART":
            const existingItem = state.items.find(
                (item) =>
                    item.product._id === action.payload.product._id &&
                    item.size === action.payload.size
            );

            if (existingItem) {
                return {
                    ...state,
                    items: state.items.map((i) =>
                        i.product._id === existingItem.product._id && i.size === existingItem.size
                            ? action.payload
                            : i
                    ),
                };
            } else {
                return {
                    ...state,
                    items: [...state.items, action.payload],
                };
            }


        case 'UPDATE_ITEM':
            return {
                ...state,
                items: state.items.map(item =>
                    item._id === action.payload._id ? { ...item, qty: action.payload.qty } : item
                ),
            };


        case "REMOVE_FROM_CART":
            return {
                ...state,
                items: state.items.filter((item) => item._id !== action.payload),
            }

        case "CLEAR_CART":
            return { ...state, items: [] }

        case "SYNC_GUEST_CART":
            return { ...state, items: action.payload }

        default:
            return state
    }
}

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, {
        items: [],
        loading: false,
    })

    const { user } = useAuth()

    useEffect(() => {
        console.log("📦 Cart items updated:", state.items)
    }, [state.items])


    // useEffect(() => {
    //     loadCart()
    // }, [user])

    useEffect(() => {
        if (user?._id || user === null) {
            loadCart()
        }
    }, [user?._id])

    const loadCart = async () => {
        try {
            dispatch({ type: "SET_LOADING", payload: true })

            if (user) {

                const cartItems = await cartService.getCart()
                dispatch({ type: "SET_CART", payload: cartItems })
            } else {
                const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]")
                dispatch({ type: "SET_CART", payload: guestCart })
            }
        } catch (error) {
            console.error("Error loading cart:", error)
        } finally {
            dispatch({ type: "SET_LOADING", payload: false })
        }
    }



    // const addToCart = async (product, qty, size) => {
    //     if (!product || !product._id) {
    //         toast.error("Invalid product data.");
    //         return;
    //     }

    //     const cartItem = {
    //         product,
    //         qty,
    //         size,
    //         name: product.name,
    //         image: product.images || "/placeholder.svg",
    //         price: product.price,
    //     };

    //     // Optimistically update UI first
    //     dispatch({ type: "ADD_TO_CART", payload: cartItem });

    //     try {
    //         await cartService.addToCart(product._id, qty, size);
    //         toast.success("Added to cart!");
    //     } catch (error) {
    //         toast.error("Failed to add to cart.");
    //         console.error("Error adding to cart:", error);
    //     }
    // };

    const addToCart = async (product, qty, size) => {
        if (!product || !product._id) {
            toast.error("Invalid product data.");
            return;
        }

        // Temporary ID for immediate UI update
        const tempId = Date.now().toString();

        const cartItem = {
            _id: tempId, // so reducer has an ID to track
            product,
            qty,
            size,
            name: product.name,
            image: product.images || "/placeholder.svg",
            price: product.price,
        };

        // Optimistic UI update
        dispatch({ type: "ADD_TO_CART", payload: cartItem });

        try {
            await cartService.addToCart(product._id, qty, size);

            // ✅ Refresh cart from backend to get correct IDs & stock
            const updatedCart = await cartService.getCart();
            dispatch({ type: "SET_CART", payload: updatedCart });

            toast.success("Added to cart!");
        } catch (error) {
            toast.error("Failed to add to cart.");
            console.error("Error adding to cart:", error);
            // Roll back optimistic change
            dispatch({ type: "REMOVE_FROM_CART", payload: tempId });
        }
    };


    const updateCartItem = async (cartItemId, qty) => {
        try {
            if (user) {
                const updatedItem = await cartService.updateItem(cartItemId, qty);
                dispatch({ type: "UPDATE_ITEM", payload: updatedItem });
            } else {
                const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
                const updatedCart = guestCart.map((item) =>
                    item._id === cartItemId ? { ...item, qty } : item
                );
                localStorage.setItem("guestCart", JSON.stringify(updatedCart));
                dispatch({ type: "SET_CART", payload: updatedCart });
            }

            toast.success("Cart updated!");
        } catch (error) {
            toast.error("Failed to update cart");
            console.error("Error updating cart item:", error);
        }
    };



    const removeFromCart = async (itemId) => {
        try {
            if (user) {
                const updatedCart = await cartService.removeFromCart(itemId)
                dispatch({ type: "SET_CART", payload: updatedCart })
            } else {
                const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]")
                const updatedCart = guestCart.filter((item) => item._id !== itemId)
                localStorage.setItem("guestCart", JSON.stringify(updatedCart))
                dispatch({ type: "REMOVE_FROM_CART", payload: itemId })
            }

            toast.success("Removed from cart!")
        } catch (error) {
            toast.error("Failed to remove from cart")
            console.error("Error removing from cart:", error)
        }
    }


    const clearCart = async () => {
        try {
            if (user) {
                await cartService.clearCart()
            } else {
                localStorage.removeItem("guestCart")
            }

            dispatch({ type: "CLEAR_CART" })
            toast.success("Cart cleared!")
        } catch (error) {
            toast.error("Failed to clear cart")
            console.error("Error clearing cart:", error)
        }
    }

    const syncGuestCart = async () => {
        try {
            const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]")

            if (guestCart.length > 0 && user) {
                for (const item of guestCart) {
                    await cartService.addToCart(item.product._id, item.qty, item.size)
                }

                localStorage.removeItem("guestCart")

                const updatedCart = await cartService.getCart()
                dispatch({ type: "SET_CART", payload: updatedCart })

                toast.success("Cart synced successfully!")
            }
        } catch (error) {
            console.error("Error syncing cart:", error)
        }
    }

    // const getCartItemsCount = () => {
    //     return state.items.reduce((total, item) => total + item.qty, 0)
    // }

    const getCartItemsCount = () => {
        if (!Array.isArray(state.items)) return 0;
        return state.items.reduce((total, item) => total + item.qty, 0);
    };


    const getTotalPrice = () => {
        return state.items.reduce((total, item) => total + item.price * item.qty, 0)
    }

    const value = {
        items: state.items,
        ...state,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        syncGuestCart,
        getCartItemsCount,
        getTotalPrice,
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}
