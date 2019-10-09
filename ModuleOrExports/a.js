
module.exports = function () {
    return new Handler();
}

const Handler = function () {

}

Handler.prototype.sayHello = function () {
    console.log("hello");
}