"use strict";

const async = require('async');

/**
 * series 会按照顺序执行 function
 * 而且可以把结果全部规整起来
 */
async.series(
    [
        cb => {
            cb(null, 'Hello');
        },
        cb => {
            cb(null, 'World');
        }
    ],
    (err, result) => {
        //err = [err1, err2]
        //result = [result1, result2]
        console.log(result);
    }
);

//doWhilst
let dataList = [{number:10}, {number: 20}];
let count = 0;

async.whilst(
    () => {
        return count < dataList.length;
    },
    callback => {
        console.log(dataList[count].number);
        count++;
        callback(null);
    },
    err => {
        console.log(err);
        console.log('doWhilst');
    }
)