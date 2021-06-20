class _Dictionary {
    constructor() {
        this.dictionary = [];
    }

    setter(key, value) {
        let index = this.dictionary.findIndex(element => element.key === key);
        if (index >= 0) {
            this.dictionary[index].value = value;
        } else {
            this.dictionary.push({key, value});
        }
    }

    getter(key) {
        let result = this.dictionary.find(element => element.key === key);
        if (result !== undefined) {
            return result.value;
        }
        return result;
    }

    remove(key) {
        let index = this.dictionary.findIndex(element => element.key === key);
        if (index >= 0) {
            this.dictionary.splice(index, 1);
        }
    }

    has(key) {
        return this.dictionary.find(element => element.key === key) !== undefined;
    }

    keys() {
        return this.dictionary.map(element => element.key);
    }

    length() {
        return this.dictionary.length;
    }

    find(fn) {
        return this.dictionary.filter(fn);
    }
}

function Dictionary () {
    let dictionary = new _Dictionary();
    return new Proxy(dictionary, {
        getPrototypeOf: function (_) {
            return Dictionary.prototype;
        },

        get: function (_, key) {
            if (typeof(dictionary[key]) === "function") {
                return function () {
                    return dictionary[key].apply(dictionary, arguments);
                }
            }

            if (key === "length") {
                return dictionary.length();
            }

            return dictionary.getter(key);
        },

        set: function (_, key, value) {
            dictionary.setter(key, value);
        },

        has: function (_, key) {
            return dictionary.has(key);
        },

        deleteProperty(_, key) {
            dictionary.remove(key);
        },

        enumerate: function (_, _) {
            return dictionary.keys();
        },

        ownKeys: function (_, _) {
            return dictionary.keys();
        },

        getOwnPropertyDescriptor(_) {
            return {
                enumerable: true,
                configurable: true,
            };
        }
    });
}

let dict = new Dictionary();
dict.apples = 2;
dict.bananas = 0;
dict.cherries = 5;

console.log(`dict instanceof Dictionary = ${dict instanceof Dictionary}`);
console.log(`dict.length = ${dict.length}`);
console.log(`dict.oranges = ${dict.oranges}`);
console.log(`dict.apples = ${dict.apples}`);

dict.apples = 3;
console.log(`dict.apples = ${dict.apples}`);

delete dict.apples;
console.log(`dict.apples = ${dict.apples}`);

console.log(`Object.getOwnPropertyNames(dict) = ${Object.getOwnPropertyNames(dict)}`);
console.log(`Object.keys(dict) = ${Object.keys(dict)}`);

dict.berries = 7;
let bs = dict.find((element) => element.key.startsWith("b"));
for (const b of bs) {
    console.log(`${b.key} -> ${b.value}`);
}