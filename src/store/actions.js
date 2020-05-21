import Taro, { Component } from "@tarojs/taro";
import { TimeLine } from "../utils/timeLine";
import { GET_LIST, CHANGE_TABBAR, SHOW_DIALOG,HIDE_DIALOG } from "./constants";

//tabar更改路由
export const changeRouter = (bool) => ({ type: CHANGE_TABBAR, bool });

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

export function addItem(item) {
  return (dispatch) => {
    wx.cloud
      .callFunction({
        name: "addFestival",
        data: {
          database: "dataList",
          condition: item,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.result.errMsg === "collection.add:ok") {
          Taro.switchTab({ url: "/pages/index/index" });
          this.asyncGetList();
        }
      });
  };
}

export function updateItem(item) {
  return (dispatch) => {
    wx.cloud
      .callFunction({
        name: "updateFestival",
        data: { database: "dataList", condition: item },
      })
      .then((res) => {
        if (res.result.errMsg === "document.set:ok") {
          Taro.switchTab({ url: "/pages/index/index" });
          this.asyncGetList();
        }
      });
  };
}

export function removeItem(item) {
  return (dispatch) => {
    wx.cloud
      .callFunction({
        name: "removeFestival",
        data: { database: "dataList", condition: item },
      })
      .then((res) => {
        if (res.result.stats.removed === 1) {
          Taro.switchTab({ url: "/pages/index/index" });
          this.asyncGetList();
        }
      });
  };
}

//同步更新数据
export const getList = (data) => ({ type: GET_LIST, data });

//同步更新模态框
export const changeDialogShow = () => ({ type: SHOW_DIALOG, data:true });

export const changeDialogHide = () => ({ type: HIDE_DIALOG, data:false });

//index页面的模糊搜索
export function asyncSearchKeyWords(keyWords) {
  return (dispatch) => {
    wx.cloud
      .callFunction({
        name: "searchKeyWords",
        data: { database: "dataList", keyWords: keyWords },
      })
      .then((res) => {
        const newData = TimeLine(res.result.data);
        dispatch(getList(newData));
      });
  };
}
