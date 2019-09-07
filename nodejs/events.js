const EventEmitter = require('events');

class MyEmitter extends EventEmitter {
    start() {
        setTimeout(() => {
            this.emit('start');
        }, 1000);

        setInterval(() => {
            this.emit('tick');
        }, 1000);
    }
}

class MyMonitor {
    constructor(emitter) {
        this._emitter = emitter;
        this._counter = 0;

        this._emitter.on('tick', () => {
            this._counter++;
        });
    }

    async waitForStart() {
        return new Promise((resolve, reject) => {
            this._emitter.once('start', () => {
                resolve();
            });
        })
    }

    async waitForTicks(num) {
        return new Promise((resolve, reject) => {
            let callback = () => {
                if (this._counter >= num) {
                    this._counter = 0;
                    resolve();
                }
            };
            setInterval(() => callback(), 250);
        });
    }
}


async function main() {
    let myEmitter = new MyEmitter();
    let myMonitor = new MyMonitor(myEmitter);

    console.log('Starting');
    myEmitter.start();
    console.log('Started');

    await myMonitor.waitForStart();
    console.log('Running');

    console.log('Waiting', new Date());
    await myMonitor.waitForTicks(10);
    console.log('Done', new Date());
    process.exit();
}

main();