import axios, { AxiosError } from "axios";

import { all, put, spawn, takeEvery } from "redux-saga/effects";
import notificationEnum from "../../enums/notificationEnum";
import dateNow from "../../helpers/dateNow";

import UserType from "../../types/userType";
import { notificationsSliceAction } from "../notifications/notificationsSlice";
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
    const error = e as AxiosError;
    yield put(
      notificationsSliceAction.addNotification({
        type: notificationEnum.ERROR,
        message: error.message,
        date: dateNow(),
        action: "notifications.user_get_error",
      })
    );
  } finally {
    yield put(activeDirectorySliceActions.setLoading(false));
  }
};

const dropActiveDirectoryUserWatcher = function* () {
  yield takeEvery(
    activeDirectorySliceActions.dropUser,
    dropActiveDirectoryUserWorker
  );
};
const dropActiveDirectoryUserWorker = function* (data: any) {
  yield put(activeDirectorySliceActions.setPreLoading(true));
  try {
    const response: fetchUsers = yield axios.delete(
      `api/user_delete:${data.payload.dn}`
    );
    yield put(activeDirectorySliceActions.setUsers(response.data));
    yield put(
      notificationsSliceAction.addNotification({
        type: notificationEnum.WARNING,
        message: `${data.payload.login}`,
        date: dateNow(),
        action: "notifications.user_drop",
      })
    );
  } catch (e) {
    const error = e as AxiosError;
    yield put(
      notificationsSliceAction.addNotification({
        type: notificationEnum.ERROR,
        message: error.message,
        action: "notifications.user_drop_error",
        date: dateNow(),
      })
    );
  } finally {
    yield put(activeDirectorySliceActions.setPreLoading(false));
  }
};

const activeDirectorySaga = function* () {
  yield all([spawn(fetchActiveDirectoryUsersWatcher)]);
  yield all([spawn(dropActiveDirectoryUserWatcher)]);
};

export default activeDirectorySaga;
