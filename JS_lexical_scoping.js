/**
 * Created by NKDF on 2019/5/22.
 *
 * 词法作用域和动态作用域
 *
 * JavaScript 采用词法作用域(lexical scoping),也就是静态作用域
 * 函数的作用域在函数定义的时候就决定了。
 * 与词法作用域相对的是动态作用域，函数的作用域是在函数调用的时
 * 候才决定的。
 */

var value = 1;
function foo() {
    console.log(value);
}

function bar() {
    var value = 2;
    foo();
}
bar();

/**
 * 在函数体内，局部变量的优先级高于同名的全局变量。如果在函数内声明的一个局部变量或者
 * 函数参数中带有的变量和全局变量重名，那么全局变量就被局部变量所遮盖。
 * @type {string}
 */
var scope = "global scope";//全局变量
function checkscope() {
    var scope = "local scope";//同名局部变量
    function f() {
        return scope;
    }
    return f();
}
console.log(checkscope());

var scope2 = "global scope";
function checkscope2() {
    var scope2 = "local scope";
    function f() {
        return scope2;
    }
    return f();
}
console.log(checkscope2());
/**
 * 对于每个执行上下文，都有三个重要属性：
 * 变量对象、作用域链、this
 *
 * 变量对象是与执行上下文相关的数据作用域，存储了在上下文中定义的变量和函数声明。
 *
 * 全局对象是预定义的对象，作为JavaScript的全局函数和全局属性的占位符。通过使用
 * 全局对象，可以访问所有其他预定义的对象、函数和属性。
 *
 * 在顶层JavaScript代码中，可以用关键字this引用全局对象。因为全局对象时作用域链的
 * 头，这意味着所有非限定性的变量和函数名都会作为对象的属性来查询。
 */
//在客户端JavaScript中，全局对象就是Window对象。
console.log(this);
//全局对象是由Object构造函数实例化的一个对象
console.log(this instanceof Object);

/**
 * 调用函数时，会为其创建一个Arguments对象，并自动初始化局部变量arguments，
 * 指代该Arguments对象。所有作为参数传入的值都会为Arguments对象的数组元素
 * @param x
 * @param y
 * @returns {*}
 */
function func(x, y) {
    console.log(arguments);
    console.log(arguments.length);
    console.log(arguments.callee);
    return x + y;
}
console.log(func(1, 2));

const test = name => {
    console.log(arguments);
    console.log(name);
    console.log(arguments.callee)
};
test('Jerry');



var a = 11;
for(var i = 0;i < 1;i++){
    var a = 12;
}
console.log("a ",a);