import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import "./index.css"

export default class Index extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {

    return (
      <View className="add-item" onClick={this.props.link}>
        {this.props.name}
      </View>
    );
  }
}
