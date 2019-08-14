'use strict';
/**
 *  * >> 表示右移，如果该数为正，则高位补0，若为负数，则高位补1
 * >>> 表示无符号右移，也叫逻辑右移，即若该数为正，则高位补0，若该数为负数，则高位同意补0
 * 
 * << 表示左移   左移1位相当于乘以2
 */
//生成二维码
var qr = require('../SourceCode/lib/qr');
var app = require('express')();
 
app.get('/',function(req,res){
  var code = qr.image('如何用二维码描述周二狗',{type:'png'})
  res.sendFile(__dirname+'/index.html')
  code.pipe(res);
})
app.listen(3000,function(){
  console.log('启动啦')
});