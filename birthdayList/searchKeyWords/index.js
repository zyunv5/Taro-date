const cloud = require("wx-server-sdk");

cloud.init();
const db = cloud.database();

exports.main = async (event, context) => {
  const { database, keyWords } = event;
  console.log(database, keyWords)
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
