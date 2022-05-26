import { createSlice } from "@reduxjs/toolkit";

export const activeDirectorySlice = createSlice({
  name: "active_directory",
  initialState: {
    loading: true,
  },
  reducers: {
    test: (state, action) => {
      console.log("test");
      state.loading = false;
    },
  },
});

export const { test } = activeDirectorySlice.actions;
export default activeDirectorySlice.reducer;
