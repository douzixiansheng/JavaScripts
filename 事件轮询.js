/**
 *      事件轮询机制解析
 * https://nodejs.org/zh-cn/docs/guides/event-loop-timers-and-nexttick/#timers
 *
 *  |-----------------------------------|
 *  -->  timers
 * |  |--------------------------------|
 * |
 * |  |--------------------------------|
 * |  |  pending callbacks
 * |  |--------------------------------|
 * |
 * |  |--------------------------------|
 * |  |  idle,prepare
 * |  |--------------------------------|
 * |  
 * |  |--------------------------------|
 * |  |  poll   | <------------| connections, | incoming/data.etc
 * |  |--------------------------------|
 * |
 * |  |--------------------------------|
 * |  |   check
 * |  |--------------------------------|
 * | 
 * |  |--------------------------------|
 * |----|    close callbacks
 * |  |--------------------------------|
 * 
 * 
 * 
 * 每个框框里每一步都是事件循环机制的一个阶段
 * 每个阶段都有一个FIFO队列来执行回调
 * 
 * times(定时器):  setTimeout()/setInterval()的回调函数
 * pending callbacks: 执行延迟到下一个循环迭代的I/O回调
 * idle,prepare: 仅系统内部使用
 * loop(轮询): 检索新的I/O事件；执行与I/O相关的回调(几乎所有的情况下，除了关闭的回调函数，
 * 它们由计时器和setImmediate()排定的之外)，其余情况node将在此处阻塞
 * check(检测): setImmediate() 回调函数在这里执行
 * close callbacks(关闭的回调函数): 一些装备关闭的回调函数,如:socket.on('close',...)
 */


/*以下情况是非确定性的，因为它受进程性能的约束 */
setTimeout(() => {
    console.log('timeout');
}, 0);

setImmediate(() => {
    console.log('immediate');
});


const fs = require('fs');

/*把这两个函数放入一个I/O循环内调用,setImmediate总是被优先调用 */
fs.readFile('./test.json', () => {
    setTimeout(() => {
        console.log('in timeout');
    }, 0);

    setImmediate(() => {
        console.log('in immediate');
    });
});