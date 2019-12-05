import { takeEvery, put, select } from "redux-saga/effects";
import axios from "axios";
import * as actionType from "../actions/actionTypes";
import {
  fetchOkay,
  fetchFail,
  fetchScrollOkay,
  fetchCollectionOkay,
  fetchCollectionFail
} from "../actions/fetchActions";
import { savePhotosOkay } from "../actions/dataActions";
import API from "../../api";

const getId = state => state.auth.userInfo.id;

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

function* CollectionSagaWorker(action) {
  const token = yield localStorage.getItem("dockerPhotos");
  try {
    const result = yield axios({
      headers: { Authorization: `bearer ${token}` },
      method: "get",
      url: `${API.collection}`
    });

    yield put(fetchCollectionOkay(result.data.data));
  } catch (err) {
    console.log(err);
  }
}

function* SaveDataSagaWorker(action) {
  const id = yield select(getId);
  const { photos } = action;
  const token = yield localStorage.getItem("dockerPhotos");

  try {
    const result = yield axios({
      headers: { Authorization: `bearer ${token}` },
      method: "post",
      url: `${API.saveData}`,
      data: {
        photos,
        id
      }
    });
    yield put(savePhotosOkay());
  } catch (err) {
    console.log(err);
  }
}

export default function* DataSagaWatcher() {
  yield takeEvery(actionType.FETCH_PHOTOS_START, DataSagaWorker);
  yield takeEvery(actionType.FETCH_PHOTOS_SCROLL, DataSagaWorker);
  yield takeEvery(actionType.SAVE_PHOTOS_START, SaveDataSagaWorker);
  yield takeEvery(actionType.FETCH_COLLECTION_START, CollectionSagaWorker);
}
