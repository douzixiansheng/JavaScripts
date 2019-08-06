/**
 * Created by NKDF on 2019/4/17.
 */
/**
 * Promise 是一个对象，从它可以获取异步操作的消息.
 * Promise 对象的特点:
 * 1.对象的状态不受外界影响.Promise对象代表一个异步操作，
 * 有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。
 * 只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态
 * 2.一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，
 * 只有两种可能：从pending变为fulfilled和从pending变为rejected。
 *
 *
 * Promise 对象是一个构造函数，用来生成Promise实例.
 *
 * Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。
 * 它们是两个函数，由 JavaScript 引擎提供，不用自己部署。
 * resolve函数的作用是，将Promise对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），
 * 在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；
 * reject函数的作用是，将Promise对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），
 * 在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。Promise实例生成以后，
 * 可以用then方法分别指定resolved状态和rejected状态的回调函数。
 **/

function timeout(ms) {
    return new Promise((resolve, reject) => {
        "use strict";
        setTimeout(resolve, ms, 'done');
    })
}

timeout(100).then((value) => {
    "use strict";
    console.log(value);
});

let promise = new Promise(function (resolve, reject) {
    console.log('Promise');
    resolve("返回结果");
    //如果Promise状态已经变成resolved，再抛出错误是无效的
    throw new Error("test");
});

/**
 * Promise 实例具有 then  方法,也就是说,then 方法是定义在原型对象Promise.prototype上的。
 * 它的作用是为Promise 实例添加状态改变时的回调函数.
 *
 * then 方法返回的是一个新的Promise实例(不是原来那个Promise实例)
 *
 * Promise.prototype.finally() finally方法用于指定不管Promise对象最后状态如何，都会执行的
 * 操作。
 *
 * Promise.all() 方法用于将多个Promise实例，包装成一个新的Promise实例。
 *
 * Promise.race() 方法同样是将多个Promise实例，包装成一个新的Promise实例.
 *
 * Promise.resolve() 将现有对象转为Promise对象
 */
promise.then(function (s) {
    console.log('resolved '+s);
}).catch( (err) => console.log('rejected', err));
console.log('Hi');

console.log(parseInt(new Date().getTime() / 1000) + 12 * 60 * 60);

/**
 * Promise.all 成功和失败的返回值不同，成功的时候返回一个结果数组，
 * 失败则返回最先被reject失败状态的值
 *
 * Promise.all 获取的成功结果的数组里的数据顺序和Promise.all接收到
 * 的数组顺序是一致的
 * @type {Promise}
 */
let p1 = new Promise((resolve, reject) => {
    resolve('成功了');
})

let p2 = new Promise((resolve, reject) => {
    resolve('success');
})

let p3 = Promise.reject('失败');

Promise.all([p1, p2]).then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error)
});

Promise.all([p1,p3, p2]).then((result) => {
    "use strict";
    console.log(result);
}).catch((error) => {
    "use strict";
    console.log(error);
});

/**
 * Promise.race 返回最先获得结果的值  不管结果本身是成功状态还是失败状态
 */
Promise.race([p1, p2]).then((result) => {
    "use strict";
    console.log("Promise.race ==> " + result);
}).catch((error) => {
    "use strict";
    console.log("Promise.race ==> ");
    console.log(error);
});


/*
    Promise的then 方法接受两个参数:
    promise.then(onFulfilled, onRejected)

    onFulfilled 和 onRejected 都是可选参数.
    如果onFulfilled 和 onRejected 不是函数，其必须被忽略

    onFulfilled 特性
        如果onFulfilled 是函数：
        当promise 状态变为成功时必须被调用，其第一个参数为promise成功状态传入的值(resolve执行时传入的值)
        在promise状态改变前不可被调用
        其调用次数不可超过一次
    onRejected 特性
        如果onRejected 是函数：
        当promise 状态变为失败时必须被调用，其第一个参数为promise失败状态传入的值(reject 执行时传入的值)
        在promise状态改变前其不可被调用
        其调用次数不可超过一次

    多次调用：
        then 方法可以被同一个promise对象调用多次

        当promise 成功状态时， 所有onFulfilled 需按照其注册顺序依次回调
        当promise 失败状态是， 所有onRejected 需按照其注册顺序依次回调

    then 方法必须返回一个新的 promise 对象

 */

/**
 *
 * promise2 = promise1.then(onFulfilled, onRejected);
 *
 *1. 如果 onfulfilled 或者 onRejected 返回一个值x，则运行下面的Promise解决过程：
 * @type {Promise}
 */
let promise1 = new Promise((resolve, reject) => {
    "use strict";
    setTimeout(() => {
        resolve();
    }, 1000)
});

