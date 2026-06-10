//Puntos de cada equipo
let azulitos = 6;
let rojitos = 4;

// Promedio
let promedio = (azulitos + rojitos) / 2;
console.log("El promedio es de los equipos es de", promedio)

//Diferencia
let diferencia = azulitos - rojitos 
console.log("La diferencia de puntos entre los equipos es de", diferencia)

//Porcentaje
let puntos = azulitos + rojitos 
let porcentajeazulitos = (azulitos / puntos) * 100
console.log("El porcentaje de los puntos del equipo azulitos es de", porcentajeazulitos + "%")

let porcentajerojitos = (rojitos / puntos) * 100
console.log("El porcentaje de los puntos del equipo azulitos es de", porcentajerojitos + "%")

//Validacion 
if(azulitos >= 5){
  console.log("El ganador es el equipo azulito")
}else if (rojitos >= 5){
  console.log("El ganador es el equipo rojitos")
}else{
  console.log("Hay uun empate por parte de los equipos")
}