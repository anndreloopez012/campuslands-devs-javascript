// Ejercicio 04: Condicionales if/else - videojuegos de futbol
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 04: Condicionales if/else");

// ------------------SOLUCIÓN------------------
let equipo1 = "Barcelona";
let equipo2 = "Real Madrid";
let golesEquipo1 = 5;
let golesEquipo2 = 2;

console.log("------------------------")
console.log("RESULTADOS DEL PARTIDO:")
console.log("Barcelona: " + golesEquipo1 + " goles");
console.log("Real Madrid: " + golesEquipo2 + " goles");
if (golesEquipo1 > golesEquipo2) {
    console.log("El equipo " + equipo1 + " gana el partido.");
    console.log("El equipo " + equipo2 + " pierde el partido.");
} else if (golesEquipo2 > golesEquipo1) {
    console.log("El equipo " + equipo2 + " gana el partido.");
    console.log("El equipo " + equipo1 + " pierde el partido.");
} else {
    console.log("El partido termina en empate.");
}

console.log("------------------------")
console.log("POSESIÓN DEL BÁLON:")
console.log("------------------------")
let posesionEquipo1 = 60;
let posesionEquipo2 = 40;
console.log("Barcelona: " + posesionEquipo1 + "% de posesión");
console.log("Real Madrid: " + posesionEquipo2 + "% de posesión");
if (posesionEquipo1 > posesionEquipo2) {
    console.log("El equipo " + equipo1 + " tiene más posesión del balón.");
} else if (posesionEquipo2 > posesionEquipo1) {
    console.log("El equipo " + equipo2 + " tiene más posesión del balón.");
} else {
    console.log("Ambos equipos tienen la misma posesión del balón.");
}
console.log("------------------------")