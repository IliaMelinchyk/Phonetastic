import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";
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
export const initMyItems = (userId = false) => {
  return (dispatch) => {
    dispatch(initMyItemsStart());
    // заменить ? на & если добавлю ?auth=
    const queryParams = `?orderBy="userId"&equalTo="${userId}"`;
    axios
      .get(`/phones.json${userId ? queryParams : ""}`)
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
export const itemDelete = (itemId, token, userId) => {
  return (dispatch) => {
    axios
      .delete(`/phones/${itemId}.json?auth=${token}`)
      .then((res) => {
        console.log(res);
        dispatch(initMyItems(userId));
      })
      .catch((error) => {
        dispatch(initMyItemsFailed(error.message));
      });
  };
};
