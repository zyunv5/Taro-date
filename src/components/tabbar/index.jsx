import Taro, { Component } from "@tarojs/taro";
import { View,Image } from "@tarojs/components";
import "./index.css";
import Add from "../../assets/images/add.png";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="footer">
        <View className="footer-list">列表</View>
        <View className="footer-add">
            <Image className="add-button" src={Add} alt="" mode="aspectFill"/>
        </View>
        <View className="footer-mine">我的</View>
      </View>
    );
  }
}
