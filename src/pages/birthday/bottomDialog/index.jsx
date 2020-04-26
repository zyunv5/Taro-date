import Taro, { Component } from "@tarojs/taro";
import { View, PickerView, PickerViewColumn } from "@tarojs/components";
import "./index.css";
import { calendarFunc, oldMonths, oldDays } from "../../../utils/calendar";
export default class Index extends Component {
  constructor(props) {
    super(props);
    const date = new Date();
    const years = [];
    const months = [];
    const days = [];
    const days31 = [];
    const days30 = [];
    const days29 = [];
    const days28 = [];
    for (let i = 1990; i <= date.getFullYear(); i++) {
      years.push(i);
    }
    for (let i = 1; i <= 12; i++) {
      months.push(i);
    }
    for (let i = 1; i <= 31; i++) {
      days31.push(i);
      if (i <= 30) {
        days30.push(i);
      }
      if (i <= 29) {
        days29.push(i);
      }
      if (i <= 28) {
        days28.push(i);
      }
    }
    this.state = {
      show: false,
      calendar: 0, //0是选择阳历 1是选择农历
      animationData: {},

      years: years,
      months: months,
      months31: [1, 3, 5, 7, 8, 10, 12],
      months30: [4, 6, 9, 11],
      days: [],
      days31: days31,
      days30: days30,
      days29: days29,
      days28: days28,

      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate(),

      value: [],
    };
  }
  componentWillMount() {
    const date = new Date();
    const currentDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    if (currentDay.getDate() === 28) {
      this.setState({ days: this.state.days28 });
    } else if (currentDay.getDate() === 29) {
      this.setState({ days: this.state.days29 });
    } else if (currentDay.getDate() === 30) {
      this.setState({ days: this.state.days30 });
    } else {
      this.setState({ days: this.state.days31 });
    }
  }

  componentDidMount() {
    this.setState({
      value: [this.state.years.length - 1, this.state.month, this.state.day-1],
    });
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  //切换到阳历日历
  changeSolar = () => {
    const [year, month, day, value] = [
      this.state.year,
      this.state.month,
      this.state.day,
      this.state.value,
    ];
    this.setState({ calendar: 0 });
    console.log(this.state.months);
    console.log(year, this.state.months[value[1]], this.state.days[value[2]]);
    // lunar2solar
    // const newDay = calendarFunc.lunar2solar(
    //   year,
    //   currentValue[1] + 1,
    //   currentValue[2] + 1
    // );
    // console.log(value, newDay);
  };

  //阳历切换到农历
  changeLunar = () => {
    const [year, month, day, value, years, months, days] = [
      this.state.year,
      this.state.month,
      this.state.day,
      this.state.value,
      this.state.years,
      this.state.months,
      this.state.days,
    ];
    // const oldDay = calendarFunc.solar2lunar(year, month, day);
    const oldDay = calendarFunc.solar2lunar(years[value[0]], months[value[1]], days[value[2]])
    console.log(oldDay); //[30,3,24]
    this.setState({
      calendar: 1,
      months: oldDay.toMonthArray,
      days: oldDays,
      value: [
        value[0],
        oldMonths.indexOf(oldDay.IMonthCn),
        oldDays.indexOf(oldDay.IDayCn),
      ],
    });
  };

  onChangeDate = (e) => {
    console.log(e);
    const val = e.detail.value;
    if (this.state.calendar === 0) {
      const years = this.state.years[val[0]];
      const month = this.state.months[val[1]];
      if (years % 4 === 0) {
        if (this.state.months31.includes(month)) {
          this.setState({ days: this.state.days31 });
        } else if (this.state.months30.includes(month)) {
          this.setState({ days: this.state.days30 });
        } else {
          this.setState({ days: this.state.days29 });
        }
      } else {
        if (this.state.months31.includes(month)) {
          this.setState({ days: this.state.days31 });
        } else if (this.state.months30.includes(month)) {
          this.setState({ days: this.state.days30 });
        } else {
          this.setState({ days: this.state.days28 });
        }
      }
      this.setState({
        year: this.state.years[val[0]],
        month: this.state.months[val[1]],
        day: this.state.days[val[2]],
        value: val,
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
              {this.state.months.map((item) => {
                return <View key={item}>{item}月</View>;
              })}
            </PickerViewColumn>
            <PickerViewColumn className="date-item">
              {calendar === 0
                ? this.state.days.map((item) => {
                    return <View key={item}>{item}日</View>;
                  })
                : this.state.days.map((item) => {
                    return <View key={item}>{item}</View>;
                  })}
            </PickerViewColumn>
          </PickerView>
        </View>
      </View>
    );
  }
}
