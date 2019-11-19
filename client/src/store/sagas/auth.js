import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";
import * as actionType from "../actions/actionTypes";
import { loginFail, loginOkay } from "../actions/authActions";
import API from "../../api";

function* LoginSagaWorker(action) {
  const { email, password } = action.userInfo;
  let token = null;
  let userInfo = null;
  try {
    const result = yield axios.post(API.login, { email, password });
    token = result.data.token;
    userInfo = result.data.userInfo;
    yield localStorage.setItem("dockerPhotos", token);
    yield put(loginOkay(userInfo));
    console.log(result.data);
  } catch (err) {
    console.log(err);
  }
}

export default function* AuthSagaWatcher() {
  yield takeEvery(actionType.LOGIN_START, LoginSagaWorker);
}
