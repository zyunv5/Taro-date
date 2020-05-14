// 云函数入口文件
const cloud = require('wx-server-sdk')
const rp=require("request-promise")

cloud.init()
const db=wx.cloud.database()
db.collection('dataList').get({
  success:res=>{
    console.log(res);
  },
  fail:err=>{
    console.log(err);
  }
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}