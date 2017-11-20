class Fraction(var numerator: Int, var denominator: Int) {
    init {
        val gcd = _gcd(numerator, denominator)
        numerator = numerator/gcd
        denominator = denominator/gcd
    }    

    fun _gcd(a: Int, b: Int) : Int {
        if (a == b) {
            return a
        } else {
            if (a > b) {
                return _gcd(a-b, b)
            } else {
                return _gcd(a, b-a)
            }
        }
    }

    infix fun plus(f: Fraction): Fraction {
        return Fraction(this.numerator*f.denominator+this.denominator*f.numerator, this.denominator*f.denominator)
    }

    infix fun mult(f: Fraction): Fraction {
        return Fraction(this.numerator*f.numerator, this.denominator*f.denominator)
    }

    override fun toString() : String {
        return "${this.numerator} / ${this.denominator}"
    }
}

fun main(args: Array<String>) {
    var half: Fraction = Fraction(1, 2)
    var onethird: Fraction = Fraction(1, 3)
    var twothird: Fraction = Fraction(2, 3)

    var f1 = half plus onethird
    println("f1 = $f1")
    
    var f2 = half plus twothird
    println("f2 = $f2")

    var f3: Fraction = Fraction(6, 76)
    println("6 / 76 = $f3")

    var f4 = half mult twothird
    println("f4 = $f4")
}