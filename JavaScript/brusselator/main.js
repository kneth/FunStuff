// Simulation of Brusselator

const math = require("mathjs");

const A = 1;
const B = 3;

function brussel(t, c) {
    X = c[0];
    Y = c[1];

    dX = A + X*X*Y - B*X - X;
    dY = B*X - X*X*Y;
    return [dX, dY];
}

let sol = math.solveODE(brussel, [0, 30], [1.0, 1.0], { method: "RK23" });
let n = sol.t.length;
for(let i = 0; i < n; i++) {
    console.log(`${sol.t[i]}, ${sol.y[i][0]}, ${sol.y[i][1]}`);
}
