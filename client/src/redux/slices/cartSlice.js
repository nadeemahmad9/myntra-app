import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

// 1. Fetch Cart
export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/cart');
    return data.cartItems;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch cart");
  }
});

export const updateCartItem = createAsyncThunk(
  'cart/updateItem',
  async ({ id, qty }, { rejectWithValue }) => { // 👈 'productId' ki jagah sirf 'id'
    try {
      const { data } = await api.put(`/cart/${id}`, { qty });
      return data.item; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Update failed");
    }
  }
);
// ✅ 3. Remove Item
export const removeFromCart = createAsyncThunk(
  'cart/removeItem',
  async (productId, { rejectWithValue }) => { // 👈 Change: 'id' ki jagah 'productId'
    try {
      await api.delete(`/cart/${productId}`);
      return productId; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Delete failed");
    }
  }
);

// ✅ ADD THIS: 4. Add Item to Cart
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (cartData, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/cart', cartData);
      
      // ✅ Yahan hum sirf 'cartItems' array return karenge
      return data.cartItems; 
    } catch (error) {
      // Agar error aaye toh message nikaalein
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
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => { state.loading = true; })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      // Update Item
    // Extra Reducers mein matching logic:
.addCase(updateCartItem.fulfilled, (state, action) => {
    const index = state.cartItems.findIndex(item => item._id === action.payload._id);
    if (index !== -1) {
        state.cartItems[index].qty = action.payload.qty;
    }
})
      // Remove Item
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cartItems = state.cartItems.filter(item => item._id !== action.payload);
      })

      .addCase(addToCart.fulfilled, (state, action) => {
    state.loading = false;
    state.error = null;
    // ✅ Action.payload ab ek array hai ([...])
    state.cartItems = action.payload; 
})
  },
});



export const { clearCartLocally } = cartSlice.actions;
export default cartSlice.reducer;