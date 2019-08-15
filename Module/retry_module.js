"use strict";

/**
 * retry 是一个nodejs库，帮助用户可以自定义失败的操作策略
 */

const retry = require('retry');
const http = require('http');


const retryOptions = {
    "retries": 10,//最大重试次数，默认10次
    "factor": 2,//指数因子使用,默认2
    "minTimeout": 1000,//第一次重试前等待时间，默认1000ms
    "maxTimeout": Infinity,//间隔两次重试的等待时间,默认Infinity
    "randomize": false //随机化超时时间
}
/**
 * retry.operation([options]): 创建一个RetryOperation对象
 * retry.timeouts([options]): 返回一个超时列表，所有时间都是毫秒
 * new RetryOperation(timeouts): 创建RetryOperation对象
 * retryOperation.errors(): 返回被retryOperation.retry()处理的，所有错误列表
 * retryOperation.mainError(): 返回一个越多发生的错误对象
 * retryOperation.attempt(fn, timeoutOps): 封装一个功能函数到retry，当出错后，会重试功能函数
 * retryOperation.retry(error): 判断是否需要重试。error=true，要重试，error=false，不要重试
 * retryOperation.attempts(): 返回已重试次数
 */
function get(url, cb){
    let options = {
        hostname: url,
        port:80,
        method: 'GET'
    };

    let req = http.request(options, (res) => {
        console.log('STATUS ',res.statusCode);
        console.log('HEADERS ',JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            //console.log('Body ',chunk);
        })
    });

    req.on('error', (e) => {
        console.log('problem with request ',e.message);
        cb(e.message);
    });

    req.end();
}


function retryGet(url, cb){
    let operation = retry.operation();
    operation.attempt((currentAttempt) => {
        console.log('Connect Times ',currentAttempt,' : ',url);
        get(url, (err) => {
            if(operation.retry(err)){
                return;
            }
            cb(err ? operation.mainError() : null);
        });
    });
}

let baidu = "www.baidu.com";
retryGet(baidu);

retryGet("www.facebook.com");

function test(cb){
    cb(new Error('xxx'));
}

function retryTest(){
    let operation = retry.operation();
    operation.attempt((currentAttempt) => {
        console.log("currentAttempt ",currentAttempt);
        test((err) => {
            if(operation.retry(err)){
                console.log('一直在尝试中!!!');
                return;
            }
            cb(err ? operation.mainError() : null);
        })
    })
}
retryTest();