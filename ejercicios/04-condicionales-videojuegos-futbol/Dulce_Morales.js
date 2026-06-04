// 04. Condicionales if/else - Videojuegos de fútbol

// 1. Datos iniciales y Reto extra (Estado del juego)
const misGoles = 3;
const golesRival = 1;
const tarjetaRoja = false; 

let resultado = "";
let puntos = 0;

// 2. Estructura condicional (Comparaciones)
if (misGoles > golesRival) {
    resultado = "VICTORIA";
    puntos = 3;
} else if (misGoles === golesRival) {
    resultado = "EMPATE";
    puntos = 1;
} else {
    resultado = "DERROTA";
    puntos = 0;
}

// 3. Mostrar resultados en consola
console.log("Resultado: " + resultado);
console.log("Puntos obtenidos: " + puntos);

// 4. Validación adicional (Reto extra)
if (tarjetaRoja) {
    console.log("Sanción: Jugador suspendido para el próximo partido");
} else {
    console.log("Sanción: Sin amonestaciones graves");
}