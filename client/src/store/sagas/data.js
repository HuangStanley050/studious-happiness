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
    const transformData = result.data.result.map(photo => {
      return {
        photoId: photo.id,
        photoUrl: photo.urls.regular
      };
    });
    yield put(fetchOkay(transformData));
  } catch (err) {
    console.log(err.message);
  }
}

export default function* DataSagaWatcher() {
  yield takeEvery(actionType.FETCH_PHOTOS_START, DataSagaWorker);
}
