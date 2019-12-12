const net = require('net');

var client = new net.Socket();

client.connect(8282, '127.0.0.1', function() {
    console.log('Connected');
});

client.on('data', function(data) {
    console.log('data, this ',this);
});