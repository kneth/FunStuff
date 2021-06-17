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

    has(key) {
        return this.dictionary.find(element => element.key === key) !== undefined;
    }

    length() {
        return this.dictionary.length;
    }
}

function Dictionary () {
    let dictionary = new _Dictionary();
    return new Proxy(dictionary, {
        getPrototypeOf: function (_) {
            return Dictionary.prototype;
        },

        get: function (_, key) {
            if (key === "length") {
                return dictionary.length();
            }
            return dictionary.getter(key);
        },

        set: function (_, key, value) {
            dictionary.setter(key, value);
        },
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
