'use strict';

const signal = require('./signal')();

module.exports.testLog = function(slot, other){
    console.log(slot.data);
    console.log('123 ',other);
}

setInterval(function(){
    signal.emit('test', {id: 1, name: 'test'})
}, 10000)


signal.register('test', this.testLog, this);