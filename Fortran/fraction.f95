! Fractions in fortran
! compile: gfortran fraction.f95
! execute: ./a.out

module fraction_aritmetic
    type fraction
        integer numerator, denominator
    end type
    interface assignment (=)
        module procedure assign_fraction
    end interface
    interface operator (+)
        module procedure add_fractions
    end interface
    interface operator (-)
        module procedure sub_fractions
    end interface
    interface operator (*)
        module procedure mul_fractions
    end interface
    interface operator (/)
        module procedure div_fractions
    end interface

    contains
        recursive function gcd(a, b) result(res)
            integer, intent(in) :: a, b
            integer res

            if (a == b) then
                res = a
            else
                if (a > b) then
                    res = gcd(a -b, b)
                else
                    res = gcd(a, b - a)
                end if
            end if
        end function gcd

        subroutine assign_fraction(f1, f2)
            type(fraction), intent(in) :: f2
            type(fraction), intent(out) :: f1

            f1%numerator = f2%numerator
            f1%denominator = f2%denominator
        end subroutine assign_fraction

        function create_fraction(a, b)
            integer, intent(in) :: a, b
            type(fraction) create_fraction
            integer d
            d = gcd(a, b)
            create_fraction%numerator = a / d
            create_fraction%denominator = b /d
        end function create_fraction

        function add_fractions(a, b)
            type(fraction), intent(in) :: a, b
            type(fraction) add_fractions
            integer d
            add_fractions%numerator = a%denominator * b%numerator + b%denominator * a%numerator
            add_fractions%denominator = a%denominator * b%denominator
            d = gcd(add_fractions%numerator, add_fractions%denominator)
            add_fractions%numerator = add_fractions%numerator / d
            add_fractions%denominator = add_fractions%denominator / d
        end function add_fractions

        function sub_fractions(a, b)
            type(fraction), intent(in) :: a, b
            type(fraction) sub_fractions
            integer d
            sub_fractions%numerator = a%denominator * b%numerator - b%denominator * a%numerator
            sub_fractions%denominator = a%denominator * b%denominator
            d = gcd(sub_fractions%numerator, sub_fractions%denominator)
            sub_fractions%numerator = sub_fractions%numerator / d
            sub_fractions%denominator = sub_fractions%denominator / d
        end function sub_fractions

        function mul_fractions(a, b)
            type(fraction), intent(in) :: a, b
            type(fraction) mul_fractions
            integer d
            mul_fractions%numerator = a%numerator * b%numerator
            mul_fractions%denominator = b%denominator * b%denominator
            d = gcd(mul_fractions%numerator, mul_fractions%denominator)
            mul_fractions%numerator = mul_fractions%numerator / d
            mul_fractions%denominator = mul_fractions%denominator /d
        end function mul_fractions

        function div_fractions(a, b)
            type(fraction), intent(in) :: a, b
            type(fraction) div_fractions
            integer d
            div_fractions%numerator = a%numerator * b%denominator
            div_fractions%denominator = a%denominator * b%numerator
            d = gcd(div_fractions%numerator, div_fractions%denominator)
            div_fractions%numerator = div_fractions%numerator / d
            div_fractions%denominator = div_fractions%denominator / d
        end function div_fractions

        subroutine write_fraction(f)
            type(fraction), intent(in) :: f
            print *, f%numerator, " / ", f%denominator
        end subroutine write_fraction
end module fraction_aritmetic


program fractest
    use fraction_aritmetic
    type(fraction) :: f1, f2, f3

    f1 = create_fraction(1, 3)
    f2 = create_fraction(5, 7)
    f3 = create_fraction(4, 10)

    call write_fraction(f3)
    call write_fraction(f1 + f2)
    call write_fraction(f1 - f2)
    call write_fraction(f1 * f2)
    call write_fraction(f1 / f2)
end program fractest