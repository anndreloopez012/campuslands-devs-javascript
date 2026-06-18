
const nombreJugador = "Alex";
let arma = "rifle-de-asalto";
let vida = 100;
let municion = 55;

// dato extra 
let kills = 7;

// validacion de datos
if (nombreJugador) {
    if (vida > 0) {
        console.log(`El jugador ${nombreJugador} está vivo con ${vida} HP.`);
        console.log(`nombre del jugador ${nombreJugador}`);
        console.log(`arma del jugador ${arma}`);
        console.log(`vida del jugador ${vida}`);
        console.log(`municion del jugador ${municion}`);
        console.log(`kils del jugador ${kills}`);
    } else {
        console.log(`el jugador ${nombreJugador} esta muerto`)
    }
} else {
    console.log(`el jugador no existe`)
}