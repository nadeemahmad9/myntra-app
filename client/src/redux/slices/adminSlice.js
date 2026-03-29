
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import api from '../../../../admin/src/utils/api.js';

// // Admin Action: Fetch Dashboard Stats
// export const fetchAdminStats = createAsyncThunk(
//     'admin/fetchStats',
//     async (days = 7, { rejectWithValue }) => { // 1. Yahan 'days' parameter add kiya (default 7)
//         try {
//             // 2. API URL mein 'days' ko query parameter ki tarah bheja
//             const { data } = await api.get(`/admin/stats?days=${days}`);
//             return data;
//         } catch (error) {
//             return rejectWithValue(error.response?.data?.message || "Stats fetch failed");
//         }
//     }
// );

// const adminSlice = createSlice({
//     name: 'admin',
//     initialState: {
//         stats: {
//             totals: {
//                 totalOrders: 0,
//                 totalUsers: 0,
//                 totalRevenue: 0,
//                 totalProducts: 0
//             },
//             salesByDay: [] // 3. Chart data ke liye empty array rakhein
//         },
//         loading: false,
//         error: null
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchAdminStats.pending, (state) => { 
//                 state.loading = true; 
//                 state.error = null;
//             })
//             .addCase(fetchAdminStats.fulfilled, (state, action) => {
//                 state.loading = false;
//                 // 4. Poora payload save karein kyunki isme 'totals' aur 'salesByDay' dono hain
//                 state.stats = action.payload; 
//             })
//             .addCase(fetchAdminStats.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             });
//     }
// });

// export default adminSlice.reducer;
