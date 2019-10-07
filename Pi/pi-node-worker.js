// node v10 or later is required!!!

const { Worker, isMainThread, parentPort } = require('worker_threads');

const nIterations = 1000;
const nWorkers = 10;

if (isMainThread) {

} else {
    let nhits = 0;

    let i = 0;
    while (i < nIterations) {
        let x = Math.random();
        let y = Math.random();
        if (x*x+y*y < 1) {
            nhits++;
        }
        i++;
    }

}
