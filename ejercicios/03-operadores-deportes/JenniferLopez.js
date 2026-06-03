// Ejercicio 03: Operadores matematicos - deportes
console.log("Ejercicio 03: Operadores matematicos");

const puntosGanador = 102;
const puntosPerdedor = 88;
const triplesAnotados = 12;

//resultados
console.log("\n--- ESTADÍSTICAS DEL PARTIDO --- ");

console.log(`Marcador Final: ${puntosGanador} - ${puntosPerdedor}`);
console.log(`Total de puntos anotados: ${puntosGanador + puntosPerdedor}`); 
console.log(`Diferencia de puntos: ${puntosGanador - puntosPerdedor}`); 
console.log(`Puntos anotados en triples: ${triplesAnotados * 3}`);
console.log(`Promedio de puntos (Ganador): ${puntosGanador / 4}`); // División

console.log(`¿El puntaje del ganador es par?: ${puntosGanador % 2 === 0}`); // Módulo