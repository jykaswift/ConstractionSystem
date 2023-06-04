import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BookmarkService from "../../services/BookmarkService";

export const getBookmarksDocs = createAsyncThunk(
  "docs/getBookmarksDocs",
  async (userId) => {
    const response = await BookmarkService.getBookmarksDocs(userId);
    return response.data;
  }
);

export const getBookmarksInsideDoc = createAsyncThunk(
  "docs/getBookmarksInsideDoc",
  async (data) => {
    const response = await BookmarkService.getBookmarksInsideDoc(data.userId, data.docId);
    return response.data;
  }
);

const initialState = {
  goToBook: '',
  menuItems: [],
  menuItemsLength: 0,
  isAddBookView: false,
  selection: null,
  isMenuActive: false,
  documentFetchingStatus: false,
  documents: [],
  documentsCount: 0,
  status: ''
};

export const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {
    setAddBookView(state, action) {
      state.isAddBookView = action.payload;
    },
    setSelection(state, action) {
      state.selection = action.payload
    },
    setMenuActive(state, action) {
      state.isMenuActive = action.payload
    },

    addBookMenuItem(state, action) {
      state.menuItems = [...state.menuItems, action.payload]
    },

    setGoTo(state, action) {
      state.goToBook = action.payload
    },

    clearDocuments(state) {
      state.documents = []
      state.documentsCount = 0
    }
  },

  extraReducers: (builder) => {
    builder.addCase(getBookmarksDocs.pending, (state) => {
      state.documentFetchingStatus = "loading";
    });

    builder.addCase(getBookmarksDocs.fulfilled, (state, action) => {
      state.documentFetchingStatus = "done";
      state.documents = action.payload;
      state.documentsCount = action.payload.length;
    });

    builder.addCase(getBookmarksDocs.rejected, (state) => {
      state.documentFetchingStatus = "error";
    });

    builder.addCase(getBookmarksInsideDoc.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(getBookmarksInsideDoc.fulfilled, (state, action) => {
      state.status = "done";
      state.menuItems = action.payload;
      state.menuItemsLength = action.payload.length;
    });

    builder.addCase(getBookmarksInsideDoc.rejected, (state) => {
      state.status = "error";
    });

  }

});

export const { setAddBookView, setSelection, setMenuActive, addBookMenuItem, clearDocuments, setGoTo } = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
