const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database()


exports.main = async (event, context) => {
  const {database,condition}=event;
  try {
    let isUser=await db.collection(database).where({userId:condition.userId}).get()
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
