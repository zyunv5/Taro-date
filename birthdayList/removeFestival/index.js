//删除节日/纪念日
const cloud = require("wx-server-sdk");

cloud.init();
const db = cloud.database();

exports.main = async (event, context) => {
  const { database, condition } = event;
  try {
    return await db
      .collection(database)
      .where({ userId: condition.userId, _id: condition._id })
      .remove();
  } catch (error) {
    console.log(error);
  }
};
