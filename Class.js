class Person {
    //构造方法，用来接收参数,通过new命令生成对象实例时,自动调用该方法
    //constructor 方法默认返回实例对象this，也可以指定constructor
    //方法返回一个全新的对象，让返回的实例对象不是该类的实例
    constructor(name, age) {
        console.log('啦啦啦，今天天气晴朗');
        this.name = name;
        this.age = age;
    }
    say() {
        return this.name + ' ' + this.age;
    }
}

//Object.assign 为对象动态增加方法
Object.assign(Person.prototype, {
    getName: function () {
        return this.name;
    },
    getAge: function () {
        return this.age;
    }
})

let obj = new Person('Tom', 12);
console.log(obj.say());

console.log(obj.getName());
console.log(typeof Person);
console.log(Person === Person.prototype.constructor);

let obj2 = new Person('Marry', 12);
//obj1 和 obj2 都是Person的实例。
//它们的__proto__都指向Person的prototype
console.log(Person.prototype);
console.log(obj.__proto__);
console.log(obj2.__proto__);



class Animal {
    constructor(name) {
        this.speed = 0;
        this.name = name;
    }
    run(speed) {
        this.speed += speed;
        console.log(`${this.name} runs with speed ${this.speed}`);
    }
    stop() {
        this.speed = 0;
        console.log(`${this.name} stopped.`);
    }

    static compare(animalA, animalB){
        return animalA.speed - animalB.speed;
    }
}

//基于原型继承
class Rabbit extends Animal {
    hide() {
        console.log(`${this.name} hides`);
    }
    //在Rabbit中指定自己的stop会优先使用
    // stop(){
    //     console.log(`Rabbit use`);
    // }

    //不完全替代父方法，而是在父方法的基础上调整或者扩展功能
    stop() {
        super.stop();//super 仅在constructor中使用
        console.log(`调整及扩展`);
    }
}

let rabbit = new Rabbit('White Rabbit');
rabbit.run(5);
rabbit.stop();
rabbit.hide();

class Pig extends Animal {
    stop() {
        //箭头函数没有super
        setTimeout(() => super.stop(), 1000);
    }
}

let pig = new Pig('Black Pig');
pig.run(6);
pig.stop();

class Dog extends Animal {
    constructor (name, earLength){
        //当一个普通的构造函数运行时，它会创建一个空对象作为this，然后继续运行
        //当派生的构造函数运行时，与上面说的不同，指望父构造函数来完成这项工作
        //所以必须调用super，否则具有this的对象将不被创建，并报错
        super(name);
        this.speed = 0;
        this.earLength = earLength;
    }
}
let dog = new Dog('Yellow Dog', 10);
dog.run(7);