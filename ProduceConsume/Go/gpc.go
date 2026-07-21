package main

import (
	"fmt"
)

func producer(ch chan int) {
	for i := 0; i < 10; i++ {
		ch <- i
	}
	close(ch)
}

func consumer(ch chan int) {
	for {
		val, ok := <-ch
		if ok {
			fmt.Println(val)
		} else {
			break
		}
	}
}
func main() {
	ch := make(chan int, 1)
	go producer(ch)
	go consumer(ch)
	fmt.Scanln()
}
