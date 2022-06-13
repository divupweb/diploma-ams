import axios, { AxiosError } from "axios";
import { all, put, spawn, takeEvery } from "redux-saga/effects";
import notificationEnum from "../../enums/notificationEnum";
import dateNow from "../../helpers/dateNow";

import { loadersSliceActions } from "../loaders/loadersSlice";
import { notificationsSliceAction } from "../notifications/notificationsSlice";

import { authSliceActions } from "./authSlice";

type CreateTokens = {
  data: {
    access: string;
    refresh: string;
  };
};
type AccessToken = {
  data: {
    access: string;
  };
};
type RefreshToken = {
  data: {
    access: string;
  };
};

const tokenValidateWatcher = function* () {
  yield takeEvery(authSliceActions.checkToken, tokenValidateWorker);
};
const tokenValidateWorker = function* (data: any) {
  try {
    const checkToken: AccessToken = yield axios.post(
      `/api/auth/verify`,
      data.payload
    );
    yield put(authSliceActions.setLogged(true));
  } catch (e) {
    const refreshToken = localStorage.getItem("refresh");
    if (refreshToken) {
      yield put(authSliceActions.refreshToken({ refresh: refreshToken }));
    } else {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      yield put(authSliceActions.setLogged(false));
    }
  }
};

const tokenRefreshWatcher = function* () {
  yield takeEvery(authSliceActions.refreshToken, tokenRefreshWorker);
};
const tokenRefreshWorker = function* (data: any) {
  try {
    const refreshToken: RefreshToken = yield axios.post(
      `/api/auth/refresh`,
      data.payload
    );

    localStorage.setItem("access", refreshToken.data.access);
    yield put(authSliceActions.setLogged(true));
  } catch (e) {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    yield put(authSliceActions.setLogged(false));
  }
};

const authQueryWatcher = function* () {
  yield takeEvery(authSliceActions.authQuery, authQueryWorker);
};
const authQueryWorker = function* (data: any) {
  yield put(loadersSliceActions.setPreLoading(true));
  try {
    const createTokens: CreateTokens = yield axios.post(
      `/api/auth/create`,
      data.payload
    );

    localStorage.setItem("access", createTokens.data.access);
    localStorage.setItem("refresh", createTokens.data.refresh);

    if (createTokens.data) {
      yield put(authSliceActions.setLogged(true));
    }
  } catch (e) {
    const error = e as AxiosError;
    yield put(
      notificationsSliceAction.addNotification({
        type: notificationEnum.ERROR,
        message: error.message,
        action: "auth.conntect-error",
        date: dateNow(),
      })
    );
  } finally {
    yield put(loadersSliceActions.setPreLoading(false));
  }
};

const authSaga = function* () {
  yield all([spawn(authQueryWatcher)]);
  yield all([spawn(tokenValidateWatcher)]);
  yield all([spawn(tokenRefreshWatcher)]);
};

export default authSaga;
