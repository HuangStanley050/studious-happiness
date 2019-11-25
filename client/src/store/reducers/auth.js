import * as actionType from "../actions/actionTypes";

const initialState = {
  isAuth: false,
  userInfo: null,
  loading: false,
  error: "",
  keywords: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.LOGIN_START:
      return {
        ...state,
        loading: true
      };
    case actionType.LOGIN_OKAY:
      return {
        ...state,
        loading: false,
        isAuth: true,
        keywords: [...action.userInfo.searchResults],
        userInfo: {
          ...state.userInfo,
          ...action.userInfo
        }
      };
    default:
      return state;
  }
};

export default reducer;
