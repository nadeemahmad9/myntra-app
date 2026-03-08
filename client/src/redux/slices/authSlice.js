import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// ✅ 1. Login AsyncThunk
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' }
      };
      const { data } = await axios.post('http://localhost:5000/api/users/login', userData, config);

      localStorage.setItem('token', data.token);
      localStorage.setItem('userInfo', JSON.stringify(data.user));

      return data.user;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

const userFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  user: userFromStorage,
  isAuthenticated: !!userFromStorage,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
  state.user = action.payload;
  state.isAuthenticated = true;
  // ✅ Ye line add karein taaki refresh pe bhi naya data rahe
  localStorage.setItem('userInfo', JSON.stringify(action.payload));
},
    
    // ✅ ADDED: Naya Address array update karne ke liye
    updateAddresses: (state, action) => {
      if (state.user) {
        // Redux state update karein
        state.user.addresses = action.payload;
        
        // LocalStorage ko bhi sync karein taaki refresh pe purana data na dikhe
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo) {
          userInfo.addresses = action.payload;
          localStorage.setItem('userInfo', JSON.stringify(userInfo));
        }
      }
    },

    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('userInfo');
      localStorage.removeItem('token');
    },
    
    clearError: (state) => {
      state.error = null;
    }
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ✅ updateAddresses ko bhi export karein
export const { setCredentials, logoutUser, clearError, updateAddresses } = authSlice.actions;
export default authSlice.reducer;