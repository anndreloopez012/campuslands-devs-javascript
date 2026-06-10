const nombreJugador = "CeoSmiling";
const armaPrincipal = "Subfusil MP5";

// Estado Inicial
let vida = 100;
let municion = 30;
let estaEnPartida = true;

console.log("--- Inicio de la partida ---");
console.log(`Jugador: ${nombreJugador} | Arma: ${armaPrincipal}`);
console.log(`Vida: ${vida}% | Munición: ${municion}`);

// Simulacion de acciones

//haciendo daño
console.log("\n--- Acción: Disparando ---");
municion -= 1;
console.log(`Munición restante: ${municion}`);

//recibiendo daño
console.log("\n--- Acción: Recibiendo daño ---");
vida -= 20;
console.log(`Vida actual: ${vida}%`);

// Reto Extra
let tieneEscudo = true;
let danoRecibido = 20;

if (tieneEscudo) {
    danoRecibido = danoRecibido / 2;
    console.log("¡El escudo absorbió parte del daño!");
}
vida -= danoRecibido;

// Resultado final
console.log("\n--- Estado Final ---");
console.log(`Estado: ${estaEnPartida ? "Activo" : "Eliminado"}`);