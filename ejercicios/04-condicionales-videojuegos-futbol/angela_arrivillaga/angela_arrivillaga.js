// Ejercicio 04: condicionales en videojuegos de futbol

let golesEquipoLocal = 2;
let golesEquipoVisitante = 1;

// Comparaciones
if (golesEquipoLocal > golesEquipoVisitante) {
    console.log("¡Victoria para el equipo local!");
} else if (golesEquipoLocal < golesEquipoVisitante) {
    console.log("¡Victoria para el equipo visitante!");
} else {
    console.log("El partido terminó en empate.");
}

// Reto extra: validacion de tiempo extra
let esFinalDeTorneo = true;

if (golesEquipoLocal === golesEquipoVisitante && esFinalDeTorneo) {
    console.log("¡Se requieren penaltis para definir al campeón!");
} else if (golesEquipoLocal === golesEquipoVisitante) {
    console.log("Partido amistoso, termina en empate.");
}