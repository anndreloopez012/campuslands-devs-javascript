// Ejercicio 03: Operadores matematicos - deportes
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 03: Operadores matematicos");

// Escribe tu solucion aqui.

// Marcador del Clásico Chapín
let golesCremas = 3;
let golesRojos = 1;

// Cálculos usando operadores aritméticos
let totalGoles = golesCremas + golesRojos;      
let diferenciaGoles = golesCremas - golesRojos; 
let puntosObtenidos = 1 * 3;             
let promedioGolesPorTiempo = totalGoles / 2;
let esMarcadorPar = totalGoles % 2 === 0;      

// Resultados en consola
console.log("--- ESTADÍSTICAS DEL PARTIDO ---");
console.log(`Marcador Final: Cremas ${golesCremas} - Rojos ${golesRojos}`);
console.log(`Total de anotaciones: ${totalGoles}`);
console.log(`Diferencia de goles: ${diferenciaGoles}`);
console.log(`Promedio por cada tiempo: ${promedioGolesPorTiempo} goles`);
console.log(`¿El total de goles es par?: ${esMarcadorPar ? "Sí" : "No"}`);