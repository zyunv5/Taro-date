//阳历
import Taro, { Component } from "@tarojs/taro";
import { View, PickerView, PickerViewColumn } from "@tarojs/components";
import { calendarFunc, oldDays } from "../../utils/calendar";
import "./index.css";

export default class Index extends Component {
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
      dateValue: [date.getFullYear(), date.getMonth() + 1, date.getDate()],
      isLeap: false,
    };
  }
  componentWillMount() {
    const date = new Date();
    const currentDay = calendarFunc.solar2lunar(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    );
    this.setState({
      days: currentDay.solarDaysArray,
      value: [this.state.years.length - 1, date.getMonth(), date.getDate() - 1],
    });
  }
  componentDidMount() {}
  componentWillUnmount() {}
  componentDidShow() {}
  componentDidHide() {}
  //日期改变触发
  onChangeDate = (e) => {
    const val = e.detail.value;
    const [year, month] = val;
    const currentDay = calendarFunc.solar2lunar(
      this.state.years[year],
      this.state.months[month],
      1
    );
    this.setState({
      days: [...currentDay.solarDaysArray],
      value: [val[0], val[1], val[2]],
      dateValue: [
        this.state.years[val[0]],
        this.state.months[val[1]],
        this.state.days[val[2]],
      ],
    });
  };

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
