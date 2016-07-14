
var doSomething = function () {
    for (let i=0; i<4; i++) {
        let thisWorker = new Worker("workerMain.js")
        thisWorker.postMessage([i, i+2]);
        thisWorker.onmessage = function (event) {
            console.log("Message recieved from worker",i+1," --- ",event.data);
        }
    }
};
