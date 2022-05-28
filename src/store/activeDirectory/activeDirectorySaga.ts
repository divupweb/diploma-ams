import axios from "axios";

import { all, put, spawn, takeEvery } from "redux-saga/effects";
import UserType from "../../types/userType";
import { activeDirectorySliceActions } from "./activeDirectorySlice";

type fetchUsers = {
  data: UserType[];
};

const fetchActiveDirectoryUsersWatcher = function* () {
  yield takeEvery(
    activeDirectorySliceActions.fetchAllUsers,
    fetchActiveDirectoryUsersWorker
  );
};

const fetchActiveDirectoryUsersWorker = function* () {
  yield put(activeDirectorySliceActions.setLoading(true));
  yield put(activeDirectorySliceActions.setUsers([]));

  try {
    const response: fetchUsers = yield axios.get(`api/users`);
    yield put(activeDirectorySliceActions.setUsers(response.data));
  } catch (e) {
  } finally {
    yield put(activeDirectorySliceActions.setLoading(false));
  }
};

const activeDirectorySaga = function* () {
  yield all([spawn(fetchActiveDirectoryUsersWatcher)]);
};

export default activeDirectorySaga;
