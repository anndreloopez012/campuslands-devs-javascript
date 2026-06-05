// Ejercicio 09: Funciones - pingpong
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 09: Funciones");

// Escribe tu solucion aqui.


function puntos(jugador, puntos) {
  return `${jugador}: ${puntos} pts`;
}

function ganador(j1, p1, j2, p2) {
  if (p1 === p2) return "Empate";
  return p1 > p2 ? j1 : j2;
}

function mensajeFinal(j1, p1, j2, p2) {
  const winner = ganador(j1, p1, j2, p2);
  return `${puntos(j1, p1)} | ${puntos(j2, p2)} → Ganador: ${winner}`;
}

// Validación extra: puntuación máxima en pingpong es 11 (o más en deuce)
function marcadorValido(p1, p2) {
  return p1 >= 0 && p2 >= 0 && Math.max(p1, p2) <= 21;
}

// Prueba
console.log(mensajeFinal("Ana", 11, "Luis", 7));
console.log(mensajeFinal("Ana", 9, "Luis", 11));
console.log(mensajeFinal("Ana", 10, "Luis", 10));
console.log("¿Marcador válido?", marcadorValido(11, 7));