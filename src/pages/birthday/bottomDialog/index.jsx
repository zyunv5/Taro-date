import Taro, { Component } from "@tarojs/taro";
import { View, PickerView, PickerViewColumn } from "@tarojs/components";
import "./index.css";

export default class Index extends Component {
  constructor(props) {
    super(props);
    const date = new Date();
    const years = [];
    const months = [];
    const days = [];
    for (let i = 1990; i <= date.getFullYear(); i++) {
      years.push(i);
    }
    for (let i = 1; i <= 12; i++) {
      months.push(i);
    }
    for (let i = 1; i <= 31; i++) {
      days.push(i);
    }
    this.state = {
      show: false,
      calendar: 0, //0是选择阳历 1是选择农历
      animationData: {},
      years: years,
      year: date.getFullYear(),
      months: months,
      oldMonths:["正月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","腊月"],
      month: date.getMonth(),
      days: days,
      oldDays:["初一"],
      day: date.getDate(),
      value: [9999, 0, 0],
    };
  }
  componentWillMount() {}

  componentDidMount() {
    this.setState({
      value:[9999,this.state.month,this.state.day]
    })
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  changeSolar = () => {
    console.log("阳历");
    this.setState({ calendar: 0 });
  };
  changeLunar = () => {
    console.log("农历");
    this.setState({ calendar: 1 });
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

  onChangeDate = (e) => {
    const val = e.detail.value;
    this.setState({
      year: this.state.years[val[0]],
      month: this.state.months[val[1]],
      day: this.state.days[val[2]],
      value: val,
    });
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
            <PickerViewColumn  className="date-item">
              {this.state.years.map((item, index) => {
                return <View key={index}>{item}年</View>;
              })}
            </PickerViewColumn >
            <PickerViewColumn className="date-item">
              {this.state.months.map((item, index) => {
                return <View key={index}>{item}月</View>;
              })}
            </PickerViewColumn >
            <PickerViewColumn className="date-item">
              {this.state.days.map((item, index) => {
                return <View key={index}>{item}日</View>;
              })}
            </PickerViewColumn>
          </PickerView>
        </View>
      </View>
    );
  }
}
