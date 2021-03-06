import Taro, { PureComponent } from "@tarojs/taro";
import { View, RadioGroup, Radio, Input, Label } from "@tarojs/components";
import { AtImagePicker } from "taro-ui";
import BottomDialog from "../../components/bottomDialog";
import "./index.less";
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
export default class Index extends PureComponent {
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
  componentWillMount() {
    wx.getStorageSync({
      key: "openid",
      success(res) {
        this.setState({
          openid: res.data,
        });
      },
    });
  }
  componentDidMount() {}
  componentWillUnmount() {}
  componentDidShow() {}
  componentDidHide() {}
  //切换生日/纪念日
  dayChange = (event) => {
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
    if (files.length === 0) {
      this.setState({
        files: [],
      });
    } else {
      Taro.showLoading({
        title: "图片上传中...",
      });
      this.uploadCloud(files);
    }
  };
  //选择图片失败
  onFail() {
    Taro.showToast({
      title: '上传失败',
      duration: 2000
    })
  }
  //图片上传到云开发的储存中
  uploadCloud = (files) => {
    let extension = files[0].url.split(".").pop();
    wx.cloud.uploadFile({
      cloudPath: `file/${new Date().getTime()}.${extension}`,
      filePath: files[0].url, //这个就是图片的存储路径
      success: (res) => {
        // console.log("[上传图片]成功:", res.fileID);
        this.uploadCloudData(res);
        this.setState(
          {
            files: this.state.files.concat({ url: res.fileID }),
          },
          () => {
            Taro.hideLoading();
          }
        );
      },
      fail: (err) => {
        console.log(err);
      },
    });
  };
  //图片上传到数据库中
  uploadCloudData = (res) => {
    wx.cloud
      .callFunction({
        name: "uploadImg",
        data: {
          database: "imgData",
          condition: {
            userId: wx.getStorageSync("openid"),
            imgUrl: res.fileID,
          },
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

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
    const params = {
      userId: wx.getStorageSync("openid"),
      avatar: avatar,
      name: this.state.name,
      sex: this.state.sex,
      solarCalendar: this.state.solarDate, //阳历生日
      lunarCalendar: this.state.lunarDate, //阴历生日
      type: parseInt(this.state.type), //0是生日 1是纪念日
    };
    this.props.addItem(params);
  };
  //取消保存
  cancel = () => {
    wx.switchTab({ url: "/pages/index/index" });
  };
  render() {
    const { type, solarDate, lunarDate, files, dataSelect } = this.state;
    return (
      <View className="index">
        <View className="index-avatar">
          <AtImagePicker
            multiple={false}
            files={files}
            onChange={(files) => this.onChangeImg(files)}
            mode="aspectFit"
            length={1}
            className="avatar"
          />
        </View>
        <RadioGroup
          class="index-radio-group"
          onChange={(event) => this.dayChange(event)}
        >
          <Radio value="0" checked className="radio-first">
            生日
          </Radio>
          <Radio value="1" className="radio-commemorate">
            纪念日
          </Radio>
        </RadioGroup>
        {parseInt(type) === 0 ? (
          <RadioGroup
            class="index-radio-group"
            onChange={(event) => this.sexChange(event)}
          >
            <Radio value="0" checked className="radio-first">
              女
            </Radio>
            <Radio value="1" className="radio-commemorate">
              男
            </Radio>
          </RadioGroup>
        ) : (
          ""
        )}
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
