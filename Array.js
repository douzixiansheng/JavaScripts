console.log(...[1, 2, 3]);

//ES5
console.log(Math.max.apply(null, [14, 3, 77]));
//ES6
console.log(Math.max(...[14, 3, 77]));

//ES5
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];

Array.prototype.push.apply(arr1, arr2);
console.log(arr1);
console.log(arr2);

//ES6
var arr3 = [1, 2, 3];
var arr4 = [4, 5, 6];
arr3.push(...arr4);
console.log(arr3, arr4);

//合并数组
var newArr = [...arr3, ...arr4];
console.log(newArr);

const [first, ...rest] = [1, 2, 3, 4, 5];
console.log(first, rest);

//扩展运算符可以将字符串转换为真正的数组
console.log([...'hello']);

/**
 * 扩展运算符内部调用的是数据结构Interator接口，因此只要有Iterator接口的对象
 * 都可以使用扩展运算符
 */

let map = new Map([
    [1, 'one'],
    [2, 'two'],
    [3, 'three']
]);

console.log([...map.keys()]);
console.log([...map.values()]);

//Array.from()可以将各种值转为真正的数组，并且提供map功能。
console.log(Array.from({length:2}, () => 'jack'));

/**
 * Array.of() 用于将一组值转换为数组
 * 不存在由于参数不同而导致重载
 */
console.log(Array());
console.log(Array(3));
console.log(Array(3, 4, 5));

console.log(Array.of());
console.log(Array.of(3));
console.log(Array.of(3, 4, 5));

/**
 * copyWithin()
 * 会在当前数组内部将指定位置的成员复制到其他位置，然后返回当前数组
 * 这个方法会修改当前数组
 */
var copyArr = [1, 2, 3, 4, 5];
copyArr.copyWithin(0, 3);
console.log(copyArr);

/**
 * find && findIndex
 * find 方法用于找出第一个符合条件的数组成员，它的参数是回调函数,没有符合条件的返回undefined
 * 
 * findIndex 返回第一符合条件的数组成员的位置，没符合条件的返回-1
 */

var _find = copyArr.find(function(value, index, arr){
    return value > 9;
});
console.log('find ',_find);

var _findIndex = copyArr.findIndex(function (value, index, arr){
    return value > 9;
});

console.log('findIndex ',_findIndex);

/**
 * fill 填充一个数组
 */

console.log([1].fill(0));
/**
 * entries() 对键值对遍历
 * keys() 对键名遍历
 * values() 对键值遍历
 */

for(let [index, elem] of ['a', 'b'].entries()){
    console.log(index, elem);
}

/**
 * includes  返回一个布尔值，表示某个数组是否包含给定的值
 */
console.log([1, 2, 3].includes(2));
console.log([1, 2, 3].includes(5));

/**
 * indexOf 内部使用严格判断(===)，会导致对NaN的误判
 * 
 */
console.log([NaN].indexOf(NaN));
console.log([NaN].includes(NaN));

//0 号位置有值 返回true
console.log(0 in [undefined, undefined, undefined]);
//0 号位置没有值，返回false
console.log(0 in [ , , ]);

/**
 * ES6 明确规定将数组的空位转换为undefined
 * 扩展运算符(...) 也会将空位转换为undefined
 * copyWithin() 会连空位一起复制
 * fill() 会将空位视为正常的数组位置
 * for ... of  循环也会遍历空位
 * entries()、keys()、values()、find()、findIndex() 会将空位处理为undefined
 *  */
console.log([...['a', , 'c']]);

for(let i of [ , , ]){
    console.log(i);
}