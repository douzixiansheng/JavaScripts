
'use strict';
/**
 * 箭头函数没有自己的this，继承外层上下文绑定的this
 * @type {{age: number, info: obj.info}}
 */
let obj = {
    age : 20,
    info: function () {
        return () => {
            console.log(this)
            console.log(this.age);
        }
    }
}
let person1 = {age : 28};
let infoq = obj.info();
infoq();
let info2q = obj.info.call(person1);
info2q();
