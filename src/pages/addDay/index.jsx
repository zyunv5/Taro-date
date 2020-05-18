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
      name: "",
      solarDate: [],
      lunarDate: [],
      openid: "",
      sex: "0",
      dataSelect: "",
    };
  }
  componentWillMount() {}
  componentDidMount() {
    wx.getStorageSync({
      key: "openid",
      success(res) {
        this.setState({
          openid: res.data,
        });
      },
    });
  }
  componentWillUnmount() {}
  componentDidShow() {}
  componentDidHide() {}
  //勾选不同的纪念日
  radioChange = (event) => {
    this.setState({
      type: event.detail.value,
    });
  };
  sexChange = (event) => {
    this.setState({
      sex: event.detail.value,
    });
  };
  onChangeImg = (files) => {
    console.log(files);
    if (files.length === 0) {
      this.setState({
        files: [],
      });
    } else {
      let that = this;
      let extension = files[0].url.split(".").pop();
      wx.cloud.uploadFile({
        cloudPath: `file/${new Date().getTime()}.${extension}`,
        filePath: files[0].url, //这个就是图片的存储路径
        success: (res) => {
          console.log("[上传图片]成功:", res.fileID);
          this.setState({
            files: this.state.files.concat({ url: res.fileID }),
          });
          // wx.cloud.callFunction({
          //   name: "uploadImg",
          //   data: { database: "imgData", condition: {
          //     userId:wx.getStorageSync('openid'),
          //     imgUrl:res.fileID
          //   } },
          // }).then(res=>{
          //   console.log(res)
          // }).catch(err=>console.log(err));
        },
        fail: (err) => {
          console.log(err);
        },
      });
    }
  };
  //选择图片失败
  onFail(mes) {
    console.log(mes);
  }
  onImageClick(index, file) {
    console.log(index, file);
  }
  //用户输入
  nameInput = (e) => {
    this.setState({
      name: e.detail.value,
    });
  };
  //显示时间选择器
  showDialog = () => {
    this.refs.getDialog.showDialog();
  };
  //改变时间
  changeLunarDate = (date) => {
    this.setState({
      lunarDate: date,
      dataSelect: `${date[0]}-${date[1]}-${date[2]}`,
    });
  };
  changeSolarDate = (date) => {
    this.setState({
      solarDate: date,
      dataSelect: `${date[0]}-${date[1]}-${date[2]}`,
    });
  };
  //保存数据
  confirm = () => {
    let avatar = null;
    this.state.files.length > 0
      ? (avatar = this.state.files[0].url)
      : (avatar = "");
    wx.cloud
      .callFunction({
        name: "addFestival",
        data: {
          database: "dataList",
          condition: {
            userId: wx.getStorageSync("openid"),
            avatar: avatar,
            name: this.state.name,
            sex: this.state.sex,
            solarCalendar: this.state.solarDate, //阳历生日
            lunarCalendar: this.state.lunarDate, //阴历生日
            type: this.state.type, //0是生日 1是纪念日
          },
        },
      })
      .then((res) => {
        console.log(res);
        if (res.errMsg === "fail") {
        } else {
          Taro.switchTab({ url: "/pages/index/index" })
            .then((res) => {
              console.log(res);
            })
            .catch((e) => {
              console.log(e);
            });
        }
      })
      .catch((err) => console.log(err));
  };
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
    const { type, solarDate, lunarDate, files, dataSelect } = this.state;
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
            mode="aspectFit"
            length={1}
            className="avatar"
            onImageClick={this.onImageClick.bind(this)}
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
            value={name}
            onInput={(e) => this.nameInput(e)}
          />
        </View>
        <RadioGroup
          class="index-radio-group"
          onChange={(event) => this.sexChange(event)}
        >
          <Radio value="0" checked>
            女
          </Radio>
          <Radio value="1" className="radio-commemorate">
            男
          </Radio>
        </RadioGroup>
        <View className="index-date">
          <View className="date-label">日期：</View>
          <View className="date-select" onClick={() => this.showDialog()}>
            {dataSelect}
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
        <BottomDialog
          ref="getDialog"
          changeLunarDate={this.changeLunarDate}
          changeSolarDate={this.changeSolarDate}
        />
      </View>
    );
  }
}
