import { TimeLine } from "../utils/timeLine";
import { ADD, MINUS, GET_LIST } from "./constants";

export const add = () => {
  return {
    type: ADD,
  };
};
export const minus = () => {
  return {
    type: MINUS,
  };
};

// 异步的 action
export function asyncAdd() {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(add());
    }, 2000);
  };
}

export function asyncGetList() {
  return (dispatch) => {
    wx.cloud
      .callFunction({
        name: "getList",
        data: { database: "dataList", condition: {} },
      })
      .then((res) => {
        const newData = TimeLine(res.result.data);
        dispatch(getList(newData));
      });
  };
}

export const getList = (data) => ({ type: GET_LIST, data });
