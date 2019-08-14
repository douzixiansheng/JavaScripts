
'use strict'
let self = this;
module.exports = aa;
var aa = function(){
    console.log(this);
    self.xx = 1123;
}
aa();
console.log(self)
