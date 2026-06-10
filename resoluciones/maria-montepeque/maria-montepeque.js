// Ejercicio 09: Funciones - pingpong

console.log("Ejercicio 09: Funciones");

// Escribe tu solucion aqui.

function ganador(p1, p2) {
  return p1 > p2 ? "Jugador 1" : "Jugador 2";
}

function gano(p1, p2) {
  return Math.max(p1, p2) >= 11 && Math.abs(p1 - p2) >= 2;
}

function mensajeFinal(p1, p2) {
  if (!gano(p1, p2)) return `Sigue el juego: ${p1} - ${p2}`;
  return `Gana ${ganador(p1, p2)} con ${Math.max(p1, p2)} - ${Math.min(p1, p2)}`;
}

console.log(mensajeFinal(11, 7));
console.log(mensajeFinal(10, 9));
console.log(mensajeFinal(13, 11));
