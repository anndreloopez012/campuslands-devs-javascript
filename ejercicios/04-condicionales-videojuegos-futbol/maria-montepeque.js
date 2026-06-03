// Ejercicio 04: Condicionales if/else - videojuegos de futbol
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 04: Condicionales if/else");

// Escribe tu solucion aqui.

const local = "FC Barcelona", visitante = "Real Madrid";
const golesLocal = 3, golesVisitante = 1;

console.log(`${local} ${golesLocal} - ${golesVisitante} ${visitante}`);

if (golesLocal > golesVisitante) {
    console.log(`Victoria de ${local}`);
} else if (golesLocal < golesVisitante) {
    console.log(`Derrota de ${local}, gana ${visitante}`);
} else {
    console.log("Empate");
}

const diferencia = Math.abs(golesLocal - golesVisitante);
if (diferencia >= 3) console.log(`Goleada por ${diferencia} goles!`);