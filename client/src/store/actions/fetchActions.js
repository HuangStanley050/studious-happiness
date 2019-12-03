import * as actionType from "./actionTypes";

export const fetchCollectionStart = () => ({
  type: actionType.FETCH_COLLECTION_START
});
export const fetchCollectionOkay = data => ({
  type: actionType.FETCH_COLLECTION_OKAY,
  data
});
export const fetchCollectionFail = err => ({
  type: actionType.FETCH_COLLECTION_FAIL,
  err
});
export const fetchStart = keyword => ({
  type: actionType.FETCH_PHOTOS_START,
  keyword
});
export const fetchUpdate = keyword => ({
  type: actionType.FETCH_PHOTOS_SCROLL,
  keyword
});
export const fetchOkay = data => ({ type: actionType.FETCH_PHOTOS_OKAY, data });
export const fetchScrollOkay = data => ({
  type: actionType.FETCH_PHOTOS_SCROLL_OKAY,
  data
});
export const fetchFail = err => ({ type: actionType.FETCH_PHOTOS_FAIL, err });
