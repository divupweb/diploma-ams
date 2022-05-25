import { configureStore } from "@reduxjs/toolkit";
import activeDirectoryReducer from "./activeDirectory/activeDirectorySlice";
import createSagaMiddleware from "@redux-saga/core";
import saga from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: {
    activeDirectory: activeDirectoryReducer,
  },
  middleware: [sagaMiddleware],
});
sagaMiddleware.run(saga);
export default store;
