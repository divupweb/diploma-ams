import { createSlice } from "@reduxjs/toolkit";
import ActiveDirectoryType from "../../types/activeDirectory/activeDirectoryType";

const initialState: ActiveDirectoryType = {
  loading: true,
  users: [],
  preLoading: false,
  searchingUser: "",
  userGroups: {
    default: [],
    all: [],
  },
  pcGroups: {
    default: [],
    all: [],
  },
};

export const activeDirectorySlice = createSlice({
  name: "active_directory",
  initialState,
  reducers: {
    fetchAllUsers: () => {},
    fetchAllGroups: () => {},
    dropUser: (state, { payload }) => {},
    changeStatus: (state, { payload }) => {},
    addUser: (state, { payload }) => {},
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
    setGroups: (state, { payload }) => {
      state.userGroups = payload.userGroups;
      state.pcGroups = payload.pcGroups;
    },
  },
});

export const activeDirectorySliceActions = { ...activeDirectorySlice.actions };
export const activeDirectorySliceReducer = activeDirectorySlice.reducer;
