'use strict';

const slot = require('./slot');

module.exports = function(app){
    return new Signal(app);
}

const Signal = function(){
    this.slots = {};
}

Signal.prototype.register = function(sig, cb, target){
    if(!this.slots[sig]){
        this.slots[sig] = [];
    }

    let s = slot(cb, target);
    this.slots[sig].push(s);
    return true;
}

Signal.prototype.emit = function(sig, data, sender){
    if(this.slots[sig]){
        this.slots[sig].concat().forEach(slot => {
            slot.sender = sender;
            slot.Signal = sig;
            slot.emit(data);
        });

        return true;
    }
    return false;
}