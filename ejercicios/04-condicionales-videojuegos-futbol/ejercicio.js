// Ejercicio 04: Condicionales if/else - videojuegos de futbol

console.log("Ejercicio 04: Condicionales if/else");

// Goles del jugador y del rival
let golesJugador = 3;
let golesRival = 2;

// Comparar resultados
if (golesJugador > golesRival) {
    console.log("¡Victoria! Ganaste el partido.");
} else if (golesJugador === golesRival) {
    console.log("Empate. El partido terminó igualado.");
} else {
    console.log("Derrota. El rival ganó el partido.");
}

// Reto extra
let tirosAlArco = 8;

if (tirosAlArco >= 5) {
    console.log("Buen rendimiento ofensivo.");
} else {
    console.log("Debes mejorar los ataques al arco.");
}
