
/**
 * 使用var声明的变量(非Function 中声明),在浏览器环境就是一个全局变量。
 * 而在Node中，var声明的变量是其顶级作用域,即:声明的模块中.
 *
 * 在浏览器中，顶级作用域为全局作用域，在Node中并不如此，顶级作用域并非
 * 是全局作用域.
 */
function foo() {
    var a = 1;
    console.log(this.a);
    console.log(this === global);
}
var a = 10;
foo();

//1.直接调用的this
var x = 1;
global.x = 2;
function text() {
    console.log(this.x);//非严格模式下，为2  严格模式下报错
    console.log(this === global);//Node.js 环境下，全局对象是global
}
text();

//2. 构造函数中的this

function MyClass(name) {
    this.name = name;//函数中的this 指向新创建的对象 严格模式与非严格模式一致
}
var obj = new MyClass('hello');
console.log(obj.name);

/**
 * Node 全局中的this默认是一个空对象,即{}。
 *
 * 在函数中this指向的是global对象(非严格模式，严格模式undefined)，
 * 和全局中的this不是同一个对象。
 */
function fn() {
    this.num = 10;//函数中的this指向的是global
}
fn();
console.log(this);
console.log(this.num);
console.log(global.num);

/**
 * 作为对象方法调用 this指向上级对象
 * @type {{}}
 */
let Application = {};//严格模式 必须用let声明
Application.init = function () {
    console.log("Application.init ",this);//{ init: [Function] }
};
Application.init();

//7.
this.msg = "全局中的this指向的是module.exports";
console.log(module.exports);
console.log(this === global);//严格模式与非严格模式 false
console.log(this === module.exports);//严格模式与非严格模式 true

/**
 * 如果是new绑定，并且构造函数中没有返回function或者是Object，那么this指向这个新对象。
 *
 * @param age
 * @constructor
 */
function Super(age) {
    this.age = age;
    console.log(this);
}
let instance = new Super('26');
console.log(instance.age);

/**
 * 构造函数返回值是function或object，这种情况下this指向的是返回的对象
 * @param age
 * @returns {{a: number}}
 * @constructor
 */
function Super2(age) {
    this.age = age;
    let obj = {a : 2};
    console.log(this);
    return obj;
}
let instance2 = new Super2('hello');
console.log(instance2.age);


/**
 * 函数通过call,apply,bind绑定，this绑定的就是指定的对象[归结为显示绑定]
 * 如果call,apply,bind第一个参数是undefined或null，严格模式下this的值为传
 * 入的值null/undefined，非严格模式下，实际应用的默认绑定规则，this指向全
 * 局对象(node环境为global，浏览器环境为window)
 */
function info() {
    console.log(this.age);
}
var person = {
    age:20,
    info
}
var age = 28;
var info = person.info;
info.call(person);
info.apply(person);
info.bind(person)();

/**
 * 隐式绑定：函数的调用时在某个对象上触发的，即调用位置上存在上下文对象。典型的
 * 隐式调用:xxx.fn()
 */
function info2(){
    console.log(this.age);
}
var person3 = {
    age:20,
    info2
}
var age = 28;
person3.info2();//执行的似乎隐式绑定


/**
 * 默认绑定：在不能应用其他绑定规则时使用的默认规则，通常是独立函数调用
 * 非严格模式：node环境，执行全局对象global
 * 浏览器环境，执行全局对象window
 *
 * 严格模式：执行undefined
 */
function info3() {
    console.log("info3 ",this.age);
}
var age = 28;
//严格模式：抛错
//非严格模式：node下输出undefined(因为全局的age不会挂在global上)
//非严格模式:浏览器下输出28(因为全局的age不会挂在window上)
//严格模式抛出，因为this此时是undefined
info3();

/**
 * 箭头函数没有自己的this，继承外层上下文绑定的this
 * @type {{age: number, info: obj.info}}
 */
let objj = {
    age : 20,
    info: function () {
        return () => {
            console.log(this.age);
        }
    }
}
let person1 = {age : 28};
let infoq = objj.info();
infoq();
let info2q = objj.info.call(person1);
info2q();

/**
 * 箭头函数的this指向的是父级作用域的this，是通过查找作用域链来确定this
 * 的值，也就是说看的是上下文的this，指向的是定义它的对象，而不是使用时
 * 所在的对象；普通函数指向的是它的直接调用者.
 *
 * @type {{a: number, b: (function()), c: obj2.c}}
 */

let obj2 = {
    a : 1,
    b : () => {
        "use strict";
        /*
            箭头函数没有this，它的this是继承来的，默认指向定义它时候的对象，
            就是我们说的宿主对象,而不是执行它的对象.

            不可以被当做构造函数
         */
        console.log("obj2 "+this.a);
        console.log("箭头函数的 this ==> ",this);
        console.log(obj2 === this);
    },
    c: function () {
        console.log("obj2 "+this.a);
        console.log(obj2 === this);
    }
};
obj2.b();
obj2.c();


/**
 * 箭头函数的this指向定义时所在外层第一个普通函数,跟使用位置没有关系
 * 被继承的普通函数的this指向改变，箭头函数的this指向会跟着改变
 */
