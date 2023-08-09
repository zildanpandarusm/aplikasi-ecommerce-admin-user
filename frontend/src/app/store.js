import { configureStore } from '@reduxjs/toolkit';
import adminAuthReducer from '../features/AdminAuth';
import userAuthReducer from '../features/UserAuth';
import cariProdukReducer from '../features/CariProduk';

export const store = configureStore({
  reducer: {
    adminAuth: adminAuthReducer,
    userAuth: userAuthReducer,
    cariProduk: cariProdukReducer,
  },
});
