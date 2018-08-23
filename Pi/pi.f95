! Estimate PI
! Compile: gfortran pi.f95
! Execute: ./a.out

program picalc
implicit none
integer :: n, i, hits
real :: x, y, pi

n = 10000
i = 1
hits = 0
do
    if (i == n) then
        exit
    end if
    call RANDOM_NUMBER(x)
    call RANDOM_NUMBER(y)
    if (x*x+y*y < 1.0) then
        hits = hits + 1
    end if
    i = i + 1
end do

pi = 4.0*hits/n
print*, "Pi = ", pi

end program picalc