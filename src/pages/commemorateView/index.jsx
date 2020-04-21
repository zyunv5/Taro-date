import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      term: "",
      cycle: "",
      avatar: "",
      solarCalendar: "",
    };
  }
  componentWillMount() {
    //获取路由携带过来的参数
    const params = JSON.parse(this.$router.params.data);
    //修改当前页面的标题
    Taro.setNavigationBarTitle({
      title: params.name + "的纪念日",
    });
    this.setState({
      name: params.name,
      term: params.term,
      cycle: params.cycle,
      avatar: params.avatar,
      solarCalendar: params.solarCalendar,
    });
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="index">
        <View className="index">
          <View>{name}</View>
          <Image src={avatar} mode="aspectFit" />
          <View>还有{term}天</View>
          <View>就{cycle}周年</View>
          <View>生日是:{solarCalendar ? solarCalendar : lunarCalendar}</View>
        </View>
      </View>
    );
  }
}
