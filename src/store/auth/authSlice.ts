import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogged: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogged: (state, { payload }) => {
      state.isLogged = payload;
    },
    checkToken: (state, { payload }) => {},
    refreshToken: (state, { payload }) => {},
    authQuery: (state, { payload }) => {},
  },
});

export const authSliceActions = { ...authSlice.actions };
export const authSliceReducer = authSlice.reducer;
