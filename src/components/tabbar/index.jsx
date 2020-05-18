import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import "./index.css";
import Add from "../../assets/images/add.png";
import List from "../../assets/images/list.png";
import Mine from "../../assets/images/mine.png";
import ListSelected from "../../assets/images/list-selected.png";
import MineSelected from "../../assets/images/mine-selected.png";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentRoute: 0, //0代表列表 1代表我的
    };
  }
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  /**
   * @func
   * @desc 获取当前页面的路由
   */
  getCurrentRoutePage = () => {
    let pages = getCurrentPages();
    let currPage = null;
    if (pages.length) {
      currPage = pages[pages.length - 1];
    }
    return currPage.route;
  };

  /**
   * @func
   * @desc 跳转到添加生日页面
   */
  goRouteBirthday = () => {
    Taro.navigateTo({ url: "/pages/addDay/index" })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  /**
   * @func
   * @desc 跳转到列表
   */
  goRouteList = () => {
    const params = this.getCurrentRoutePage();
    if (params !== "pages/index/index") {
      this.setState({ currentRoute: 0 });
      Taro.navigateTo({ url: "/pages/index/index" })
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
          wx.switchTab({ url: "/pages/index/index" });
        });
    }
  };

  /**
   * @func
   * @desc 跳转到我的
   */
  goRouteMine = () => {
    const params = this.getCurrentRoutePage();
    if (params !== "pages/mine/index") {
      console.log(this);
      this.setState({ currentRoute: 1 });
      Taro.navigateTo({ url: "/pages/mine/index" })
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
          wx.switchTab({ url: "/pages/mine/index" });
        });
    }
  };

  render() {
    const { currentRoute } = this.state;
    return (
      <View className="footer">
        <View className="footer-list" onClick={() => this.goRouteList()}>
          <Image
            className="list-img"
            src={currentRoute === 0 ? ListSelected : List}
            mode="aspectFit"
            alt=""
          />
          <Text style={currentRoute === 0 ? { color: "#18ba4dff" } : null}>
            列表
          </Text>
        </View>
        <View className="footer-add" onClick={() => this.goRouteBirthday()}>
          <Image className="add-button" src={Add} alt="" mode="aspectFit" />
        </View>
        <View className="footer-mine" onClick={() => this.goRouteMine()}>
          <Image
            className="mine-img"
            src={currentRoute === 1 ? MineSelected : Mine}
            mode="aspectFit"
            alt=""
          />
          <Text>我的</Text>
        </View>
      </View>
    );
  }
}
