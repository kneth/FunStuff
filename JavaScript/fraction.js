function Fraction(x, y) {

    var that = this;

    function gcd(a, b) {
        if (a === b) {
            return a;
        } else {
            if (a > b) {
                return gcd(a-b, b);
            } else {
                return gcd(a, b-a);
            }
        }
    }

    var d = gcd(x, y);
    this._numerator = x/d;
    this._denominator = y/d;
};

Fraction.prototype.toString = function () {
    return this._numerator.toString() + "/" + this._denominator.toString();
}

Fraction.prototype.add = function (f) {
    return new Fraction(this._denominator*f._numerator+f._denominator*this._numerator, this._denominator*f._denominator);
};

Fraction.prototype.sub = function (f) {
    return new Fraction(this._denominator*f._numerator-f._denominator*this._numerator, this._denominator*f._denominator);
};

Fraction.prototype.mul = function (f) {
    return new Fraction(this._numerator*f._numerator, this._denominator*f._denominator);
};

Fraction.prototype.div = function (f) {
    return new Fraction(this._numerator*f._denominator, this._denominator*f._numerator);
};

var onehalf = new Fraction(1, 2);
var twothird = new Fraction(2, 3);
console.log(onehalf.toString() + ' + ' + twothird.toString() + ' = ' + onehalf.add(twothird).toString());
console.log(onehalf.toString() + ' / ' + twothird.toString() + ' = ' + onehalf.div(twothird).toString());

var almost_pi = new Fraction(22, 7);
var two = new Fraction(2, 1);
console.log(almost_pi.toString() + ' * ' + two.toString() + ' = ' + almost_pi.mul(two));