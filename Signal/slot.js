'use strict';

module.exports = function (worker, target) {
    return new Slot(worker, target);
}

const Slot = function (worker, target) {
    this.worker = worker;
    this.target = target;
    this.signal = null;
    this.sender = null;
    this.data = null;
}

Slot.prototype.emit = function (data) {
    this.data = data;

    try{
        if(this.target){
            if(this.worker){
                this.worker.call(this.target, this, 'zhang_san');
                console.log('this.worker ',this.worker, this.target);
            }
        }
        else if(this.worker){
            this.worker.call(this, this);
        }

    }
    catch(e){
        console.log('e' , e);
    }
    this.data = null;
}

