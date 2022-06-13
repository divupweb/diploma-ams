import { AxiosError } from "axios";

import { all, put, spawn, takeEvery } from "redux-saga/effects";
import notificationEnum from "../../enums/notificationEnum";
import dateNow from "../../helpers/dateNow";
import axiosServer from "../../helpers/interceptor";
import GroupsType from "../../types/activeDirectory/groupsType";

import UserType from "../../types/activeDirectory/userType";
import { authSliceActions } from "../auth/authSlice";
import { loadersSliceActions } from "../loaders/loadersSlice";

import { notificationsSliceAction } from "../notifications/notificationsSlice";
import { activeDirectorySliceActions } from "./activeDirectorySlice";

type FetchUsersType = {
  data: UserType[];
};
type FetchGroupsType = {
  data: GroupsType;
};

const fetchActiveDirectoryUsersWatcher = function* () {
  yield takeEvery(
    activeDirectorySliceActions.fetchAllUsers,
    fetchActiveDirectoryUsersWorker
  );
};

const fetchActiveDirectoryUsersWorker = function* () {
  yield put(loadersSliceActions.setLoading(true));
  yield put(activeDirectorySliceActions.setUsers([]));

  try {
    const response: FetchUsersType = yield axiosServer.get(`api/users`);

    yield put(activeDirectorySliceActions.setUsers(response.data));
  } catch (e) {
    const error = e as AxiosError;
    if (error.response?.status === 401)
      yield put(authSliceActions.setLogged(false));
    else
      yield put(
        notificationsSliceAction.addNotification({
          type: notificationEnum.ERROR,
          message: error.message,
          date: dateNow(),
          action: "notifications.user_get_error",
        })
      );
  } finally {
    yield put(loadersSliceActions.setLoading(false));
  }
};

const dropActiveDirectoryUserWatcher = function* () {
  yield takeEvery(
    activeDirectorySliceActions.dropUser,
    dropActiveDirectoryUserWorker
  );
};
const dropActiveDirectoryUserWorker = function* (data: any) {
  yield put(loadersSliceActions.setPreLoading(true));
  try {
    const response: FetchUsersType = yield axiosServer.delete(
      `api/user_delete/${data.payload.dn}`
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
    if (error.response?.status === 401)
      yield put(authSliceActions.setLogged(false));
    else {
      yield put(
        notificationsSliceAction.addNotification({
          type: notificationEnum.ERROR,
          message: error.message,
          action: "notifications.user_drop_error",
          date: dateNow(),
        })
      );
    }
  } finally {
    yield put(loadersSliceActions.setPreLoading(false));
  }
};

const changeActiveDirectoryStatusWatcher = function* () {
  yield takeEvery(
    activeDirectorySliceActions.changeStatus,
    changeActiveDirectoryStatusWorker
  );
};

const changeActiveDirectoryStatusWorker = function* (data: any) {
  yield put(loadersSliceActions.setPreLoading(true));
  try {
    const response: FetchUsersType = yield axiosServer.put(
      `api/user_change_status/${data.payload.user.dn}`
    );

    yield put(activeDirectorySliceActions.setUsers(response.data));
    yield put(
      notificationsSliceAction.addNotification({
        type: notificationEnum.SUCCESS,
        message: `${data.payload.user.login}`,
        date: dateNow(),
        action: "notifications.user_status_change",
      })
    );
  } catch (e) {
    const error = e as AxiosError;
    if (error.response?.status === 401)
      yield put(authSliceActions.setLogged(false));
    yield put(
      notificationsSliceAction.addNotification({
        type: notificationEnum.ERROR,
        message: error.message,
        action: "notifications.user_change_status_error",
        date: dateNow(),
      })
    );
  } finally {
    yield put(loadersSliceActions.setPreLoading(false));
  }
};

const fetchActiveDirectoryGroupsWatcher = function* () {
  yield takeEvery(
    activeDirectorySliceActions.fetchAllGroups,
    fetchActiveDirectoryGroupsWorker
  );
};
const fetchActiveDirectoryGroupsWorker = function* () {
  yield put(loadersSliceActions.setLoading(true));
  try {
    const response: FetchGroupsType = yield axiosServer.get(`api/groups`);

    yield put(activeDirectorySliceActions.setGroups(response.data));
  } catch (e) {
    const error = e as AxiosError;
    if (error.response?.status === 401)
      yield put(authSliceActions.setLogged(false));
    yield put(
      notificationsSliceAction.addNotification({
        type: notificationEnum.ERROR,
        message: error.message,
        action: "notifications.groups_get_error",
        date: dateNow(),
      })
    );
  } finally {
    yield put(loadersSliceActions.setLoading(false));
  }
};

const addActiveDirectoryUserWatcher = function* () {
  yield takeEvery(
    activeDirectorySliceActions.addUser,
    addActiveDirectoryUserWorker
  );
};
const addActiveDirectoryUserWorker = function* (data: any) {
  yield put(loadersSliceActions.setPreLoading(true));
  try {
    const response: FetchGroupsType = yield axiosServer.post(
      `api/user_add`,
      data.payload
    );
    yield put(activeDirectorySliceActions.setUsers(response.data));
    yield put(
      notificationsSliceAction.addNotification({
        type: notificationEnum.SUCCESS,
        message: `${data.payload.login}`,
        date: dateNow(),
        action: "notifications.user_add",
      })
    );
  } catch (e) {
    const error = e as AxiosError;
    if (error.response?.status === 401)
      yield put(authSliceActions.setLogged(false));
    yield put(
      notificationsSliceAction.addNotification({
        type: notificationEnum.ERROR,
        message: error.message,
        action: "notifications.user_add_error",
        date: dateNow(),
      })
    );
  } finally {
    yield put(loadersSliceActions.setPreLoading(false));
  }
};

const activeDirectorySaga = function* () {
  yield all([spawn(fetchActiveDirectoryUsersWatcher)]);
  yield all([spawn(dropActiveDirectoryUserWatcher)]);
  yield all([spawn(changeActiveDirectoryStatusWatcher)]);
  yield all([spawn(fetchActiveDirectoryGroupsWatcher)]);
  yield all([spawn(addActiveDirectoryUserWatcher)]);
};

export default activeDirectorySaga;
