import { createSlice } from "@reduxjs/toolkit";
import ActiveDirectoryType from "../../types/activeDirectory/activeDirectoryType";

const initialState: ActiveDirectoryType = {
  users: [],
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

    setUsers: (state, { payload }) => {
      state.users = payload;
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
