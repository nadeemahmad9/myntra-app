import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import productReducer from './slices/productSlice';
// Future mein hum yahan userReducer bhi add karenge
import authReducer from './slices/authSlice'; 
import wishlistReducer from './slices/wishlistSlice';



export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
    auth: authReducer,     
    wishlist: wishlistReducer, 
  },
});

export default store;