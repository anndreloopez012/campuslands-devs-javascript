// Ejercicio 09: Funciones - pingpong
// Completa el codigo siguiendo las instrucciones del README.md.


console.log("Ejercicio 09: Funciones");


// Escribe tu solucion aqui.


//solucion Evelyn Barrios


function calcularMarcador(puntos) {
   return puntos;
}


function definirGanador(p1, p2) {
   if (p1 > p2) {
       return "Jugador A";
   } else {
       return "Jugador B";
   }
}


const puntosA = calcularMarcador(21);
const puntosB = calcularMarcador(15);
const ganador = definirGanador(puntosA, puntosB);


console.log("Marcador Final: " + puntosA + " - " + puntosB);
console.log("El trofeo es para: " + ganador);


if (puntosA >= 21) {
   console.log("Reto Extra: El Jugador A alcanzo el puntaje maximo del set.");
}

