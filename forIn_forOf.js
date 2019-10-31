
/**
 * for...of 遍历数组的时候使用;for...in 循环对象属性的时候
 * for...in 循环出的是key;for...of 循环出的是value
 * for...of 不能循环普通的对象,需要搭配Object.keys()使用
 */

let array = ['a', 123, {a:'1', b:'2'}];

array.name = 'demo';

//for...in
for(let index in array){
    console.log(`index ${index}, array[index] ${array[index]}`);
}

//for...of
for(let value of array){
    console.log(`value ${value}`);
}