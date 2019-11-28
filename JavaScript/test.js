const Fraction = require('./fraction');

var onehalf = new Fraction(1, 2);
var twothird = new Fraction(2, 3);
console.log(onehalf.toString() + ' + ' + twothird.toString() + ' = ' + onehalf.add(twothird).toString());
console.log(onehalf.toString() + ' / ' + twothird.toString() + ' = ' + onehalf.div(twothird).toString());

var almost_pi = new Fraction(22, 7);
var two = new Fraction(2, 1);
console.log(almost_pi.toString() + ' * ' + two.toString() + ' = ' + almost_pi.mul(two));

var f = onehalf.div(twothird);
console.log('f = ' + f.toString() + ' ~= ' + f.toNumber());