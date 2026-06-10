// Ejercicio 01: Variables y constantes - videojuegos shooter
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 01: Variables y constantes");

// Escribe tu solucion aqui.

const jugador = "ShadowReaper";
const arma = "AK-47";
let vida = 100;
let municion = 30;
let partidaActiva = true;

console.log("=== PARTIDA INICIADA ===");
console.log(`Jugador: ${jugador}`);
console.log(`Arma equipada: ${arma}`);
console.log(`Vida: ${vida} HP`);
console.log(`Munición: ${municion} balas`);
console.log(`Estado: ${partidaActiva ? "En combate" : "Finalizada"}`);

// Simulación de disparo
municion -= 5;
vida -= 12;

console.log("\n--- Después de un enfrentamiento ---");
console.log(`Munición restante: ${municion}`);
console.log(`Vida actual: ${vida} HP`);

// Reto extra: Validación de munición crítica
if (municion <= 8) {
    console.log("⚠️ Munición baja, recarga recomendada");
}
