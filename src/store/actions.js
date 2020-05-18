import { TimeLine } from "../utils/timeLine";
import {GET_LIST,CHANGE_TABBAR,SEARCH_KEY_WORDS } from "./constants";

//tabar更改路由
export const changeRouter=(bool)=>({type: CHANGE_TABBAR, bool})

//index和mine获取列表数据
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
//同步更新数据
export const getList = (data) => ({ type: GET_LIST, data });

//index页面的模糊搜索
export function asyncSearchKeyWords(keyWords) {
  return (dispatch) => {
    wx.cloud
      .callFunction({
        name: "searchKeyWords",
        data: { database: "dataList", keyWords:keyWords },
      })
      .then((res) => {
        const newData = TimeLine(res.result.data);
        dispatch(getList(newData));
      });
  };
}
