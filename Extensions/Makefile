.PHONY: clean check-syntax
.SUFFIXES: .hpp .cpp .o
CC		= g++
CFLAGS	= -Wall -O3 -fPIC

all: main libfunstuff.so

main: main.o book.o person.o
	$(CC) -o main main.o book.o person.o

libfunstuff.so: book.o person.o
	$(CC) -shared -Wl,-soname,funstuff.so.0 -o funstuff.so.0.0.1 book.o person.o -lc

.cpp.o:
	$(CC) -c $(CFLAGS) -o $@ $<

clean:
	rm -f nul *~ main main.o book.o person.o

check-syntax:
	$(CC) -o nul -S ${CHK_SOURCES}
