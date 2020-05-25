import Taro, { PureComponent } from "@tarojs/taro";
import { View, Input, Radio } from "@tarojs/components";
import { AtImagePicker } from "taro-ui";
import "./index.css";
import avatar from "../../assets/images/normal-avatar.png";
import BottomDialog from "../../components/bottomDialog/index";
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
export default class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      files: [],
      name: "张",
      sexArray: [
        { name: "女士", value: "0", selected: true, class: "" },
        {
          name: "先生",
          value: "1",
          selected: false,
          class: "radio-commemorate",
        },
      ],
      sex:0,
      term: 25,
      cycle: 29,
      avatar: avatar,
      solarCalendar: ["1992", "2", "18"],
      lunarCalendar: ["1992", "正月", "十五"],
    };
  }

  componentWillMount() {
    // 获取路由携带过来的参数
    const {sexArray}=this.state;
    const { list } = this.props;
    const id = this.$router.params.id;
    const paramArr = list.filter((item) => {
      return item._id === id;
    });
    const params = paramArr[0];
    if (params.type === 0) {
      Taro.setNavigationBarTitle({
        title: params.name + "的生日",
      });
    } else {
      Taro.setNavigationBarTitle({
        title: params.name + " 纪念日",
      });
    }
    if(parseInt(params.sex)===0){
      sexArray[0].selected=true
      sexArray[1].selected=false
    }else{
      sexArray[0].selected=false
      sexArray[1].selected=true
    }
    this.setState({
      id: params._id,
      name: params.name,
      sexArray: sexArray,
      term: params.term,
      cycle: params.cycle,
      avatar: params.avatar || avatar,
      solarCalendar: params.solarCalendar,
      lunarCalendar: params.lunarCalendar,
      type: params.type,
      files: [{ url: params.avatar || avatar }],
    });
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  //更新数据
  saveInfo = () => {
    const params = this.state;
    params.userId = wx.getStorageSync("openid");
    this.props.updateItem(params);
  };
  //取消更新
  cancelInfo = () => {
    Taro.switchTab({ url: "/pages/index/index" });
  };
  //删除数据
  removeInfo = () => {
    let that = this;
    wx.showModal({
      content: "确认要删除这条数据吗？",
      success(res) {
        if (res.confirm) {
          const params = that.state;
          params.userId = wx.getStorageSync("openid");
          that.props.removeItem(params);
        } else if (res.cancel) {
          console.log("用户点击取消");
        }
      },
    });
  };
  nameInput = (e) => {
    this.setState({
      name: e.detail.value,
    });
  };
  //改变性别
  sexChange = (event) => {
    this.setState({
      sex: event.detail.value,
    });
  };
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
    // console.log(files);
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
          // console.log("[上传图片]成功:", res.fileID);
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

  render() {
    const {
      name,
      sex,
      term,
      solarCalendar,
      lunarCalendar,
      type,
      files,
    } = this.state;
    return (
      <View className="index">
        <AtImagePicker
          multiple={false}
          files={files}
          onChange={(files) => this.onChangeImg(files)}
          mode="aspectFit"
          length={1}
          className="index-avatar"
        />
        <View className="index-info">
          <View className="info-item">
            <Input
              value={name}
              type="text"
              onInput={(e) => this.nameInput(e)}
              className={`info-name ${type !== 0 ? "info-name-width" : ""}`}
            />
            {type === 0 ? (
              <View className="info-sex">
                <RadioGroup
                  class="index-radio-group"
                  onChange={(event) => this.sexChange(event)}
                >
                  {sexArray.map(item=>{
                    return (<Radio key={item.name} value={item.value} checked={item.selected} className={item.class}>
                    {item.name}
                  </Radio>)
                  })}
                  {/* <Radio value="0" checked={`${parseInt(sex)===0}`?"checked":false}>
                    女士
                  </Radio>
                  <Radio
                    value="1"
                    className="radio-commemorate"
                    checked={`${parseInt(sex) === 1}`?"checked":false}
                  >
                    先生
                  </Radio> */}
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
