// 12. Fechas y Math - Paracaidismo

// 1. Instanciar fecha actual del salto (Date)
const fechaSalto = new Date();
const fechaFormateada = fechaSalto.toLocaleDateString();

// 2. Calcular datos aleatorios del salto (Math.random y Math.round)
// Altura aleatoria entre 2000 y 4000 metros
const alturaMetros = Math.round(Math.random() * (4000 - 2000) + 2000);

// Tiempo de caída libre aleatorio entre 30 y 60 segundos
const tiempoCaidaSegundos = Math.round(Math.random() * (60 - 30) + 30);

// 3. Mostrar resultados usando interpolación de cadenas
console.log(`--- Bitácora de Vuelo: Salto en Paracaídas ---`);
console.log(`Fecha del evento: ${fechaFormateada}`);
console.log(`Altura de salida: ${alturaMetros} metros`);
console.log(`Tiempo estimado de caída libre: ${tiempoCaidaSegundos} segundos`);

// 4. Validación adicional y dato extra (Reto extra)
// Un salto seguro requiere abrir el paracaídas principal por encima de los 900 metros
const alturaAperturaMinima = 900;
const velocidadTerminalAproximada = 200; // km/h (Dato extra)

console.log(`\n--- Reporte de Seguridad (Reto Extra) ---`);
console.log(`Velocidad terminal promedio: ${velocidadTerminalAproximada} km/h`);

if (alturaMetros > alturaAperturaMinima) {
    console.log(`Validación: Altura de ${alturaMetros}m segura para el despliegue del paracaídas.`);
} else {
    console.log(`Validación: Alerta. Altura por debajo del límite de seguridad recomendado.`);
}