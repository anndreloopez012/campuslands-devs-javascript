// Ejercicio 12: Fechas y Math - paracaidismo
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 12: Fechas y Math");

// Escribe tu solucion aqui.

// fecha de salto
const fechaSalto = new Date();
const fechaFormateada = fechaSalto.toLocaleDateString("es-ES", {
    day: '2-digit', month: 'long', year: 'numeric'
});

// datos aleatorios usando math
// altura
const altura = Math.round(Math.random() * (4500 - 3000) + 3000);

// tiempo
const tiempoCaida = Math.round(Math.random() * (60 - 45) + 45);

// Reto extra
const velocidadPromedio = (altura / tiempoCaida).toFixed(2);

// resultado interpolacion
console.log("--- Reporte de Salto en Paracaídas ---");
console.log(`Fecha del salto: ${fechaFormateada}`);
console.log(`Altitud de salto: ${altura} metros`);
console.log(`Duración en caída libre: ${tiempoCaida} segundos`);
console.log(`Velocidad promedio: ${velocidadPromedio} m/s`);

// validacion de reto 
if (altura > 4000) {
    console.log("Estado: Salto de alta altitud (Requiere oxígeno).");
} else {
    console.log("Estado: Salto estándar.");
}