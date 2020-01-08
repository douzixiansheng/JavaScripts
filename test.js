const request = require('request');

let webHook = "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=3f737b60-5324-4e6b-8e52-976df2c07182";

function jsonPost(uri, requestData, onFinished) {
	return new Promise(resolve => {
		console.info(`start http post ${uri}, send data ${JSON.stringify(requestData)}`);
		request({
			url: uri,
			method: "POST",
			json: true,
			headers: {
				"content-type": "application/json",
			},
			body: requestData
		}, function(error, response, body) {
			if (error || response.statusCode !== 200) {
				console.error(`post get error or not success ${response.statusCode}`, error);
				if (onFinished !== null && typeof(onFinished) == 'function') {
					onFinished(null);
				}
				resolve(null);
			} else {
				console.info('end post ' + uri);
				if (onFinished !== null && typeof(onFinished) == 'function') {
					onFinished(body);
				}
				resolve(body);
			}
		});
	})
};

jsonPost(webHook, {
    msgtype: 'text',
    text: {
        content: "msg"
    }
})