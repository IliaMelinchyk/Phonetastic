import * as actionTypes from "../actions/actionTypes";

const initialState = {
  phones: [],
  error: false,
  loading: false,
  showModal: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_MY_ITEMS_SUCCESS:
      return {
        ...state,
        phones: [...action.phones],
        error: false,
        loading: false,
        showModal: true,
      };
    case actionTypes.INIT_MY_ITEMS_FAILED:
      return {
        ...state,
        error: action.error,
        loading: false,
        showModal: true,
      };
    case actionTypes.INIT_MY_ITEMS_START:
      return {
        ...state,
        error: false,
        loading: true,
      };
    default:
      return state;
  }
};

export default reducer;
