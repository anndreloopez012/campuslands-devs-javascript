// Ejercicio 03: Operadores matemáticos - deportes
console.log("Ejercicio 03: Operadores matemáticos");

// 1. Datos iniciales
const equipoA = "Águilas";
const equipoB = "Tiburones";
const totalCuartos = 4;

const totalPuntosA = 22 + 18 + 25 + 30;
const totalPuntosB = 15 + 24 + 20 + 22;

// 2. Cálculos (Suma, Resta, División, Multiplicación, Porcentaje y Módulo)
const diferenciaPuntos = totalPuntosA - totalPuntosB;
const promedioPuntosA = totalPuntosA / totalCuartos;
const proyeccionA = totalPuntosA * 2;
const porcentajeUltimoCuartoA = (30 / totalPuntosA) * 100;
const esParTotalA = totalPuntosA % 2 === 0;

// 3. Resultados en consola
console.log("Partido: " + equipoA + " vs " + equipoB);
console.log(equipoA + ": " + totalPuntosA + " | " + equipoB + ": " + totalPuntosB);
console.log("Diferencia: " + diferenciaPuntos);
console.log("Promedio " + equipoA + ": " + promedioPuntosA.toFixed(2));
console.log("Porcentaje último cuarto: " + porcentajeUltimoCuartoA.toFixed(1) + "%");
console.log("Proyección 2 partidos: " + proyeccionA);

// 4. Reto Extra (Validaciones)
if (totalPuntosA > totalPuntosB) {
    console.log("Ganador: " + equipoA);
} else if (totalPuntosB > totalPuntosA) {
    console.log("Ganador: " + equipoB);
} else {
    console.log("Resultado: Empate");
}
console.log("¿Puntaje de " + equipoA + " es par?: " + (esParTotalA ? "Sí" : "No"));