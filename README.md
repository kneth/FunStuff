FunStuff
========

A place for all the fun stuff I do.

GNU-Parallel
------------
GNU Parallel is a program for running command-line tools in parallel.

map.pl and reduce.pl implement a Map/Reduce analysis of the flight data set. You run the analysis
using the command:

    cat On_Time_Performance_1H2012.csv | parallel --pipe --blocksize 64M ./map.pl | ./reduce.pl

LEGO
----
Various experiments with LEGO Mindstorm.


Comal
-----
Retrocomputing in COMAL-80 (using OpenComal).


Misc
----
Just a collection of small programs.

* hailstone.c: generating hailstone series (see http://en.wikipedia.org/wiki/Collatz_conjecture)