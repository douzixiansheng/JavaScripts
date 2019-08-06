/**
 * promise 小案例
 * 从redis中获取我们写入的值
 */
'use strict';

const redis = require('redis');
const Model = require('./model');

var RedisClient = redis.createClient(6379,'127.0.0.1');

const key = "user_fm";
const value = {"username": 'fm', "desc":"学习Promise await  async"}



let _promise = async function(){
    let succ = await Model.setUser(RedisClient, key, value);
    if(succ){
        console.log('写入失败');
    }
    let data = await Model.getUser(RedisClient, key);
    console.log(JSON.parse(data));
}
_promise();