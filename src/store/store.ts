import { configureStore } from "@reduxjs/toolkit";
import { activeDirectorySliceReducer } from "./activeDirectory/activeDirectorySlice";
import createSagaMiddleware from "@redux-saga/core";
import saga from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: {
    activeDirectory: activeDirectorySliceReducer,
  },
  middleware: [sagaMiddleware],
});
sagaMiddleware.run(saga);
export default store;
