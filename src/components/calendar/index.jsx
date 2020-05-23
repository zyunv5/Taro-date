import Taro, { Component, Fragment } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import "./index.css";
import { connect } from "@tarojs/redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../store/actions";
import { calendarFunc, calendarTable } from "../../utils/calendar";

function mapStateToProps(state) {
  return {
    list: state.list,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(Actions, dispatch),
  };
}
@connect(mapStateToProps, mapDispatchToProps)
export default class Index extends Component {
  constructor(props) {
    super(props);
    const date = new Date();
    const days = [];
    for (var i = 0; i < 30; i++) {
      days.push(i);
    }
    this.state = {
      weekday: ["日", "一", "二", "三", "四", "五", "六"],
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      cMonth: date.getMonth() + 1,
      day: days,
      cDay: date.getDate(),
    };
  }

  static defaultProps = {};
  componentWillMount() {
    const date = new Date();
    this.calcDays(date.getFullYear(), date.getMonth() + 1, date.getDate());
    const { list } = this.props;
    const solarUser = [];
    list.map((item) => {
      if (item.solarCalendar.length > 0) {
        solarUser.push(item);
      }
    });
    console.log(solarUser);
  }
  componentDidMount() {}
  componentWillUnmount() {}
  componentDidShow() {}
  componentDidHide() {}
  prevMonth = () => {
    const date = new Date();
    const { cMonth } = this.state;
    if (cMonth === 1) return;
    this.calcDays(date.getFullYear(), cMonth - 1, date.getDate());
  };
  nextMonth = () => {
    const date = new Date();
    const { cMonth } = this.state;
    if (cMonth === 12) return;
    this.calcDays(date.getFullYear(), cMonth + 1, date.getDate());
  };
  calcDays = (year, month, day) => {
    const { days, cMonth } = calendarTable([year, month, day]);
    this.setState({
      day: days,
      cMonth: cMonth,
    });
  };
  render() {
    const { weekday, year, month, cMonth, day, cDay } = this.state;
    return (
      <View className="index">
        <View className="index-month">
          <View className="month-left" onClick={() => this.prevMonth()}>
            -
          </View>
          <View className="month-date">
            {year}-{cMonth}
          </View>
          <View className="month-right" onClick={() => this.nextMonth()}>
            +
          </View>
        </View>

        <View className="index-week">
          {weekday.map((item) => {
            return (
              <View className="week-item" key={item}>
                {item}
              </View>
            );
          })}
        </View>
        <View className="index-days">
          {day.map((item) => {
            return (
              <View
                className={`day-item ${
                  cDay === item && month === cMonth ? "date-item-now" : ""
                }`}
                key={item}
              >
                {item}
                <View className="day-item-icon"></View>
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}
