import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import "./index.less";

export default class Index extends Component {
  config = {
    navigationBarTitleText: "我的",
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="mine">
        <View className="mine-info">
          <Image className="info-portrait" />
          <View className="info-name">雨神</View>
        </View>
        <View className="mine-list">
          <View className="list-item">生日列表</View>
          <View className="list-item">纪念日列表</View>
        </View>
      </View>
    );
  }
}
