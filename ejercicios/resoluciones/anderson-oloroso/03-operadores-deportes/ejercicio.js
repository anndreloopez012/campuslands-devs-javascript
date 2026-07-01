// Ejercicio 03: Operadores matematicos - deportes
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 03: Operadores matematicos");

// Escribe tu solucion aqui.

console.log("========== OPERADORES MATEMATICOS ==========")

let golesE1 = 3
let golesE2 = 6

const ptsGol = 5

console.log("Goles equipo 1: ", golesE1)
console.log("Puntos equipo 1: ", golesE1*ptsGol)

console.log("Goles equipo 2: ", golesE2)
console.log("Puntos equipo 2: ", golesE2*ptsGol)

let promedio
promedio = ((golesE1*ptsGol) + (golesE2*ptsGol))/2

let porcentajeE1
porcentajeE1 = (golesE1*ptsGol)*(golesE2*ptsGol)/100

let porcentajeE2
porcentajeE2 = (golesE2*ptsGol)*(golesE1*ptsGol)/100

console.log("Promedio:", promedio )
console.log("Porcentaje equipo 1: ", porcentajeE1)
console.log("Porcentaje equipo 2: ", porcentajeE2)
