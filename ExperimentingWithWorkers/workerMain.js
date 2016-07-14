
self.importScripts('workerFunctions.js')


var workerTask = function (value, n) {
    for (let i=0; i<10; i++) {
        value = commonTask(5+i+value, n);
    }
    return value
};


onmessage = function (event) {
    let result = workerTask(event.data[0], event.data[1]);
    postMessage(result);
};