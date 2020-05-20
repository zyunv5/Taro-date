import Taro, { Component } from "@tarojs/taro";
import { View, Image, Picker, Input } from "@tarojs/components";
import "./index.css";
import avatar from "../../assets/images/normal-avatar.png";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "张",
      sex: 1,
      term: 25,
      cycle: 29,
      avatar: avatar,
      solarCalendar: ["1992", "2", "18"],
      lunarCalendar: "",
      selector: ["先生", "女士"],
      selectorChecked: "先生",
    };
  }

  componentWillMount() {
    // 获取路由携带过来的参数
    // const params = JSON.parse(this.$router.params.data);
    //修改当前页面的标题
    // Taro.setNavigationBarTitle({
    //   title: params.name + "的生日",
    // });
    // this.setState({
    //   name: params.name,
    //   sex: params.sex,
    //   term: params.term,
    //   cycle: params.cycle,
    //   avatar: params.avatar,
    //   solarCalendar: params.solarCalendar,
    //   lunarCalendar: params.lunarCalendar,
    // });
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  saveInfo = () => {};
  cancelInfo = () => {};
  removeInfo = () => {};
  onChange = (e) => {
    this.setState({
      selectorChecked: this.state.selector[e.detail.value],
    });
  };
  nameInput = (e) => {
    console.log(e.detail.value);
    this.setState({
      name: e.detail.value,
    });
  };

  render() {
    const {
      name,
      sex,
      term,
      avatar,
      solarCalendar,
      lunarCalendar,
    } = this.state;
    return (
      <View className={`index ${sex === 0 ? "bg-female" : "bg-male"}`}>
        <Image className="index-avatar" src={avatar} mode="aspectFit" />
        <View className="index-info">
          <View className="info-item">
            <Input
              value={name}
              type="text"
              onInput={(e) => this.nameInput(e)}
            />
          </View>
          <View className="info-sex">
            <Picker
              mode="selector"
              range={this.state.selector}
              onChange={this.onChange}
            >
              <View className="picker">{this.state.selectorChecked}</View>
            </Picker>
          </View>
          <View className="info-item">
            您的生日是:{solarCalendar ? solarCalendar : lunarCalendar}
          </View>
          <View className="info-item">
            还有{term}天,就{cycle}岁了
          </View>

          <View>
            <View onClick={() => this.saveInfo()}>保存</View>
            <View onClick={() => this.cancelInfo()}>取消</View>
            <View onClick={() => this.removeInfo()}>删除</View>
          </View>
        </View>
      </View>
    );
  }
}
