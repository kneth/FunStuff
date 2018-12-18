import { diff } from 'deep-object-diff';

let obj1 = {
    name: 'Object 1',
    properties: {
        id: { type: 'int' },
        p1: { type: 'string' },
    }
};

let obj2 = {
    name: 'My Object',
    properties: {
        id: { type: 'int' },
        p1: { type: 'string' },
        p2: { type: 'string' }
    }
};

let obj3 = {
    name: 'My Object',
    properties: {
        id: { type: 'int' },
        p1: { type: 'string' },
        p2: { type: 'string' },
        p3: { type: 'int' }
    }
};


console.log(diff(obj2, obj3));
console.log(diff(obj3, obj2));

let arr1 = [obj1, obj2];
let arr2 = [obj1, obj3];

console.log(diff(arr1, arr2));
console.log(diff(arr2, arr1));