import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import "./index.css";
import Lunar from "../lunar/index";
import Solar from "../solar/index";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      calendar: 0, //0是选择阳历 1是选择农历
      animationData: {},
    };
  }
  componentWillMount() {
    // const date = new Date();
    // const currentDay = calendarFunc.solar2lunar(
    //   date.getFullYear(),
    //   date.getMonth() + 1,
    //   date.getDate()
    // );
    // this.setState({
    //   years: this.state.years,
    //   days: currentDay.solarDaysArray,
    //   oldMonths: currentDay.toMonthArray,
    //   oldDays,
    //   value: [this.state.years.length - 1, date.getMonth(), date.getDate() - 1],
    // });
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
    this.setState({ calendar: 1 });
    // const currentDay = calendarFunc.solar2lunar(
    //   this.state.year,
    //   this.state.month,
    //   this.state.day
    // );

    // this.setState({
    //   calendar: 1,
    //   oldMonths: currentDay.toMonthArray,
    //   oldDays,
    //   value: [
    //     this.state.value[0],
    //     this.state.oldMonths.indexOf(currentDay.IMonthCn),
    //     oldDays.indexOf(currentDay.IDayCn),
    //   ],
    // });
  };

  //日期改变触发
  // onChangeDate = (e) => {
  //   const val = e.detail.value;
  //   const [year, month, day] = val;
  //   console.log(year, month, day);
  //   if (this.state.calendar === 0) {
  //     const currentDay = calendarFunc.solar2lunar(
  //       this.state.years[year],
  //       this.state.months[month],
  //       this.state.days[day]
  //     );
  //     console.log(this.state.days[day], currentDay);
  //   } else {
  //     this.setState({
  //       year: this.state.years[val[0]],
  //       month: this.state.oldMonths[val[1]],
  //       day: this.state.oldDays[val[2]],
  //       value: [val[0], val[1], val[2]],
  //     });
  //   }
  // };

  confirmDate = () => {
    if (this.state.calendar === 0) {
      console.log(this.refs.solar.state.dateValue)
    } else {
      console.log(this.refs.lunar.state.value)
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
                this.confirmDate();
              }}
            >
              确认
            </View>
          </View>
          {calendar === 0 ? <Solar ref="solar"/> : <Lunar ref="lunar"/>}
        </View>
      </View>
    );
  }
}
