import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../services/AuthService";
import axios from "axios";

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    const response = await AuthService.login(data.email, data.password);
    localStorage.setItem("token", response.data.accessToken);
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});

export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async (tokenId) => {
    const response = await AuthService.google(tokenId);
    localStorage.setItem("token", response.data.accessToken);
    return response.data;
  }
);

export const registration = createAsyncThunk(
  "auth/registration",
  async (data, thunkAPI) => {
    try {
      const response = await AuthService.registration(
        data.name,
        data.email,
        data.password
      );
      localStorage.setItem("token", response.data.accessToken);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  const response = await AuthService.logout();
  localStorage.removeItem("token");

  return response.data;
});

export const checkAuth = createAsyncThunk("auth/checkAuth", async () => {
  const response = await axios.get(`/api/user/refresh`, {
    withCredentials: true,
  });
  localStorage.setItem("token", response.data.accessToken);
  return response.data;
});

export const edit = createAsyncThunk("user/edit", async (data, thunkAPI) => {
  try {
    const { auth } = thunkAPI.getState();
    const response = await AuthService.edit(
      auth.id,
      data.name,
      data.lastname,
      data.patronymic,
      data.phone
    );
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});

const initialState = {
  name: "",
  id: "",
  lastname: "",
  patronymic: "",
  email: "",
  isAuth: false,
  status: "loading",
  ps: ''
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthBar(state, action) {
      state.name = action.payload.name;
      state.lastname = action.payload.lastname;
      state.patronymic = action.payload.patronymic;
    },

    setRegisterData(state, action) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.ps = action.payload.password;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.name = action.payload.user.name;
      state.email = action.payload.user.email;
      state.id = action.payload.user.id;
      state.lastname = action.payload.user.lastname;
      state.patronymic = action.payload.user.patronymic;
      state.isAuth = true;
    });

    builder.addCase(login.rejected, (state, action) => {
      state.status = "error";
    });

    builder.addCase(googleLogin.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(googleLogin.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.name = action.payload.user.name;
      state.email = action.payload.user.email;
      state.id = action.payload.user.id;
      state.lastname = action.payload.user.lastname;
      state.patronymic = action.payload.user.patronymic;
      state.isAuth = true;
    });

    builder.addCase(googleLogin.rejected, (state, action) => {
      state.status = "error";
    });

    builder.addCase(registration.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(registration.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.name = action.payload.user.name;
      state.email = action.payload.user.email;
    });

    builder.addCase(registration.rejected, (state, action) => {
      state.status = "error";
    });

    builder.addCase(logout.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(logout.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.isAuth = false;
      state.id = "";
      state.name = "";
      state.email = "";
      state.lastname = "";
      state.patronymic = "";
    });

    builder.addCase(logout.rejected, (state, action) => {
      state.status = "error";
    });

    builder.addCase(checkAuth.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.id = action.payload.user.id;
      state.name = action.payload.user.name;
      state.email = action.payload.user.email;
      state.lastname = action.payload.user.lastname;
      state.patronymic = action.payload.user.patronymic;
      state.isAuth = true;
    });

    builder.addCase(checkAuth.rejected, (state, action) => {
      state.status = "error";
    });

    builder.addCase(edit.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(edit.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.name = action.payload.name;
      state.lastname = action.payload.lastname;
      state.patronymic = action.payload.patronymic;
    });

    builder.addCase(edit.rejected, (state, action) => {
      state.status = "error";
    });
  },
});

export const { setAuthBar, setRegisterData } = authSlice.actions;

export default authSlice.reducer;
