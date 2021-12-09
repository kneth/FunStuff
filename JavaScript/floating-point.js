function FloatingPoint(s, e) {
    this._s = s;
    this._e = e;
}

FloatingPoint.prototype.toNumber = function () {
    return this._s * Math.pow(2, this._e);
}

FloatingPoint.prototype.toString = function () {
    return `${this._s} 2^${this._e}`;
}

FloatingPoint.prototype.mul = function(fp) {
    let s = this._s * fp._s;
    let e = this._e + fp._e;
    return new FloatingPoint(s, e);
}

FloatingPoint.prototype.add = function(fp) {
    let s = 0;
    let e = 0;

    if (this._e > fp._e) {
        e = fp._e;
        s = (this._s << (this._e - fp._e)) + fp._s;
    } else {
        e = this._e;
        s = this._s + (fp._s << (fp._e - this._e));
    }

    return new FloatingPoint(s, e);
}

FloatingPoint.prototype.sqrt = function() {
    // TODO
}

let half = new FloatingPoint(1, -1);
console.log(`half = ${half.toNumber()}`);

let fp1 = new FloatingPoint(123, 4);
let fp2 = new FloatingPoint(321, 5);
let fp3 = fp1.mul(fp2);
let fp4 = fp1.add(fp2);

let x1 = fp1.toNumber();
let x2 = fp2.toNumber();
let x3 = x1 * x2;
let x4 = x1 + x2;

console.log(`fp3 = ${fp3.toString()} = ${fp3.toNumber()}; x3 = ${x3}`);
console.log(`fp4 = ${fp4.toString()} = ${fp4.toNumber()}; x4 = ${x4}`);