//若x 不为 Promise，则使 x 直接作为新返回的Promise 对象的值，即新的onFulfilled 或者 onRejected 的函数参数
promise2 = promise1.then( res => {
    "use strict";
    return '这里返回一个普通值'
});
promise2.then(res => {
    "use strict";
    console.log(res);
});


let promise3 = new Promise((resolve, reject) => {
    "use strict";
    setTimeout(() => {
        resolve();
    }, 1000)
});
// 若x 为 Promise， 这时返回一个回调函数，就会等待该 Promise 对象(即 x) 的状态发生变化，
// 才回被调用，并且新的Promise状态和x的状态相同
promise4 = promise3.then(res => {
    "use strict";
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('这里了返回一个Promise');
        }, 2000)
    });
});

promise4.then(res => {
    "use strict";
    console.log(res);
});


let promise5 = new Promise((resolve, reject) => {
    "use strict";
    setTimeout(() => {
        resolve('success');
    }, 1000)
});

//2. 如果 onFulfilled 或者 onRejected 抛出一个异常e， 则promise6 必须变为失败，并返回失败的值
promise6 = promise5.then(res => {
    "use strict";
    throw new Error("这里抛出一个异常e");
});

promise6.then(res => {
    "use strict";
    console.log("why ? ",res)
}, err => {
    "use strict";
    console.log(err);
});


let promise7 = new Promise((resolve, reject) => {
    "use strict";
    setTimeout(() => {
        resolve('success');
    }, 1000)
});
//3. 如果 onFulfilled 不是函数且 promise1 状态为成功(Fulfilled), promise8必须变为成功并且返回promise7的值
promise8 = promise7.then("这里的onFulfilled不是一个函数");
promise8.then(res => {
    "use strict";
    console.log(res);
}, err => {
    "use strict";
    console.log(err);
});


let promise9 = new Promise((resolve, reject) => {
    "use strict";
    setTimeout(() => {
        reject('fail');
    })
}, 1000);
//4. 如果onRejected 不是函数且promise9状态为失败，promise10 必须变为失败并返回promise9的值
promise10 = promise9.then(res => res, '这里的onRejected不是一个函数');
promise10.then(res => {
    "use strict";
    console.log(res);
}, err => {
    "use strict";
    console.log("promise10 ",err);
});


/**
 * 当 resolve 方法传入的参数为一个Promise对象时，则该Promise对象状态决定当前Promise对象的状态
 * 也就是 pp1  的状态  决定了 pp2 的状态
 * @type {Promise}
 */
const pp1 = new Promise(function (resolve, reject) {
    console.log('pp1......');
    resolve('success');
});
pp1.then(res => {
    "use strict";
    console.log("pp1 res ", res);
});

const pp2 = new Promise(function (resolve, reject) {
    console.log('pp2...........');
    resolve(pp1);
});

pp2.then(res => {
    "use strict";
    console.log('pp2 res ', res);
})



// 判断变量否为function
const isFunction = variable => typeof variable === 'function';
// 定义Promise的三种状态常量
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

