import { configureStore } from "@reduxjs/toolkit";
import authReducer, { logout } from "../features/auth/authSlice.js";
import cartReducer from "../features/cart/cartSlice.js";
import wishlistReducer from "../features/wishlist/wishlistSlice.js";
import productReducer from "../features/products/productSlice.js";
import recipeReducer from "../features/recipes/recipeSlice.js";
import { configureApiAuth } from "../api/axiosClient.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    products: productReducer,
    recipes: recipeReducer,
  },
});

// Wired up after the store exists (rather than importing the store directly inside
// axiosClient.js/localApi.js) to avoid a circular import:
// store.js -> authSlice.js -> axiosClient.js -> store.js.
configureApiAuth(
  () => store.getState().auth.token,
  () => store.dispatch(logout())
);
