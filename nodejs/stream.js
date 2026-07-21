const fs = require('node:fs');
const rr = fs.createReadStream('foo.csv');
rr.on('readable', () => {
  const lines = rr.read().toString().split();
  console.log(`readable: ${rr.read()}`);
});
rr.on('end', () => {
  console.log('end');
}); 
