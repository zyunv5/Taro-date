import Taro, { Component, Fragment } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import "./index.css";
import Left from "../../assets/images/left.png";
import Right from "../../assets/images/right.png";
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
    const { list } = this.props;
    const date = new Date();
    this.calcDays(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
      list
    );
  }
  componentDidMount() {}
  componentWillUnmount() {}
  componentDidShow() {}
  componentDidHide() {}
  //查看上个月
  prevMonth = () => {
    const { list } = this.props;
    const { cMonth } = this.state;
    const date = new Date();
    if (cMonth === 1) return;
    this.calcDays(date.getFullYear(), cMonth - 1, date.getDate(), list);
  };
  //查看下个月
  nextMonth = () => {
    const { list } = this.props;
    const { cMonth } = this.state;
    const date = new Date();
    if (cMonth === 12) return;
    this.calcDays(date.getFullYear(), cMonth + 1, date.getDate(), list);
  };
  //计算日历
  calcDays = (year, month, day, list) => {
    const { days, cMonth } = calendarTable([year, month, day, list]);
    this.setState({
      day: days,
      cMonth: cMonth,
    });
  };
  showDetail = (item) => {
    Taro.navigateTo({
      url:`../../pages/detailView/index?id=${item.id}`
    });
  };
  render() {
    const { weekday, year, month, cMonth, day, cDay } = this.state;
    return (
      <View className="index">
        <View className="index-month">
          <View className="month-left" onClick={() => this.prevMonth()}>
            <Image
              className="month-left-image"
              style={`${cMonth === 1 ? "display:none" : ""}`}
              mode="aspectFit"
              src={Left}
            />
          </View>
          <View className="month-date">
            {year}-{cMonth}
          </View>
          <View className="month-right" onClick={() => this.nextMonth()}>
            <Image
              className="month-right-image"
              style={`${cMonth === 12 ? "display:none" : ""}`}
              mode="aspectFit"
              src={Right}
            />
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
                  cDay === item.date && month === cMonth ? "date-item-now" : ""
                }`}
                key={item.date}
                onClick={() => this.showDetail(item)}
              >
                {item.date}
                <View
                  className="day-item-icon"
                  style={`${item.active ? "" : "display:none"}`}
                ></View>
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}
