const schedule = require('node-schedule');

/**
 * 每分钟的第30秒触发： '30 * * * * *'
 * 每小时的1分30秒触发 ：'30 1 * * * *'
 * 每天的凌晨1点1分30秒触发 ：'30 1 1 * * *'
 * 每月的1日1点1分30秒触发 ：'30 1 1 1 * *'
 * 2016年的1月1日1点1分30秒触发 ：'30 1 1 1 2016 *'
 * 每周1的1点1分30秒触发 ：'30 1 1 * * 1'
 */
const scheduleCronstyle = () => {
    schedule.scheduleJob('30 * * * * *', () => {
        console.log('schedule : ',new Date());
    })
}
scheduleCronstyle();

const task1 = () => {
    //每分钟的1-10秒都会触发，其它通配符依次类推
    schedule.scheduleJob('1-10 * * * * *', () => {
        console.log('传入数值范围的参数',new Date());
    })
}
task1();


//dayOfWeek month dayOfMonth hour minute second
const scheduleObjectLiteralSyntax = () => {
    schedule.scheduleJob({hour: 16, minute: 37, dayOfWeek:3}, () =>{
        console.log('对象文本语法定时器');
    })
}
scheduleObjectLiteralSyntax();

const scheduleCancel = () => {
    let counter = 1;
    const j = schedule.scheduleJob('* * * * * *', () => {
        console.log('定时器触发次数：',counter);
        counter++;
    });
    setTimeout(() => {
        console.log('定时器取消');
        j.cancel();
    }, 5000);
}
scheduleCancel();

let startTime = new Date(Date.now() + 5000);
let endTime = new Date(startTime.getTime() + 5000);

let j = schedule.scheduleJob({start: startTime, end: endTime, rule: '*/1 * * * * *'}, () => {
    console.log('Time for tea!');
});