import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '我的'
  }

  componentWillMount () { }

  componentDidMount () {
    wx.cloud.callFunction({
      name: 'get',
      complete: res => {
        console.log('callFunction test result: ', res)
      }
    })
   }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <Text>birthday</Text>
      </View>
    )
  }
}
