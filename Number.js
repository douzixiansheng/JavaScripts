/**
 * isFinite() 和 isNaN() 与传统的全局方法的区别：
 * 传统方法先调用Number()将非数值转换为数值，再进行判断，而
 * 新方法只对数值有效，非数值一律返回false
 * 
 * Number.isNaN() 只对NaN才返回true，非NaN一律返回false
 */
console.log(Number.isFinite(25));
console.log(Number.isFinite('25'));

console.log(Number.isNaN('NaN'));
console.log(Number.isNaN(NaN));

console.log(Number.parseInt('12.34'));
console.log(Number.parseFloat('12.345#'));
console.log(Number.parseInt === parseInt);
console.log(Number.parseFloat === parseFloat);

/**
 * Number.isInteger() 用来判断一个值是否为整数
 * 需要注意的是：在JavaScript内部，整数和浮点数是同样的存储方法，
 * 所以3和3.0是同一个值
 */
console.log(Number.isInteger(25));
console.log(Number.isInteger(25.1));
console.log(Number.isInteger(5.0));
console.log(Number.isInteger(5));

console.log(0.1 + 0.2);

/**
 * Number.EPSILON 极小的常量，目的在于为浮点数计算设置一个误差范围。
 * @param {} left 
 * @param {*} right 
 */
function withinErrorMargin(left, right){
    return Math.abs(left - right) < Number.EPSILON;
}

console.log(withinErrorMargin(0.1 + 0.2, 0.3));


/**
 * JavaScript 能够准确表示的整数范围在-2^53 到 2^53 之间(不含两个端点),超过
 * 这个范围就无法精确表示了
 * Number.isSafeInteger()用来判断一个整数是否落在这个范围之内.
 * */
console.log(Number.MAX_SAFE_INTEGER);
console.log(Number.MIN_SAFE_INTEGER);


/**-------------------Math 的扩展 */

/**
 * Math.trunc() 方法用于去除一个数的小数部分，返回整数部分
 * 对于非数值，Math.trunc()内部使用Number方法将其转换为数值
 * 对于空值和无法截取整数的值，返回NaN
 */
console.log(Math.trunc(4.1));
console.log(Math.trunc(-4.1));
console.log(Math.trunc(0.1));
console.log(Math.trunc(0.123));
console.log(Math.trunc(0.92));


/**
 * Math.sign()
 * 用来判断一个数到底是正数、负数还是0
 * 参数为正数，返回+1
 * 参数为负数，返回-1
 * 参数为0，返回0
 * 参数为-0，返回-0
 * 其他值，返回NaN
 */
console.log(Math.sign(-5))
console.log(Math.sign(5))
console.log(Math.sign(0))
console.log(Math.sign(-0))
console.log(Math.sign(NaN))
console.log(Math.sign('9'))
console.log(Math.sign('foo'))
console.log(Math.sign())

/**
 * 用于计算一个数的立方根
 */
console.log(Math.cbrt(8));
console.log(Math.cbrt(0));
console.log(Math.cbrt(-8));

/**
 * Math.clz32() 返回一个数的32位无符号整数形式有多少个前导0
 * 
 * Math.imul()  返回两个数以32位带符号整数形式相乘的结果，返回的也是
 * 一个32位的带符号整数
 */
