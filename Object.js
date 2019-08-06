
/**
 * ES6 允许直接写入变量和函数,作为对象的属性和方法
 */
const foo = 'bar';
const baz = {foo};
console.log(baz);//{ foo: 'bar' }

function f(x, y){
    return {x, y};
}
console.log(f(1, 2));