class MyPromise {
    //constructor 是一种用于创建和初始化class创建的对象的特殊方法(构造方法)
    constructor (handle) {
        if (!isFunction(handle)) {
            throw new Error('MyPromise must accept a function as a parameter')
        }
        // 添加状态
        this._status = PENDING;

        this._value = undefined;
        // 添加成功回调函数队列
        this._fulfilledQueues = [];
        // 添加失败回调函数队列
        this._rejectedQueues = [];
        // 执行handle
        try {
            handle(this._resolve.bind(this), this._reject.bind(this))
        } catch (err) {
            this._reject(err)
        }
    }
    // 添加resovle时执行的函数
    _resolve (val) {
        const run = () => {
            console.log("1. 进入  _resolve",this._status);
            if (this._status !== PENDING) return;
            // 依次执行成功队列中的函数，并清空队列
            const runFulfilled = (value) => {
                console.log('3. 依次执行成功队列中的函数，并清空队列',value, this._status);
                let cb;
                while (cb = this._fulfilledQueues.shift()) {
                    cb(value)
                }
            };
            // 依次执行失败队列中的函数，并清空队列
            const runRejected = (error) => {
                console.log("2. 依次执行失败队列中的函数，并清空队列")
                let cb;
                while (cb = this._rejectedQueues.shift()) {
                    cb(error)
                }
            };
            /* 如果resolve的参数为Promise对象，则必须等待该Promise对象状态改变后,
             当前Promsie的状态才会改变，且状态取决于参数Promsie对象的状态
             */
            if (val instanceof MyPromise) {
                val.then(value => {
                    console.log("2. 标志位完成状态",value, this._status);
                    this._value = value;
                    this._status = FULFILLED;
                    runFulfilled(value)
                }, err => {
                    this._value = err;
                    this._status = REJECTED;
                    console.log("标志位失败状态",err);
                    runRejected(err)
                })
            } else {
                this._value = val;
                this._status = FULFILLED;
                runFulfilled(val)
            }
        };
        // 为了支持同步的Promise，这里采用异步调用
        setTimeout(run, 0)
    }
    // 添加reject时执行的函数
    _reject (err) {
        if (this._status !== PENDING) return;
        // 依次执行失败队列中的函数，并清空队列
        const run = () => {
            this._status = REJECTED;
            this._value = err;
            let cb;
            while (cb = this._rejectedQueues.shift()) {
                cb(err)
            }
        };
        // 为了支持同步的Promise，这里采用异步调用
        setTimeout(run, 0)
    }
    // 添加then方法
    then (onFulfilled, onRejected) {
        const { _value, _status } = this;
        // 返回一个新的Promise对象
        return new MyPromise((onFulfilledNext, onRejectedNext) => {
            // 封装一个成功时执行的函数
            let fulfilled = value => {
                console.log('封装一个成功时执行的函数');
                try {
                    if (!isFunction(onFulfilled)) {
                        onFulfilledNext(value)
                    } else {
                        let res =  onFulfilled(value);
                        //instanceof运算符用于测试构造函数的prototype属性是否出现在对象的原型链中的任何位置
                        if (res instanceof MyPromise) {
                            console.log("如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调");
                            // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
                            res.then(onFulfilledNext, onRejectedNext)
                        } else {
                            //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
                            console.log('否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数');
                            onFulfilledNext(res)
                        }
                    }
                } catch (err) {
                    // 如果函数执行出错，新的Promise对象的状态为失败
                    onRejectedNext(err)
                }
            };
            // 封装一个失败时执行的函数
            let rejected = error => {
                try {
                    if (!isFunction(onRejected)) {
                        onRejectedNext(error)
                    } else {
                        let res = onRejected(error);
                        if (res instanceof MyPromise) {
                            // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
                            res.then(onFulfilledNext, onRejectedNext)
                        } else {
                            //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
                            onFulfilledNext(res)
                        }
                    }
                } catch (err) {
                    // 如果函数执行出错，新的Promise对象的状态为失败
                    onRejectedNext(err)
                }
            };
            switch (_status) {
                // 当状态为pending时，将then方法回调函数加入执行队列等待执行
                case PENDING:
                    console.log("---------------push function", this._status);
                    this._fulfilledQueues.push(fulfilled);
                    this._rejectedQueues.push(rejected);
                    break;
                // 当状态已经改变时，立即执行对应的回调函数
                case FULFILLED:
                    console.log("FULFILLED value "+_value, this._status);
                    fulfilled(_value);
                    break;
                case REJECTED:
                    rejected(_value);
                    break;
            }
        })
    }
    // 添加catch方法
    catch (onRejected) {
        return this.then(undefined, onRejected)
    }
    // 添加静态resolve方法
    static resolve (value) {
        // 如果参数是MyPromise实例，直接返回这个实例
        if (value instanceof MyPromise) return value;
        return new MyPromise(resolve => resolve(value))
    }
    // 添加静态reject方法
    static reject (value) {
        return new MyPromise((resolve ,reject) => reject(value))
    }
    // 添加静态all方法
    static all (list) {
        return new MyPromise((resolve, reject) => {
            /**
             * 返回值的集合
             */
            let values = [];
            let count = 0;
            for (let [i, p] of list.entries()) {
                // 数组参数如果不是MyPromise实例，先调用MyPromise.resolve
                this.resolve(p).then(res => {
                    values[i] = res;
                    count++;
                    // 所有状态都变成fulfilled时返回的MyPromise状态就变成fulfilled
                    if (count === list.length) resolve(values)
                }, err => {
                    // 有一个被rejected时返回的MyPromise状态就变成rejected
                    reject(err)
                })
            }
        })
    }
    // 添加静态race方法
    static race (list) {
        return new MyPromise((resolve, reject) => {
            for (let p of list) {
                // 只要有一个实例率先改变状态，新的MyPromise的状态就跟着改变
                this.resolve(p).then(res => {
                    resolve(res)
                }, err => {
                    reject(err)
                })
            }
        })
    }
    finally (cb) {
        return this.then(
            value  => MyPromise.resolve(cb()).then(() => value),
            reason => MyPromise.resolve(cb()).then(() => { throw reason })
        );
    }
}


let  promise11 = new MyPromise((resolve,reject) => {
    setTimeout(() => {
        resolve(1)
    },1000)
})
promise11.then(res => {
    "use strict";
    console.log("------------",res);
})
let promise21 = new MyPromise((resolve,reject) =>{
    setTimeout(() => {
        resolve(promise11)
    },4000)
})

promise21.then(val=>{
    console.log("走了吗？ ",val)
})

