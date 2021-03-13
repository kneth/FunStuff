pub struct Fraction {
    numerator: i64,
    denominator: i64,
}

impl Fraction {

    fn gcd(a: i64, b: i64) -> i64 {
        if a == b {
            return a;
        } else {
            if a > b {
                return Fraction::gcd(a-b, b)
            } else {
                return Fraction::gcd(a, b-a)
            }
        }
    }

    fn new(numerator: i64, denominator: i64) -> Fraction {
        let d = Fraction::gcd(numerator, denominator);
        return Fraction {
            numerator: numerator / d,
            denominator: denominator /d
        };
    }

    pub fn add(&self, f: &Fraction) -> Fraction {
        return Fraction::new(
            self.numerator*f.denominator + f.numerator*self.numerator,
            self.denominator*f.denominator
        );
    }

    pub fn print(&self) {
        println!("{} / {}", self.numerator, self.denominator);
    }
}



fn main() {
    let f1 = Fraction::new(1, 2);
    let f2 = Fraction::new(2, 3);
    let f3 = f1.add(&f2);

    f1.print();
    f2.print();
    f3.print();
}
