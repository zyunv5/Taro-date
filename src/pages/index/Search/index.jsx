import Taro, { Component } from "@tarojs/taro";
import { View, Text, Input,Image } from "@tarojs/components";
import searchIcon from "../../../assets/images/search.png"

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

  changeInput=(e)=>{
    console.log(e.detail.value);
  }

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
          onInput={(e)=>this.changeInput(e)}
        />
        <Image className="search-icon" src={searchIcon} mode="scaleToFill"/>
      </View>
    );
  }
}
