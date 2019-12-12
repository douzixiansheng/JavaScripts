const net = require('net');

net.createServer(function(socket){

    socket.end('end');
}).listen(8282);