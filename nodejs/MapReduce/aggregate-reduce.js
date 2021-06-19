const aggregateReduce = (data) => {
    let aggregation = {};
    data.forEach(element => {
        Object.keys(element).forEach((n) => {
            if (!(n in aggregation)) {
                aggregation[n] = {
                    count: 0,
                    sum: 0.0,
                };
            }
            aggregation[n].count += element[n].count;
            aggregation[n].sum += element[n].sum;
        });
    });
    return aggregation;
}

module.exports = aggregateReduce;