/**
 * ES6 6种声明变量的方法：
 * var、const、function、let、import、class
 */


// delete 只适用于对象属性
let oldMap = { "zhang": 1, "san": 2, "li": 3, "zhao": 4 };
console.log(oldMap);
delete oldMap['zhang'];

console.log(oldMap);