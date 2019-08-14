
'use strict';

var calculateTax = (value, percentValue) => {
    return value / 100 * (100 + percentValue);
}
console.log(calculateTax(10, 5));


//一个简单的函数

var simple = (a) => {
    return a;
}
console.log(simple(2));

//一个简单的方法
var obj = {simple: (a) => {return a}};
console.log(obj.simple(5));


//用声明式方法遍历数组
var array= [1, 2, 3];
array.forEach((element) => {
    console.log(element);
})


//() => "Simple Function"
//() 代表函数参数
// => 是函数体/定义的开始
// => 后面的内容是函数体/定义

var SimpleFn = () => "Simple Function";
console.log(SimpleFn());

//globalVal = 'evil';  //严格模式下报错  ReferenceError: globalVal is not defined

let fn = () => {}
console.log(typeof fn);

//闭包
let global = 'global';
function outer(element){
    let outer = 'outer';
    function inner(){
        let a = 5;
        console.log(a);//闭包可以访问所有在其声明内部声明的变量
        console.log(global);//闭包可以访问全局变量
        console.log(outer);//闭包能够访问外部函数的变量
        console.log(element);//闭包可以访问外部函数的参数
    }
    inner();
}
outer(123);

//闭包可以记住它的上下文
var fn2 = (arg) => {
    let outer = 'Visible';
    let innerFn = () => {
        console.log(outer);
        console.log(arg);
    }
    return innerFn;
}
var closureFn = fn2(5);
closureFn();