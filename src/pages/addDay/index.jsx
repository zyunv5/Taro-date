import Taro, { Component } from "@tarojs/taro";
import { View, RadioGroup, Radio, Input } from "@tarojs/components";
import { AtImagePicker } from "taro-ui";
import BottomDialog from "./bottomDialog/index";
import "./index.less";

export default class Index extends Component {
  config = {
    navigationBarTitleText: "新增",
  };
  constructor() {
    super(...arguments);

    this.state = {
      type: 0,
      files: [],
      dateSel: "2018-04-22",
    };
  }
  componentWillMount() {}
  componentDidMount() {}
  componentWillUnmount() {}
  componentDidShow() {}
  componentDidHide() {}
  radioChange = (event) => {
    this.setState({
      type: event.detail.value,
    });
  };
  onChange = () => {
    console.log(111);
  };
  onFail(mes) {
    console.log(mes);
  }
  onImageClick(index, file) {
    console.log(index, file);
  }

  showDialog = () => {
    this.refs.getDialog.showDialog();
  };

  render() {
    return (
      <View className="index">
        <RadioGroup
          class="index-radio-group"
          onChange={(event) => this.radioChange(event)}
        >
          <Radio value="0" checked>
            生日
          </Radio>
          <Radio value="1" className="radio-commemorate">
            纪念日
          </Radio>
        </RadioGroup>
        <View className="index-avatar">
          <AtImagePicker
            files={this.state.files}
            onChange={() => this.onChange()}
            mode="top"
          />
        </View>

        <Input type="text" placeholder="名字" maxLength="10" />

        <View onClick={() => this.showDialog()}>显示弹框</View>
        <BottomDialog ref="getDialog" />
      </View>
    );
  }
}
