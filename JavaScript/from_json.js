const Flatted = require("flatted");
const asStr = '{"name":"test 3","prop":"2023-09-20T10:59:37.118Z"}';
const asJson = Flatted.parse(asStr);
const obj = Flatted.fromJSON(asJson);
console.log(`typeof(obj.name) = ${typeof(obj.name)}`);
console.log(`typeof(obj.prop) = ${typeof(obj.prop)}`);
