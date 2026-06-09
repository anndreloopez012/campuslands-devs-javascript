// Ejercicio 12: Fechas y Math - paracaidismo
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 12: Fechas y Math");

// --------------------SOLUCIÓN--------------------
const fechaSalto = new Date();
const fechaFormateada = fechaSalto.toLocaleDateString("es-ES");
const horaFormateada = fechaSalto.toLocaleTimeString("es-ES");
const alturaAleatoria = Math.random() * (4000 - 3000) + 3000;
const alturaRedondeada = Math.round(alturaAleatoria);
const velocidadCaida = Math.round(Math.random() * (220 - 180) + 180);

console.log("-----------------------------------------------------");
console.log("REPORTE DE CAÍDA LIBRE");
console.log(`Fecha del salto: ${fechaFormateada}`);
console.log(`Hora de salida:  ${horaFormateada}`);
console.log(`Altura inicial:  ${alturaRedondeada} metros`);
console.log(`Velocidad max:   ${velocidadCaida} km/h`);
console.log("-----------------------------------------------------");

if (alturaRedondeada > 3500) {
    console.log("ALERTA: Salto de gran altitud. Sistema de oxígeno activado.");
} else {
    console.log("Altura estándar. Condiciones de oxígeno estables.");
}
console.log("=====================================================");