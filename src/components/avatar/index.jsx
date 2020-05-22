import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import "./index.css";
import avatar from "../../assets/images/normal-avatar.png";
import { connect } from "@tarojs/redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../store/actions";

function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(Actions, dispatch),
  };
}
@connect(mapStateToProps, mapDispatchToProps)
export default class Index extends Component {
  constructor(props) {
    super(props);
  }
  static defaultProps = {
    size: "normal",
    avatar: avatar,
  };
  getSetting = () => {
    let that = this;
    wx.getSetting({
      success(res) {
        if (res.authSetting["scope.userInfo"]) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo);
            },
          });
        } else {
          that.props.changeDialogShow();
        }
      },
    });
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const { size,avatar } = this.props;
    return (
      <View className={`avatar ${size}`} onClick={() => this.getSetting()}>
        <Image className="avatar-image" mode="scaleToFill" src={avatar} />
      </View>
    );
  }
}
