// Compile: tsc pi.js
// Run    : node pi.js

const nsteps: number = 500
var nhits: number = 0

var i: number = 0
while (i < nsteps) {
    var x: number = Math.random()
    var y: number = Math.random()
    if (x*x+y*y < 1) {
        nhits++
    }
    i++
}
console.log('PI = ', 4.0*nhits/nsteps)