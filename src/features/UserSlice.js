import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userauth: {
    authToken: null,
    authTokenType: "",
    username: "",
    userId: "",
    dp: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.userauth = action.payload;
    },
    logoutUser: (state, action) => {
      state.userauth = action.payload;
    },
    editUser: (state, action) => {
      state.userauth.dp = action.payload.dp;
    },
  },
});

export const { loginUser, logoutUser, editUser } = userSlice.actions;
