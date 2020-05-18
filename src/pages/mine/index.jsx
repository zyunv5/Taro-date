import Taro, { Component, Fragment } from "@tarojs/taro";
import { View, Text, Image,ScrollView } from "@tarojs/components";
import { AtAccordion, AtList, AtListItem } from "taro-ui";
import "./index.less";
import Tabbar from "../../components/tabbar/index";
import { connect } from "@tarojs/redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../store/actions";

function mapStateToProps(state) {
  return {
    list: state.list,
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
    navigationBarTitleText: "我的",
  };
  constructor() {
    super(...arguments);
    this.state = {
      birthdayOpen: false,
      commemorateOpen: false,
      birthdayList: [
        {
          title: "标题文字1",
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
    const { list } = this.props;
    return (
      <Fragment>
        <View className="mine">
          <View className="mine-info">
            <Image className="info-portrait" />
            <View className="info-name">BurNIng</View>
          </View>
          <ScrollView scrollY className="mine-list">
            <AtAccordion
              className="list-item"
              open={this.state.birthdayOpen}
              onClick={() => this.birthdayClick()}
              isAnimation={true}
              title="生日列表"
            >
              <AtList hasBorder={false}>
                {list &&
                  list.map((item) => {
                    if (item.type === 0) {
                      return (
                        <AtListItem
                          key={item}
                          title={item.name}
                          thumb={item.avatar}
                        />
                      );
                    }
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
          </ScrollView>
        </View>
        <Tabbar />
      </Fragment>
    );
  }
}
