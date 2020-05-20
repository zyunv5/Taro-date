import Taro, { Component, Fragment } from "@tarojs/taro";
import { ScrollView, View, Text, Button } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { bindActionCreators } from 'redux'
import * as Actions from '../../store/actions'
import "./index.less";
import Search from "../../components/Search";
import customTabBar from "../../custom-tab-bar/index";
import Login from "../../components/login/index";
import { TimeLine } from "../../utils/timeLine";

function mapStateToProps(state) {
  return {
    list:state.list
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
      userInfo: {},
      hasUserInfo: false,
      canIUse: wx.canIUse("button.open-type.getUserInfo"),
      // listData: [
      //   {
      //     id: 0,
      //     name: "妈妈", //名称
      //     sex: 0, //0女 1男 2默认不填
      //     term: "5", //还有几天
      //     cycle: "40", //多少周年
      //     avatar:
      //       "https://statich.yidianzixun.com/public/file/1587524234342/avatar.jpg", //头像
      //     solarCalendar: "1971-3-28", //阳历
      //     lunarCalendar: "", //阴历
      //     type: 0, //0是生日 1是纪念日
      //   },
      //   {
      //     id: 1,
      //     name: "爸爸",
      //     sex: 1,
      //     term: "15",
      //     cycle: "20",
      //     avatar: "",
      //     solarCalendar: "",
      //     lunarCalendar: "",
      //     type: 0,
      //   },
      //   {
      //     id: 2,
      //     name: "妻子",
      //     sex: 0,
      //     term: "25",
      //     cycle: "30",
      //     avatar: "",
      //     solarCalendar: "",
      //     lunarCalendar: "",
      //     type: 0,
      //   },
      // ],
    };
  }

  componentWillMount() {}

  componentDidMount() {
    wx.getSetting({
      success: function (res) {
        if (res.authSetting["scope.userInfo"]) {
          Taro.getUserInfo({
            success: function (res) {
              console.log(res.userInfo);
            },
          });
        }
      },
    });
    this.props.asyncGetList()
  }

  onGetUserInfo = (e) => {
    console.log(e);
  };

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  /**
   * @func
   * @desc 跳转到不同展示页面
   * @param 当前选中改行的数据
   */
  seeDetail = (item) => {
    const { type } = item;
    if (type === 0) {
      Taro.navigateTo({
        url: `../birthdayView/index?data=${JSON.stringify(item)}`,
      });
    } else {
      Taro.navigateTo({
        url: `../commemorateView/index?data=${JSON.stringify(item)}`,
      });
    }
  };

  render() {
    const {list}=this.props
    return (
      <Fragment>
        <ScrollView
          className="index"
          scrollY
          enableBackToTop={true}
          enableFlex={true}
        >
          <Search />
          <View className="index-list">
            {list&&list.map((item, index) => {
              return (
                <View
                  className="list-item"
                  key={item.id}
                  onClick={() => this.seeDetail(item)}
                >
                  <View className="item-name">{item.name}</View>
                  <View className="item-cycle">距离{item.cycle}岁</View>
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
