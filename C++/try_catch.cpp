// clang++ -std=c++14 -g try_catch.cpp ; ./a.out

#include <functional>
#include <type_traits>
#include <exception>
#include <iostream>

template <typename T> struct identity { using type = T; };
template <typename T> using non_deduced = typename identity<T>::type;
template <typename T>
T try_catch(non_deduced<std::function<T(void)>> func) {
	try {
		return func();
	}
	catch (std::exception& e) {
		std::cerr << "exception: " << e.what() << "\n";
	}
	return static_cast<T>(0);
}

int can_return() {
	return try_catch<int>([]() {
		return 1;
	});
}

int main(int argc, char* argv[]) {
	try_catch<void>([] () {
		std::cout << "no worries\n";
	});

	try_catch<void>([]() {
		throw std::runtime_error("Oops");
		std::cout << "never reached\n";
	});

	std::cout << "Final try " << try_catch<int>([] { return -1; }) << "\n"; 
} 