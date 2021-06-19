# A collection of my node.js experiments

Learning more about node.js by writing small code snippets.

* `events.js`: how does the event emitter system work?
* `MapReduce`: map/reduce implementation using Workers

## Map/Reduce

* `mapreduce.js` - main program to drive the map/reduce process

### Example: Aggregate data

In this example data consists of objects with two properties: `name` and `value`. The aggregation will count the distinct names and sum the values for each name.


Two functions:

* `aggregate-map.js` - the map function will do an aggregation of an array of objects
* `aggregate-reduce.js` - the reduce function will combine the aggregated objects into a single result


Test data:

* `generate-testdata.js` - generate random test data (objects with properties `name` and `value`)
* `serial-analyze.js` - aggregate test data (serial version)

### Example: Word count
