import random

antal_ens = 0
for _ in range(0, 5000000):
    centicubes =  ['H', 'H', 'R', 'R']
    random.shuffle(centicubes)
    c1 = centicubes.pop(random.randint(0, len(centicubes)-1))
    c2 = centicubes.pop(random.randint(0, len(centicubes)-1))
    if c1 == c2:
        antal_ens += 1
print antal_ens/5000000.0


