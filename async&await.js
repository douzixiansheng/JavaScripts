/**
 * Created by NKDF on 2019/4/16.
 */
/**
 * async 函数计算Generator 函数的语法糖
 * async 函数就是将General函数的星号(*)替换成async，将yield 替换成await
 * async 函数返回的是一个Promise对象.
 * async 函数的实现，就是将Generator函数和自动执行器，包装在一个函数里。
 * async 命令后面的Promise对象，运行结果可能是rejected,最好把await命令放在try...catch代码块中
 * await 命令只能用在async函数中，如果用在普通函数，就会报错
 * async 函数(包含函数语句、函数表达式、Lambda表达式)会返回一个
 * Promise对象， 如果在函数中return 一个直接量，async会把这个直
 * 接量通过Promise.resolve() 封装成Promise对象
 * @returns {string}
 */
async function testeAsync() {
    return "hello async";
}

const result = testeAsync();
console.log(result);

/**
 * async 函数返回的是一个Promise对象，所以在最外层不能用await获取
 * 其返回值的情况下，可以用then()链来处理这个Promise对象
 */
testeAsync().then(v => {
    "use strict";
    console.log(v);
});

/**
 * await 等待的是一个表达式，这个表达式的计算结果是Promise对象
 * 或者其他值.
 *
 * await 如果等待的不是一个Promise对象，表达式运算结果计算它等待的东西
 * await 等到的是一个Promise对象，await会阻塞后面的代码，等着Promise对
 * 象resolve，然后得到resolve的值，作为await表达式的运算结果
 * @returns {string}
 */
function getSomething() {
    return "something";
}
async function testAsync2() {
    return Promise.resolve("hello async");
}

async function test() {
    const v1 = await getSomething();
    const v2 = await testAsync2();
    console.log(v1, v2);
}

test();

/**
 * async/await 在并发场景中的应用
 * Promise.all 接受的是一个数组，它可以将数组中的promise对象并行执行
 * @param data1
 * @param data2
 * @returns {*}
 */
async function charCountAdd(data1, data2) {
    const [d1, d2] = await Promise.all([charCount(data1), charCount(data2)])
    return d1 + d2;
}

charCountAdd('Hello', 'Hi').then(console.log);//通过then获取异步函数的返回值

function charCount(data) {
    return new Promise((resolve, reject) => {
        "use strict";
        setTimeout(() => {
            resolve(data.length);
        }, 1000);
    });
}

var ttt = 0.1233445664434;
console.log(parseFloat(ttt));