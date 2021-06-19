const fs = require("fs");

const names = ["Odin", "Thor", "Freja", "Balder", "Hejmdal", "Frigg", "Tyr", "Ve", "Vile"];

if (process.argv.length !== 3) {
    throw new Error(`Usage: ${process.argv[1]} number`);
}

let aggregation = {};
names.forEach(n => {
    aggregation[n] = {
        count: 0,
        sum: 0.0
    };
});

const N = parseInt(process.argv[2]);
let output = [];
for (let i = 0; i < N; i++) {
    let obj = {};
    obj.name = names[Math.floor(Math.random() * names.length)];
    obj.value = Math.random();
    output.push(obj);
    aggregation[obj.name].count++;
    aggregation[obj.name].sum += obj.value;
}
fs.writeFileSync("testdata.json", JSON.stringify(output));

Object.keys(aggregation).sort().forEach(n => {
    console.log(`${n}: ${aggregation[n].count} - ${aggregation[n].sum}`);
});