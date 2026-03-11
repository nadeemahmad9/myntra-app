// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import api from '../../utils/api';

// // 1. Fetch Cart
// export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { rejectWithValue }) => {
//   try {
//     const { data } = await api.get('/cart');
//     return data.cartItems;
//   } catch (error) {
//     return rejectWithValue(error.response?.data?.message || "Failed to fetch cart");
//   }
// });

// export const updateCartItem = createAsyncThunk(
//   'cart/updateItem',
//   async ({ id, qty }, { rejectWithValue }) => { // 👈 'productId' ki jagah sirf 'id'
//     try {
//       const { data } = await api.put(`/cart/${id}`, { qty });
//       return data.item; 
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || "Update failed");
//     }
//   }
// );
// // ✅ 3. Remove Item
// export const removeFromCart = createAsyncThunk(
//   'cart/removeItem',
//   async (productId, { rejectWithValue }) => { // 👈 Change: 'id' ki jagah 'productId'
//     try {
//       await api.delete(`/cart/${productId}`);
//       return productId; 
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || "Delete failed");
//     }
//   }
// );

// // ✅ ADD THIS: 4. Add Item to Cart
// export const addToCart = createAsyncThunk(
//   'cart/addToCart',
//   async (cartData, { rejectWithValue }) => {
//     try {
//       const { data } = await api.post('/cart', cartData);
      
//       // ✅ Yahan hum sirf 'cartItems' array return karenge
//       return data.cartItems; 
//     } catch (error) {
//       // Agar error aaye toh message nikaalein
//       const message = error.response?.data?.message || "Failed to add to cart";
//       return rejectWithValue(message);
//     }
//   }
// );
// const initialState = {
//   cartItems: [],
//   loading: false,
//   error: null,
// };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     clearCartLocally: (state) => {
//       state.cartItems = [];
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       // Fetch Cart
//       .addCase(fetchCart.pending, (state) => { state.loading = true; })
//       .addCase(fetchCart.fulfilled, (state, action) => {
//         state.loading = false;
//         state.cartItems = action.payload;
//       })
//       // Update Item
// // Update Item
// // updateCartItem.fulfilled ke andar ye badlav karein
// .addCase(updateCartItem.fulfilled, (state, action) => {
//     state.loading = false;
//     state.error = null;
    
//     // ✅ Backend se 'action.payload.cartItems' aa raha hai
//     // Agar hum sirf action.payload likhte hain toh wo object hota hai, array nahi
//     if (action.payload && action.payload.cartItems) {
//         state.cartItems = action.payload.cartItems;
//     } else {
//         // Fallback agar payload direct array ho
//         state.cartItems = action.payload;
//     }
// })

// // ✅ Same cheez removeFromCart ke liye bhi karein
// .addCase(removeFromCart.fulfilled, (state, action) => {
//     state.loading = false;
//     if (action.payload && action.payload.cartItems) {
//         state.cartItems = action.payload.cartItems;
//     } else {
//         state.cartItems = action.payload;
//     }
// })

//       .addCase(addToCart.fulfilled, (state, action) => {
//     state.loading = false;
//     state.error = null;
//     // ✅ Action.payload ab ek array hai ([...])
//     state.cartItems = action.payload; 
// })
//   },
// });



// export const { clearCartLocally } = cartSlice.actions;
// export default cartSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

// 1. Fetch Cart
export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { rejectWithValue }) => {
    try {
        const { data } = await api.get('/cart');
        // Backend returns: { success: true, cartItems: [...] }
        return data.cartItems || [];
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to fetch cart");
    }
});

// 2. Update Cart Item Quantity
export const updateCartItem = createAsyncThunk(
    'cart/updateItem',
    async ({ id, qty }, { rejectWithValue }) => {
        try {
            const { data } = await api.put(`/cart/${id}`, { qty });
            // IMPORTANT: Backend returns { success: true, cartItems: [...] }
            // So we return the whole data object to the reducer
            return data; 
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Update failed");
        }
    }
);

// 3. Remove Item from Cart
export const removeFromCart = createAsyncThunk(
    'cart/removeItem',
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await api.delete(`/cart/${id}`);
            // Backend returns { success: true, cartItems: [...] }
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Delete failed");
        }
    }
);

// 4. Add Item to Cart
export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async (cartData, { rejectWithValue }) => {
        try {
            const { data } = await api.post('/cart', cartData);
            return data.cartItems || []; 
        } catch (error) {
            const message = error.response?.data?.message || "Failed to add to cart";
            return rejectWithValue(message);
        }
    }
);

const initialState = {
    cartItems: [],
    loading: false,
    error: null,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCartLocally: (state) => {
            state.cartItems = [];
        }
    },
    extraReducers: (builder) => {
        builder
            // --- Fetch Cart ---
            .addCase(fetchCart.pending, (state) => { 
                state.loading = true; 
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cartItems = action.payload; // Always an array
                state.error = null;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // --- Update Item ---
            .addCase(updateCartItem.fulfilled, (state, action) => {
                state.loading = false;
                // Safety check: Backend sends { success, cartItems }
                state.cartItems = action.payload?.cartItems || state.cartItems;
                state.error = null;
            })

            // --- Remove Item ---
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cartItems = action.payload?.cartItems || state.cartItems;
                state.error = null;
            })

            // --- Add to Cart ---
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cartItems = action.payload; // Always an array
                state.error = null;
            });
    },
});

export const { clearCartLocally } = cartSlice.actions;
export default cartSlice.reducer;