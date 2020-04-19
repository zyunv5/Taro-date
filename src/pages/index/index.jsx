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
      listData: [
        { id: 0, name: "妈妈生日", date: "5" },
        { id: 1, name: "爸爸生日", date: "15" },
        { id: 2, name: "妻子生日", date: "25" },
        { id: 3, name: "来京日子", date: "35" },
        { id: 4, name: "结婚纪念日", date: "45" },
        { id: 5, name: "妈妈生日", date: "55" },
        { id: 6, name: "爸爸生日", date: "65" },
        { id: 7, name: "妻子生日", date: "75" },
        { id: 8, name: "来京日子", date: "85" },
        { id: 9, name: "结婚纪念日", date: "95" },
      ],
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
    const { canIUse, listData } = this.state;
    return (
      <View className="index">
        {/* {canIUse ? (
          <button
            open-type="getUserInfo"
            onGetUserInfo={(userInfo) => this.onGetUserInfo(userInfo)}
          >
            授权
          </button>
        ) : (
          <view>请升级微信版本</view>
        )} */}
        <Search />
        <View className="index-add">
          <View className="add-item" onClick={() => this.goRouteBirthday()}>
            新增生日
          </View>
          <View className="add-item">新增纪念日</View>
        </View>
        <View className="index-list">
          {listData.map((item, index) => {
            return (
              <View className="list-item" key={item.id}>
                {item.name}
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}
