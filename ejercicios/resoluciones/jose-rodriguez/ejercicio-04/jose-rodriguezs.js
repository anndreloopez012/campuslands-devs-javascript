// Ejercicio 04: Condicionales if/else - videojuegos de futbol
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 04: Condicionales if/else");

// 1. VARIABLES (ESTADO DEL MARCADOR)
// Imaginemos que controlamos los goles de nuestro equipo (local) vs el rival (visitante)

const golesMiEquipo = 1;
const golesRival = 2;

//2. LOGICA DE CONTROL (IF /ELSE IF /ELSE)
let resultadoPartido;

if (golesMiEquipo > golesRival) {
    // si los goles son mayores que los del rival
    resultadoPartido = "¡Ganamos el partido!";
} else if (golesMiEquipo < golesRival) {
    // Si los goles son menores que los del rival 
    resultadoPartido = "Perdimos el partido.";
} else {
    // Si los goles son iguales (empate)
    resultadoPartido = "Empatamos el partido.";
}

// 3. MUESTRA DE RESULTADOS (INTERPOLACION)

console.log("=== TABLERO DE RESULTADOS ===");
console.log(`Goles de mi equipo: [${golesMiEquipo}] vs Goles del rival: [${golesRival}]`);
console.log(`Resultado final: ${resultadoPartido}`);
console.log("============================");