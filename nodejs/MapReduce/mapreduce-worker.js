require('events').EventEmitter.prototype._maxListeners = 100;
require('events').EventEmitter.defaultMaxListeners = 100;
process.setMaxListeners(100);

const { parentPort, workerData } = require("worker_threads");

const mapFun = require(`${__dirname}/${workerData.mapFunFilename}`);
const output = mapFun(workerData.input);
parentPort.postMessage(output);
