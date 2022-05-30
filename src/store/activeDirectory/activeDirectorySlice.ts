import { createSlice } from "@reduxjs/toolkit";

export const activeDirectorySlice = createSlice({
  name: "active_directory",
  initialState: {
    loading: true,
    users: [],
  },
  reducers: {
    fetchAllUsers: () => {},
    dropUser: (state, { payload }) => {},
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setUsers: (state, { payload }) => {
      state.users = payload;
    },
  },
});

export const activeDirectorySliceActions = { ...activeDirectorySlice.actions };
export const activeDirectorySliceReducer = activeDirectorySlice.reducer;
