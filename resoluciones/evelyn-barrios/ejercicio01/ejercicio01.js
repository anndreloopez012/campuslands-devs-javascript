// Ejercicio 01: Variables y constantes - videojuegos shooter
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 01: Variables y constantes");

// --- Parámetros de la Misión (Constantes) ---
const MAPA_ACTUAL = "Sector Delta";
const MUNICION_CARGADOR = 32;

// --- Datos del Jugador (Variables) ---
let aliasJugador = "Evelyn_Sniper";
let saludJugador = 100;
let balasRestantes = 32;
let puntosDeExperiencia = 0;
let estaActivo = true;

// --- Interfaz de Usuario (Consola) ---
console.log("--- SISTEMA DE COMBATE INICIALIZADO ---");
console.log(`Mapa: ${MAPA_ACTUAL} | Soldado: ${aliasJugador}`);
console.log(`Estado Físico: ${saludJugador}% | Balas: ${balasRestantes}/${MUNICION_CARGADOR}`);
console.log(`XP Acumulada: ${puntosDeExperiencia} | ¿Misión en curso?: ${estaActivo}`);
