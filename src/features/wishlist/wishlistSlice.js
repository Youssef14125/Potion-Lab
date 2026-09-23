import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosClient.js";

export const fetchWishlist = createAsyncThunk("wishlist/fetch", async () => {
  const { data } = await api.get("/wishlist");
  return data;
});

export const toggleWishlist = createAsyncThunk(
  "wishlist/toggle",
  async ({ productId, isWishlisted }) => {
    const { data } = isWishlisted
      ? await api.delete(`/wishlist/${productId}`)
      : await api.post(`/wishlist/${productId}`);
    return data;
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: { items: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(toggleWishlist.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export const selectIsWishlisted = (productId) => (state) =>
  state.wishlist.items.some((p) => p._id === productId);

export default wishlistSlice.reducer;
