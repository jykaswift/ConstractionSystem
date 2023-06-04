import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import FavoriteService from "../../services/FavoriteService";


export const fetchFavorite = createAsyncThunk(
  "docs/fetchFavorite",
  async (id, thunkAPI) => {
    const { favorite } = thunkAPI.getState();

    const response = await FavoriteService.getFavorite(id, favorite.currentPage)
    return response.data
  }
);

const initialState = {
  isFavorite: false,
  initialFavorite: false,
  currentPage: 1,
  status: 'loading',
  total: '0',
  items: [],
  isFirstLoad: true,
};

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    reset: () => initialState,

    clearFavorite(state) {
      state.items = [];
    },

    deleteFromFavorites(state, action) {
      state.items = state.items.filter(function (obj) {
        return obj["elastic_id"] !== action.payload;
      })
    }
  },

  extraReducers: (builder) => {
    builder.addCase(fetchFavorite.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(fetchFavorite.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.items = [...state.items, ...action.payload.rows[0]['Documents']];
      state.currentPage += 1;
      state.total = action.payload.count;
      state.isFirstLoad = false;
    });

    builder.addCase(fetchFavorite.rejected, (state) => {
      state.status = "error";
    });
  },
});

export const { clearFavorite, deleteFromFavorites, reset } = favoriteSlice.actions;

export default favoriteSlice.reducer;
