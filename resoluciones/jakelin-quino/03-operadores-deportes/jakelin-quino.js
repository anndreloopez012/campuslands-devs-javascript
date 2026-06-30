// Ejercicio 03: Operadores matematicos - deportes
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 03: Operadores matematicos");

//--------------SOLUCIÓN-----------------

const partidoUnoAzules = 3;
const partidoDosAzules = 2;
const partidoTresAzules = 1;

const partidoUnoRojos = 2;
const partidoDosRojos = 2;
const partidoTresRojos = 3;

const totalPuntosAzules = partidoUnoAzules + partidoDosAzules + partidoTresAzules;
const totalPuntosRojos = partidoUnoRojos + partidoDosRojos + partidoTresRojos;

const totalPuntos = totalPuntosAzules + totalPuntosRojos;
const diferenciaPuntos = totalPuntosRojos - totalPuntosAzules;

const promedioPuntosAzules = totalPuntosAzules / 3;
const porcentajePuntosAzules = (totalPuntosAzules / totalPuntos) * 100;

const promedioPuntosRojos = totalPuntosRojos / 3;
const porcentajePuntosRojos = (totalPuntosRojos / totalPuntos) * 100;

console.log("---------------------------------------------");
console.log("Estadísticas Azules vs Rojos");
console.log("---------------------------------------------");
console.log("Estadísticas del Equipo Azul");
console.log("Puntos obtenidos en el partido uno: " + partidoUnoAzules);
console.log("Puntos obtenidos en el partido dos: " + partidoDosAzules); 
console.log("Puntos obtenidos en el partido tres: " + partidoTresAzules);
console.log("Puntos totales del equipo azul: " + totalPuntosAzules);
console.log("Promedio de puntos por partido (equipo azul): " + promedioPuntosAzules);
console.log("Porcentaje de puntos del equipo azul: " + porcentajePuntosAzules.toFixed(2) + "%");

console.log("---------------------------------------------");
console.log("Estadísticas del Equipo Rojo");
console.log("Puntos obtenidos en el partido uno: " + partidoUnoRojos);
console.log("Puntos obtenidos en el partido dos: " + partidoDosRojos);
console.log("Puntos obtenidos en el partido tres: " + partidoTresRojos);
console.log("Puntos totales del equipo rojo: " + totalPuntosRojos);
console.log("Promedio de puntos por partido (equipo rojo): " + promedioPuntosRojos);
console.log("Porcentaje de puntos del equipo rojo: " + porcentajePuntosRojos.toFixed(2) + "%");
console.log("---------------------------------------------");

console.log("Diferencia de puntos entre los equipos: " + diferenciaPuntos);