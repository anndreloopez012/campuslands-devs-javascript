// Ejercicio 03: Operadores matematicos - deportes
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 03: Operadores matematicos");

// Escribe tu solucion aqui.

// Ejercicio 03: estadisticas de un partido de baloncesto

let puntosEquipoA = 95;
let puntosEquipoB = 88;
let tirosIntentoA = 80;
let tirosAnotadosA = 40;

// suma
let puntosTotales = puntosEquipoA + puntosEquipoB;

// resta
let diferencia = puntosEquipoA - puntosEquipoB;

// multiplicacion
let proyeccionPuntosA = puntosEquipoA * 4;

// division
let promedioPorCuarto = puntosEquipoA / 4;

// modulo
let esPar = puntosEquipoA % 2 === 0;

console.log("--- Estadísticas del Partido ---");
console.log(`Puntos totales: ${puntosTotales}`);
console.log(`Diferencia de puntos: ${diferencia}`);
console.log(`Puntos promedio por cuarto: ${promedioPorCuarto}`);
console.log(`¿Puntos equipo A es par?: ${esPar}`);

// Reto extra
let efectividad = (tirosAnotadosA / tirosIntentoA) * 100;
console.log(`Efectividad de tiro: ${efectividad}%`);