import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosClient.js";

export const fetchProducts = createAsyncThunk("products/fetch", async (params = {}) => {
  const { data } = await api.get("/products", { params });
  return data;
});

export const fetchFeatured = createAsyncThunk("products/fetchFeatured", async () => {
  const { data } = await api.get("/products/featured");
  return data;
});

export const fetchProductDetail = createAsyncThunk("products/fetchOne", async (idOrSlug) => {
  const { data } = await api.get(`/products/${idOrSlug}`);
  return data;
});

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    featured: [],
    current: null,
    page: 1,
    pages: 1,
    total: 0,
    status: "idle",
    error: null,
  },
  reducers: {
    clearCurrentProduct(state) {
      state.current = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload.items;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
        state.total = action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchFeatured.fulfilled, (state, action) => {
        state.featured = action.payload;
      })
      .addCase(fetchProductDetail.pending, (state) => {
        state.status = "loading";
        state.current = null;
      })
      .addCase(fetchProductDetail.fulfilled, (state, action) => {
        state.status = "idle";
        state.current = action.payload;
      })
      .addCase(fetchProductDetail.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { clearCurrentProduct } = productSlice.actions;
export default productSlice.reducer;
