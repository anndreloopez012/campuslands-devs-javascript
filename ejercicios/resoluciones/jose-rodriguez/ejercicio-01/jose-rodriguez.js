// Ejercicio 01: Variables y constantes - videojuegos shooter
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 01: Variables y constantes");

// ==========================================
// CONFIGURACIÓN DEL ESTADO INICIAL DEL JUEGO
// ==========================================

// El nombre del jugador es constante, no cambia durante la sesión
const jugador = "Neo_Break"; 

// Estas variables cambiarán a lo largo del juego, usamos 'let'
let arma = "Rifle de Plasma";
let vida = 100;
let municion = 30;
let estadoPartida = "En Progreso"; // Puede ser "En Progreso", "Victoria" o "Game Over"

// ==========================================
// IMPRESIÓN EN CONSOLA
// ==========================================
console.log("=== ESTADO DE LA PARTIDA ===");
console.log(`Jugador: ${jugador}`);
console.log(`Arma equipada: ${arma}`);
console.log(`Puntos de Vida: ${vida} HP`);
console.log(`Munición restante: ${municion} balas`);
console.log(`Estado actual: ${estadoPartida}`);
console.log("============================");