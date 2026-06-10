// Ejercicio 04: Condicionales if/else - videojuegos de futbol
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 04: Condicionales if/else");

// Escribe tu solucion aqui.

// Variables de goles y estadísticas del partido virtual
const golesHalconesDorados = 3
const golesInterCosmos = 2

const posesionHalcones = 80

console.log("=== MARCADOR FINAL ===");
console.log("Halcones Dorados:", golesHalconesDorados, "-", "Inter Cosmos:", golesInterCosmos);


if (golesHalconesDorados > golesInterCosmos) {
  console.log("Resultado: VICTORIA")
  console.log("Felicidades, has llegado a una de las cumbres del exito")

} 
else if (golesHalconesDorados === golesInterCosmos) {
  console.log("Resultado: EMPATE")
  console.log("Has trabajado muy bien")

} 
else {
  console.log("Resultado: DERROTA")
  console.log("Bien, debes de mejorar tus habilidades en el próximo partido")
}

// extra: validación de rendimiento
console.log("\n=== ANÁLISIS TÁCTICO ===")
console.log("Posesión de balón de Halcones Dorados:", posesionHalcones, "%")

if (posesionHalcones > 50) {
  console.log("Estilo de juego: Dominante. Controlaste el ritmo del partido.")
} 
else if (posesionHalcones < 50) {
  console.log("Estilo de juego: Contragolpe. Cediste la iniciativa al rival.")
} 
else {
  console.log("Estilo de juego: Equilibrado. Disputa intensa en el medio campo.")
}