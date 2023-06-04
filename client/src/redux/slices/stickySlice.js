import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
  scrollDirection: null,
  disableScroll: false,
};

export const stickySlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {
    setScrollDirection(state, action) {
      state.scrollDirection = action.payload;
    },

    setDisableScroll(state, action) {
      state.disableScroll = action.payload;
    },
  },

});

export const { setScrollDirection, setDisableScroll } = stickySlice.actions;

export default stickySlice.reducer;
