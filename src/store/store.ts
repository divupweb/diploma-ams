import { configureStore } from "@reduxjs/toolkit";
import activeDirectoryReducer from "./activeDirectory/activeDirectorySlice";
export default configureStore({
  reducer: {
    activeDirectory: activeDirectoryReducer,
  },
});
