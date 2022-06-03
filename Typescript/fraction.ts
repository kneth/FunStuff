class Fraction {
    readonly numerator: number
    readonly denominator: number

    constructor(numerator: number, denominator: number) {
        let d = this._gcd(numerator, denominator)
        this.numerator = numerator / d
        this.denominator = denominator / d
    }

    _gcd(a: number, b: number) : number {
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
let onethird = new Fraction(1, 3)
let f = new Fraction(6, 76)

console.log(half.add(twothird).toString())
console.log(half.mult(twothird).toString())
console.log(half.mult(onethird).toString())
console.log(f.toString())
