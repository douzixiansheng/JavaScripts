
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if(cluster.isMaster){
    console.log(`主进程 ${process.pid} 正在进行`);

    for(let i = 0; i < numCPUs; i++){
        const worker = cluster.fork();
        worker.send('ni hao '+worker.id +' : '+worker.isConnected());
    }

    function messageHandler(msg){
        console.log(msg);
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`工作进程 ${process.pid} 已退出`);
    })

    for(const id in cluster.workers){
        cluster.workers[id].on('message', messageHandler);
    }
}
else{
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end('你好时间\n');
        process.send({cmd:process.pid,info:'工作进程 => 主进程'});
    }).listen(8000);

    console.log(`工作进程 ${process.pid} 已启动`);

    process.on('message', (msg) => {
        process.send({cmd:process.pid,msg:msg});
    })
}