
/**
 * 执行结果为undefined
 * 原因在于变量提升导致内层的tmp变量覆盖了外层的tmp变量
 */
var tmp = new Date();
function f(){
    console.log(tmp);
    if(false){
        var tmp = 'hello world';
    }
}
f();

/**
 * const 实际上保证的并不是值不得改变，而是变量指向的那个内存地址不得改动。
 * 对于简单类型的数据(数值、字符串、布尔值)而言，值就保存在变量指向的内存
 * 地址中，因此等同于常量。但对于复合数据类型(主要是对象和数组)而言，变量
 * 指向的内存地址保存的只是一个指针，const只能保证这个指针是固定的，至于它
 * 指向的数据结构是不可变的，这完全不可控制。
 */

 const foo = {};
 foo.prop = 123;
 console.log(foo);


 /**
  * 数组解构
  * 如果解构不成功，变量的值就等于undefined
  * */
 let [a, b, c] = [1, 2, 3];
console.log(a, b, c);

let [foo2, [[bar], baz]] = [1, [[2], 3]];
console.log(foo2, bar, baz);

let [ , , third] = ['foo', 'bar', 'baz'];
console.log('third ',third);

let [x, , y] = [1, 2, 3];
console.log("x, y ",x , y);

let [head, ...tail] = [1, 2, 3, 4];
console.log('head ',head, ' tail ',tail);

let [x1, y1, ...z1] = ['a'];
console.log('x1 ',x1,' y1 ',y1,' z1 ',z1);

/**
 * 不完全解构,即等号左边的模式，只匹配一部分的等号右边的数组
 */
let [x2, y2] = [1, 2, 3];
console.log('x2, y2',x2, y2);

/**
 * 如果等号右边不是数组(严格的说，不可遍历的结构) 将会报错
 */
//let [foo3] = 1; //1 is not iterable


/**
 * 对于Set结构，也可以使用数组的解构赋值
 */
let [x3, y3, z3] = new Set(['a', 'b', 'c']);
console.log('x3 ',x3);

/**
 *只要某种数据结构具有Iterator接口，都可以采用数组形式的解构赋值。
 */
function* fibs(){
    let a = 0;
    let b = 1;
    while(true){
        yield a;
        [a, b] = [b, a + b];
    }
}

let [first, second, third2, fourth, fifth, sixth] = fibs();
console.log('sixth ',sixth);

/**
 * Es6内部使用严格相等运算符(===),判断一个位置是否有值。只有当一个数组成员严格等于
 * undefined，默认值才会生效。
 */
let [x4 = 'abc'] = [undefined];
let [x5 = 'abc'] = [123];
let [x6 = 'efg'] = [];
console.log('x4 ',x4,' x5 ',x5,' x6 ',x6);

/**
 * 如果默认值是一表达式，那么这个表达式是惰性求值的，即只有在用到的时候才
 * 会求值
 */
function f2(){
    return 'aaa';
}
let [x7 = f2()] = [1];
console.log('x7 ',x7);

let [x8 = f2()] = [];
console.log('x8 ',x8);

let x9;
/**
 * 下面写法会报错,因为JavaScript引擎会将{x}理解成一个代码块，
 * 从而发生语法错误。只有不将大括号写在行首，避免JavaScript
 * 将其解释为代码块，才能解决这个问题。
 */
// {x9} = {x9: 1};
({x9} = {x9:1});
console.log('x9 ',x9);

/**
 * 字符串也可以解构赋值。
 */
const [a2, b2, c2, d2, e2] = 'hello';
console.log('a2 ',a2,' b2 ',b2);

/**
 * 解构赋值时，如果等号右边是数值和布尔值，则会先转为对象
 * 由于undefined和null无法转换为对象，所以对它们进行解构赋值
 * 都会报错
 */
let {toString: s} = 123;
console.log(s === Number.prototype.toString);

let {toString: s2} = true;
console.log(s2 === Boolean.prototype.toString);

console.log([[1, 2], [3, 4]].map(([a3, b3]) => a3 + b3));

function move({x10, y10 } = {x10 : 0, y10 : 0}){
    return [x10, y10];
}

console.log(move({x10: 3, y10: 8}));
console.log(move({x10: 3}));
console.log(move({}));
console.log(move());

const map = new Map();
console.log('map ',map);
map.set('first', 'hello');
map.set('second','world');
console.log('map ',map);//{ 'first' => 'hello', 'second' => 'world' 

for(let [key, value] of map){
    console.log("key "+ key +" is " + value);
}