// Ejercicio 09: Funciones - pingpong
console.log("Ejercicio 09: Funciones");

//Recibe los sets ganados y nos devuelve un mensaje con el marcador
function crearMarcadorMensaje(jugador1, jugador2, setsJ1, setsJ2) {
    return `Marcador Actual: ${jugador1} [${setsJ1}] vs [${setsJ2}] ${jugador2}`;
}

// Función 2: Recibe los sets y nos devuelve quién es el ganador
function obtenerGanador(jugador1, jugador2, setsJ1, setsJ2) {
    if (setsJ1 > setsJ2) {
        return jugador1;
    } else if (setsJ2 > setsJ1) {
        return jugador2;
    } else {
        return "Empate momentáneo";
    }
}

console.log("\n --- TORNEO DE PING-PONG ---");

const j1 = "Jennifer";
const j2 = "David";
const estadoPartido = crearMarcadorMensaje(j1, j2, 3, 1);
console.log(estadoPartido);

const ganadorDelJuego = obtenerGanador(j1, j2, 3, 1);
console.log(` El ganador definitivo es: ${ganadorDelJuego}`);

console.log("\n--- REVISIÓN DE PUNTOS DE SET---");

function esSetTerminado(puntos) {
    return puntos >= 11; // 
    
}

console.log(`¿Un set con 8 puntos ya terminó?: ${esSetTerminado(8)}`);
console.log(`¿Un set con 11 puntos ya terminó?: ${esSetTerminado(11)}`);
