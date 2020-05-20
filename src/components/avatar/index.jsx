import Taro, { Component } from "@tarojs/taro";
import { View,Image } from "@tarojs/components";
import "./index.css";
import avatar from "../../assets/images/normal-avatar.png"

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  static defaultProps = {
    size: 'small',
    src:avatar
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const {size,avatar}=this.props;
    return (
      <View className="avatar">
        <Image mode="aspectFit" src={avatar} />
      </View>
    );
  }
}
