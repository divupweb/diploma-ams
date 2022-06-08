import { createSlice } from "@reduxjs/toolkit";
import UserCreateServicesType from "../../types/userCreate/userCreateServicesType";

const initialState: UserCreateServicesType = {
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
