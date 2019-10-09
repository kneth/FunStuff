require('events').EventEmitter.prototype._maxListeners = 100;
require('events').EventEmitter.defaultMaxListeners = 100;
process.setMaxListeners(100);

const {
    Worker, isMainThread, parentPort, workerData
} = require('worker_threads');

let nhits = 0;
let iterations = workerData.iterations;
for (let i = 0; i < iterations; i++) {
    let x = Math.random();
    let y = Math.random();
    if (x*x+y*y < 1) {
        nhits++;
    }
}


parentPort.postMessage(nhits);
