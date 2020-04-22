import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import "./index.css";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
     show:true,
     calendar:0,//0是选择阳历 1是选择农历
    };
  }
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  changeSolar=()=>{
    console.log("阳历");
  }
  changeLunar=()=>{
    console.log("农历");
  }

  render() {
   const {show,calendar}=this.state
    return (
      <View className="bottom-dialog">
        <View className="dialog-pick">
          <View className="pick-header">
            <View className="header-cancel">取消</View>
            <View className="header-calendar">
              <View className={`calendar-item calendar===0?:`} onClick={()=>{this.changeSolar()}}>阳历</View>
              <View className="calendar-item" onClick={()=>{this.changeLunar()}}>农历</View>
            </View>
            <View className="header-confirm">确认</View>
          </View>
              这是一个底部弹出的dialog
        </View>
      </View>
    );
  }
}
