import { call, put } from "redux-saga/effects";
import { test } from "./activeDirectorySlice";

function resolveAfter2Seconds(x: any): any {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(x);
      console.log("delay compelete");
    }, 2000);
  });
}

function* getActiveDirectoryUsers() {
  try {
    yield call(resolveAfter2Seconds as any);
    yield put({ type: test.type, payload: 3 });
  } catch (e) {}
}
export default getActiveDirectoryUsers;
