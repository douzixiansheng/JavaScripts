console.log('> 展开运算符 ...');
console.log(...[1, 2, 3]);

//ES5
console.log('> ES5 获取最大元素==========>');
console.log(Math.max.apply(null, [14, 3, 77]));
//ES6
console.log('> ES6 获取最大元素 ============>');
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
console.log('> 扩展运算符可以将字符串转换为真正的数组')
console.log([...'hello']);

/**
 * 扩展运算符内部调用的是数据结构Iterator接口，因此只要有Iterator接口的对象
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
 * copyWithin(target, start, end)
 * 会在当前数组内部将指定位置的成员复制到其他位置，然后返回当前数组
 * 这个方法会修改当前数组
 * target	必需。复制到指定目标索引位置。
 * start	可选。元素复制的起始位置。
 * end	    可选。停止复制的索引位置 (默认为 array.length)。如果为负值，表示倒数。
 */
var copyArr = [1, 2, 3, 4, 5, 6, 7];
copyArr.copyWithin(0, 3);
console.log('copyArr ',copyArr);

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
console.log(`JS includes() ============>`)
console.log([1, 2, 3].includes(2));//true
console.log([1, 2, 3].includes(5));//false
console.log(["1", 2, "a"].includes(1));//false
console.log('abc'.includes('ab'));//true

/**
 * indexOf 内部使用严格判断(===)，会导致对NaN的误判
 *
 */
console.log('[NaN].indexOf(NaN) ',[NaN].indexOf(NaN));// -1
console.log([NaN].includes(NaN));// true

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
console.log([...['a', , 'c']]); // [ 'a', undefined, 'c' ]

for(let i of [ , , ]){
    console.log(i);
}

console.log(`JS map() 语法 =========>`);
console.log('> map 有返回值，返回一个新的数组，每个元素为调用func的结果')
let m_list = [1, 4, 9, 16];
const m_list2 = m_list.map(x => x * 2);
console.log('> m_list ', m_list, ' m_list2 ', m_list2);

console.log(`JS some() 语法 =========>`);
console.log('> some 当内部return true时跳出整个循环');
m_list.some((value, index) => {
    if(value == 4){
        return true;
    }
    console.log('> index ',index ,' value ', value);
});
console.log(`JS map(Number) ========> `);
let m_list_string = ['1', '2', '3', '4'];
console.log(m_list_string, m_list_string.map(Number));

console.log(`JS every() 语法 ------------------>`);
console.log('every()方法，遍历数组每一项，若全部为true，则返回true');
let m_arr1 = [1, 1, 1, 1, 1];
let m_arr2 = [1, 2, 3, 4, 5];
let res3 = m_arr1.every(item => {
    return item == 1;
});
let res4 = m_arr2.every(item => {
    return item == 1;
})
console.log(res3, res4);

console.log(m_arr2.filter(element => {
    return element == 1;
}));
console.log('> some 和 filter的区别 ==>');
console.log('some 方法返回的是boolean值,可用于检查数组中是否有某对象');
console.log('filter 方法返回的是一个新数组,可用于过滤数组中的对象');

console.log('> some 和 every 的区别');
console.log('some 一直在找符合条件的值，一旦找到，则不会继续迭代下去');
console.log('every 从迭代开始，一旦有一个不符合条件，则不会继续迭代下去');

console.log("----------------------->");
console.log("----------------------->");
console.log('扩展运算符、copyWithin、find、findIndex、fill、entries、includes、indexOf、map、some、every、filter');