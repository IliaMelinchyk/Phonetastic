import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";
export const addItemSuccess = (id, item) => {
  return {
    type: actionTypes.ADD_ITEM_SUCCESS,
    phone: item,
    phoneId: id,
  };
};
export const addItemFail = (error) => {
  return {
    type: actionTypes.ADD_ITEM_FAILED,
    error: error,
  };
};
export const addItemStart = () => {
  return {
    type: actionTypes.ADD_ITEM_START,
  };
};
export const addItemModalClose = () => {
  return {
    type: actionTypes.ADD_ITEM_MODAL_CLOSE,
  };
};
export const addItemFileChange = (event) => {
  return {
    type: actionTypes.ADD_ITEM_FILE_CHANGE,
    file: event.target.files[0],
  };
};
export const addItem = (formData, token) => {
  return (dispatch) => {
    dispatch(addItemStart());
    axios
      .post(`/phones.json?auth=${token}`, formData)
      .then((res) => {
        console.log(res.data);
        dispatch(addItemSuccess(res.data.name, formData));
        // this.setState({
        //   loading: false,
        //   success: true,
        //   error: false,
        //   showModal: true,
        // });
      })
      .catch((error) => {
        dispatch(addItemFail(error));
        console.log(error);
        // this.setState({
        //   loading: false,
        //   success: false,
        //   error: error.message,
        //   showModal: true,
        // });
      });
  };
};
