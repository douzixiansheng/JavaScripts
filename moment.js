const moment = require('moment');
console.log('> ');
console.log('> 日期格式化');
console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));
console.log(moment().format('dddd'));
console.log(moment().format());

console.log('> 相对时间');
console.log(moment('20111130', 'YYYYMMDD').fromNow());
console.log(moment().startOf('day').fromNow());
console.log(moment().endOf('day').fromNow());
console.log(moment().startOf('hour').fromNow());

console.log(moment('2019-12-11 15:00:00', 'YYYY-MM-DD HH:mm').toDate())
let startTime1 = moment('2019-12-11 15:00:00', 'YYYY-MM-DD HH:mm');
let startTime2 = moment('2019-12-11 16:00:00', 'YYYY-MM-DD HH:mm');
console.log('startTime1.diff 获取的时间为ms ', startTime1.diff(startTime2));

let duration = moment.duration(startTime1.diff(startTime2));
console.log(duration.asSeconds());

console.log('> 计算两个时间点的差用HH::mm:ss 表示');
let m_a = moment([2019, 11, 1]);
let m_b = moment([2019, 11, 3, 12]);
let m_duration = moment.duration(m_b.diff(m_a));
let m_s = `${m_duration.asHours()}:${moment([2000, 1, 1]).add(m_duration).format("mm:ss")}`;
console.log(m_s);

console.log('> 获取当前时间');
console.log(moment().format('YYYY-MM-DD HH:mm:ss'));
console.log(moment().format('L'));
console.log(moment().format('LL'));
console.log(moment().format('LLL'));
console.log(moment().format('LLLL'));
console.log('> 获取当前时间的时间戳');
console.log(moment().format('X'));
console.log('> 今天是周几');
console.log(moment().format('LLL'));
console.log(moment().format('d'));

console.log(moment().subtract(1, 'days').calendar());

console.log('> 时间戳(毫秒) 转时间')
console.log(moment.unix(1576118298).format());

console.log('> 时间差转化为相对的秒、分钟或者小时');
let consumingSeconds = moment.duration(moment(startTime2).valueOf() - moment(startTime1).valueOf()).as('seconds');
let consumingMinutes = moment.duration(moment(startTime2).valueOf() - moment(startTime1).valueOf()).as('minutes');
let consumingHours = moment.duration(moment(startTime2).valueOf() - moment(startTime1).valueOf()).as('hours');
console.log(consumingSeconds, consumingMinutes, consumingHours);