//类Lecture的构造器

function Lecture(name, teacher) {
    this.name = name;
    this.teacher = teacher;
}

//类Lecture的方法
Lecture.prototype.display = function() {
    return this.teacher + " is teaching " + this.name;
};

//类Schedule的构造器
function Schedule(lectures) {
    this.lectures = lectures;
}

Schedule.prototype.display = function() {
    let str = "";
    for(let i = 0; i < this.lectures.length;i++){
        str += this.lectures[i].display() + "\n";
    }
    return str;
}

var mySchedule = new Schedule([
    new Lecture('Gym', 'Mr.Smith'),
    new Lecture('Math', 'Mrs.Jones'),
    new Lecture('English', 'TBD')
]);

console.log(mySchedule.display());


//设置obj为一个空对象
let obj = new Object();
//objRef 现在引用了别的对象
let objRef = obj;
//修改原始对象的值
obj.onePreperty = true;
console.log(objRef.onePreperty === obj.onePreperty);

//创建一个数组
let items = new Array('one', 'two', 'three');
let itemRef = items;
items.push('four');
console.log(itemRef.length === items.length);

items = new Array('new', 'array');

console.log(itemRef);
console.log(items);

let str = "test";
let strRef = str;
str += 'ing';
console.log(str, strRef);


//JavaScript的函数重载
function sendMessage(msg, obj) {
    if(arguments.length == 2)
        obj.handleMsg(msg);
    else
        console.log(msg);
};

sendMessage('Hello World');
sendMessage('How are you ?', {
    handleMsg: function(msg) {
        console.log("This is a coustom message: "+msg);
    }
});

let num = '123';
if(num.constructor === String){
    console.log("con ",num.constructor)
}

//作用域

console.log(foo);
//设置一个全局变量 foo
var foo = 'test';
if(true){
    //设置foo 为'new test'
    //注意: 这仍然是全局作用域中
    var foo = 'new test';
}
console.log(foo);

function test(){
    var foo = 'old test';
}
test();
console.log(foo);

//隐式全局变量声明
function test2(){
    foo = "test";
}
test2();
console.log(foo);

//上下文
var obj2 = {
    yes: function(){
        console.log(this);
        this.val = true;
    }
    ,
    no: function(){
        this.val = false;
    }
}
console.log("obj2.val ",obj2.val);
obj2.yes();
console.log('obj2.val ',obj2.val);
global.no = obj2.no;
global.no();
console.log('obj2.val ',obj2.val);
console.log('global.val ',global.val);