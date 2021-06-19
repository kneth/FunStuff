const fs = require("fs");

const data = JSON.parse(fs.readFileSync("testdata.json"));

let aggregation = {};
data.forEach(element => {
    if (!(element.name in aggregation)) {
        let obj = {
            count: 0,
            sum: 0.0
        };
        aggregation[element.name] = obj;
    }
    aggregation[element.name].count++;
    aggregation[element.name].sum += element.value;
});

Object.keys(aggregation).sort().forEach(n => {
    console.log(`${n}: ${aggregation[n].count} - ${aggregation[n].sum}`);
});