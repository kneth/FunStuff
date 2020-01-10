const iterations = 1000;

let nhits = 0;
for (let i = 0; i < iterations; i++) {
    let x = Math.random();
    let y = Math.random();
    if (x*x+y*y < 1) {
        nhits++;
    }
}

console.log('Pi = ', 4.0 * nhits/iterations);