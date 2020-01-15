/**
 * 因为Array.fill()如果填充类型为对象，则为浅拷贝。数组内的3个对象指向的都是同一个内存地址
 */

const squares = Array(3).fill(Array(3).fill(null));
squares[0][0] = 1;
console.log(squares);//[ [ 1, null, null ], [ 1, null, null ], [ 1, null, null ] ]