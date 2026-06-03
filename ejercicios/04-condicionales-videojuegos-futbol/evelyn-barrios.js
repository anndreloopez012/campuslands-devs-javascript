// Ejercicio 04: Condicionales if/else - videojuegos de futbol
// Completa el codigo siguiendo las instrucciones del README.md.


console.log("Ejercicio 04: Condicionales if/else");


// Escribe tu solucion aqui.


//solucion Evelyn Barrios


const golesLocal = 3;
const golesVisita = 1;


console.log("Marcador actual: " + golesLocal + " - " + golesVisita);


if (golesLocal > golesVisita) {
   console.log("Resultado: Victoria del equipo local");
} else if (golesVisita > golesLocal) {
   console.log("Resultado: Victoria del equipo visita");
} else {
   console.log("Resultado: Empate");
}


const esFinal = true;
if (golesLocal == golesVisita && esFinal == true) {
   console.log("Reto Extra: El partido se define por penaltis");
}
