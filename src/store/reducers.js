import { combineReducers } from "redux";
import { ADD, MINUS, GET_LIST } from "./constants";
const INITIAL_STATE = {
  num: 0,
};
function counter(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        num: state.num + 1,
      };
    case MINUS:
      return {
        ...state,
        num: state.num - 1,
      };
    default:
      return state;
  }
}

const initList = [];
function list(state = initList, action) {
  switch (action.type) {
    case GET_LIST:
      return [...state, ...action.data];
    default:
      return state;
  }
}

export default combineReducers({
  counter,
  list,
});
