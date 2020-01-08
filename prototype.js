/**
 * prototype 和 __proto__ 区别是什么？
 *
 * prototype是构造函数的属性。
 * __proto__ 是每个实例都有的属性，可以访问 [[prototype]] 属性。
 * 实例的__proto__ 与其构造函数的prototype指向的是同一个对象。
 *
 * JavaScript 中的函数之所以可以访问call()、apply()、bind()，就是因为
 * 函数本身是对象。而函数对象同样有[[Prototype]]属性并且关联到
 * Function.prototype对象，因此所有函数对象都可以通过委托调用这些默认
 * 方法。
 *
 * @param name
 * @constructor
 */
function Student(name) {
    this.name = name;
}

Student.prototype.setAge = function () {
    this.age = 20;
};
let student = new Student('jack');
console.log(student.__proto__);
console.log(Student.prototype);
console.log(student.setAge);
console.log(student.name);
console.log("Student.prototype === Jack.__proto__",(Student.prototype === student.__proto__));

function Person() {
    //构造函数
}
//Person.prototype 实例原型
Person.prototype.name = 'Kevin';
var person1 = new Person();
console.log('name ',person1.name);
//每一个JavaScript对象(除了null)都具有的一个属性，叫__proto__，这个属性会指向该对象的原型。
console.log(Person.prototype);
console.log(person1.__proto__);
console.log(person1.__proto__ === Person.prototype);
//每个原型都有一个constructor属性指向关联的构造函数
console.log(Person === Person.prototype.constructor);
//Object.getPrototypeOf 可以获取对象的原型
console.log("Object.getPrototypeOf(person1) ==> ",Object.getPrototypeOf(person1));

/**
 * 构造函数都有一个prototype属性，指向使用这个构造函数创建的对象实例的原型对象。
 * 原型对象中默认有一个constructor 属性，指回构造函数。
 */
console.log("Student.prototype.constructor === Student ",(Student.prototype.constructor === Student));

//1.student 的原型对象
console.log("student 的原型对象",(student.__proto__ === Student.prototype));
//2.Student.prototype 的原型对象
console.log("Student.prototype 的原型对象",(Student.prototype.__proto__ === Object.prototype));
//3.Object.prototype 的原型  Object.prototype 没有原型对象
console.log("Object.prototype 的原型",(Object.prototype.__proto__ === null));

/**
 * 函数对象的原型链
 * 函数对象的构造函数就是Function
 * 函数都是由Function原生构造函数创建的，所以函数的__proto__属性指向Function的prototype属性
 */
let fn = function () {};
//函数（包括原生构造函数）的原型为Function.prototype
console.log("fn.__proto__ === Function.prototype ",(fn.__proto__ === Function.prototype));
console.log("Object.__proto__ === Function.prototype ",(Object.__proto__ === Function.prototype));
//Function.prototype 也是一个普通对象，Function.prototype.__proto__ === Object.prototype
console.log("Function.prototype.__proto__ === Object.prototype ",Function.prototype.__proto__ === Object.prototype);
//特例
console.log("Function.__proto__ === Function.prototype ",Function.__proto__ === Function.prototype);

let arr = [];

/**
 * instanceof 操作符左边是一个对象，右边是一个构造函数
 * 在左边对象的原型链上查找，直到找到右边构造函数的prototype属性返回true，或者查找到顶层null返回false
 */
console.log("fn instanceof Function ",fn instanceof Function);
console.log("arr instanceof Array ",arr instanceof Array);

console.log("fn instanceof Object ",fn instanceof Object);
console.log("arr instanceof Object ",arr instanceof Object);

/**
 * 所有的函数默认都会有一个名为prototype的公有并且不可枚举的属性，它会指向另一个对象，这个对象称为Foo
 * 的原型。
 * @constructor
 */
function Foo() {
    //...
}
console.log(Foo.prototype);//Foo {}

/**
 * new 会劫持所有普通函数并且用构造对象的形式来调用它
 * @type {Foo}
 */
var a = new Foo();
console.log(Object.getPrototypeOf(a) === Foo.prototype);
/*
    Foo.prototype默认有一个公有并且不可枚举的属性.constructor,这个属性引用的是对象关联的函数.
 */
console.log(Foo.prototype.constructor === Foo);
/**
 * a.constructor 只是通过默认的[[prototype]]委托指向Foo
 *
 * .constructor 并不是一个不可变属性。它是不可枚举的，但是它的值是可以写的。
 */
console.log(a.constructor === Foo);


/**
 * p是构造函数P的实例对象，但是p自身没有constructor属性,该属性其实是读取原型链上的
 * P.prototype.constructor属性
 * @constructor
 */
function P() {}
var p = new P();
console.log("p.constructor === P ",p.constructor === P);
console.log("p.constructor === P.prototype.constructor ",p.constructor === P.prototype.constructor);
console.log(p.hasOwnProperty('constructor'));

function Foo2() {

}
Foo2.prototype = {};//创建一个新原型对象
var a2 = new Foo2();

if(a2 instanceof Foo2){
    console.log("a2 是 Foo2 的一个实例");
    console.log(Foo2.prototype);
    console.log(a2.__proto__);
}


console.log(a2.constructor === Foo2);//false
console.log(a2.constructor === Object);//true

Object.defineProperty(Foo2.prototype, "constructor", {
    enumerable:false,
    writable:true,
    configurable:true,
    value:Foo2
});
console.log(a2.constructor === Foo2);//false

/*
    检查一个实例(JavaScript中对象)的继承祖先(JavaScript的委托关联)通常被称为内省(或者反射)

    isPrototypeOf() : 在a2的整条[[Prototype]] 链中是否出现过 Foo2.prototype
 */
console.log(Foo2.prototype.isPrototypeOf(a2));


var anotherObject = {
    cool : function () {
        console.log("anotherObject cool");
    }
};

//myObject 通过Object.create()创建,它的[[Prototype]]委托了Task对象
var myObject = Object.create(anotherObject);
myObject.doCool = function () {
    console.log("this === myObject ",(this === myObject));
    this.cool();//内部委托  通过[[Prototype]] 委托到 anotherObject.cool()
};
myObject.doCool();
