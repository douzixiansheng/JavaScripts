
module.exports = function(name){
    return new System(name);
}

var System = function(name){
    this.name = name;
}

System.prototype.sayMsg = function(){
    console.log(this.name);
}

