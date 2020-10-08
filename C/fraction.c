#include <stdio.h>
#include <stdlib.h>

typedef struct fraction {
    unsigned long numerator;
    unsigned long demoninator;
} fraction_t;

unsigned long _gcd(unsigned long a, unsigned long b) {
    if (a == b) {
        return a;
    }
    else {
        if (a > b) {
            return _gcd(a - b, b);
        } else {
            return _gcd(a, b - a);
        }
    }
}

fraction_t *f_alloc(unsigned long numerator, unsigned long demoninator) {
    fraction_t *frac = (fraction_t *)malloc(sizeof(fraction_t));

    unsigned long d = _gcd(numerator, demoninator);

    frac->numerator = numerator / d;
    frac->demoninator = demoninator / d;

    return frac;
}

void f_free(fraction_t *frac) {
    free((void *)frac);
}

void f_print(fraction_t *frac) {
    printf("%lu / %lu", frac->numerator, frac->demoninator);
}

fraction_t *f_add(fraction_t *f1, fraction_t *f2) {

    unsigned long numerator = f1->numerator*f2->demoninator + f1->demoninator*f2->numerator;
    unsigned long demoninator = f1->demoninator * f2->demoninator;

    return f_alloc(numerator, demoninator);
}

int main(int argc, char *argv[]) {
    fraction_t *f1 = f_alloc(1, 2);
    fraction_t *f2 = f_alloc(2, 3);
    fraction_t *f3 = f_add(f1, f2);

    f_print(f1);
    printf(" + ");
    f_print(f2);
    printf(" = ");
    f_print(f3);
    printf("\n");

    f_free(f3);
    f_free(f2);
    f_free(f1);
}