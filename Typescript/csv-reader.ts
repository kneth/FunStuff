import { createReadStream } from "node:fs";
import { parse } from '@fast-csv/parse';

const path = "./foo.csv";

let columns: Map<string, Array<string|BigInt>>;

const processHeaders = (headers: string[]) => {
    columns = new Map<string, Array<any>>();
    headers.forEach((header) => {
        if (columns.has(header)) {
            throw new Error(`Column name ${header} is duplicated`);
        }
        columns.set(header, new Array<any>());
    });
};

const processLine = (row: Record<string, any>) => {
    const re = new RegExp("[0-9]+");
    Object.entries(row).forEach(([key, value]) => {
        if (re.test(value)) {
            columns.get(key)?.push(BigInt(value));
        } else {
            columns.get(key)?.push(value);
        }
    });
};

const processEnd = (rowCount: number) => {
    console.log(`Parsed ${rowCount - 1} rows`);
    columns.forEach((values, key, _) => {
        console.log(`Column ${key}`);
        values.forEach((value) => {
            console.log(`  ${value} (${typeof value})`);
        });
    });
};

createReadStream(path)
    .pipe(parse({ headers: true }))
    .on("error", (error: any) => {
        throw new Error(`Error parse file: ${error}`);
    })
    .on("headers", (headers: string[]) => processHeaders(headers))
    .on("data", (row: any) => processLine(row))
    .on("end", (rowCount: number) => processEnd(rowCount));