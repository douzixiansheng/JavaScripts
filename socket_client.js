var net = require('net');
var client = net.connect({port: 8181}, function() {
   console.log('连接到服务器！');
   client.write(JSON.stringify('Hello World'));
});
client.on('data', function(data) {
   console.log(data.toString());
   client.end();
});
client.on('end', function() { 
   console.log('断开与服务器的连接');
});