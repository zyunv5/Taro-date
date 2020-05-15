const dayjs = require('dayjs');
const updateLocale = require('dayjs/plugin/updateLocale')
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(updateLocale)
dayjs.extend(relativeTime)

const diffDay=function(solar,lunar){
  let userTime=dayjs(`${solar[0]}-${solar[1]}-${solar[2]}}`);
  let nowTime=dayjs();
  let thisTime=dayjs(`${dayjs().year()}-${solar[1]}-${solar[2]}}`)
  if(Math.floor((thisTime.diff(nowTime))/86400000)>0){
    return [Math.floor((thisTime.diff(nowTime))/86400000),dayjs().year()-solar[0]]
  }else{
    let nextTime=dayjs(`${dayjs().year()+1}-${solar[1]}-${solar[2]}}`)
    return [Math.floor((nextTime.diff(nowTime))/86400000),dayjs().year()-solar[0]+1]
  }
}

const TimeLine=function(data){
  const newArray=[];
  for(let i=0;i<data.length;i++){
    let value=diffDay(data[i].solarCalendar,data[i].lunarCalendar);
    data[i].term=value[0]
    data[i].cycle=value[1]
    newArray.push(data[i])
  }
  return newArray;
}

module.exports={
  TimeLine
}
