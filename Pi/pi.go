package main

import (
	"fmt"
	"math/rand"
)

func main() {
	var iterations = 10000000
	var nhits = 0

	rng := rand.New(rand.NewSource(99))
	for i := 0; i < iterations; i++ {
		var x = rng.Float32()
		var y = rng.Float32()
		if (x*x + y*y <= 1.0) {
			nhits++
		}
	}

	var pi = 4.0 * float32(nhits) / float32(iterations)
	fmt.Printf("%g\n", pi)
}
