import { createSlice } from "@reduxjs/toolkit";
import UserCreateType from "../../types/userCreateType";

const initialState: UserCreateType = {
  services: [],
};
export const userCreateSlice = createSlice({
  name: "userCreate",
  initialState,
  reducers: {
    setServices: (state, { payload }) => {
      state.services = payload;
    },
  },
});

export const userCreateSliceActions = { ...userCreateSlice.actions };
export const userCreateSliceReducer = userCreateSlice.reducer;
