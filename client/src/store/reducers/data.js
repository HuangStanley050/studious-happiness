import * as actionType from "../actions/actionTypes";

const initialState = {
  data: [],
  loading: false,
  error: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.FETCH_PHOTOS_START:
      return {
        ...state,
        loading: true
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
