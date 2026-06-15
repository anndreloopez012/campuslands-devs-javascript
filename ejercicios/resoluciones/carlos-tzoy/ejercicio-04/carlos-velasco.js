const golesEqupio1 = 2
const golesEqupio2 = 3
console.log("--- Estadística por Goles ---");
console.log(`equipo 1: ${golesEqupio1} goles`);
console.log(`equipos 2 : ${golesEqupio2} goles`);

if (golesEqupio1 > golesEqupio2) {
    console.log("Resultado: El equipo 1 ganó la comparativa de goles.");
} else if (golesEqupio1< golesEqupio2) {
    console.log("Resultado: El equipo 2 ganó la comparativa de goles.");
} else {
    console.log("Resultado: Empate técnico en cantidad de goles.");
}