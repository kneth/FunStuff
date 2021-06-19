// Simple example of Map/Reduce using workers
// node v10.5 or later is required!!!

const { Worker, isMainThread, parentPort, WorkerData } = require("worker_threads");
const fs = require("fs");

let mappedData = [];

const threads = (threadIndex, mapFunFilename, inputData) => {
    return new Promise((resolve, reject) => {
        const worker = new Worker(`${__dirname}/mapreduce-worker.js`, {
            workerData: {
                index: threadIndex,
                mapFunFilename,
                input: inputData
            }
        });

        worker.on("message", (data) => {
            mappedData.push(data);
            resolve();
        });

        worker.on("error", (error) => {
            console.error(error);
            reject(error);
        });

        worker.on("exit", (code) => {
            if (code !== 0) {
                reject(`Exit with code ${code}`);
            }
            resolve();
        })
    })
};

if (process.argv.length !== 6) {
    throw new Error(`Usage: ${process.argv[1]} threads map reduce input`);
}

const threadCount = parseInt(process.argv[2]);
const mapFunFilename = process.argv[3];
const reduceFunFilename = process.argv[4];
const inputFilename = process.argv[5];

let inputData = fs.readFileSync(inputFilename);
let input = JSON.parse(inputData);
let inputLength = input.length;
let delta = parseInt(inputLength / threadCount);

let promises = [];
for (let threadIndex = 0; threadIndex < threadCount; threadIndex++) {
    console.log(`Spawning thread ${threadIndex}`);
    const threadInput = input.slice(delta * threadIndex, delta * (threadIndex + 1));
    let p = threads(threadIndex, mapFunFilename, threadInput);
    promises.push(p);
}

Promise.all(promises).then(() => {
    console.log(`Executing reducer in ${reduceFunFilename}`);
    const reduceFun = require(reduceFunFilename);
    const output = reduceFun(mappedData);
    console.log(output);
});
