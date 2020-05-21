//添加节日/纪念日
const cloud = require("wx-server-sdk");

cloud.init();
const db = cloud.database();

exports.main = async (event, context) => {
  const { database, condition } = event;
  try {
    let isData = await db
      .collection(database)
      .where({ userId: condition.userId, name: condition.name })
      .get();
    if (isData.data.length > 0) {
      return { errMsg: "fail", message: "姓名重复" };
    } else {
      return await db.collection(database).add({ data: condition });
    }
  } catch (error) {
    console.log(error);
  }
};
