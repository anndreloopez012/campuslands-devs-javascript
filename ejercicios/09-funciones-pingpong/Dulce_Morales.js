// 09. Funciones - Pingpong

// 1. Función para calcular la suma total de puntos (Parámetros y Return)
function calcularTotalPuntos(puntosSet1, puntosSet2) {
    return puntosSet1 + puntosSet2;
}

// 2. Función para determinar el ganador del partido (Scope local y condicionales)
function determinarGanador(puntosJugadorA, puntosJugadorB) {
    if (puntosJugadorA > puntosJugadorB) {
        return "Jugador A";
    } else if (puntosJugadorB > puntosJugadorA) {
        return "Jugador B";
    } else {
        return "Empate transitorio";
    }
}

// 3. Función para mostrar el mensaje final en consola
function mostrarMensajeFinal(ganador, totalA, totalB) {
    console.log("--- Resultado del Partido ---");
    console.log("Total Jugador A: " + totalA + " puntos");
    console.log("Total Jugador B: " + totalB + " puntos");
    console.log("Ganador oficial: " + ganador);
}

// 4. Ejecución del programa y flujo de datos
const scoreSet1_A = 11;
const scoreSet2_A = 11;
const scoreSet1_B = 8;
const scoreSet2_B = 9;

const totalA = calcularTotalPuntos(scoreSet1_A, scoreSet2_A);
const totalB = calcularTotalPuntos(scoreSet1_B, scoreSet2_B);

const ganadorDelMatch = determinarGanador(totalA, totalB);

mostrarMensajeFinal(ganadorDelMatch, totalA, totalB);

// 5. Validación adicional: Regla de ventaja por 2 puntos (Reto extra)
function validarDiferenciaMinima(puntosA, puntosB) {
    const diferencia = Math.abs(puntosA - puntosB);
    console.log("\n--- Validación de Reglamento ---");
    console.log("Diferencia de puntos: " + diferencia);
    
    if (diferencia >= 2) {
        console.log("Validación: El resultado cumple con la ventaja mínima requerida de 2 puntos.");
    } else {
        console.log("Validación: El set no ha terminado, se requiere una ventaja de 2 puntos.");
    }
}

validarDiferenciaMinima(totalA, totalB);