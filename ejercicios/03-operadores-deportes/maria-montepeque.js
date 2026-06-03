// Ejercicio 03: Operadores matematicos - deportes
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 03: Operadores matematicos");

// Escribe tu solucion aqui.

const local = "Tigres", visitante = "Aguilas";
const ptsLocal = 89, ptsVisitante = 76, cuartos = 4;

const total = ptsLocal + ptsVisitante;
const diferencia = ptsLocal - ptsVisitante;
const promedio = ptsLocal / cuartos;
const resto = ptsLocal % cuartos;
const porcentaje = (ptsLocal / total) * 100;

console.log(`${local} ${ptsLocal} - ${ptsVisitante} ${visitante}`);
console.log(`Total: ${total} | Diferencia: ${diferencia} | Promedio local/cuarto: ${promedio}`);
console.log(`Resto (modulo): ${resto} | Porcentaje local: ${porcentaje.toFixed(1)}%`);
console.log(ptsLocal === ptsVisitante ? "Empate" : `Gana ${ptsLocal > ptsVisitante ? local : visitante}`);