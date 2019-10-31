const cluster = require('cluster');
const net = require('net');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    console.log(`主进程 ${process.pid} 正在运行`);

    // 衍生工作进程。
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`工作进程 ${worker.process.pid} 已退出`);
    });
}
else {
    const server = net.createServer();

    server.on('connection',(newClient) => {
        let onConnection = async function (client) {
            client.name = client.remoteAddress + ':' + client.remotePort + ':' + process.pid;

            client.on('data', function (data) {
                console.log(client.name);
                console.log(JSON.parse(data));
            });
        }

        onConnection(newClient).catch((exception) => {
            console.log(exception);
        })
    })
    server.listen(8181, () => {
        console.log('server is listening');
    });

    console.log(`工作进程 ${process.pid} 已启动`);
}