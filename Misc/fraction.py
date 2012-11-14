#
# Simple implementation of fractions
#
# (C) Copyright 2012 by Kenneth Geisshirt <http://kenneth.geisshirt.dk/>
# 

class Fraction():
    def _gcd(self, a, b):
        if a == b:
            return a
        else:
            if a > b:
                return self._gcd(a-b, b)
            else:
                return self._gcd(a, b-a)

    def __init__(self, numerator, denominator):
        gcd = self._gcd(numerator, denominator)
        self.numerator = numerator/gcd
        self.denominator = denominator/gcd

    def __attr__(self, name):
        if name == "numerator":
            return self.numerator
        else:
            if name == "denominator":
                return self.denominator
            else:
                print "Wrong argument"
                return 0

    def __mul__(self, f):
        return Fraction(self.numerator*f.numerator, self.denominator*f.denominator)
    
    def __add__(self, f):
        return Fraction(self.denominator*f.numerator+f.denominator*self.numerator, self.denominator*f.denominator)

    def __str__(self):
        return str(self.numerator) + "/" + str(self.denominator)


if __name__ == '__main__':
    x = Fraction(4, 6)
    y = Fraction(7, 8)
    print("x  : " + str(x))
    print("y  : " + str(y.numerator) + " and " + str(y.denominator))
    z1 = x*y
    print("z1 : " + str(z1))
    z2 = x+y
    print("z2 : " + str(z2))
