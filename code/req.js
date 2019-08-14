const http = require('http');

for(let i = 0; i < 100;i++){
    http.get('http://127.0.0.1:9007', (res) => {
        res.on('data', (data) => {
            console.log('response time ',Date.now());
        })
    }).on('error', (err) => {
        console.log('error ', err);
    })
}