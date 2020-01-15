/**
 * Created by NKDF on 2019/5/17.
 *
 * JavaScript 的一大特点：
 * 函数存在 [定义时上下文] 和 [运行时上下文] 以及 [上下文是可以改变的];
 *
 * apply、call、bind 三者都是用来改变函数的this对象的指向的
 * apply、call、bind 三者第一个参数都是this要指向的对象，也就是想指定的上下文
 * apply、call、bind 三者都可以利用后续参数传参
 * bind 是返回对应函数，便于稍后调用，apply、call 则是立即调用
 *
 * apply() 方法调用一个具有给定this值的函数，以及作为一个数组(或类似数组对象)提供参数。
 *
 */


var foo = {
    value : 1
}

function bar(){
    console.log(this.value);// 1
}

bar.call(foo);
/**
 * 1.call 改变了this的指向，指向到foo
 * 2.bar函数执行了
 */

var numbers = [5, 6, 2, 3, 7];
var max = Math.max.apply(null, numbers);
console.log('max ',max);
var min = Math.min.apply(null, numbers);
console.log('min ',min);

var array = ['a', 'b'];
var elements = [0, 1, 2];
array.push.apply(array, elements);
console.info(array);

/**
 * apply 和 call  都是为了改变某个函数运行时的上下文而存在的，换句话说，就是为了改变函数
 * 内部this的指向。
 */
function fruits() {

}

fruits.prototype = {
    color: "red",
    say : function () {
        console.log("My color is ",this.color);
    }
};

var apple = new fruits();
apple.say();

banana = {
    color: 'yellow'
}
apple.say.apply(banana);

/**
 * 传入多少个参数不确定，使用apply
 */
function log() {
    console.log.apply(console, arguments);
}
log(1);
log(1, 2);

/**
 * 这两个方法的用途是在特定的作用域中调用函数，实际上等于设置函数体内 this 对象的值
 * call(对象，参数1，参数2，...)
 * apple(对象，[数组]) 注：数组也可以是arguments
 * @param {*} num1 
 * @param {*} num2 
 */
function sum(num1, num2){
    return num1 + num2;
}

function callSum1(num1, num2){
    // 传入arguments对象
    return sum.apply(this, arguments);
}

function callSum2(num1, num2){
    // 传入数组
    return sum.apply(this, [num1, num2]);
}

//20
console.log(callSum1(10,10));
//40
console.log(callSum2(20,20));

/**
 * 在常见的单体模式中，通常会使用_this,that,self等保存this,
 * 这样我们可以在改变了上下文之后继续引用到它。
 * @type {{bar: number, eventBind: foo.eventBind}}
 */

var foo = {
    bar : 1,
    eventThat:function () {
        var that = this;
        setTimeout(function () {
            console.log('that.bar ',that.bar, 'this.bar ',this.bar);
        }, 1000)
    }
};

foo.eventThat();

var person = {
    name:'jack',
    age:24,
    sayHello:function (age) {
        console.log("this.name ",this.name);
        console.log("age ",age);
    }
};

var son = {
    name:'mary'
};

person.sayHello(16);
var boundFunc = person.sayHello.bind(son);
boundFunc(25);


var sum = function(x,y) {
    console.log("x ",x ," y ",y);
    return x + y
};

var succ = sum.bind(null, 1, 1); //让this指向null，其后的实参也会作为实参传入被绑定的函数sum，相当于将1绑定到参数x

console.log(succ(2, 3)); // => 3: 可以看到1绑定到了sum函数中的x

/**
 * bind() 方法所返回的函数length(形参数量)等于原函数的形参数量减去传入bind()方法
 * 中的实参数量,因为传入bind中的实参都会绑定到原函数的形参
 * @param a
 * @param b
 * @param c
 * @param d
 */
function func(a, b, c, d) {}
var after = func.bind(null, 1, 2, 3);
console.log("after.length ",after.length);

