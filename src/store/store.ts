import { configureStore } from "@reduxjs/toolkit";
import { activeDirectorySliceReducer } from "./activeDirectory/activeDirectorySlice";
import createSagaMiddleware from "@redux-saga/core";
import saga from "./sagas";
import { notificationsSliceReducer } from "./notifications/notificationsSlice";
import { confirmationSliceReducer } from "./confirmation/confirmationSlice";
import { userCreateSliceReducer } from "./userCreate/userCreateSlice";
import { authSliceReducer } from "./auth/authSlice";
import { loadersSliceReducer } from "./loaders/loadersSlice";

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: {
    activeDirectory: activeDirectorySliceReducer,
    notifications: notificationsSliceReducer,
    confirmation: confirmationSliceReducer,
    userCreate: userCreateSliceReducer,
    auth: authSliceReducer,
    loaders: loadersSliceReducer,
  },
  middleware: [sagaMiddleware],
});
sagaMiddleware.run(saga);
export default store;
