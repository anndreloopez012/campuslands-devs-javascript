// Ejercicio 04: Condicionales if/else - videojuegos de futbol
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 04: Condicionales if/else");

// Escribe tu solucion aqui.

// input de goles anotados por ambos equipos

let goles_equipo1 = parseInt(prompt("goles equipo 1:"));
let goles_equipo2 = parseInt(prompt("goles equipo 2:"));

//condicionales para determinar el resultado del partido

if (goles_equipo1 > goles_equipo2) {
    console.log("Equipo 1 gana");
} else if (goles_equipo2 > goles_equipo1) {
    console.log("Equipo 2 gana");
} else {
    console.log("Empate");
}

