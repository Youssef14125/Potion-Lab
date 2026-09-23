import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosClient.js";

export const fetchCart = createAsyncThunk("cart/fetch", async () => {
  const { data } = await api.get("/cart");
  return data;
});

export const addToCart = createAsyncThunk("cart/add", async ({ productId, quantity = 1 }) => {
  const { data } = await api.post("/cart", { productId, quantity });
  return data;
});

export const updateCartItem = createAsyncThunk("cart/update", async ({ productId, quantity }) => {
  const { data } = await api.put(`/cart/${productId}`, { quantity });
  return data;
});

export const removeFromCart = createAsyncThunk("cart/remove", async (productId) => {
  const { data } = await api.delete(`/cart/${productId}`);
  return data;
});

export const clearCart = createAsyncThunk("cart/clear", async () => {
  const { data } = await api.delete("/cart");
  return data;
});

export const checkout = createAsyncThunk("cart/checkout", async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.post("/orders");
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Checkout failed.");
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], status: "idle", error: null, lastOrder: null },
  reducers: {
    resetCartState(state) {
      state.items = [];
      state.lastOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.items = [];
      })
      .addCase(checkout.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(checkout.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = [];
        state.lastOrder = action.payload;
      })
      .addCase(checkout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { resetCartState } = cartSlice.actions;

export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, i) => sum + i.quantity, 0);
export const selectCartTotal = (state) =>
  state.cart.items.reduce((sum, i) => sum + (i.product?.price || 0) * i.quantity, 0);

export default cartSlice.reducer;
