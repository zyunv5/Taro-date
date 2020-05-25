import Taro from "@tarojs/taro";
import { combineReducers } from "redux";
import {
  GET_LIST,
  CHANGE_TABBAR,
  SEARCH_KEY_WORDS,
  SHOW_DIALOG,
  HIDE_DIALOG,
  CHANGE_USER,
  SHOW_LOADING,
  HIDE_LOADING,
} from "./constants";
import avatar from "../assets/images/normal-avatar.png";

//tabar更改路由
const initRouter = 0;
function routerSelect(state = initRouter, action) {
  switch (action.type) {
    case CHANGE_TABBAR:
      return action.bool;
    default:
      return state;
  }
}

//显示登录框
const defaultDialog = false;
function changeDialog(state = defaultDialog, action) {
  switch (action.type) {
    case SHOW_DIALOG:
      return action.data;
    case HIDE_LOADING:
      return action.data;
    default:
      return state;
  }
}

const defaultUser = {
  nickName: "Hello User",
  avatar: avatar,
};
function changeUser(state = defaultUser, action) {
  switch (action.type) {
    case CHANGE_USER:
      return action.data;
    default:
      return state;
  }
}

//index和mine获取列表数据
const initList = [
  // {
  //   id: 0,
  //   name: "妈妈", //名称
  //   sex: 0, //0女 1男 2默认不填
  //   term: "5", //还有几天
  //   cycle: "40", //多少周年
  //   avatar:
  //     "https://statich.yidianzixun.com/public/file/1587524234342/avatar.jpg", //头像
  //   solarCalendar: "1971-3-28", //阳历
  //   lunarCalendar: "", //阴历
  //   type: 0, //0是生日 1是纪念日
  // },
  // {
  //   id: 1,
  //   name: "爸爸",
  //   sex: 1,
  //   term: "15",
  //   cycle: "20",
  //   avatar: "",
  //   solarCalendar: "",
  //   lunarCalendar: "",
  //   type: 0,
  // },
  // {
  //   id: 2,
  //   name: "妻子",
  //   sex: 0,
  //   term: "25",
  //   cycle: "30",
  //   avatar: "",
  //   solarCalendar: "",
  //   lunarCalendar: "",
  //   type: 0,
  // },
  // {
  //   id: 0,
  //   name: "妈妈", //名称
  //   sex: 0, //0女 1男 2默认不填
  //   term: "5", //还有几天
  //   cycle: "40", //多少周年
  //   avatar:
  //     "https://statich.yidianzixun.com/public/file/1587524234342/avatar.jpg", //头像
  //   solarCalendar: "1971-3-28", //阳历
  //   lunarCalendar: "", //阴历
  //   type: 0, //0是生日 1是纪念日
  // },
  // {
  //   id: 0,
  //   name: "妈妈", //名称
  //   sex: 0, //0女 1男 2默认不填
  //   term: "5", //还有几天
  //   cycle: "40", //多少周年
  //   avatar:
  //     "https://statich.yidianzixun.com/public/file/1587524234342/avatar.jpg", //头像
  //   solarCalendar: "1971-3-28", //阳历
  //   lunarCalendar: "", //阴历
  //   type: 0, //0是生日 1是纪念日
  // },
  // {
  //   id: 0,
  //   name: "妈妈", //名称
  //   sex: 0, //0女 1男 2默认不填
  //   term: "5", //还有几天
  //   cycle: "40", //多少周年
  //   avatar:
  //     "https://statich.yidianzixun.com/public/file/1587524234342/avatar.jpg", //头像
  //   solarCalendar: "1971-3-28", //阳历
  //   lunarCalendar: "", //阴历
  //   type: 0, //0是生日 1是纪念日
  // },
  // {
  //   id: 0,
  //   name: "妈妈", //名称
  //   sex: 0, //0女 1男 2默认不填
  //   term: "5", //还有几天
  //   cycle: "40", //多少周年
  //   avatar:
  //     "https://statich.yidianzixun.com/public/file/1587524234342/avatar.jpg", //头像
  //   solarCalendar: "1971-3-28", //阳历
  //   lunarCalendar: "", //阴历
  //   type: 0, //0是生日 1是纪念日
  // },
  // {
  //   id: 0,
  //   name: "妈妈", //名称
  //   sex: 0, //0女 1男 2默认不填
  //   term: "5", //还有几天
  //   cycle: "40", //多少周年
  //   avatar:
  //     "https://statich.yidianzixun.com/public/file/1587524234342/avatar.jpg", //头像
  //   solarCalendar: "1971-3-28", //阳历
  //   lunarCalendar: "", //阴历
  //   type: 0, //0是生日 1是纪念日
  // },
  // {
  //   id: 0,
  //   name: "妈妈", //名称
  //   sex: 0, //0女 1男 2默认不填
  //   term: "5", //还有几天
  //   cycle: "40", //多少周年
  //   avatar:
  //     "https://statich.yidianzixun.com/public/file/1587524234342/avatar.jpg", //头像
  //   solarCalendar: "1971-3-28", //阳历
  //   lunarCalendar: "", //阴历
  //   type: 0, //0是生日 1是纪念日
  // },
  // {
  //   id: 0,
  //   name: "妈妈", //名称
  //   sex: 0, //0女 1男 2默认不填
  //   term: "5", //还有几天
  //   cycle: "40", //多少周年
  //   avatar:
  //     "https://statich.yidianzixun.com/public/file/1587524234342/avatar.jpg", //头像
  //   solarCalendar: "1971-3-28", //阳历
  //   lunarCalendar: "", //阴历
  //   type: 0, //0是生日 1是纪念日
  // },
  // {
  //   id: 0,
  //   name: "妈妈", //名称
  //   sex: 0, //0女 1男 2默认不填
  //   term: "5", //还有几天
  //   cycle: "40", //多少周年
  //   avatar:
  //     "https://statich.yidianzixun.com/public/file/1587524234342/avatar.jpg", //头像
  //   solarCalendar: "1971-3-28", //阳历
  //   lunarCalendar: "", //阴历
  //   type: 0, //0是生日 1是纪念日
  // },
  // {
  //   id: 0,
  //   name: "妈妈", //名称
  //   sex: 0, //0女 1男 2默认不填
  //   term: "5", //还有几天
  //   cycle: "40", //多少周年
  //   avatar:
  //     "https://statich.yidianzixun.com/public/file/1587524234342/avatar.jpg", //头像
  //   solarCalendar: "1971-3-28", //阳历
  //   lunarCalendar: "", //阴历
  //   type: 0, //0是生日 1是纪念日
  // },
  // {
  //   id: 0,
  //   name: "妈妈", //名称
  //   sex: 0, //0女 1男 2默认不填
  //   term: "5", //还有几天
  //   cycle: "40", //多少周年
  //   avatar:
  //     "https://statich.yidianzixun.com/public/file/1587524234342/avatar.jpg", //头像
  //   solarCalendar: "1971-3-28", //阳历
  //   lunarCalendar: "", //阴历
  //   type: 0, //0是生日 1是纪念日
  // },
  // {
  //   id: 0,
  //   name: "妈妈", //名称
  //   sex: 0, //0女 1男 2默认不填
  //   term: "5", //还有几天
  //   cycle: "40", //多少周年
  //   avatar:
  //     "https://statich.yidianzixun.com/public/file/1587524234342/avatar.jpg", //头像
  //   solarCalendar: "1971-3-28", //阳历
  //   lunarCalendar: "", //阴历
  //   type: 0, //0是生日 1是纪念日
  // },
];
function list(state = initList, action) {
  switch (action.type) {
    case GET_LIST:
      return [...action.data];
    default:
      return state;
  }
}

//index页面的模糊搜索
const initSearch = "";
function searchKeyWords(state = initSearch, action) {
  switch (action.type) {
    case SEARCH_KEY_WORDS:
      return [...action.data];
    default:
      return state;
  }
}

export default combineReducers({
  list,
  routerSelect,
  searchKeyWords,
  changeDialog,
  changeUser,
});
