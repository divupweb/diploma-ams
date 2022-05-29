import axios, { AxiosError } from "axios";

import { all, put, spawn, takeEvery } from "redux-saga/effects";
import notificationEnum from "../../enums/notificationEnum";
import UserType from "../../types/userType";
import { notificationsSliceAction } from "../notifications/notificationsSlice";
import { activeDirectorySliceActions } from "./activeDirectorySlice";

type fetchUsers = {
  data: UserType[];
};

const fetchActiveDirectoryUsersWatcher = function* () {
  yield takeEvery(activeDirectorySliceActions.fetchAllUsers, fetchActiveDirectoryUsersWorker);
};

const fetchActiveDirectoryUsersWorker = function* () {
  yield put(activeDirectorySliceActions.setLoading(true));
  yield put(activeDirectorySliceActions.setUsers([]));

  try {
    const response: fetchUsers = yield axios.get(`api/users5`);
    yield put(activeDirectorySliceActions.setUsers(response.data));
  } catch (e) {
    const error = e as AxiosError;
    yield put(
      notificationsSliceAction.addNotification({
        type: notificationEnum.ERROR,
        message: error.message,
      })
    );
  } finally {
    yield put(activeDirectorySliceActions.setLoading(false));
  }
};

const activeDirectorySaga = function* () {
  yield all([spawn(fetchActiveDirectoryUsersWatcher)]);
};

export default activeDirectorySaga;
