class Fraction(var nominator: Int, var denominator: Int) {
  val gcd = _gcd(nominator, denominator)
  nominator = nominator/gcd
  denominator = denominator/gcd

  def this() = this(1, 1)

  def _gcd(a: Int, b: Int): Int =
    if (a == b)
      a
    else if (a > b)
      _gcd(a-b, b)
    else
      _gcd(a, b-a)

  def add(other: Fraction): Fraction =
    new Fraction(nominator*other.denominator + other.nominator*denominator, denominator*other.denominator)

  def mul(other: Fraction): Fraction =
    new Fraction(nominator*other.nominator, denominator*other.denominator)

  override def toString() = s"$nominator / $denominator"
}


object Compute extends App {
  val half = new Fraction(1, 2)
  val onethird = new Fraction(1, 3)
  val twothird = new Fraction(2, 3)
  println(half)

  val f1 = half.add(onethird)
  println(f1)

  val f2 = half.add(twothird)
  println(f2)

  val f3 = new Fraction(6, 76)
  println("6 / 76 = ", f3)

  val f4 = half.mul(twothird)
  println(f4)
}

