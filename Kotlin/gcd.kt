fun gcd(a: Int, b: Int) : Int {
    if (a == b) {
        return a
    } else {
        if (a > b) {
            return gcd(a-b, b)
        } else {
            return gcd(a, b-a)
        }
    }
}

fun main(args: Array<String>) {
    if (args.size != 2) {
        println("2 arguments required")
        return
    }

    var a: Int = args[0].toInt()
    var b: Int = args[1].toInt()
    var d: Int = gcd(a, b)
    println("Dominator: $d")
}