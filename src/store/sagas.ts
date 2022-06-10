import { all, spawn } from "redux-saga/effects";
import activeDirectorySaga from "./activeDirectory/activeDirectorySaga";
import authSaga from "./auth/authSaga";

const saga = function* () {
  yield all([spawn(activeDirectorySaga), spawn(authSaga)]);
};
export default saga;
