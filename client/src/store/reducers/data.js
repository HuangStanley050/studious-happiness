import * as actionType from "../actions/actionTypes";

const initialState = {
  keywords: [],
  data: [],

  collection: [],
  loading: true,
  error: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.LOGOUT:
      return {
        ...state,
        collection: [],
        data: []
      };
    case actionType.FETCH_COLLECTION_START:
    case actionType.FETCH_PHOTOS_SCROLL:
      return {
        ...state,
        loading: true
      };
    case actionType.FETCH_COLLECTION_OKAY:
      return {
        ...state,
        loading: false,
        collection: [...action.data]
      };
    case actionType.SAVE_PHOTOS_START:
      return {
        ...state,
        loading: true
      };
    case actionType.SAVE_PHOTOS_OKAY:
      return {
        ...state,
        loading: false
      };
    case actionType.FETCH_PHOTOS_START:
      return {
        ...state,
        keywords: [...state.keywords, action.keyword],
        loading: true
      };
    case actionType.FETCH_PHOTOS_SCROLL_OKAY:
      return {
        ...state,
        data: [...state.data, ...action.data],
        loading: false
      };
    case actionType.FETCH_PHOTOS_OKAY:
      return {
        ...state,
        data: [...action.data],
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;
