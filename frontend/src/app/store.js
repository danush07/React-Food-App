import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import orderReducer from '../features/menu/orderSlice'

export const store = configureStore({
  reducer:{
    auth:authReducer,
    order:orderReducer,
  }
});




