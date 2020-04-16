import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./index.less";
import Search from "./Search";

export default class Index extends Component {
  config = {
    navigationBarTitleText: "首页",
  };

  constructor(props) {
    super(props);
    this.state = {
      canIUse: wx.canIUse("button.open-type.getUserInfo"),
    };
  }

  componentWillMount() {}

  componentDidMount() {
    wx.getSetting({
      success: function (res) {
        if (res.authSetting["scope.userInfo"]) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          Taro.getUserInfo({
            success: function (res) {
              console.log(res.userInfo);
            },
          });
        }
      },
    });
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  onGetUserInfo = (e) => {
    console.log(e);
  };

  goRouteBirthday = () => {
    Taro.navigateTo({ url: "../birthday/index" })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  render() {
    const { canIUse } = this.state;
    return (
      <View className="index">
        {canIUse ? (
          <button
            open-type="getUserInfo"
            onGetUserInfo={(userInfo) => this.onGetUserInfo(userInfo)}
          >
            授权
          </button>
        ) : (
          <view>请升级微信版本</view>
        )}
        <Search />
        <View onClick={() => this.goRouteBirthday()}>生日</View>
        <View>纪念日</View>
      </View>
    );
  }
}
