import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import "./index.css";
import Add from "../assets/images/add.png";
import List from "../assets/images/list.png";
import Mine from "../assets/images/mine.png";
import ListSelected from "../assets/images/list-selected.png";
import MineSelected from "../assets/images/mine-selected.png";
import { connect } from "@tarojs/redux";
import { bindActionCreators } from "redux";
import * as Actions from "../store/actions";

function mapStateToProps(state) {
  return {
    routerSelect: state.routerSelect,
    isHide: state.changeDialog,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(Actions, dispatch),
  };
}
@connect(mapStateToProps, mapDispatchToProps)
export default class customTabBar extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    Taro.hideTabBar();
  }

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
  };

  /**
   * @func
   * @desc 跳转到列表
   */
  goRouteList = () => {
    const params = this.getCurrentRoutePage();
    if (params !== "pages/index/index") {
      this.props.changeRouter(0);
      Taro.switchTab({ url: "/pages/index/index" })
    }
  };

  /**
   * @func
   * @desc 跳转到我的
   */
  goRouteMine = () => {
    const params = this.getCurrentRoutePage();
    if (params !== "pages/mine/index") {
      this.props.changeRouter(1);
      Taro.switchTab({ url: "/pages/mine/index" })
    }
  };

  render() {
    const { routerSelect } = this.props;
    return (
      <View className="footer">
        <View className="footer-list" onClick={() => this.goRouteList()}>
          <Image
            className="list-img"
            src={routerSelect === 0 ? ListSelected : List}
            mode="aspectFit"
            alt=""
          />
          <Text
            className="list-text"
            style={routerSelect === 0 ? { color: "#18ba4dff" } : null}
          >
            列表
          </Text>
        </View>
        <View className="footer-add" onClick={() => this.goRouteBirthday()}>
          <View className="footer-add-bg">
            <Image className="add-button" src={Add} alt="" mode="aspectFit" />
          </View>
        </View>
        <View className="footer-mine" onClick={() => this.goRouteMine()}>
          <Image
            className="mine-img"
            src={routerSelect === 1 ? MineSelected : Mine}
            mode="aspectFit"
            alt=""
          />
          <Text
            className="mine-text"
            style={routerSelect === 1 ? { color: "#18ba4dff" } : null}
          >
            我的
          </Text>
        </View>
      </View>
    );
  }
}
