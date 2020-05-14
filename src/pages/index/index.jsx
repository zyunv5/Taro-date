import Taro, { Component, Fragment } from "@tarojs/taro";
import { ScrollView, View, Text, Button } from "@tarojs/components";
import "./index.less";
import Search from "./Search";
import Tabbar from "../../components/tabbar/index";
import Login from "../../components/login/index";

export default class Index extends Component {
  config = {
    navigationBarTitleText: "首页",
  };

  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      hasUserInfo: false,
      canIUse: wx.canIUse("button.open-type.getUserInfo"),
      listData: [
        {
          id: 0,
          name: "妈妈", //名称
          sex: 0, //0女 1男 2默认不填
          term: "5", //还有几天
          cycle: "40", //多少周年
          avatar:
            "https://statich.yidianzixun.com/public/file/1587524234342/avatar.jpg", //头像
          solarCalendar: "1971-3-28", //阳历
          lunarCalendar: "", //阴历
          type: 0, //0是生日 1是纪念日
        },
        {
          id: 1,
          name: "爸爸",
          sex: 1,
          term: "15",
          cycle: "",
          avatar: "",
          solarCalendar: "",
          lunarCalendar: "",
          type: 0,
        },
        {
          id: 2,
          name: "妻子",
          sex: 0,
          term: "25",
          cycle: "",
          avatar: "",
          solarCalendar: "",
          lunarCalendar: "",
          type: 0,
        },
        {
          id: 3,
          name: "来京",
          sex: 2,
          term: "35",
          cycle: "",
          avatar: "",
          solarCalendar: "2017-7-13",
          lunarCalendar: "",
          type: 1,
        },
        {
          id: 4,
          name: "结婚",
          term: "45",
          cycle: "",
          avatar: "",
          solarCalendar: "",
          lunarCalendar: "",
          type: 1,
        },
        {
          id: 5,
          name: "妈妈",
          term: "55",
          cycle: "",
          avatar: "",
          solarCalendar: "",
          lunarCalendar: "",
          type: 0,
        },
        {
          id: 6,
          name: "爸爸",
          term: "65",
          cycle: "",
          avatar: "",
          solarCalendar: "",
          lunarCalendar: "",
          type: 0,
        },
        {
          id: 7,
          name: "妻子",
          term: "75",
          cycle: "",
          avatar: "",
          solarCalendar: "",
          lunarCalendar: "",
          type: 0,
        },
        {
          id: 8,
          name: "来京",
          term: "85",
          cycle: "",
          avatar: "",
          solarCalendar: "",
          lunarCalendar: "",
          type: 1,
        },
        {
          id: 9,
          name: "结婚",
          term: "95",
          cycle: "",
          avatar: "",
          solarCalendar: "",
          lunarCalendar: "",
          type: 1,
        },
        {
          id: 10,
          name: "妈妈",
          term: "51",
          cycle: "",
          avatar: "",
          solarCalendar: "",
          lunarCalendar: "",
          type: 0,
        },
        {
          id: 11,
          name: "爸爸",
          term: "151",
          cycle: "",
          avatar: "",
          solarCalendar: "",
          lunarCalendar: "",
          type: 0,
        },
        {
          id: 12,
          name: "妻子",
          term: "252",
          cycle: "",
          avatar: "",
          solarCalendar: "",
          lunarCalendar: "",
          type: 0,
        },
        {
          id: 13,
          name: "来京",
          term: "353",
          cycle: "",
          avatar: "",
          solarCalendar: "",
          lunarCalendar: "",
          type: 1,
        },
        {
          id: 14,
          name: "结婚",
          term: "47",
          cycle: "",
          avatar: "",
          solarCalendar: "",
          lunarCalendar: "",
          type: 1,
        },
        {
          id: 15,
          name: "妈妈",
          term: "58",
          cycle: "",
          avatar: "",
          solarCalendar: "",
          lunarCalendar: "",
          type: 0,
        },
        {
          id: 16,
          name: "爸爸",
          term: "69",
          cycle: "",
          avatar: "",
          solarCalendar: "",
          lunarCalendar: "",
          type: 0,
        },
        {
          id: 17,
          name: "妻子",
          term: "70",
          cycle: "",
          avatar: "",
          solarCalendar: "",
          lunarCalendar: "",
          type: 0,
        },
        {
          id: 18,
          name: "来京",
          term: "81",
          cycle: "",
          avatar: "",
          solarCalendar: "",
          lunarCalendar: "",
          type: 1,
        },
        {
          id: 19,
          name: "结婚",
          term: "90",
          cycle: "",
          avatar: "",
          solarCalendar: "",
          lunarCalendar: "",
          type: 1,
        },
      ],
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
    this.getList();
  }

  onGetUserInfo = (e) => {
    console.log(e);
  };

  getList = () => {
    wx.cloud
      .callFunction({
        name: "getList",
        data: { database: "dataList", condition: {} },
      })
      .then((res) => {
        console.log(res.result.data);
        this.setState({
          listData:[...res.result.data]
        })
      });
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
    const { listData, canIUse } = this.state;
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
            {listData.map((item, index) => {
              return (
                <View
                  className="list-item"
                  key={item.id}
                  onClick={() => this.seeDetail(item)}
                >
                  <View className="item-name">{item.name}</View>
                  <View className="item-date">{item.term}</View>
                </View>
              );
            })}
          </View>
        </ScrollView>
        <Tabbar />
        <Login />
      </Fragment>
    );
  }
}
