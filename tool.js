console.log(`--------数组的操作`);
let array = [1, 2, 3, 4, 5];
//for 循环
for (let i = 0; i < array.length; i++) {
    console.log(i, array[i]);
}

//forEach
console.log('------------------forEach')
array.forEach((v) => console.log(v));

console.log('------------------...运算符')
console.log([...array]);

console.log('------------------ map循环');
array.map((value, index) => console.log(index, value));