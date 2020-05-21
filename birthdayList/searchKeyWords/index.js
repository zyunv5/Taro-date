//列表的模糊搜索
const cloud = require("wx-server-sdk");
cloud.init();
const db = cloud.database();
exports.main = async (event, context) => {
  const { database, keyWords } = event;
  try {
    return await db.collection(database).where({
      name:db.RegExp({
        regexp:keyWords,
        options:'i'
      })
    }).get()
  } catch (error) {
    console.log(error);
  }
};
