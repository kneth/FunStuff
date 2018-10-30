import numpy as np


for n in range(1, 26):
    A = np.ndarray([n, n])

    # A is a Hilbert matrix: https://en.wikipedia.org/wiki/Hilbert_matrix
    for i in range(n):
        for j in range(n):
            A[i, j] = 1.0/(i + j + 1)
    print(n, np.linalg.det(A))
