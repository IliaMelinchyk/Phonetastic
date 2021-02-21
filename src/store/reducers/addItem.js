import * as actionTypes from "../actions/actionTypes";
const initialState = {
  myPhones: [],
  loading: false,
  showModal: false,
  error: false,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ITEM_SUCCESS:
      const newItem = {
        ...action.phone,
        phoneId: action.phoneId,
      };
      return {
        ...state,
        loading: false,
        error: false,
        phones: state.myPhones.concat(newItem),
        showModal: true,
      };
    case actionTypes.ADD_ITEM_FAILED:
      return {
        ...state,
        loading: false,
        showModal: true,
        error: action.error,
      };
    case actionTypes.ADD_ITEM_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.ADD_ITEM_MODAL_CLOSE:
      return {
        ...state,
        showModal: false,
        error: false,
      };
    default:
      return state;
  }
};
export default reducer;
