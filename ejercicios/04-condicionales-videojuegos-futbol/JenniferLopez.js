// Ejercicio 04: Condicionales if/else - videojuegos de futbol
console.log("Ejercicio 04: Condicionales if/else");
const golEquipo1=6;
const golEquipo2=3;
console.log(`\n Fin del partido | Marcador: Barcelona ${golEquipo1} - ${golEquipo2} Real Madrid \n`);

if (golEquipo1 > golEquipo2) {
    console.log("¡VICTORIA PARA EL BARCELONA! Suma 6 puntos en al torneo.");
} 
else if (golEquipo1 === golEquipo2) {
    console.log(" ¡EMPATE! Ambos equipos se llevan 1 punto.");
} 
else {
    console.log(" ¡DERROTA para el Barcelona! No suma puntos en esta jornada.");
}

console.log("\n--- REPORTE DEL MÁNAGER  ---");

if (golEquipo1 - golEquipo2 >= 3) {
    console.log("¡Increible! El equipo dio una goleada histórica.");
} else {
    console.log("Partido cerrado. Buen esfuerzo en la cancha.");
}