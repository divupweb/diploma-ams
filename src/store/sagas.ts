import { takeEvery } from "redux-saga/effects";
import getActiveDirectoryUsers from "./activeDirectory/activeDirectorySaga";

const saga = function* () {
  yield takeEvery("zzz", getActiveDirectoryUsers);
};
export default saga;
