#include <any>
#include <iostream>

int main() {
	std::boolalpha(std::cout);

	std::any a0;
	std::any a1 = 42;
	std::any a2 = nullptr;

	std::cout << "a0 " << a0.has_value() << "\n";
	std::cout << "a1 " << a1.has_value() << "\n";
	std::cout << "a2 " << a2.has_value() << "\n";
}
