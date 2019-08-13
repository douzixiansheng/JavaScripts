
'use strict';

function User(name, age){
    this.name = name;
    this.age = age;

    let year = (new Date()).getFullYear() - age;

    this.getYearBorn = function(){
        return year;
    }
}


//为prototype对象添加一个新的方法
User.prototype.getName = function(){
    return this.name;
}

//此方法的上下文将是被实例化的对象
User.prototype.getAge = function(){
    return this.age;
}

//静态方法
User.cloneUser = function(user){
    return new User(
        user.getName(),
        user.getAge()
    );
};


var me = new User('Bob', 25);
console.log(me.name);
console.log(me.constructor);
console.log(me.getAge());
console.log(me.getName());
console.log(me.getYearBorn())