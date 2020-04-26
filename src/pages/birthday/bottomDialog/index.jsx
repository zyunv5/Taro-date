import Taro, { Component } from "@tarojs/taro";
import { View, PickerView, PickerViewColumn } from "@tarojs/components";
import "./index.css";
import { calendarFunc, oldDays } from "../../../utils/calendar";
export default class Index extends Component {
  constructor(props) {
    super(props);
    const date = new Date();
    const years = [];
    const months = [];
    for (let i = 1990; i <= date.getFullYear(); i++) {
      years.push(i);
    }
    for (let i = 1; i <= 12; i++) {
      months.push(i);
    }
    this.state = {
      show: false,
      calendar: 0, //0是选择阳历 1是选择农历
      animationData: {},
      years: years,
      months: months,
      days: [],
      oldMonths: [],
      oldDays: [],
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      isLeap: false,
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
    this.setState({
      days: currentDay.solarDaysArray,
      oldMonths: currentDay.toMonthArray,
      oldDays,
      value: [date.getFullYear() - 1, date.getMonth(), date.getDate() - 1],
    });
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  //切换到阳历日历
  changeSolar = () => {
    this.setState({ calendar: 0 });
  };

  //阳历切换到农历
  changeLunar = () => {
    const currentDay = calendarFunc.solar2lunar(
      this.state.year,
      this.state.month,
      this.state.day
    );
    console.log(currentDay);
    this.setState({
      calendar: 1,
      value: [
        this.state.value[0],
        this.state.oldMonths.indexOf(currentDay.IMonthCn),
        currentDay.lDay - 1,
      ],
    });
  };

  //日期改变触发
  onChangeDate = (e) => {
    const val = e.detail.value;
    if (this.state.calendar === 0) {
      this.setState({
        year: this.state.years[val[0]],
        month: this.state.months[val[1]],
        day: this.state.days[val[2]],
        value: [val[0], val[1], val[2]],
      });
    } else {
    }
  };

  hideDialog = () => {
    const animation = Taro.createAnimation({
      duration: 1000,
      timingFunction: "ease",
    });
    this.animation = animation;
    this.animation.translateY(400).step({ duration: 1000, delay: 0 });
    this.setState({
      animationData: this.animation.export(),
    });
    setTimeout(() => {
      this.setState({
        show: false,
      });
    }, 500);
  };

  showDialog = () => {
    this.setState({
      show: true,
    });
    const animation = Taro.createAnimation({
      duration: 1000,
      timingFunction: "ease",
    });
    this.animation = animation;
    setTimeout(() => {
      this.animation.translateY(0).step({ duration: 1000, delay: 0 });
      this.setState({
        animationData: this.animation.export(),
      });
    }, 0);
  };

  render() {
    const { show, calendar, animationData } = this.state;
    return (
      <View className={`bottom-dialog ${show ? "" : "display-none"}`}>
        <View className="dialog-pick" animation={animationData}>
          <View className="pick-header">
            <View
              className="header-cancel"
              onClick={() => {
                this.hideDialog();
              }}
            >
              取消
            </View>
            <View className="header-calendar">
              <View
                className={`calendar-item ${
                  calendar === 0 ? "calendar-checked" : null
                }`}
                onClick={() => {
                  this.changeSolar();
                }}
              >
                阳历
              </View>
              <View
                className={`calendar-item ${
                  calendar === 1 ? "calendar-checked" : null
                }`}
                onClick={() => {
                  this.changeLunar();
                }}
              >
                农历
              </View>
            </View>
            <View
              className="header-confirm"
              onClick={() => {
                this.showDialog();
              }}
            >
              确认
            </View>
          </View>
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
              {calendar === 0
                ? this.state.months.map((item) => {
                    return <View key={item}>{item}月</View>;
                  })
                : this.state.oldMonths.map((item) => {
                    return <View key={item}>{item}月</View>;
                  })}
            </PickerViewColumn>
            <PickerViewColumn className="date-item">
              {calendar === 0
                ? this.state.days.map((item) => {
                    return <View key={item}>{item}日</View>;
                  })
                : this.state.oldDays.map((item) => {
                    return <View key={item}>{item}</View>;
                  })}
            </PickerViewColumn>
          </PickerView>
        </View>
      </View>
    );
  }
}
