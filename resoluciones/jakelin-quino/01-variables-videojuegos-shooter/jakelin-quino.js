// Ejercicio 01: Variables y constantes - videojuegos shooter
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 01: Variables y constantes");

// ------------------ SOLUCIÓN--------------------
const nombreJugador = "Jaks";
const tipoArma = "Rifle de Asalto";
const maximaMunicion = 30;
let puntosVida = 100;
let municionActual = 30;
let partidaActiva = true;

console.log("\n------------------------------------\n");
console.log("=== ESTADO INICIAL DE LA PARTIDA ===");
console.log(`Jugador: ${nombreJugador}`);
console.log(`Arma equipada: ${tipoArma}`);
console.log(`Vida: ${puntosVida} HP`);
console.log(`Munición: ${municionActual}/${maximaMunicion}`);
console.log(`¿Partida en curso?: ${partidaActiva}`);
console.log("\n------------------------------------\n");

console.log("... El jugador entra en combate ...");
municionActual = municionActual - 3;
puntosVida = puntosVida - 45;

console.log("=== ESTADO DESPUÉS DEL COMBATE ===");
console.log(`Munición restante: ${municionActual}/${maximaMunicion}`);
console.log(`Vida restante: ${puntosVida} HP`);
console.log("\n------------------------------------\n");

const saludCritica = 20;
console.log("=== ESTADO DE SALUD ===");
if (puntosVida <= saludCritica) {
    console.log("¡ALERTA! Vida crítica.");
} else {
    console.log("Estable.");
}
console.log("\n------------------------------------\n")