// Ejercicio 09: Funciones - pingpong

// Funcion para calcular quien gana
function determinarGanador(puntosA, puntosB) {
    if (puntosA > puntosB) {
        return "Jugador A gana el set";
    } else if (puntosB > puntosA) {
        return "Jugador B gana el set";
    } else {
        return "Es un empate";
    }
}

// Funcion para mostrar el marcador
function mostrarMarcador(puntosA, puntosB) {
    console.log(`Marcador final: A: ${puntosA} - B: ${puntosB}`);
    console.log(determinarGanador(puntosA, puntosB));
}

// Ejecucion
mostrarMarcador(11, 8);
mostrarMarcador(5, 11);

// Reto extra
function esSetFinalizado(puntosA, puntosB) {
    return puntosA >= 11 || puntosB >= 11;
}

console.log(`¿El set terminó?: ${esSetFinalizado(11, 8)}`);