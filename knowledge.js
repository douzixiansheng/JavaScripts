/**
 * Created by NKDF on 2019/4/19.
 */
//Node.js 运行机制   http://www.ruanyifeng.com/blog/2014/10/event-loop.html
//Promise 和 co的原理实现  https://segmentfault.com/a/1190000010159031
//redis 缓存与持久化  https://cloud.tencent.com/developer/article/1116327


/**
 == 和 === 有什么区别？
 === 不需要进行类型转换，只有类型相同并且值相等时，才返回 true.
 == 如果两者类型不同，首先需要进行类型转换。具体流程如下:

 首先判断两者类型是否相同，如果相等，判断值是否相等.
 如果类型不同，进行类型转换
 判断比较的是否是 null 或者是 undefined, 如果是, 返回 true .
 判断两者类型是否为 string 和 number, 如果是, 将字符串转换成 number
 判断其中一方是否为 boolean, 如果是, 将 boolean 转为 number 再进行判断
 判断其中一方是否为 object 且另一方为 string、number 或者 symbol , 如果是, 将 object 转为原始类型再进行判断

 */

/**
 * 思考: [] == ![]
 我们来分析一下: [] == ![] 是true还是false？

 首先，我们需要知道 ! 优先级是高于 == (更多运算符优先级可查看: 运算符优先级)
 ![] 引用类型转换成布尔值都是true,因此![]的是false
 根据上面的比较步骤中的第五条，其中一方是 boolean，将 boolean 转为 number 再进行判断，false转换成 number，对应的值是 0.
 根据上面比较步骤中的第六条，有一方是 number，那么将object也转换成Number,空数组转换成数字，对应的值是0.(空数组转换成数字，对应的值是0，如果数组中只有一个数字，那么转成number就是这个数字，其它情况，均为NaN)
 0 == 0; 为true
 */
console.log("[] == ![] ",[] == ![]);//true
console.log("![] ",![]);//false

/*
* 7. ES6中的class和ES5的类有什么区别？

 ES6 class 内部所有定义的方法都是不可枚举的;
 ES6 class 必须使用 new 调用;
 ES6 class 不存在变量提升;
 ES6 class 默认即是严格模式;
 ES6 class 子类必须在父类的构造函数中调用super()，这样才有this对象;ES5中类继承的关系是相反的，
 先有子类的this，然后用父类的方法应用在this上。


 9. let、const 以及 var 的区别是什么？

 let 和 const 定义的变量不会出现变量提升，而 var 定义的变量会提升。
 let 和 const 是JS中的块级作用域
 let 和 const 不允许重复声明(会抛出错误)
 let 和 const 定义的变量在定义语句之前，如果使用会抛出错误(形成了暂时性死区)，而 var 不会。
 const 声明一个只读的常量。一旦声明，常量的值就不能改变(如果声明是一个对象，那么不能改变的是对象的引用地址)


 10. 在JS中什么是变量提升？什么是暂时性死区？
 变量提升就是变量在声明之前就可以使用，值为undefined。
 在代码块内，使用 let/const 命令声明变量之前，该变量都是不可用的(会抛出错误)。
 这在语法上，称为“暂时性死区”。暂时性死区也意味着 typeof 不再是一个百分百安全的操作。
 暂时性死区的本质就是，只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，
 只有等到声明变量的那一行代码出现，才可以获取和使用该变量。


 11. 如何正确的判断this? 箭头函数的this是什么？
 this的绑定规则有四种：默认绑定，隐式绑定，显式绑定，new绑定.

 函数是否在 new 中调用(new绑定)，如果是，那么 this 绑定的是新创建的对象。
 函数是否通过 call,apply 调用，或者使用了 bind (即硬绑定)，如果是，那么this绑定的就是指定的对象。
 函数是否在某个上下文对象中调用(隐式绑定)，如果是的话，this 绑定的是那个上下文对象。一般是 obj.foo()
 如果以上都不是，那么使用默认绑定。如果在严格模式下，则绑定到 undefined，否则绑定到全局对象。
 如果把 null 或者 undefined 作为 this 的绑定对象传入 call、apply 或者 bind, 这些值在调用时会被忽略，实际应用的是默认绑定规则。
 箭头函数没有自己的 this, 它的this继承于上一层代码块的this。

 13. 谈谈你对JS执行上下文栈和作用域链的理解。
 执行上下文就是当前 JavaScript 代码被解析和执行时所在环境, JS执行上下文栈可以认为是一个存储函数调用的栈结构，遵循先进后出的原则。

 JavaScript执行在单线程上，所有的代码都是排队执行。
 一开始浏览器执行全局的代码时，首先创建全局的执行上下文，压入执行栈的顶部。
 每当进入一个函数的执行就会创建函数的执行上下文，并且把它压入执行栈的顶部。当前函数执行-完成后，当前函数的执行上下文出栈，并等待垃圾回收。
 浏览器的JS执行引擎总是访问栈顶的执行上下文。
 全局上下文只有唯一的一个，它在浏览器关闭时出栈。

 作用域链: 无论是 LHS 还是 RHS 查询，都会在当前的作用域开始查找，如果没有找到，就会向上级作用域继续查找目标标识符，每次上升一个作用域，一直到全局作用域为止。
* */

