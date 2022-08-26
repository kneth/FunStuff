// https://stackoverflow.com/questions/66651059/does-node-14-make-any-strides-on-garbage-collection
let theThing = null;
let replaceThing = function() {
  const newThing = theThing;
  const unused = function() {
    if (newThing) console.log("hi");
  };

  theThing = {
    longStr: new Array(1e8).join("*"),
    someMethod: function() {
      console.log("a");
    },
  };

  global.gc();
  console.log(process.memoryUsage().heapUsed);
};

setInterval(replaceThing, 100);
