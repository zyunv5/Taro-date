import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import "./index.css";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      sex:"",
      term: "",
      cycle: "",
      avatar: "",
      solarCalendar: "",
      lunarCalendar: "",
    };
  }
  componentWillMount() {
    //获取路由携带过来的参数
    const params = JSON.parse(this.$router.params.data);
    //修改当前页面的标题
    Taro.setNavigationBarTitle({
      title: params.name + "的生日",
    });

    this.setState({
      name: params.name,
      sex:params.sex,
      term: params.term,
      cycle: params.cycle,
      avatar: params.avatar,
      solarCalendar: params.solarCalendar,
      lunarCalendar: params.lunarCalendar,
    });
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const { name,sex, term, avatar, solarCalendar, lunarCalendar } = this.state;
    return (
      <View className={`index ${sex===0?"bg-female":"bg-male"}`}>
        <Image className="index-avatar" src={avatar} mode="aspectFit" />
        <View className="index-info">
          <View className="info-item">{name}</View>
          <View className="info-item">
            还有{term}天,就{cycle}岁了
          </View>
          <View className="info-item">
            生日是:{solarCalendar ? solarCalendar : lunarCalendar}
          </View>
        </View>
      </View>
    );
  }
}
