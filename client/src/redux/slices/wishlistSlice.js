import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

// 1. Fetch Wishlist
export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/wishlist');
      // Backend se wishlist.products aata hai
      return data.wishlist; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch wishlist");
    }
  }
);

// 2. Add or Remove from Wishlist (Toggle)
export const toggleWishlist = createAsyncThunk(
  'wishlist/toggleWishlist',
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/wishlist', { productId });
      return data.wishlist; // Updated wishlist array return hoga
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Wishlist update failed");
    }
  }
);

// 3. Remove specifically by ID
export const removeFromWishlist = createAsyncThunk(
  'wishlist/remove',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/wishlist/${id}`);
      return data.wishlist;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Remove failed");
    }
  }
);

const initialState = {
  wishlist: [],
  loading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    clearWishlistLocally: (state) => {
      state.wishlist = [];
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Wishlist
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Toggle / Remove
      .addCase(toggleWishlist.fulfilled, (state, action) => {
        state.wishlist = action.payload;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.wishlist = action.payload;
      });
  },
});

export const { clearWishlistLocally } = wishlistSlice.actions;
export default wishlistSlice.reducer;