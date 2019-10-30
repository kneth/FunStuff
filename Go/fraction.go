package main

import (
	"fmt"
)

type Fraction struct {
	numerator int
	denominator int
}

func _gcd(a int, b int) int {
	if (a == b) {
		return a
	} else {
		if (a > b) {
			return _gcd(a - b, b)
		} else {
			return _gcd(a, b - a)
		}
	}
}

func (f1 Fraction) add(f2 Fraction) Fraction {
	var n, d, gcd int
	var f Fraction

	n = f1.denominator * f2.numerator + f1.numerator * f2.denominator
	d = f1.denominator * f2.denominator
	gcd = _gcd(n, d)

	f.numerator = n / gcd
	f.denominator = d / gcd

	return f
}


func main() {
	f1 := Fraction{numerator: 1, denominator: 3}
	f2 := Fraction{numerator: 2, denominator: 5}
	var f3 = f1.add(f2)

	fmt.Printf("%d / %d\n", f3.numerator, f3.denominator)
}
