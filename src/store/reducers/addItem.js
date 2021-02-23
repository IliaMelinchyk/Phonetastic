import * as actionTypes from "../actions/actionTypes";
const initialState = {
  loading: false,
  showModal: false,
  error: false,
  file: null,
  fileUrl: "",
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
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
    case actionTypes.ADD_ITEM_FILE_CHANGE:
      return {
        ...state,
        file: action.file,
      };
    case actionTypes.ADD_ITEM_FILE_URL:
      return {
        ...state,
        fileUrl: action.fileUrl,
      };
    default:
      return state;
  }
};
export default reducer;
