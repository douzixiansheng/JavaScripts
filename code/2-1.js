"use strict";

let topics = ['broadcast'];
topics.some((topic) => {
    console.log(topic)
})

var xxx = topics.every(t => typeof t === 'string')
console.log(xxx);