import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";
import app from "../../base";

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

export const addItemFileUrl = (fileUrl) => {
  return {
    type: actionTypes.ADD_ITEM_FILE_URL,
    fileUrl: fileUrl,
  };
};

export const addItemFileUnmount = () => {
  return {
    type: actionTypes.ADD_ITEM_FILE_UNMOUNT,
    fileUrl: "",
    file: null,
  };
};

export const addItem = (formData, token) => {
  return (dispatch) => {
    dispatch(addItemStart());
    axios
      .post(`/phones.json?auth=${token}`, formData)
      .then((res) => {
        dispatch(addItemSuccess(res.data.name, formData));
      })
      .catch((error) => {
        dispatch(addItemFail(error));
      });
  };
};

export const addItemFile = (userId, file) => {
  return async (dispatch) => {
    const storageRef = app.storage().ref(`${userId}/`);
    const fileRef = storageRef.child(new Date().getTime() + file.name);
    await fileRef.put(file).catch((error) => dispatch(addItemFail(error)));
    dispatch(addItemFileUrl(await fileRef.getDownloadURL()));
  };
};
