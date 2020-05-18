const cloud = require('wx-server-sdk')
const fs = require('fs')
const path = require('path')

cloud.init()
const db=cloud.database()


exports.main = async (event, context) => {
  const {database,condition}=event;
  console.log(database,condition)
  try {
    let isUser=await db.collection(database).where({userId:condition.userId}).get()
    console.log(isUser)
    if(isUser.data.length>0){
      return await db.collection(database).where({userId:condition.userId}).update({
        data:{
          imgUrl:_.set(condition.imgUrl)
        }
      })
    }else{
     return await db.collection(database).add({data:condition})
    }
  } catch (error) {
    console.log(error);
  }
}
