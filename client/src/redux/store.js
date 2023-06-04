import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./slices/searchSlice";
import docReducer from "./slices/docSlice";
import authReducer from "./slices/authSlice";
import historyReducer from "./slices/historySlice";
import favoriteReducer from "./slices/favoriteSlice";
import projectReducer from "./slices/projectSlice";
import burgerReducer from "./slices/burgerMenuSlice";
import bookmarkReducer from "./slices/bookmarkSlice";
import stickyReducer from "./slices/stickySlice";

export const store = (initialState = {}) => {
  return configureStore({
    reducer: {
      search: searchReducer,
      doc: docReducer,
      auth: authReducer,
      history: historyReducer,
      favorite: favoriteReducer,
      project: projectReducer,
      burger: burgerReducer,
      bookmark: bookmarkReducer,
      sticky: stickyReducer,
    },
    preloadedState: initialState
  })
};
