import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProjectService from "../../services/ProjectService";

export const fetchProjectNames = createAsyncThunk(
  "docs/fetchProjectNames",
  async (userId) => {
    const response = await ProjectService.getProjectsNames(userId);
    return response.data;
  }
);

export const createProject = createAsyncThunk(
  "docs/createProject",
  async (args) => {
    const { userId, name } = args;
    const response = await ProjectService.createProject(userId, name);
    return response.data;
  }
);

export const addDocument = createAsyncThunk(
  "docs/addDocument",
  async (args) => {
    const { projectId, elasticId, docName } = args;
    const response = await ProjectService.addDocument(
      projectId,
      elasticId,
      docName
    );
    return response.data;
  }
);

export const getProjects = createAsyncThunk(
  "docs/getProjects",
  async (userId) => {
    const response = await ProjectService.getProjects(userId);
    return response.data;
  }
);

const initialState = {
  isAddDocumentActive: false,
  isCreateFolderActive: false,
  selectOptions: [],
  createWarning: "",
  folders: [],
  foldersFetchingStatus: "loading",
  foldersCount: "",
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProjectClicked(state) {
      state.isAddDocumentActive = !state.isAddDocumentActive;
    },
    setCreateFolder(state, action) {
      state.isCreateFolderActive = action.payload;
    },

    setCreateWarning(state, action) {
      state.createWarning = action.payload;
    },

    deleteProject(state, action) {
      state.folders = state.folders.filter(function (obj) {
        return obj["project_id"] !== action.payload;
      })
      state.foldersCount = state.foldersCount - 1
    }
  },

  extraReducers: (builder) => {
    builder.addCase(fetchProjectNames.pending, (state) => {
      state.selectOptions = [];
    });

    builder.addCase(fetchProjectNames.fulfilled, (state, action) => {
      state.selectOptions = action.payload;
    });

    builder.addCase(fetchProjectNames.rejected, (state) => {
      state.selectOptions = [];
    });

    builder.addCase(createProject.pending, (state) => {
      state.createWarning = "";
    });

    builder.addCase(createProject.fulfilled, (state, action) => {
      state.selectOptions = [...state.selectOptions, action.payload];
      state.isCreateFolderActive = false;
      state.folders = [...state.folders, { project_id: action.payload.value, name: action.payload.label, count: 0}]
    });

    builder.addCase(createProject.rejected, (state) => {
      state.createWarning = "Такой проект уже существует";
    });

    builder.addCase(addDocument.fulfilled, (state) => {
      state.isAddDocumentActive = false;
      state.isCreateFolderActive = false;
    });

    builder.addCase(addDocument.rejected, (state, action) => {
      console.log(action);
    });

    builder.addCase(getProjects.pending, (state) => {
      state.foldersFetchingStatus = "loading";
    });

    builder.addCase(getProjects.fulfilled, (state, action) => {
      state.foldersFetchingStatus = "done";
      state.folders = action.payload;
      state.foldersCount = action.payload.length;
    });

    builder.addCase(getProjects.rejected, (state, action) => {
      state.foldersFetchingStatus = "error";
      console.log(action);
    });
  },
});

export const { setProjectClicked, setCreateFolder, setCreateWarning, deleteProject } =
  projectSlice.actions;

export default projectSlice.reducer;
