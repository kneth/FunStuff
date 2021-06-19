const aggregateMap = (data) => {
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
    return aggregation;
}

module.exports = aggregateMap;

