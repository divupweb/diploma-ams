import axios, { AxiosError } from "axios";
import { all, put, spawn, takeEvery } from "redux-saga/effects";
import notificationEnum from "../../enums/notificationEnum";
import dateNow from "../../helpers/dateNow";
import { activeDirectorySliceActions } from "../activeDirectory/activeDirectorySlice";
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

type t1 = {
  data: {
    access: string;
    method: any;
  };
};

const tokenValidateWatcher = function* () {
  yield takeEvery(authSliceActions.checkToken, tokenValidateWorker);
};
const tokenValidateWorker = function* (data: any) {
  try {
    const checkToken: AccessToken = yield axios.post(
      `https://studapi.teachmeskills.by/auth/jwt/verify/`,
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
      `https://studapi.teachmeskills.by/auth/jwt/refresh/`,
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
  yield put(activeDirectorySliceActions.setPreLoading(true));
  try {
    const createTokens: CreateTokens = yield axios.post(
      `https://studapi.teachmeskills.by/auth/jwt/create/`,
      data.payload
    );
    localStorage.setItem("access", createTokens.data.access);
    localStorage.setItem("refresh", createTokens.data.refresh);

    if (createTokens.data) {
      yield put(authSliceActions.setLogged(true));
    }

    // const response: FetchAuth = yield axios.post(`api/auth`, data.payload);
    // console.log(response);
    // if (response.data) {
    //   yield put(authSliceActions.setLogged());
    // }
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
    yield put(activeDirectorySliceActions.setPreLoading(false));
  }
};

const authSaga = function* () {
  yield all([spawn(authQueryWatcher)]);
  yield all([spawn(tokenValidateWatcher)]);
  yield all([spawn(tokenRefreshWatcher)]);
};

export default authSaga;
