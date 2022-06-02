import { createSlice } from "@reduxjs/toolkit";
import ActiveDirectoryType from "../../types/activeDirectoryType";

const initialState: ActiveDirectoryType = {
  loading: true,
  users: [],
  preLoading: false,
  searchingUser: "",
};

export const activeDirectorySlice = createSlice({
  name: "active_directory",
  initialState,
  reducers: {
    fetchAllUsers: () => {},
    dropUser: (state, { payload }) => {},
    changeStatus: (state, { payload }) => {},
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setUsers: (state, { payload }) => {
      state.users = payload;
    },
    setPreLoading: (state, { payload }) => {
      state.preLoading = payload;
    },
    setSearch: (state, { payload }) => {
      state.searchingUser = payload;
    },
  },
});

export const activeDirectorySliceActions = { ...activeDirectorySlice.actions };
export const activeDirectorySliceReducer = activeDirectorySlice.reducer;
