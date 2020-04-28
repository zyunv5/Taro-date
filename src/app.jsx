import Taro, { Component } from "@tarojs/taro";
import Index from "./pages/index";
import Mine from "./pages/mine";
import "taro-ui/dist/style/index.scss"; // 全局引入一次即可
import "./app.less";

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {
  config = {
    pages: [
      "pages/index/index",
      "pages/mine/index",
      "pages/addDay/index",
      "pages/birthdayView/index",
      "pages/commemorateView/index",
    ],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#fff",
      navigationBarTitleText: "WeChat",
      navigationBarTextStyle: "black",
      backgroundColor: "#5698c3",
    },
    tabBar: {
      list: [
        {
          iconPath: "assets/images/list.png",
          selectedIconPath: "assets/images/list-selected.png",
          pagePath: "pages/index/index",
          text: "首页",
        },
        {
          iconPath: "assets/images/mine.png",
          selectedIconPath: "assets/images/mine-selected.png",
          pagePath: "pages/mine/index",
          text: "我的",
        },
      ],
    },
    sitemapLocation: "../sitemap.json",
  };

  componentWillMount() {
    wx.cloud.init({
      traceUser: true,
    });
  }
  componentDidMount() {
    wx.getSetting({
      success(res) {
        console.log(res);
        if (!res.authSetting["scope.userInfo"]) {
          wx.authorize({
            scope: "scope.userInfo",
            success() {
              console.log(111);
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              wx.getUserInfo();
            },
          });
        }
      },
    });
  }

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return <Index />;
  }
}

Taro.render(<App />, document.getElementById("app"));
