import { createSlice } from "@reduxjs/toolkit";



const initialState = {
  menuStatus: false
};

export const burgerMenuSlice = createSlice({
  name: "burger",
  initialState,
  reducers: {
    setMenuStatus(state) {
      state.menuStatus = !state.menuStatus;
    },
  },
});

export const { setMenuStatus } = burgerMenuSlice.actions;

export default burgerMenuSlice.reducer;
