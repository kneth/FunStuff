function leak() {
  const obj = { };
  global.gc();
  console.log(process.memoryUsage().heapUsed);
}

setInterval(leak, 10);
