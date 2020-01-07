const signal = require('./signal')();

signal.emit('test', {id: 1, name: 'test'})