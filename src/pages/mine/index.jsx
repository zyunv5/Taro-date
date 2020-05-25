import Taro, { PureComponent } from "@tarojs/taro";
import { View, ScrollView } from "@tarojs/components";
import { AtAccordion, AtList, AtListItem } from "taro-ui";
import "./index.less";
import Avatar from "../../components/avatar";
import Calendar from "../../components/calendar";
import { connect } from "@tarojs/redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../store/actions";

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
export default class Index extends PureComponent {
  config = {
    navigationBarTitleText: "我的",
  };
  constructor(props) {
    super(props);
    this.state = {
      birthdayOpen: false,
      commemorateOpen: false,
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
    const { list, userInfo } = this.props;
    return (
      <ScrollView scrollY className="mine">
        <View className="mine-info">
          <Avatar className="info-portrait" avatar={userInfo.avatar} />
          <View className="info-name">{userInfo.nickName}</View>
        </View>
        <Calendar />
        <View className="mine-list">
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
                        key={item.name}
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
              {list &&
                list.map((item) => {
                  if (item.type === 1) {
                    return (
                      <AtListItem
                        key={item.name}
                        title={item.name}
                        thumb={item.avatar}
                      />
                    );
                  }
                })}
            </AtList>
          </AtAccordion>
        </View>
      </ScrollView>
    );
  }
}
