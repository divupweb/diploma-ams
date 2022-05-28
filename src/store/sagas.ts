import { all, spawn } from "redux-saga/effects";
import activeDirectorySaga from "./activeDirectory/activeDirectorySaga";

const saga = function* () {
  yield all([spawn(activeDirectorySaga)]);
};
export default saga;