/**
 * new的原理是什么？通过new的方式创建对象和通过字面量创建有什么区别？
 *
 * 创建一个新对象。并将其__proto__属性指向构造函数的prototype属性
 * 这个新对象会被执行[[原型]]连接。
 * 将构造函数的作用域赋值给新对象，即this指向这个新对象.
 * 如果函数没有返回其他对象，那么new表达式中的函数调用会自动返回这个新对象。
 *
 * 字面量创建对象，不会调用 Object构造函数, 简洁且性能更好;
 * new Object() 方式创建对象本质上是方法调用，涉及到在proto链中遍历该方法，
 * 当找到该方法后，又会生产方法调用必须的 堆栈信息，方法调用结束后，还要释放该堆栈，性能不如字面量的方式。
 * 通过对象字面量定义对象时，不会调用Object构造函数。
 *
 *
 * 谈谈你对原型的理解？
 *
 * 在 JavaScript 中，每当定义一个对象（函数也是对象）时候，
 * 对象中都会包含一些预定义的属性。其中每个函数对象都有一个prototype 属性，
 * 这个属性指向函数的原型对象。使用原型对象的好处是所有对象实例共享它所包含的属性和方法。
 *
 *
 * 什么是原型链？【原型链解决的是什么问题？】
 * 原型链解决的主要是继承问题。
 * 每个对象拥有一个原型对象，通过 proto (读音: dunder proto) 指针指向其原型对象，
 * 并从中继承方法和属性，同时原型对象也可能拥有原型，这样一层一层，
 * 最终指向 null(Object.proptotype.__proto__ 指向的是null)。
 * 这种关系被称为原型链 (prototype chain)，通过原型链一个对象可以拥有定义在其他对象中的属性和方法。
 * 构造函数 Parent、Parent.prototype 和 实例 p 的关系如下:(p.__proto__ === Parent.prototype)
 *
 * Array 类型、Function类型、Object类型、Date类型、RegExp类型 都是引用类型.
 * 引用类型皆对象，所以用用类型都有__proto__属性，都指向它们各自的原型对象。
 *
 * 每个函数拥有prototype属性，指向使用new操作符和该函数创建的对象实例的原型对象。
 * @param func
 * @returns {*}
 * @private
 */

function _new(func) {
    let target = {};
    target.__proto__ = func.prototype;
    let res = func.call(target);
    if(typeof(res) == "object" || typeof(res) == "function"){
        return res;
    }
    return target;
}



