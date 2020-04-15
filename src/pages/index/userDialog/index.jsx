import Taro, { Component } from "@tarojs/taro";
import { View, Text, Button } from "@tarojs/components";
import "./index.css";

export default class Index extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="dialog">
        <Button open-type="getUserInfo" bindgetuserinfo="getUserInfo">
          授权
        </Button>
      </View>
    );
  }
}
