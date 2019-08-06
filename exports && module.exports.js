/**
 * CommonJs 定义的模块分为: 模块标识(module)、模块定义(exports)、模块引用(require)
 *
 * 在node执行一个文件时，会给这个文件内生成一个exports和module对象，而module又有一个
 * exports属性。
 * exports = module.exports = {}
 *
 * require 导出的内容是module。exports的指向的内存块内容，并不是exports的。
 *
 * exports 对象通过形参的方式传入的，直接赋值形参会改变形参的引用，但并不能改变作用域外的值.
 * 如果要达到require引入一个类的效果，赋值给module.exports对象。
 * 
 * 
 * --- 参考exportsTest 目录下测试文件
 * exports 只能对外暴露单个函数
 * module.exports 可以暴露一个类
 * */

var change = function (a) {
    a = 100;
    console.log(a);
};

var a = 10;
change(a);
console.log(a);