//取数组最大值
//ES5
console.log(Math.max.apply(null, [14, 3, 77, 30]));
//ES6
console.log(Math.max(...[14, 3, 77, 30]));


//promise 有几种状态, Promise 有什么优缺点 ?
//promise有三种状态: fulfilled, rejected, pending.
/**
 * Promise 的优点:
 * 一旦状态改变，就不会再变，任何时候都可以得到这个结果
 * 可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数
 *
 * Promise 的缺点:
 * 无法取消 Promise
 * 当处于pending状态时，无法得知目前进展到哪一个阶段
 *
 * Promise的构造函数是同步执行的。then 中的方法是异步执行的。
 */


/*
 Promise和setTimeout的区别 ?
 Promise 是微任务，setTimeout 是宏任务，同一个事件循环中，promise.then总是先于 setTimeout 执行。
 */


/**
 * 实现双向绑定 Proxy 与 Object.defineProperty 相比优劣如何?
 *
 * Object.definedProperty 的作用是劫持一个对象的属性，劫持属性的getter和setter方法，
 * 在对象的属性发生变化时进行特定的操作。而Proxy劫持的是整个对象。
 *
 * Object.defineProperty 定义出阿里的属性，默认是不可枚举，不可更改，不可配置(无法delete)
 * @type {{}}
 */
let obj = {};
let temp = 'Yvette';
obj.name = "修改前";
Object.defineProperty(obj, 'name', {
    get(){
        "use strict";
        console.log('读取成功');
        return temp;
    },
    set(value){
        "use strict";
        console.log('设置成功');
        temp = value;
    }
});
obj.name = '修改后';
console.log(obj.name);


/**
 * Proxy 劫持整个对象，读取对象中的属性或者修改属性值，那么就会被劫持。
 * 复杂数据类型，监控的是引用地址，而不是值，如果引用地址没有改变，那么
 * 不会触发set。
 * @type {{name: string, hobbits: string[], info: {age: number, job: string}}}
 */

let obj2 = {name:'Yvette',hobbits:['travel', 'reading'], info:{age:21,job:'engineer'}};
let p = new Proxy(obj2, {
    get(target, key){
        "use strict";
        console.log('Proxy 读取成功');
        return Reflect.get(target, key);
    },
    set(target, key, value){
        "use strict";
        if(key === 'length') return true;
        console.log("Proxy 设置成功");
        return Reflect.set(target, key, value);
    }
});

p.name = 20;
p.age = 20;
p.hobbits.push('photography');
p.info.age = 18;

/**
 * Object.definedProperty 可以将数组的索引作为属性进行劫持，但是仅支持直接对array[i]
 * 进行操作，不支持数组的API
 * @type {Array}
 */
let array = [];
Object.defineProperty(array, '0', {
    get(){
        "use strict";
        console.log("读取成功");
        return temp;
    },
    set(value){
        "use strict";
        console.log("设置成功");
        temp = value;
    }
});
console.log(array);
array[0] = 10;
console.log(array);//[ <1 empty item> ]
array.push(11);
console.log(array);//[ <1 empty item>, 11 ]

/**
 * Proxy 可以监听数组的变化，支持各种API
 * @type {string[]}
 */
let hobbits = ['travel', 'reading'];
let p2 = new Proxy(hobbits, {
    get(target, key){
        "use strict";
        console.log(key)
        if(key === 'length') return true;
        console.log("读取成功");
        return Reflect.get(target, key);
    },
    set(target, key, value){
        "use strict";
        if(key === 'length') return true;
        console.log("设置成功");
        return Reflect.set([target, key, value]);
    }
});

p2.slice(0, 1);
p2.push('photography');
console.log(hobbits);
p2.slice(1);


