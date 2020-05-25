import Taro, { Component, Fragment } from "@tarojs/taro";
import { ScrollView, View, Text, Button } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../store/actions";
import "./index.less";
import Search from "../../components/Search";
import Avatar from "../../components/avatar";
import customTabBar from "../../custom-tab-bar/index";
import Login from "../../components/login/index";
import { TimeLine } from "../../utils/timeLine";

function mapStateToProps(state) {
  return {
    list: state.list,
    userInfo: state.changeUser,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(Actions, dispatch),
  };
}
@connect(mapStateToProps, mapDispatchToProps)
export default class Index extends Component {
  config = {
    navigationBarTitleText: "首页",
    // usingComponents:{}
  };

  constructor(props) {
    super(props);
    this.state = {
      hasUserInfo: false,
      canIUse: wx.canIUse("button.open-type.getUserInfo"),
      // listData: [
      //
      // ],
    };
  }

  componentWillMount() {
    Taro.showLoading();
  }

  componentDidMount() {
    let that = this;
    Taro.getSetting({
      success: function (res) {
        if (res.authSetting["scope.userInfo"]) {
          Taro.getUserInfo({
            success: function (res) {
              that.props.changeUserInfo({
                nickName: res.userInfo.nickName,
                avatar: res.userInfo.avatarUrl,
              });
            },
          });
        }
      },
    });
    this.props.asyncGetList();
  }

  componentWillUnmount() {}
  componentDidShow() {}
  componentDidHide() {}

  /**
   * @func
   * @desc 跳转到不同展示页面
   * @param 当前选中改行的数据
   */
  seeDetail = (item) => {
    Taro.navigateTo({
      url: `../detailView/index?id=${item._id}`,
    });
  };

  getSetting = () => {
    this.refs.avatar.getSetting();
  };
  render() {
    const { list, userInfo } = this.props;
    return (
      <Fragment>
        <ScrollView
          className="index"
          scrollY
          enableBackToTop={true}
          enableFlex={true}
        >
          <View className="index-top">
            <View className="top-avatar">
              <Avatar
                size={"small"}
                ref="avatar"
                avatar={userInfo.avatar}
                onClick={() => this.getSetting()}
              />
            </View>
            <View className="top-search">
              <Search className="top-search" />
            </View>
          </View>
          <View className="index-list">
            {list.length!==0?
              list.map((item, index) => {
                return (
                  <View
                    className="list-item"
                    key={item.id}
                    onClick={() => this.seeDetail(item)}
                  >
                    <View className="item-name">{item.name}</View>
                    <View className="item-cycle">
                      距离{item.cycle}
                      {item.type === 0 ? "岁" : "周年"}
                    </View>
                    <View className="item-term">还有{item.term}天</View>
                  </View>
                );
              }):<View className="list-no-data">无数据</View>
              }
          </View>
        </ScrollView>
        <Login />
      </Fragment>
    );
  }
}