// let a, barObj = {msg:'bar 的this指向'},fooObj = {msg:'foo 的this指向'};
// bar.call(barObj);
// foo.call(fooObj);
// function foo() {
//     a();
//     console.log("foo 的this  ",this);
// }
// function bar() {
//     a = () => {
//         "use strict";
//         console.log(this, "this 指向定义的时候外层第一个普通函数");
//     };
//     console.log('bar this ==> ', this);
// }

// Node.js环境下 箭头函数没有this，它的this是继承来的，默认指向定义它时候的对象，
let aa = () => {
    "use strict";
    this.name = "Jack";
    console.log("箭头函数外层没有普通函数",this);
};
aa();

/*let fnObj = {msg:"尝试直接修改箭头函数的this指向"};
function foo() {
    a.call(fnObj);//fnObj is not defined
}*/

var obj3 = {
    a:1,
    print(){
        console.log('定时器中的 this ==>');
        console.log(this);
        console.log(this.a);
        setTimeout(function () {
            console.log("定时器中的 this ==>  ",this);
            console.log("定时器中的 this ==> ",this);
        },1000)
    }
};
obj3.print();


var Foo = () => {};
//1. 箭头函数不能用作构造器，和 new 一起用就会抛出错误。
//var foo = new Foo();// Foo is not a constructor
//2.箭头函数没有原型属性
console.log("Foo.prototype ",Foo.prototype);

function f1(arr) {
    console.log(arguments);
}
f1([1,2,3]); // [1,2,3]

let f2 = (arr) => {
    console.log(arguments);
}
f2([1,3,9]);

let f3 = (...arr) => {
    console.log(arr);
}
f3([1,4,5]); // [1,4,5]

/**
 * 在JavaScript 中，call、apply和bind是Function自带的三个方法，
 * 这三个方法的主要作用是改变函数中this的指向
 *
 * call、apply、bind方法的共同点和区别:
 * 三者都是用来改变函数的this对象的指向的；
 * 三者第一个参数都是this要指向的对象，也就是想指定的上下文
 * 三者都可以利用后续参数传参
 *
 * bind 是返回对应函数，便于稍后调用
 * apply、call则是立即调用
 *
 * call([thisObj[,arg1[, arg2[, [,.argN]]]]])
 *
 * call 方法可以用来代替另一个对象调用一个方法
 * call 方法可将一个函数的对象上下文从初始的上下文改变为由thisObj指定的新对象
 *
 * thisObj的取值：
 * 不传，或者传null、undefined,函数中的this指向Windows对象，node环境为global
 * 传递另一个函数的函数名，函数中的this指向这个函数的引用
 * 传递字符串、数值或布尔类型等基础类型，函数中的this指向其对应的包装对象
 * 传递一个对象，函数中的this指向这个对象
 */

function callA() {
    console.log("test call ",(this === global));
    if(!(this === global)){
        console.log('test call ==> ', this);
    }
}
function callB(){};

var callC = {name:'call'};
callA.call();
callA.call(null);
callA.call(undefined);
callA.call(1);
callA.call('');
callA.call(true);
callA.call(callB);
callA.call(callC);


function class1() {
    this.name = function () {
        console.log('我是class1内的方法',this);
        console.log(this.class_2);
    }
}
function class2() {
    class1.call(this);
    console.log('我是class2 ',this);
    this.class_2 = "继承";
}
var f = new class2();
f.name();

/**
 * 应用某一对象的一个方法，用另一个对象替换当前对象.
 * apply、call，作用完全一样，只是接受参数的方式不太一样
 * @param args1
 * @param args2
 */
function applyClass(args1, args2) {
    console.log("applyClass this ",this);
    this.name = function () {
        console.log(args1, args2);
    }
}
function applyClass2() {
    var args1 = "1";
    var args2 = "2";
    applyClass.apply(this, [args1, args2]);
    console.log('applyClass2 this ', this);
}

var applyC = new applyClass2();
applyC.name();


/**
 * 改变函数体内this的指向
 *
 * bind 方法的返回值是函数
 */
var bindBar = function () {
    console.log("bindBar this ==> ",(this === global));
    console.log("bindBar this ",this.xx);
};

var barFoo = {
    xx : 3
};
bindBar();
bindBar.bind(barFoo)();


/**
 * this  永远指向最后调用它的那个对象。
 *
 * @type {string}
 */
var name = "windowsName";
var ab = {
    name : "Cherry",
    fn:function () {
        console.log("this === ab ",(this === ab));//this是对象ab
        console.log(this.name);
    }
};
ab.fn();


/**
 * 普通函数和箭头函数的区别：

 1.箭头函数没有prototype(原型)，所以箭头函数本身没有this
 2.箭头函数的this在定义的时候继承自外层第一个普通函数的this。
 3.如果箭头函数外层没有普通函数，严格模式和非严格模式下它的this都会指向window(全局对象)
 4.箭头函数本身的this指向不能改变，但可以修改它要继承的对象的this。
 5.箭头函数的this指向全局，使用arguments会报未声明的错误。
 6.箭头函数的this指向普通函数时,它的arguments继承于该普通函数
 7.使用new调用箭头函数会报错，因为箭头函数没有constructor
 8.箭头函数不支持new.target
 9.箭头函数不支持重命名函数参数,普通函数的函数参数支持重命名
 10.箭头函数相对于普通函数语法更简洁优雅


 */

 console.log('-------------------',this);