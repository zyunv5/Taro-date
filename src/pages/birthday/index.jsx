import Taro, { Component } from "@tarojs/taro";
import {
  View,
  RadioGroup,
  Radio,
  Input,
  PickerView,
  PickerViewColumn,
} from "@tarojs/components";
import { AtImagePicker } from "taro-ui";
import BottomDialog from "./bottomDialog/index";

export default class Index extends Component {
  config = {
    navigationBarTitleText: "新增",
  };
  constructor() {
    super(...arguments);
    const date = new Date();
    const years = [];
    const months = [];
    const days = [];
    for (let i = 1990; i <= date.getFullYear(); i++) {
      years.push(i);
    }
    for (let i = 1; i <= 12; i++) {
      months.push(i);
    }
    for (let i = 1; i <= 31; i++) {
      days.push(i);
    }
    this.state = {
      type: 0,
      files: [],
      dateSel: "2018-04-22",
      years: years,
      year: date.getFullYear(),
      months: months,
      month: 2,
      days: days,
      day: 2,
      value: [9999, 1, 1],
    };
  }
  componentWillMount() {}
  componentDidMount() {}
  componentWillUnmount() {}
  componentDidShow() {}
  componentDidHide() {}
  radioChange = (event) => {
    // console.log(event.detail);
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
  onDateChange = (e) => {
    this.setState({
      dateSel: e.detail.value,
    });
  };
  onChangeDate = (e) => {
    const val = e.detail.value;
    this.setState({
      year: this.state.years[val[0]],
      month: this.state.months[val[1]],
      day: this.state.days[val[2]],
      value: val,
    });
  };
  render() {
    return (
      <View className="index">
        <RadioGroup
          class="radio-group"
          onChange={(event) => this.radioChange(event)}
        >
          <Radio value="0" checked>
            生日
          </Radio>
          <Radio value="1" style="margin-left: 20rpx">
            纪念日
          </Radio>
        </RadioGroup>
        <Input type="text" placeholder="名字" maxLength="10" />
        <AtImagePicker
          files={this.state.files}
          onChange={() => this.onChange()}
          mode="top"
        />
        <View>
          {this.state.year}年{this.state.month}月{this.state.day}日
        </View>
        <PickerView
          indicatorStyle="height: 50px;"
          style="width: 100%; height: 300px;"
          value={this.state.value}
          onChange={this.onChangeDate}
        >
          <PickerViewColumn>
            {this.state.years.map((item) => {
              return <View>{item}年</View>;
            })}
          </PickerViewColumn>
          <PickerViewColumn>
            {this.state.months.map((item) => {
              return <View>{item}月</View>;
            })}
          </PickerViewColumn>
          <PickerViewColumn>
            {this.state.days.map((item) => {
              return <View>{item}日</View>;
            })}
          </PickerViewColumn>
        </PickerView>
        <BottomDialog />
      </View>
    );
  }
}
