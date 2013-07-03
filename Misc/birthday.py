import datetime

freq = []
for i in range(0, 7):
    freq += [0]
for i in range(0, 100):
    d = datetime.date(1969+i, 3, 12)
    freq[d.weekday()] += 1
print freq
