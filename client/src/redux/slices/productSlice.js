import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

// 1. Fetch All Products (Integrated with Search, Category, Pagination)
export const listProducts = createAsyncThunk(
  'products/listProducts',
  async ({ keyword = '', pageNumber = '', category = '', subcategory = '' }, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/products`, {
        params: { search: keyword, pageNumber, category, subcategory }
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// 2. Fetch Product Details
export const listProductDetails = createAsyncThunk(
  'products/listProductDetails',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/products/${id}`);
      return data.product;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// 3. Create Product Review
export const createProductReview = createAsyncThunk(
  'products/createReview',
  async ({ productId, review }, { rejectWithValue }) => {
    try {
      await api.post(`/products/${productId}/reviews`, review);
      return true;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  products: [],
  product: { reviews: [] },
  loading: false,
  error: null,
  success: false, // Review ya Admin actions ke liye
  page: 1,
  pages: 1,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    resetProductState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // listProducts
      .addCase(listProducts.pending, (state) => { state.loading = true; })
      .addCase(listProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.pages = action.payload.pages;
        state.page = action.payload.page;
      })
      .addCase(listProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // listProductDetails
      .addCase(listProductDetails.pending, (state) => { state.loading = true; })
      .addCase(listProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      // createReview
      .addCase(createProductReview.pending, (state) => { state.loading = true; })
      .addCase(createProductReview.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createProductReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetProductState } = productSlice.actions;
export default productSlice.reducer;