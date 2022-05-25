import { createSlice } from "@reduxjs/toolkit";

export const activeDirectorySlice = createSlice({
  name: "active_directory",
  initialState: {
    value: 0,
  },
  reducers: {
    test: (state, action) => {
      console.log("test");
      state.value = action.payload;
    },
  },
});

export const { test } = activeDirectorySlice.actions;
export default activeDirectorySlice.reducer;
