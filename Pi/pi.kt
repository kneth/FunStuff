// Compiling: kotlinc pi.kt -include-runtime -d pi.jar
// Running:   java -jar pi.jar

fun main(args: Array<String>) {
    val nsteps: Int = 5000

    var nhits: Int = 0
    for(i in 1..nsteps) {
        var x: Double = Math.random()
        var y: Double = Math.random()

        if (x*x+y*y < 1) {
            nhits++
        }
    }

    var pi: Double = 4.0*nhits/nsteps
    println("PI = $pi")
}
