
// Paso 1: Configuración inicial (Scope Global)

// Estas variables viven en el scope global, accesibles desde cualquier función.
const PUNTOS_PARA_GANAR = 11;

let puntosJugadorA = 0;
let puntosJugadorB = 0;



// Paso 2: Definición de Funciones (function, parametros, return)


/**
 * Función que simula la anotación de un punto para un jugador.
 * @param {string} jugador - El nombre o letra del jugador ('A' o 'B')
 */
function anotarPunto(jugador) {
    // Las variables 'jugador' y 'mensaje' tienen Scope de Bloque/Función (solo existen aquí adentro)
    let mensaje = ""; 

    if (jugador.toUpperCase() === "A") {
        puntosJugadorA++;
        mensaje = `🏓 ¡Punto para el Jugador A! (${puntosJugadorA} - ${puntosJugadorB})`;
    } else if (jugador.toUpperCase() === "B") {
        puntosJugadorB++;
        mensaje = `🏓 ¡Punto para el Jugador B! (${puntosJugadorA} - ${puntosJugadorB})`;
    } else {
        mensaje = "⚠️ Intento de anotación inválido. Especifica jugador 'A' o 'B'.";
    }

    console.log(mensaje);
}

/**
 * Función que verifica si ya existe un ganador legítimo según las reglas.
 * @return {boolean} - True si el juego ha terminado, False si continúa.
 */
function verificarFinDelJuego() {
    // Regla estándar: Se gana con 11 puntos y una ventaja mínima de 2 puntos
    const diferenciaGoles = Math.abs(puntosJugadorA - puntosJugadorB);

    if (puntosJugadorA >= PUNTOS_PARA_GANAR && puntosJugadorA > puntosJugadorB && diferenciaGoles >= 2) {
        return true;
    }
    if (puntosJugadorB >= PUNTOS_PARA_GANAR && puntosJugadorB > puntosJugadorA && diferenciaGoles >= 2) {
        return true;
    }

    return false; // El juego debe continuar
}

/**
 * Genera el mensaje final detallando quién es el ganador.
 * @return {string} - Texto formateado con el resultado.
 */
function obtenerMensajeFinal() {
    if (puntosJugadorA > puntosJugadorB) {
        return `🏆 ¡El JUGADOR A es el ganador absoluto del partido! Marcador final: ${puntosJugadorA} - ${puntosJugadorB}`;
    } else {
        return `🏆 ¡El JUGADOR B es el ganador absoluto del partido! Marcador final: ${puntosJugadorB} - ${puntosJugadorA}`;
    }
}



// 🟪 Reto extra: Validación y dato extra (¿Quién saca?)

/**
 * Determina a quién le corresponde el servicio (saque) según el puntaje actual.
 * En Pingpong, el saque cambia cada 2 puntos. Si empatan a 10 (deuce), cambia cada 1.
 * @return {string} - Mensaje indicando el turno de saque.
 */
function determinarTurnoDeSaque() {
    const puntuacionTotal = puntosJugadorA + puntosJugadorB;
    
    // Regla de deuce (Empate a 10 o más)
    if (puntosJugadorA >= 10 && puntosJugadorB >= 10) {
        // Cambia en cada punto individual
        return puntuacionTotal % 2 === 0 ? "Servicio: Jugador A" : "Servicio: Jugador B";
    }

    // Regla normal: cambia cada 2 puntos totales.
    // Dividimos los puntos totales entre 2, y el residuo de la división entera nos dice el turno.
    const ciclosDeSaque = Math.floor(puntuacionTotal / 2);
    return ciclosDeSaque % 2 === 0 ? "Servicio: Jugador A" : "Servicio: Jugador B";
}



// Paso 3: Simulación de una partida intensa

console.log("--- 🏓 INICIA EL PARTIDO DE PINGPONG ---");
console.log(`Regla: Gana el primero en llegar a ${PUNTOS_PARA_GANAR} con ventaja de 2.\n`);

// Simulación de puntos consecutivamente
anotarPunto("A"); // 1 - 0
anotarPunto("A"); // 2 - 0
anotarPunto("B"); // 2 - 1
console.log(`💡 ${determinarTurnoDeSaque()}\n`); // Verificamos quién saca

// Llevamos el partido a una situación reñida (Empate a 10 para probar el Deuce)
puntosJugadorA = 10;
puntosJugadorB = 10;
console.log("--- ⏳ AVANCE RÁPIDO DEL PARTIDO (EMPATADOS EN DEUCE) ---");
console.log(`Marcador actual: ${puntosJugadorA} - ${puntosJugadorB}`);
console.log(`¿El juego terminó?: ${verificarFinDelJuego()}`);
console.log(`💡 ${determinarTurnoDeSaque()}\n`);

// Jugador A anota (11 - 10). No gana aún porque no tiene la ventaja de 2 puntos.
anotarPunto("A"); 
console.log(`¿El juego terminó?: ${verificarFinDelJuego()}`); // Debería dar false
console.log(`💡 ${determinarTurnoDeSaque()}\n`);

// Jugador A anota de nuevo (12 - 10). ¡Ahora sí cumple las condiciones de victoria!
anotarPunto("A");

// Evaluación final del juego
if (verificarFinDelJuego()) {
    console.log("\n=========================================");
    console.log(obtenerMensajeFinal());
    console.log("=========================================");
}