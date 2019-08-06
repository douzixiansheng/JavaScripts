'use strict';

module.exports.getUser = function (source, key) {
    return new Promise((resolve, reject) => {
        source.get(key, (err, data) => {
            if(err){
                resolve(err);
                return;
            }
            resolve(data);
        })
    });
}

module.exports.setUser = function (source, key, value) {
    return new Promise((resolve, reject) => {
        source.set(key, JSON.stringify(value), (err) => {
            if(err){
                resolve(err);
                return;
            }
            resolve();
        });
    });
}