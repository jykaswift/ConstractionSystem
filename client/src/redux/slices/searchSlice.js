import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchDocsBySearch = createAsyncThunk("docs/fetchDocsBySearch", async (_, thunkAPI) => {
    const { search } = thunkAPI.getState();
    if (search.currentSearchValue) {
      const { headers, data } = await axios.get(
        `/api/doc/search?query=${search.currentSearchValue}&page=${search.currentPage}`
      );
      return { data, totalPage: headers["total-page"], totalDocs: headers["total-docs"] };
    }
    return { data: [], totalPage: 1 };
  }
);

const initialState = {
  currentSearchValue: "",
  currentPage: 1,
  totalDocs: 0,
  status: "loading",
  items: [],
  isClicked: false,
  isLoading: true,
  totalPage: 1,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {

    reset: () => initialState,

    setSearchParams(state, action) {
      state.currentSearchValue = action.payload;
      state.currentPage = 0;
      state.items = [];
      state.isClicked = !state.isClicked;
      state.isLoading = true;
    },

    setSearchParamsByURL(state, action) {
      state.currentSearchValue = action.payload;
      state.currentPage = 0;
      state.items = [];
      state.isLoading = true;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchDocsBySearch.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(fetchDocsBySearch.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.items = [...state.items, ...action.payload.data];
      state.currentPage += 1;
      state.isLoading = false;
      state.totalPage = parseInt(action.payload.totalPage);
      state.totalDocs = parseInt(action.payload.totalDocs);
    });

    builder.addCase(fetchDocsBySearch.rejected, (state) => {
      state.status = "error";
      state.items = [];
    });
  },
});

export const { setSearchParams, setSearchParamsByURL , reset} = searchSlice.actions;

export default searchSlice.reducer;
