//更新节日/纪念日
const cloud = require("wx-server-sdk");
cloud.init();
const db = cloud.database();
exports.main = async (event, context) => {
  const { database, condition } = event;
  console.log(condition)
  try {
    return await db
      .collection(database)
      .doc(condition.id)
      .set({
        data: {
          avatar: condition.avatar,
          solarCalendar: condition.solarCalendar,
          lunarCalendar: condition.lunarCalendar,
          type: condition.type,
          name: condition.name,
          sex: condition.sex,
        },
      });
  } catch (error) {
    console.log(error);
  }
};
