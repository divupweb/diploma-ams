import { createSlice } from "@reduxjs/toolkit";
import ConfirmationType from "../../types/confirmation/confirmationType";

const initialState: ConfirmationType = {
  notice: null,
};

export const confirmationSlice = createSlice({
  name: "confirmation",
  initialState,
  reducers: {
    confirm: (state, { payload }) => {
      state.notice = payload;
    },
  },
});
export const confirmationSliceActions = { ...confirmationSlice.actions };
export const confirmationSliceReducer = confirmationSlice.reducer;
