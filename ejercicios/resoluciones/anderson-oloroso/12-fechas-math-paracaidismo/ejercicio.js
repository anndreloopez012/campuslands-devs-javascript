// Ejercicio 12: Fechas y Math - paracaidismo
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 12: Fechas y Math");

// Escribe tu solucion aqui.

console.log("========== Fechas y Math - paracaidismo ==========");

const altura = Math.floor(Math.random() * (4000 - 800 + 1)) + 800
const tiempo = +(Math.random() * (300 - 30) + 30).toFixed(1)
const fecha = new Date()

console.log(`Altura: ${altura} metros`)
console.log(`Tiempo de caída: ${tiempo} segundos`)
console.log(`Fecha: ${fecha.toLocaleDateString()}`)