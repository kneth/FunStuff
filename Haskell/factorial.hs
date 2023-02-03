pfact :: Integer -> Integer
pfact n = product [1 .. n]

rfact :: Integer -> Integer
rfact n
  | n == 1 = 1
  | otherwise = n * rfact(n - 1)
