import * as actionType from "./actionTypes";

export const login = userInfo => ({ type: actionType.LOGIN_START, userInfo });
export const loginOkay = userInfo => ({
  type: actionType.LOGIN_OKAY,
  userInfo
});
export const loginFail = errorMsg => ({
  type: actionType.LOGIN_FAIL,
  errorMsg
});
