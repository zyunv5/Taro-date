import Taro, { Component } from "@tarojs/taro";
import { View, RadioGroup, Radio, Input, Label } from "@tarojs/components";
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
      inputValue: "",
      dateSel: "",
    };
  }
  componentWillMount() {}
  componentDidMount() {}
  componentWillUnmount() {}
  componentDidShow() {}
  componentDidHide() {}
  //勾选不同的纪念日
  radioChange = (event) => {
    this.setState({
      type: event.detail.value,
    });
  };
  onChangeImg = (files) => {
    console.log(files);
    // wx.chooseImage({
    // sizeType: ["original", "compressed"],
    // sourceType: ["album", "camera"],
    // success(res) {
    let extension = files[0].url.split(".").pop();
    wx.cloud.uploadFile({
      //这一段是上传到云数据中的
      cloudPath: `file/${new Date().getTime()}.${extension}`,
      filePath: files[0].url, //这个就是图片的存储路径
      success: (res) => {
        console.log("[上传图片]成功:", res.fileID);
        this.setState({
          files: this.state.files.concat(res.fileID),
        });
      },
      fail: (err) => {
        console.log(err);
      },
    });
    // },
    // });
  };
  // 点击图片触发的回调
  onImageClick(index, file) {
    console.log(index, file);
  }
  //选择图片失败
  onFail(mes) {
    console.log(mes);
  }
  //用户输入
  nameInput = (e) => {
    this.setState({
      inputValue: e.detail.value,
    });
  };
  //显示时间选择器
  showDialog = () => {
    this.refs.getDialog.showDialog();
  };
  //改变时间
  changeDateValue = (date) => {
    this.setState({
      dateSel: date,
    });
  };
  //保存数据
  confirm = () => {};
  //取消保存
  cancel = () => {
    Taro.navigateTo({ url: "pages/index/index" })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
        wx.switchTab({ url: "/pages/index/index" });
      });
  };
  render() {
    const { type, dateSel, files } = this.state;
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
            multiple={false}
            files={files}
            onChange={(files) => this.onChangeImg(files)}
            mode="top"
            length={1}
            className="avatar"
          />
        </View>
        <View className="index-name">
          {parseInt(type) === 0 ? (
            <View className="name-label">称呼：</View>
          ) : (
            <View className="name-label">纪念日：</View>
          )}
          <Input
            className="name-input"
            type="text"
            value={inputValue}
            onInput={(e) => this.nameInput(e)}
          />
        </View>
        <View className="index-date">
          <View className="date-label">日期：</View>
          <View className="date-select" onClick={() => this.showDialog()}>
            {dateSel}
          </View>
        </View>
        <View className="index-submit">
          <View className="submit-confirm" onClick={() => this.confirm()}>
            保存
          </View>
          <View className="submit-cancel" onClick={() => this.cancel()}>
            取消
          </View>
        </View>
        <BottomDialog ref="getDialog" changeDateValue={this.changeDateValue} />
      </View>
    );
  }
}
