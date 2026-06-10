// Ejercicio 12: Fechas y Math - paracaidismo
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 12: Fechas y Math");

// Escribe tu solucion aqui.

const fechaActual = new Date()

const dia = fechaActual.getDate()
const mes = fechaActual.getMonth() + 1;
const año = fechaActual.getFullYear()
const hora = fechaActual.getHours()
const minutos = fechaActual.getMinutes()

const alturaMinima = 2000;
const alturaMaxima = 5000;
const alturaAleatoria = Math.random() * (alturaMaxima - alturaMinima) + alturaMinima
const alturaFinal = Math.round(alturaAleatoria)

const tiempoCaidaLibre = Math.round(Math.random() * (60 - 30) + 30)

console.log("=== BITÁCORA DE PARACAIDISMO ===")
console.log("Fecha del salto:", dia, "/", mes, "/", año)
console.log("Hora de despegue:", hora, ":", minutos)

console.log("\n=== DATOS DEL TELEMETRÍA ===");
console.log("Altura de lanzamiento:", alturaFinal, "metros sobre el nivel del mar.")
console.log("Tiempo estimado de caída libre:", tiempoCaidaLibre, "segundos.")

// extra: validación de seguridad aeromédica
console.log("\n=== PROTOCOLO DE SEGURIDAD ===");
const limiteOxigeno = 4000;

if (alturaFinal > limiteOxigeno) {
  console.log("Validación: Salto de alta altitud. Se activó el sistema de oxígeno suplementario en la cabina.");
} else {
  console.log("Validación: Altitud estándar de salto. Respiración autónoma permitida.");
}