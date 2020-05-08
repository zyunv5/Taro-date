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
  componentWillMount() {}

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
  };


  confirmDate = () => {
    if (this.state.calendar === 0) {
      console.log(this.refs.solar.state.dateValue);
    } else {
      console.log(this.refs.lunar.lunarDate());
    }
    this.hideDialog();
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
          {calendar === 0 ? <Solar ref="solar" /> : <Lunar ref="lunar" />}
        </View>
      </View>
    );
  }
}
