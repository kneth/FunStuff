import random

N = 100

a = []
for i in range(13):
    a += [0]
for _ in range(N):
    t1 = random.randint(1, 6)
    t2 = random.randint(1, 6)
    a[t1+t2] += 1

for i in range(2, 13):
    print(i, a[i], a[i]/float(N))

