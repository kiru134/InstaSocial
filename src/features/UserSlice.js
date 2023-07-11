import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userauth: {
    authToken: null,
    authTokenType: "",
    username: "",
    userId: "",
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
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
