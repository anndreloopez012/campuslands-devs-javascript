// Ejercicio 01: Variables y constantes - videojuegos shooter
console.log("Ejercicio 01: Variables y constantes");

// 1. Datos iniciales (Constantes y Variables)
const nombreJugador = "Alpha_Ranger";
const arma = "Rifle de Asalto MK-4";
const maxMunicion = 30;
const maxVida = 100;

let vidaActual = maxVida;
let municionActual = maxMunicion;
let partidaActiva = true;

// Reto Extra (Datos adicionales)
let puntuacion = 0;
let multiplicador = 1.0;
let escudoActual = 50; 

// 2. Estado Inicial
console.log("Jugador: " + nombreJugador + " | Arma: " + arma);
console.log("Partida: " + (partidaActiva ? "EN CURSO" : "TERMINADA"));
console.log("Vida: " + vidaActual + "/" + maxVida + " | Escudo: " + escudoActual);
console.log("Munición: " + municionActual + "/" + maxMunicion);

// 3. Simulación de Combate (Operaciones)
municionActual -= 3; 
escudoActual -= 30;
puntuacion += 150;
multiplicador = 1.5;

// 4. Estado Actualizado
console.log("Estado Actualizado:");
console.log("Vida: " + vidaActual + " | Escudo: " + escudoActual);
console.log("Munición: " + municionActual + " | Score: " + puntuacion + " x" + multiplicador);

// 5. Validación adicional (Reto extra)
if (vidaActual <= 0) {
    partidaActiva = false;
    console.log("GAME OVER: Eliminado.");
} else {
    console.log("La partida continúa.");
}