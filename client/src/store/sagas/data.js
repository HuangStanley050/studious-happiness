import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";
import * as actionType from "../actions/actionTypes";
import { fetchOkay, fetchFail, fetchScrollOkay } from "../actions/fetchActions";
import API from "../../api";

function* DataSagaWorker(action) {
  const token = yield localStorage.getItem("dockerPhotos");
  try {
    const result = yield axios({
      headers: { Authorization: `bearer ${token}` },
      method: "get",
      url: `${API.loadData}${action.keyword}`
    });
    const transformData = result.data.result.map(photo => {
      return {
        photoId: photo.id,
        photoUrl: photo.urls.regular
      };
    });
    if (action.type === actionType.FETCH_PHOTOS_START) {
      yield put(fetchOkay(transformData));
    } else {
      yield put(fetchScrollOkay(transformData));
    }
  } catch (err) {
    console.log(err.message);
  }
}

function* SaveDataSagaWorker(action) {
  yield console.log(action);
}

export default function* DataSagaWatcher() {
  yield takeEvery(actionType.FETCH_PHOTOS_START, DataSagaWorker);
  yield takeEvery(actionType.FETCH_PHOTOS_SCROLL, DataSagaWorker);
  yield takeEvery(actionType.SAVE_PHOTOS_START, SaveDataSagaWorker);
}
