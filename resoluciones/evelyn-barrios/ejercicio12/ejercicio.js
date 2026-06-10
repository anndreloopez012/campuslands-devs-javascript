// Ejercicio 12: Fechas y Math - paracaidismo
// Completa el codigo siguiendo las instrucciones del README.md.
console.log("--- Registro de Salto en Paracaídas ---");

// Escribe tu solucion aqui.
const momentoActual = new Date();
const fecha = momentoActual.toLocaleDateString();
const hora = momentoActual.toLocaleTimeString();

const alturaSalto = Math.floor(Math.random() * (4000 - 1000 + 1)) + 1000;
const tiempoCaida = Math.floor(Math.random() * (60 - 30 + 1)) + 30;

console.log(`Detalles del Salto:`);
console.log(`------------------------------`);
console.log(`Fecha: ${fecha}`);
console.log(`Hora: ${hora}`);
console.log(`Altura: ${alturaSalto} metros`);
console.log(`Caída libre: ${tiempoCaida} segundos`);
if (alturaSalto > 3500) {
    console.log("AVISO: Salto de gran altitud. Verificando niveles de oxígeno...");
} else {
    console.log("Altura estándar confirmada para aterrizaje seguro.");
}
console.log(`------------------------------`);