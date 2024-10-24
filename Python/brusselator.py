#!/usr/bin/env python3
# Simulator of Brusselator

import matplotlib.pyplot as plt
import numpy as np
from scipy.integrate import solve_ivp

A = 1
B = 3


def brussel(t, c):
    X = c[0]
    Y = c[1]

    dX = A + X*X*Y - B*X - X
    dY = B*X - X*X*Y
    return [dX, dY]


sol = solve_ivp(brussel, [0, 30], [1.0, 1.0], dense_output=True)

t = np.linspace(0, 30, 300)
z = sol.sol(t)
plt.plot(t, z.T)
plt.xlabel('t')
plt.legend(['x', 'y'], shadow=True)
plt.title('Brusselator')
plt.show()
