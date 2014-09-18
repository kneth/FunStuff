#!/usr/bin/python

import random
import math

nsteps = 500

nhits = 0
for _ in range(nsteps):
    x = random.uniform(0.0, 1.0)
    y = random.uniform(0.0, 1.0)
    if math.sqrt(x*x+y*y) < 1.0:
        nhits = nhits+1
print("PI = ", 4.0*nhits/nsteps)