/**
 * JavaScript 采用  词法作用域(静态作用域)
 * 函数的作用域在函数定义的时候就确定了，也就是说函数的作用域取决于函数在哪里定义，
 * 和函数在哪里调用并无关系。
 *
 * 任意的JavaScript 可执行代码(包括函数)被执行时，会创建新的指向上下文及其词法环境.
 *
 * 1.函数声明时会被赋予一个内置属性[[Environment]],指向函数声明时所在的执行上下文的词
 * 法环境.
 * 2.函数无论在何时何地调用，创建的词法环境的外部词法环境引用outer都指向函数的内置属性
 * [[Environment]]
 *
 *
 * @type {string}
 */
var scope = 'global scope';

function checkscope() {
    var scope = 'local scope';

    /**
     * 函数f 定义在函数checkscope内部，所以函数f无论在函数checkscope的内部调用，还是作为
     * 返回值返回后的外部调用，其词法环境的外部引用永远是函数checkscope运行时创建的词法环
     * 境，变量scope也只是往外寻找一层词法环境，在函数checkscope运行时创建的词法环境中找到，
     * 值为’local scope'，不用再往外查找.
     * @returns {string}
     */
    function f() {
        return scope;
    }
    return f();
}
console.log(checkscope());


/**
 * 当函数可以记住并访问所在的词法作用域，即使函数是在当前词法作用域之外执行，
 * 这时就产生了闭包。
 *
 *
 * @returns {bb_bar}
 */
function bb_foo() {
    var bb_a = 2;
    function bb_bar() {
        console.log("bb a ",bb_a);
    }
    return bb_bar;
}
var baz = bb_foo();
baz();// 这就是闭包的效果

/**
 * 即使setTimeout(...,0) 所有的回调函数依然是在循环结束之后才会被执行。
 */
for(var q = 1; q <= 5; q++){
    setTimeout(function () {
        console.log("循环中的 定时器  q ==> ",q);
    }, q * 1000);
}

/**
 * 在迭代内部使用IIFE 会为每个迭代都生成一个新的作用域，使得延迟函数的回调可以将新的作用域
 * 封闭在每个迭代内部，每个迭代中都会含有一个具有正确值的变量供我们访问。
 */
for(var q2 = 1; q2 <= 5; q2++){
    (function (j) {
        setTimeout(function () {
            console.log("立即执行函数中的定时器 q2 ==> ",j);
        },j * 1000)
    })(q2);
}

for(let i = 1; i <= 5; i++){
    setTimeout(function () {
        console.log('for循环头部的let i => ',i);
    },i * 1000);
}

/**
 * 词法作用域
 *
 * 作用域查找会在第一个匹配到的标识符时停止。
 * 在多层的嵌套作用域中可以定义同名的标识符，这叫做"遮蔽效应"
 * @param a
 */
function foo(a) {
    var b = a * 2;
    function bar (c) {
        console.log("a, b, c ",a,b,c);
    }
    bar(b * 3);
}
foo(2);

/**
 * 欺骗词法作用域  : eval() 和 with
 * JavaScript 中的eval()函数可以接受一个字符串为参数，并将其中的内容视为
 * 好像在书写时就存在于程序中这个位置的代码。
 * @param str
 * @param a
 */
function foo_eval(str, a) {
    /**
     * 在严格模式中，eval(..) 在运行时有其自己的词法作用域，意味着其中的
     * 声明无法修改所在的作用域.
     */
    //"use strict";
    eval(str);//欺骗
    console.log("a, b", a, b);
}
var b = 2;
foo_eval("var b = 3;", 1);


/**
 * 包装函数以(function...开始，函数会被当作函数表达式来处理。
 * 立即执行函数表达式,第一个()将函数变成表达式，第二个()执行函数
 * @type {number}
 */
var tempa = 2;
(function foo() {
    var tempa = 3;
    console.log(tempa);
})();
console.log(tempa);

var tempb = 2;
(function IIFE(global) {
    var tempb = 3;
    console.log("tempb", tempb);
    console.log(global);
})(tempb);
console.log(tempb);


{
    let kk = 2;
    console.log("kk ",kk);
}
//console.log(kk);  //kk is not defined




