// async function test(){
//     let nowdt = new Date().getTime();
//     for(let i = 0;i < 5; ++i){
//         let xxx = await func(i);
//         console.log('xxx ',xxx);
//     }
//     console.log(`diff ${new Date().getTime() - nowdt}`);
// }

function func(index){
    return new Promise((resolve, reject) => {
        console.log("------func promise");
        setTimeout(function(){
            console.log('func ',index);
            resolve('hh');
        }, 1000);
    });
}

//test();

async function test2(){
    let nowdt = new Date().getTime();
    let array = [];
    let temp = [];
    for(let i = 0; i < 5; ++i){
        array.push(async () => {
            console.log('执行async 函数');
            let temp = await func(i);
            console.log('temp ',temp);
        });
    }

    await batchProcess(array);
    console.log(`diff  ${new Date().getTime() - nowdt}`);
}

test2();


//批量执行
async function batchProcess (array) {
	return new Promise(async (resolve) => {
		let outputArray = [];
		let asyncArr = array.map(func => func && func());
		for(let value of asyncArr) {
			try {
				outputArray.push(await value);
			}catch (e) {
				outputArray.push(null);
			}
        }
        console.log(outputArray)
		resolve(outputArray);
	})
};


