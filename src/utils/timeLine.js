const dayjs = require("dayjs");
const {
  calendarFunc,
  oldMonthToNewMonth,
  oldDayToNewDay,
} = require("./calendar");
const updateLocale = require("dayjs/plugin/updateLocale");
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(updateLocale);
dayjs.extend(relativeTime);

//计算时间差
const diffDay = function (solar, lunar) {
  if (solar.length !== 0) {
    //根据阳历计算
    const [year, month, day] = solar;
    return calcDays(year, month, day);
  } else {
    //根据农历计算
    const [year, oldMonth, oldDay] = lunar;
    if (oldMonth.indexOf("闰") === -1) {
      const month = oldMonthToNewMonth(oldMonth);
      const day = oldDayToNewDay(oldDay);
      const newDate = calendarFunc.lunar2solar(year, month, day);
      return solarCalc(newDate.lYear, newDate.lMonth, newDate.lDay);
    } else {
      //根据农历计算带闰月
      const month = oldMonthToNewMonth(oldMonth.slice(1));
      const day = oldDayToNewDay(oldDay);
      // const newDate=calendarFunc.lunar2solar(year,month,day,true)
      const newDate = calendarFunc.lunar2solar(year, month, day);
      return solarCalc(newDate.lYear, newDate.lMonth, newDate.lDay);
    }
  }
};

//返回阳历的时间差
const calcDays = function (year, month, day) {
  let nowTime = dayjs(); //当前时间
  let thisTime = dayjs(`${dayjs().year()}-${month}-${day}}`); //阳历生日
  if (Math.floor(thisTime.diff(nowTime) / 86400000) > 0) {
    return [
      Math.floor(thisTime.diff(nowTime) / 86400000),
      dayjs().year() - year,
    ];
  } else {
    let nextTime = dayjs(`${dayjs().year() + 1}-${month}-${day}}`);
    return [
      Math.floor(nextTime.diff(nowTime) / 86400000),
      dayjs().year() - year + 1,
    ];
  }
};

//返回阴历的时间差
const solarCalc = function (year, month, day) {
  let nowTime = dayjs(); //当前时间
  const newDate = calendarFunc.lunar2solar(dayjs().year(), month, day);
  let thisTime = dayjs(newDate.date); //今年的生日
  if (Math.floor(thisTime.diff(nowTime) / 86400000) > 0) {
    return [
      Math.floor(thisTime.diff(nowTime) / 86400000),
      dayjs().year() - year,
    ];
  } else {
    const nextDate = calendarFunc.lunar2solar(dayjs().year() + 1, month, day);
    let nextTime = dayjs(nextDate.date);
    return [
      Math.floor(nextTime.diff(nowTime) / 86400000),
      dayjs().year() - year + 1,
    ];
  }
};

//根据获取的数据，返回时间差
const TimeLine = function (data) {
  const newArray = [];
  for (let i = 0; i < data.length; i++) {
    let value = diffDay(data[i].solarCalendar, data[i].lunarCalendar);
    data[i].term = value[0];
    data[i].cycle = value[1];
    newArray.push(data[i]);
  }
  return newArray;
};

module.exports = {
  TimeLine,
};
