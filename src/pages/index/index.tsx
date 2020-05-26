import Taro, { Component, Fragment,Config } from "@tarojs/taro";
import { ScrollView, View, Text, Button } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../store/actions";
import "./index.less";
import Search from "../../components/Search";
import Avatar from "../../components/avatar";
import Login from "../../components/login/index";
import { IconProps } from "@tarojs/components/types/Icon";

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

interface IProps{}

interface IState{
  hasUserInfo:boolean,
  canIUse:boolean
}

export default class Index extends Component<IProps,IState> {
  config:Config = {
    navigationBarTitleText: "首页",
  };

  constructor(props) {
    super(props);
    this.state = {
      hasUserInfo: false,
      canIUse: Taro.canIUse("button.open-type.getUserInfo"),
    };
  }

  componentWillMount() {}

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
      url: `../detailView/index?data=${JSON.stringify(item)}`,
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
            {list &&
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
              })}
          </View>
        </ScrollView>
        {/* <Tabbar /> */}
        <Login />
      </Fragment>
    );
  }
}
