// Ejercicio 04: Condicionales if/else - videojuegos de futbol
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 04: Condicionales if/else");

// Escribe tu solucion aqui.

console.log("========== Condiciones if/else ==========");
console.log("Videojuegos de futbol");

let equipo1 = "Barcelona";
let golesEquipo1 = 2;

let equipo2 = "Real Madrid";
let golesEquipo2 = 2;

let resultado 

if (golesEquipo1 > golesEquipo2) {
    resultado = "Gana " + equipo1;
} else if (golesEquipo2 > golesEquipo1) {
    resultado = "Gana " + equipo2;
} else {
    resultado = "Empate";
}

console.log("Equipo 1: ", equipo1)
console.log("Goles Equipo 1: ", golesEquipo1)
console.log("Equipo 2: ", equipo2)
console.log("Goles Equipo 2: ", golesEquipo2)

console.log(resultado);