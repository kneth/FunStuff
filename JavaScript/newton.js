// Simple Newton-Raphson solution of the equation v(t) = 100/3.6 where v(t) = 54.15*tanh(0.1813*t)

function Newton(f, x0, h, eps) {
    function dfdt(f, x, h) {
        return (f(x+h) - f(x-h))/(2.0*h);
    };

    let i = 0;
    x_n = x0;
    x_old = x0;

    while (true) {
        df = dfdt(f, x_n, h);
        x_old = x_n;
        x_n = x_n - f(x_n)/df;
        if (Math.abs(x_n - x_old) < eps) {
            return {
                x: x_n,
                iterations: i+1
            };
        }
        if (i > 10) {
            return undefined;
        }
        i++;
    }
}

function f(t) {
    return 54.16*Math.tanh(0.1813*t) - 100/3.6;
}

const solution = Newton(f, 2, 0.001, 0.001);

console.log(`t = ${solution.x} in ${solution.iterations} iterations`);
