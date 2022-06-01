import { createSlice } from "@reduxjs/toolkit";
import ActiveDirectoryType from "../../types/activeDirectoryType";

const initialState: ActiveDirectoryType = {
  loading: true,
  users: [],
  preLoading: false,
};

export const activeDirectorySlice = createSlice({
  name: "active_directory",
  initialState,
  reducers: {
    fetchAllUsers: () => {},
    dropUser: (state, { payload }) => {},
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setUsers: (state, { payload }) => {
      state.users = payload;
    },
    setPreLoading: (state, { payload }) => {
      state.preLoading = payload;
    },
  },
});

export const activeDirectorySliceActions = { ...activeDirectorySlice.actions };
export const activeDirectorySliceReducer = activeDirectorySlice.reducer;
