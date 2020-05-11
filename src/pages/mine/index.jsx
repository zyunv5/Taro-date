import Taro, { Component, Fragment } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { AtAccordion, AtList, AtListItem } from "taro-ui";
import "./index.less";
import Tabbar from "../../components/tabbar/index";

export default class Index extends Component {
  config = {
    navigationBarTitleText: "我的",
  };
  constructor() {
    super(...arguments);
    this.state = {
      birthdayOpen: true,
      commemorateOpen: true,
      birthdayList: [
        {
          title: "标题文字1",
          thumb:
            "https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png",
        },
        {
          title: "标题文字2",
          thumb:
            "https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png",
        },
      ],
      commemorateList: [
        {
          title: "标题文字1",
          thumb:
            "https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png",
        },
        {
          title: "标题文字2",
          thumb:
            "https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png",
        },
      ],
    };
  }
  birthdayClick = () => {
    this.setState({
      birthdayOpen: !this.state.birthdayOpen,
    });
  };
  commemorateClick = () => {
    this.setState({
      commemorateOpen: !this.state.commemorateOpen,
    });
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <Fragment>
        <View className="mine">
          <View className="mine-info">
            <Image className="info-portrait" />
            <View className="info-name">BurNIng</View>
          </View>
          <View className="mine-list">
            <AtAccordion
              className="list-item"
              open={this.state.birthdayOpen}
              onClick={() => this.birthdayClick()}
              isAnimation={true}
              title="生日列表"
            >
              <AtList hasBorder={false}>
                {this.state.birthdayList.map((item) => {
                  return (
                    <AtListItem
                      key={item}
                      title={item.title}
                      thumb={item.thumb}
                    />
                  );
                })}
              </AtList>
            </AtAccordion>
            <AtAccordion
              className="list-item"
              open={this.state.commemorateOpen}
              onClick={() => this.commemorateClick()}
              isAnimation={true}
              title="纪念日列表"
            >
              <AtList hasBorder={false}>
                {this.state.commemorateList.map((item) => {
                  return (
                    <AtListItem
                      key={item}
                      title={item.title}
                      thumb={item.thumb}
                    />
                  );
                })}
              </AtList>
            </AtAccordion>
          </View>
        </View>
        <Tabbar />
      </Fragment>
    );
  }
}
