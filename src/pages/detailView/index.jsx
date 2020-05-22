import Taro, { Component } from "@tarojs/taro";
import { View, Image, Picker, Input } from "@tarojs/components";
import { AtImagePicker } from "taro-ui";
import "./index.css";
import avatar from "../../assets/images/normal-avatar.png";
import BottomDialog from "../../components/bottomDialog/index";
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
      name: "张",
      sex: 1,
      term: 25,
      cycle: 29,
      avatar: avatar,
      solarCalendar: ["1992", "2", "18"],
      lunarCalendar: ["1992", "正月", "十五"],
      selector: ["先生", "女士"],
      selectorChecked: "先生",
      params: {},
      files: [],
    };
  }

  componentWillMount() {
    // 获取路由携带过来的参数
    const params = JSON.parse(this.$router.params.data);
    if (params.type === 0) {
      Taro.setNavigationBarTitle({
        title: params.name + "的生日",
      });
    } else {
      Taro.setNavigationBarTitle({
        title: params.name + " 纪念日",
      });
    }
    this.setState({
      name: params.name,
      sex: params.sex,
      term: params.term,
      cycle: params.cycle,
      avatar: params.avatar || avatar,
      solarCalendar: params.solarCalendar,
      lunarCalendar: params.lunarCalendar,
      type: params.type,
      params: params,
      files: [{ url: params.avatar }],
    });
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  saveInfo = () => {
    const params = this.state;
    params.userId = wx.getStorageSync("openid");
    params._id = this.state.params._id;
    this.props.updateItem(params);
  };
  cancelInfo = () => {
    Taro.switchTab({ url: "/pages/index/index" });
  };
  removeInfo = () => {
    let that = this;
    wx.showModal({
      content: "确认要删除这条数据吗？",
      success(res) {
        if (res.confirm) {
          const params = that.state.params;
          params.userId = wx.getStorageSync("openid");
          that.props.removeItem(params);
        } else if (res.cancel) {
          console.log("用户点击取消");
        }
      },
    });
  };
  onChange = (e) => {
    this.setState({
      selectorChecked: this.state.selector[e.detail.value],
    });
  };
  nameInput = (e) => {
    this.setState({
      name: e.detail.value,
    });
  };
  sexChange = () => {};
  //显示时间选择器
  showDialog = () => {
    this.refs.getDialog.showDialog();
  };
  //更改阳历时间
  changeSolarDate = (date) => {
    this.setState({
      solarCalendar: date,
    });
  };
  changeLunarDate = (date) => {
    this.setState({
      lunarCalendar: date,
    });
  };
  onChangeImg = (files) => {
    console.log(files);
    if (files.length === 0) {
      this.setState({
        files: [],
      });
    } else {
      let extension = files[0].url.split(".").pop();
      wx.cloud.uploadFile({
        cloudPath: `file/${new Date().getTime()}.${extension}`,
        filePath: files[0].url, //这个就是图片的存储路径
        success: (res) => {
          console.log("[上传图片]成功:", res.fileID);
          this.setState({
            files: this.state.files.concat({ url: res.fileID }),
          });
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
        },
        fail: (err) => {
          console.log(err);
        },
      });
    }
  };
  onImageClick(index, file) {
    console.log(index, file);
  }

  render() {
    const {
      name,
      sex,
      term,
      avatar,
      solarCalendar,
      lunarCalendar,
      type,
      files,
    } = this.state;
    return (
      <View className={`index ${sex === 0 ? "bg-female" : "bg-male"}`}>
        <AtImagePicker
          multiple={false}
          files={files}
          onChange={(files) => this.onChangeImg(files)}
          mode="aspectFit"
          length={1}
          className="index-avatar"
          onImageClick={this.onImageClick.bind(this)}
        />
        <View className="index-info">
          <View className="info-item">
            <Input
              value={name}
              type="text"
              onInput={(e) => this.nameInput(e)}
              className="info-name"
            />
            {type === 0 ? (
              <View className="info-sex">
                <RadioGroup
                  class="index-radio-group"
                  onChange={(event) => this.sexChange(event)}
                >
                  <Radio value="0" checked={`${sex === 0}` ? true : false}>
                    女士
                  </Radio>
                  <Radio
                    value="1"
                    className="radio-commemorate"
                    checked={`${sex === 1}` ? true : false}
                  >
                    先生
                  </Radio>
                </RadioGroup>
              </View>
            ) : (
              ""
            )}
          </View>
          <View className="info-item">
            {type === 0 ? (
              <View className="info-calendar" onClick={() => this.showDialog()}>
                生日是:
                {solarCalendar.length !== 0
                  ? `${solarCalendar[0]}-${solarCalendar[1]}-${solarCalendar[2]}`
                  : `${lunarCalendar[0]} ${lunarCalendar[1]}月 ${lunarCalendar[2]}`}
              </View>
            ) : (
              <View className="info-calendar" onClick={() => this.showDialog()}>
                纪念日是:
                {solarCalendar.length !== 0
                  ? `${solarCalendar[0]}-${solarCalendar[1]}-${solarCalendar[2]}`
                  : `${lunarCalendar[0]} ${lunarCalendar[1]} ${lunarCalendar[2]}`}
              </View>
            )}
          </View>
          {type === 0 ? (
            <View className="info-item">
              还有{term}天,就{cycle}岁了
            </View>
          ) : (
            <View className="info-item">
              还有{term}天,就{cycle}周年了
            </View>
          )}
          <View className="info-item">
            <View
              className="item-button confirm"
              onClick={() => this.saveInfo()}
            >
              保存
            </View>
            <View
              className="item-button cancel"
              onClick={() => this.cancelInfo()}
            >
              取消
            </View>
            <View
              className="item-button remove"
              onClick={() => this.removeInfo()}
            >
              删除
            </View>
          </View>
        </View>
        <BottomDialog
          ref="getDialog"
          solar={solarCalendar}
          lunar={lunarCalendar}
          changeLunarDate={this.changeLunarDate}
          changeSolarDate={this.changeSolarDate}
        />
      </View>
    );
  }
}
