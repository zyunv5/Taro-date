import Taro, { Component } from "@tarojs/taro";
import { View, Text, Input, Image } from "@tarojs/components";
import searchIcon from "../../assets/images/search.png";
import searchClose from "../../assets/images/close.png";
import "./index.css";
import { connect } from "@tarojs/redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../store/actions";

function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(Actions, dispatch),
  };
}
@connect(mapStateToProps, mapDispatchToProps)
export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
    };
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  changeInput = (e) => {
    if (e.detail.value === "") {
      //当删除为空时，重新拉取数据
      Taro.showLoading();
      this.props.asyncGetList();
    }
    this.setState({
      inputValue: e.detail.value,
    });
  };
  //模糊搜索
  searchKeyWords = () => {
    let keyWords = this.state.inputValue;
    this.props.asyncSearchKeyWords(keyWords);
  };
  //clear
  clearKeyWords = () => {
    this.setState({
      inputValue: "",
    });
    this.props.asyncGetList()
  };

  render() {
    const { inputValue } = this.state;
    return (
      <View className="search">
        <Input
          type="text"
          className="search-input"
          value={inputValue}
          placeholder="请输入要搜索的名称"
          confirmType="search"
          onInput={(e) => this.changeInput(e)}
          onConfirm={() => this.searchKeyWords()}
        />
        <Image
          className="search-icon"
          src={inputValue ? `${searchClose}` : `${searchIcon}`}
          mode="scaleToFill"
          onClick={
            inputValue
              ? () => this.clearKeyWords()
              : () => this.searchKeyWords()
          }
        />
      </View>
    );
  }
}
