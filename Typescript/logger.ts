import { throws } from "assert";
import fs = require("fs");

enum LogLevel {
    Error,
    Warning,
    Debug,
    Info
};

interface Logger {
    log(level: LogLevel, message: string): void;
};


class ConsoleLogger implements Logger {
    private level: LogLevel;

    constructor(level: LogLevel) {
        this.level = level;
    }

    log(level: LogLevel, message: string): void {
        console.log(message);
    }
}

class FileLogger implements Logger {
    private filename: string;
    private fd: number;

    constructor(name: string) {
        this.filename = name;
        this.fd = fs.openSync(name, 'w');
    }

    log(level: LogLevel, message) {
        fs.appendFileSync(this.fd, message);
    }
}