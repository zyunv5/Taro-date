import Taro, { Component, Fragment } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import "./index.css";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canIUse: wx.canIUse("button.open-type.getUserInfo"),
      isHide: false,
      openid:null
    };
  }
  componentWillMount() {}

  componentDidMount() {
    this.getOpenid();
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  onGetUserInfo = (res) => {
    if (res.detail.userInfo) {
      //用户按了允许授权按钮
      console.log("用户的信息如下：");
      console.log(res.detail.userInfo); //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      this.setState({
        isHide: true,
      });
    } else {
      //用户按了拒绝按钮
      Taro.showModal({
        title: "温馨提醒",
        content: "您点击了拒绝授权，将无法进入小程序，请授权之后再进入!",
        showCancel: false,
        confirmText: "返回授权",
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log("用户点击了“返回授权”");
          }
        },
      });
    }
  };

  getOpenid = () => {
    wx.cloud.callFunction({
      name: "getOpenid",
      complete: (res) => {
        console.log(res);
        var openid = res.result.openid;
        this.setState({
          openid: openid,
        });
      },
    });
  };

  render() {
    const { canIUse, isHide } = this.state;
    return (
      <Fragment>
        {canIUse ? (
          <View className="login" style={isHide ? { display: "none" } : ""}>
            <View className="login-container">
              <View className="login-avatar">
                <open-data type="userAvatarUrl"></open-data>
              </View>
              <View className="login-name">
                <open-data type="userNickName"></open-data>
              </View>
              <View className="login-tip">请您登录，感受美好~</View>
              <Button
                type="primary"
                open-type="getUserInfo"
                onGetUserInfo={(userInfo) => this.onGetUserInfo(userInfo)}
              >
                请登录
              </Button>
            </View>
          </View>
        ) : (
          <View>请升级微信版本</View>
        )}
      </Fragment>
    );
  }
}
