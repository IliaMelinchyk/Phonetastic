import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";
import { app } from "../../base";
export const initMyItemsFailed = (error) => {
  return {
    type: actionTypes.INIT_MY_ITEMS_FAILED,
    error: error,
  };
};
export const initMyItemsSuccess = (items) => {
  return {
    type: actionTypes.INIT_MY_ITEMS_SUCCESS,
    phones: items,
  };
};
export const initMyItemsStart = () => {
  return {
    type: actionTypes.INIT_MY_ITEMS_START,
  };
};
export const initMyItems = (userId) => {
  return (dispatch) => {
    dispatch(initMyItemsStart());
    // заменить ? на & если добавлю ?auth=
    axios
      .get(`/phones.json?orderBy="userId"&equalTo="${userId}"`)
      .then((res) => {
        const fetchedItems = [];
        for (let key in res.data) {
          fetchedItems.push({ ...res.data[key], id: key });
        }
        dispatch(initMyItemsSuccess(fetchedItems));
      })
      .catch((error) => {
        dispatch(initMyItemsFailed(error.message));
      });
  };
};
export const itemDelete = (itemId, token, userId, fileUrl) => {
  return (dispatch) => {
    axios
      .delete(`/phones/${itemId}.json?auth=${token}`)
      .then((res) => {
        console.log(res);
        app
          .storage()
          .refFromURL(fileUrl)
          .delete()
          .then(() => dispatch(initMyItems(userId)))
          .catch((error) => {
            dispatch(initMyItemsFailed(error.message));
          });
      })
      .catch((error) => {
        dispatch(initMyItemsFailed(error.message));
      });
  };
};
