import * as actionType from "./actionTypes";

export const savePhotos = photos => ({
  type: actionType.SAVE_PHOTOS_START,
  photos
});

export const savePhotosOkay = () => ({ type: actionType.SAVE_PHOTOS_OKAY });
export const savePhotosFail = err => ({
  type: actionType.SAVE_PHOTOS_FAIL,
  err
});
