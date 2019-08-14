/**
 * `[].slice.call(arguments)` 是如何工作的
 * 
 * `.slice` 这个方法在不接受任何参数的时候会返回 `this` 本身
 * 这是一个`Array.prototype` 下的方法，因此`this` 就是指向调用`.slice`方法的数组本身
 * 
 * `arguments` 是属于函数内部的变量，其值是函数参数列表，一个类数组对象
 */

let arr = new Buffer(10);
console.log(arr);
console.log(arr.length);
console.log(arr[0]);
console.log(typeof arr);
arr = [].slice.call(arr);
console.log(arr);
for(let i = 0; i < arr.length; i++){
    console.log(arr.slice());
}
