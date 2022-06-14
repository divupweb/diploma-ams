import { createSlice } from "@reduxjs/toolkit";
import LoadersType from "../../types/loaders/loadersType";

const initialState: LoadersType = {
  loading: true,
  preLoading: false,
};

export const loadersSlice = createSlice({
  name: "loaders",
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setPreLoading: (state, { payload }) => {
      state.preLoading = payload;
    },
  },
});

export const loadersSliceActions = { ...loadersSlice.actions };
export const loadersSliceReducer = loadersSlice.reducer;
