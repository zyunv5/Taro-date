import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./index.less";
import Dialog from "./userDialog"
import Search from "./Search";

export default class Index extends Component {
  config = {
    navigationBarTitleText: "首页",
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  goRouteBirthday = () => {
    console.log(1);
    Taro.navigateTo({url:"../birthday/index"})
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  render() {
    return (
      <View className="index">
        <Dialog />
        <Search />
        <View onClick={() => this.goRouteBirthday()}>生日</View>
        <View>纪念日</View>
      </View>
    );
  }
}
