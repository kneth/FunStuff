// node v10.5 or later is required!!!

const { Worker, isMainThread, parentPort, WorkerData } = require('worker_threads');

const iterations = 100000;

let instance = 0;
let nhits = 0;

const threads = () => {
    return new Promise((resolve, reject) => {
        const thisInstance = ++instance;

        const worker = new Worker(`${__dirname}/pi-worker.js`, {
            workerData: {
                instance: thisInstance,
                iterations: iterations
            },
        });
        worker.on('message', (data) => {
            console.log(data);
            nhits += data;
            resolve();
        });
        worker.on('error', (err) => {
            console.log(err);
            reject(err);
        });
        worker.on('exit', (code) => {
            if (code !== 0)
                reject(new Error(`Worker stopped with exit code ${code}`));
        });
    });
};

console.log('PID = ', process.pid);

const threadCounts = 100;
let promises = [];
for (let threadCount = 0; threadCount < threadCounts; threadCount++) {
    console.log(`Spawning thread ${instance + 1}`);
    let p = threads();
    promises.push(p);
}

Promise.all(promises).then(() => {
    console.log('pi = ', 4.0 * nhits/(threadCounts * iterations));
});
