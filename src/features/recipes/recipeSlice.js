import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosClient.js";

export const fetchIngredients = createAsyncThunk("recipes/fetchIngredients", async () => {
  const { data } = await api.get("/potions/ingredients");
  return data;
});

export const fetchRecipeBook = createAsyncThunk("recipes/fetchBook", async () => {
  const { data } = await api.get("/potions/recipes");
  return data;
});

export const brewPotion = createAsyncThunk(
  "recipes/brew",
  async (ingredientSlugs, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/potions/brew", { ingredientSlugs });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Brewing failed.");
    }
  }
);

const recipeSlice = createSlice({
  name: "recipes",
  initialState: {
    ingredients: [],
    book: [],
    discoveredCount: 0,
    totalCount: 0,
    lastBrewResult: null,
    status: "idle",
    error: null,
  },
  reducers: {
    clearBrewResult(state) {
      state.lastBrewResult = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
      })
      .addCase(fetchRecipeBook.fulfilled, (state, action) => {
        state.book = action.payload.recipes;
        state.discoveredCount = action.payload.discoveredCount;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(brewPotion.pending, (state) => {
        state.status = "loading";
      })
      .addCase(brewPotion.fulfilled, (state, action) => {
        state.status = "idle";
        state.lastBrewResult = action.payload;
      })
      .addCase(brewPotion.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearBrewResult } = recipeSlice.actions;
export default recipeSlice.reducer;
