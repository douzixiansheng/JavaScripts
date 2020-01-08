
/**
 * 参数默认值可以与解构赋值的默认值结合起来使用
 * @param {} param0 
 */
function foo({x, y = 5}){
    console.log(x, y);
}
foo({});
foo({x:1});
foo({x:1, y:2});

//函数参数的默认值是空对象，但是设置了对象解构赋值的默认值
function m1({x = 0, y = 0} = {}){
    return [x, y];
}

//函数参数的默认值是一个具体属性的对象，但是没有设置对象解构赋值的默认值
//下面是为函数m2的参数指定默认值，而不是为变量x和y指定默认值
function m2({x, y} = {x: 0, y: 0}){
    return [x, y];
}

console.log('---- 函数没有参数的情况')
console.log(m1());
console.log(m2());
console.log('---- x和y 都有值的情况');
console.log(m1({x: 3, y: 8}));
console.log(m2({x: 3, y: 8}));
console.log('---- x 有值, y 无值的情况');
console.log(m1({x:2}));
console.log(m2({x:2}));
console.log('---- x 和 y 都无值的情况')
console.log(m1({}));
console.log(m2({}));

console.log({x, y} = {x: 0, y: 0});
console.log({x = 0, y = 0} = {});

function m3(x = 1, y){
    console.log(x, y);
}

function m4(x, y = 1){
    console.log(x, y);
}

m3();
m4();

//如果非尾部的参数设置了默认值，实际上这个参数是无法省略的
//m3(,1) 报错

/**
 * 函数的length属性将返回没有指定默认值的参数个数
 */
console.log((function(a) {}).length);
console.log((function(a = 1) {}).length);

console.log((function(...args){}).length);

//如果设置了默认值的参数不是尾参数，那么length属性也不在计入后面的参数
console.log((function(a = 1, b, c){}).length);
console.log((function(a, b = 1, c){}).length);


/**
 * 一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域。
 */
let foo2 = 'outer';
function bar(func = x => foo2){
    let foo2 = 'inner';
    console.log(func());
}

bar();

//等同于 func2 = x => 'xxx'
function func2(x) {
    return 'xxx';
}
console.log(func2())

var x = 1;
function foo3(x, y = function() {x = 2;}){
    var x = 3;
    y();
    console.log(x);
}
foo3();

//rest 参数,形式 “...变量名”
//rest 参数之后不能再有其他参数(即只能是最后一个参数),否则会报错
function add(...values){
    let sum = 0;

    for(let val of values){
        sum += Number.parseInt(val);
    }
    return sum;
}
console.log(add(1, 2, 3));

/**
 * ES2016 规定，只要函数参数使用了默认值、解构赋值或者扩展运算符，
 * 那么函数内部就不能显示设定为严格模式，否则就会报错
 */


 /**
  * 函数的name属性返回该函数的函数名
  */
 console.log(add.name);
 //Function 构造函数返回的函数实例，name属性的值为anonymous
 console.log((new Function).name);

 //bind 返回的函数，name属性值会加上bound前缀
 function foo4(){};
 console.log(foo4.bind({}).name);

 /**
  * 箭头函数：
  * 1.函数体内的this对象加上定义时所在的对象，而不是使用时所在的对象
  * 2.不可以当做构造函数。也就是说，不可以使用new命令，否则会抛出一个异常
  * 3.不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用rest参数代替
  * 4.不可以使用yield命令，因此箭头函数不能用作Generator函数
  * 
  * 
  * this 指向的固定化并不是因为箭头函数内部有绑定this的机制，实际原因是箭头函数根本
  * 没有自己的this，导致内部的this就是外层代码块的this。正是因为它没有this，所以不
  * 能用作构造函数
  * 
  * 由于箭头函数没有自己的this，不能用call()、apply()、bind()这三个方法去改变this的
  * 指向
  */

  function foo5(){
      setTimeout(() => {
          console.log('id : ',this.id);
      }, 100);
  }
  var id = 21;
  foo5.call({id:42});

  function foo6(){
      setTimeout(function(){
          console.log("id2: ",this.id);
      }, 100);
  };

  foo6.call({id:43});

  
  function curring(fn, n){
      console.log("n ",n, fn);
      return function (m){
          console.log('m ',m);
          console.log(this == global);
          return fn.call(this, m, n);
      }
  }

  function tailFactorial (n, total){
      console.log('------xxx');
    if(n === 1) return total;
    return tailFactorial(n - 1, n * total);
  }

  const factorial = curring(tailFactorial, 1);
  console.log(factorial(5));