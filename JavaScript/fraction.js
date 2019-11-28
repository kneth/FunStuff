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

Fraction.prototype.toNumber = function () {
    return this._numerator / this._denominator;
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

module.exports = Fraction;