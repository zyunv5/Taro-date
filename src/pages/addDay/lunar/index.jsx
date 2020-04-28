//农历
import Taro, { Component } from "@tarojs/taro";
import { View, PickerView, PickerViewColumn } from "@tarojs/components";
import { calendarFunc, oldDays } from "../../../utils/calendar";
import "./index.css"

export default class Index extends Component {
  config = {
    navigationBarTitleText: "新增",
  };
  constructor() {
    super(...arguments);
    const date = new Date();
    const years = [];
    const months = [];
    for (let i = 1900; i <= date.getFullYear(); i++) {
      years.push(i);
    }
    for (let i = 1; i <= 12; i++) {
      months.push(i);
    }
    this.state = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      years: years,
      months: months,
      days: [],
      value: [],
    };
  }
  componentWillMount() {
    const date = new Date();
    const currentDay = calendarFunc.solar2lunar(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    );
     console.log(currentDay);
  }
  componentDidMount() {}
  componentWillUnmount() {}
  componentDidShow() {}
  componentDidHide() {}

  //日期改变触发
  onChangeDate = (e) => {
    const val = e.detail.value;
  }

  render() {
    return (
      <PickerView
        className="pick-date"
        indicatorStyle="height: 30px;"
        value={this.state.value}
        onChange={this.onChangeDate}
      >
        <PickerViewColumn className="date-item">
          {this.state.years.map((item) => {
            return <View key={item}>{item}年</View>;
          })}
        </PickerViewColumn>
        <PickerViewColumn className="date-item">
          {this.state.months.map((item) => {
            return <View key={item}>{item}月</View>;
          })}
        </PickerViewColumn>
        <PickerViewColumn className="date-item">
          {this.state.days.map((item) => {
            return <View key={item}>{item}日</View>;
          })}
        </PickerViewColumn>
      </PickerView>
    );
  }
}
