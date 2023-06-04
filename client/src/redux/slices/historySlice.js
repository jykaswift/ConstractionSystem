import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import HistoryService from "../../services/HistoryService";

export const fetchHistory = createAsyncThunk(
  "docs/fetchHistory",
  async (id, thunkAPI) => {
    const { history } = thunkAPI.getState();

    const response = await HistoryService.getHistory(id, history.currentPage)
    return response.data
  }
);

const initialState = {
  currentPage: 1,
  status: 'loading',
  total: '0',
  items: [],
  isFirstLoad: true,
};

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    reset: () => initialState,

    clearHistory(state) {
      state.items = [];
      state.total = '0'
    },
    deleteOneHistory(state) {
      state.total -= 1;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchHistory.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(fetchHistory.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.items = [...state.items, ...action.payload.rows];
      state.currentPage += 1;
      state.total = action.payload.count;
      state.isFirstLoad = false;
    });

    builder.addCase(fetchHistory.rejected, (state) => {
      state.status = "error";
      state.items = [];
    });
  },
});

export const { reset, clearHistory, deleteOneHistory } = historySlice.actions;
export default historySlice.reducer;
