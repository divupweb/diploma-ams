import { configureStore } from "@reduxjs/toolkit";
import { activeDirectorySliceReducer } from "./activeDirectory/activeDirectorySlice";
import createSagaMiddleware from "@redux-saga/core";
import saga from "./sagas";
import { notificationsSliceReducer } from "./notifications/notificationsSlice";

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: {
    activeDirectory: activeDirectorySliceReducer,
    notifications: notificationsSliceReducer,
  },
  middleware: [sagaMiddleware],
});
sagaMiddleware.run(saga);
export default store;
