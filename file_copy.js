/**
 * 大文件复制
 * process.argv 属性返回一个数组，其中包含当前启动Node.js进程时传入的命令行参数
 * 
 * process.stdout 属性返回连接到 stdout(fd 1)的流。它是一个net.Socket 流(也就是双工流),除非
 * fd 1 指向一个文件，在这种情况下是一个可写流
 * 
 * 可以修改程序来自动调整磁盘的读写速度，这个机制就是背压
 */

const stream = require('stream');
const fs = require('fs');

let fileName = process.argv[2];
let destPath = process.argv[3];

const readable = fs.createReadStream(fileName);
const writeable = fs.createWriteStream(destPath || "output");

fs.stat(fileName, (err, stats) => {
    this.fileSize = stats.size;
    this.counter = 1;
    this.fileArray = fileName.split('.');

    try{
        this.duplicate = destPath + "/" + this.fileArray[0] + '_Copy.' + this.fileArray[1];
    }
    catch(e){
        console.exception('File name is invalid! please pass the proper one \n');
    }

    process.stdout.write(`File: ${this.duplicate} is being created\n`);

    readable.on('data', (chunk) => {
        let percentageCopied = ((chunk.length * this.counter) / this.fileSize) * 100;
        process.stdout.clearLine();//清空控制台
        process.stdout.cursorTo(0);//设置标准输出的起始位置
        process.stdout.write(`已拷贝 ${Math.round(percentageCopied)} % \n`);
        this.counter += 1;
    });

    readable.pipe(writeable);//pipe 它控制了磁盘读写的速度以至于不会阻塞内存(RAM)

    writeable.on('unpipe', (e) => {
        process.stdout.write('Copy has failed');
    });
});