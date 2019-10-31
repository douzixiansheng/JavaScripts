/**
 * 宏观任务：宿主(浏览器)发起的任务称为宏观任务 (setTimeout, setInterval)
 * 微观任务: JS引擎发起的任务称为微观任务 (Promise)
 * 同一个任务中，微观任务是先于宏观任务执行的
 */

setTimeout(function(){console.log(4)}, 0);

new Promise(function(resolve){
    console.log(1);
    for(var i = 0;i < 10000; i++){
        i == 9999 && resolve();
    }
    console.log(2);
}).then(function(){
    console.log(5);
})
console.log(3);