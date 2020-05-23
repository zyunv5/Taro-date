import Taro, { Component } from "@tarojs/taro";
import Index from "./pages/index";
import "taro-ui/dist/style/index.scss"; // 全局引入一次即可
import "./app.less";
import { Provider } from "@tarojs/redux";
import configStore from "./store";

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
if (process.env.NODE_ENV !== "production" && process.env.TARO_ENV === "h5") {
  require("nerv-devtools");
}
const store = configStore();
class App extends Component {
  config = {
    pages: [
      "pages/index/index",
      "pages/mine/index",
      "pages/addDay/index",
      "pages/detailView/index",
    ],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#fff",
      navigationBarTitleText: "WeChat",
      navigationBarTextStyle: "black",
      backgroundColor: "#5698c3",
    },
    tabBar: {
      custom: true,
      list: [
        {
          // iconPath: "assets/images/list.png",
          // selectedIconPath: "assets/images/list-selected.png",
          pagePath: "pages/index/index",
          text: "首页",
        },
        {
          // iconPath: "assets/images/mine.png",
          // selectedIconPath: "assets/images/mine-selected.png",
          pagePath: "pages/mine/index",
          text: "我的",
        },
      ],
    },
    sitemapLocation: "sitemap.json",
    cloud: true,
  };
  componentWillMount() {
    if (!wx.cloud) {
      console.error("请使用 2.2.3 或以上的基础库以使用云能力");
    } else {
      wx.cloud.init({
        env: "production-2d8f8",
        traceUser: true,
      });
    }
    // wx.hideTabBar();
  }
  componentDidMount() {}

  componentDidShow() {}

  componentWillUnmount() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById("app"));
