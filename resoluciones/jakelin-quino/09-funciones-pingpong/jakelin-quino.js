// Ejercicio 09: Funciones - pingpong
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 09: Funciones");

// -----------------SOLUCIÓN-----------------
console.log("-----------------------------------------------------");
function formatearMarcador(puntosA, puntosB) {
    return `Marcador actual -> Jugador A: ${puntosA} pts | Jugador B: ${puntosB} pts`;
}

function determinarGanador(puntosA, puntosB) {
    const puntosParaGanar = 11;
    if (puntosA >= puntosParaGanar && puntosA - puntosB >= 2) {
        return "¡Jugador A gana el set!";
    } else if (puntosB >= puntosParaGanar && puntosB - puntosA >= 2) {
        return "¡Jugador B gana el set!";
    } else {
        return "El set continúa en juego.";
    }
}

let jugadorA = 0;
let jugadorB = 0;

jugadorA += 5;
jugadorB += 3;
console.log(formatearMarcador(jugadorA, jugadorB));
console.log(determinarGanador(jugadorA, jugadorB));
console.log("-------------------------------------");

jugadorA = 11;
jugadorB = 9;
console.log(formatearMarcador(jugadorA, jugadorB));
console.log(determinarGanador(jugadorA, jugadorB));
console.log("-------------------------------------");

function verificarReglaDeuce(puntosA, puntosB) {
    if (puntosA === 10 && puntosB === 10) {
        return "Se requiere una ventaja de 2 puntos para ganar.";
    }
    return "Flujo normal de juego.";
}

console.log("=== SISTEMA DE ARBITRAJE ===");
let puntosDeuceA = 10;
let puntosDeuceB = 10;
console.log(formatearMarcador(puntosDeuceA, puntosDeuceB));
console.log(verificarReglaDeuce(puntosDeuceA, puntosDeuceB));
console.log("-----------------------------------------------------");