//删除节日/纪念日
const cloud = require("wx-server-sdk");

cloud.init({
  env:cloud.DYNAMIC_CURRENT_ENV,
  traceUser: true,
});
const db = cloud.database();

exports.main = async (event, context) => {
  const { database, condition } = event;
  try {
    return await db
      .collection(database)
      .where({ userId: condition.userId, _id: condition.id })
      .remove();
  } catch (error) {
    console.log(error);
  }
};
