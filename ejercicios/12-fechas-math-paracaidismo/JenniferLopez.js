// Ejercicio 12: Fechas y Math - paracaidismo
console.log("Ejercicio 12: Fechas y Math");

const fechaActual = new Date();

const fechaFormateada = fechaActual.toLocaleDateString();
const horaFormateada = fechaActual.toLocaleTimeString();

const alturaSalto = Math.round(Math.random() * (4000 - 1000) + 1000);

const tiempoCaidaLibre = Math.round(Math.random() * (60 - 30) + 30);

let reporteSeguridad = " Apertura normal del paracaídas principal.";

if (alturaSalto <= 1500) {
    reporteSeguridad = " ¡ADVERTENCIA! Altura crítica. Se activó el sistema de apertura automática de emergencia (CYPRES).";
}

console.log("\n --- REPORTE OFICIAL DE SALTO TÁNDEM ---");
console.log(` Fecha del salto : ${fechaFormateada}`);
console.log(`  Hora de salida  : ${horaFormateada}`);
console.log(`  Altura del salto: ${alturaSalto} metros`);
console.log(` Caída libre     : ${tiempoCaidaLibre} segundos`);

console.log("\n--- BITÁCORA DE SEGURIDAD (Reto Extra) ---");
console.log(reporteSeguridad);

