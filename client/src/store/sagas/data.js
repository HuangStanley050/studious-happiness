import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";
import * as actionType from "../actions/actionTypes";
import { fetchOkay, fetchFail } from "../actions/fetchActions";
import API from "../../api";

function* DataSagaWorker(action) {
  const token = yield localStorage.getItem("dockerPhotos");
  try {
    const result = yield axios({
      headers: { Authorization: `bearer ${token}` },
      method: "get",
      url: API.loadData
    });
    yield put(fetchOkay(result.data.result));
  } catch (err) {
    console.log(err.response);
  }
}

export default function* DataSagaWatcher() {
  yield takeEvery(actionType.FETCH_PHOTOS_START, DataSagaWorker);
}
