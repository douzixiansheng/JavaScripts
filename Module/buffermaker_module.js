"user strict";

//kafka-node 模块底层使用了该模块

const BufferMaker = require('buffermaker');

let someBuffer = new BufferMaker()
.UInt8(1)
.UInt16BE(2)
.UInt32BE(3)
.Int64BE(4)     // uses the BigNum library
.string("this is a test!")
.make();
console.log(someBuffer)