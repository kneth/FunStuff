function Cache() {
    this._cache = {};

    this.put = function(obj) {
        this._cache[Symbol.for(obj.id)] = obj;
    }

    this.get = function(id) {
        return this._cache[Symbol.for(id)];
    }
}

let cache = new Cache();

const obj1a = {
    id: "id-0001",
    name: "John",
    age: 12
};

const obj2a = {
    id: "id-0002",
    name: "Barbara",
    age: 14
};

cache.put(obj1a);
cache.put(obj2a);

const obj1b = cache.get("id-0001");
console.log("obj1b = ", obj1b);
console.log("obj1a == obj1b", obj1a == obj1b);
console.log("obj1a === obj1b", obj1a === obj1b);
