/**
 * base64 转码以及解码 以及如何判断是否为base64转码过的字符串
 */

let str = '장시간 자리비움 처벌 안내';
console.log("原始串: ",str);
//转码
let a = new Buffer(str).toString('base64');
console.log("转码后: ",a);
//解码
let c = new Buffer(a, 'base64').toString();
console.log('解码后: ',c);

//判断是否为base64转码过的字符串
var exg = new RegExp('^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$');

console.log("a 是64转码字符串: ",exg.test(a));
console.log("str 是正常字符串: ",exg.test(str));