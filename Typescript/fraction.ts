class Fraction {
    readonly numerator: number
    readonly denominator: number

    constructor(numerator: number, denominator: number) {
        this.numerator = numerator
        this.denominator = denominator
    }

    _gcd(a: number, b: number) {
        if (a === b) {
            return a
        } else {
            if (a > b) {
                return this._gcd(a-b, b)
            } else {
                return this._gcd(a, b-a)
            }
        }
    }

    public add(f : Fraction) : Fraction {
        return new Fraction(this.denominator*f.numerator+f.denominator*this.numerator, this.denominator*f.denominator)
    }

    public mult(f: Fraction) : Fraction {
        return new Fraction(this.numerator*f.numerator, this.denominator*f.denominator)
    }
    public toString() : string {
        return `${this.numerator} / ${this.denominator}`
    }
}

let half = new Fraction(1, 2)
let twothird = new Fraction(2, 3)

console.log(half.add(twothird).toString())
console.log(half.mult(twothird).toString())