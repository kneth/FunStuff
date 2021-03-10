const handler = {
    cache: {},
    get(_, prop) {
        if (!(prop in this.cache)) {
            this.cache[prop] = Math.random();
        }
        return this.cache[prop];
    }
};

let myObject = new Proxy({}, handler);

console.log(`foo -> ${myObject["foo"]}`);
console.log(`bar -> ${myObject["bar"]}`);
console.log(`foo -> ${myObject["foo"]}`);