// Ejercicio 12: Fechas y Math - paracaidismo
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 12: Fechas y Math");

// Escribe tu solucion aqui.


// --- Altura del salto ---
const alturaMinima = 3000; // metros
const alturaMaxima = 5000; // metros
const altura = Math.round(Math.random() * (alturaMaxima - alturaMinima) + alturaMinima);


const tiempoCaida = Math.round(altura / 50);

const velocidadMin = 180;
const velocidadMax = 220;
const velocidad = Math.round(Math.random() * (velocidadMax - velocidadMin) + velocidadMin);

const ahora = new Date();
const dia = ahora.getDate();
const mes = ahora.getMonth() + 1; 
const anio = ahora.getFullYear();
const horas = ahora.getHours();
const minutos = ahora.getMinutes().toString().padStart(2, "0");

const numeroSalto = Math.round(Math.random() * 200) + 1;

let nivel;
if (numeroSalto < 25) {
  nivel = "Estudiante";
} else if (numeroSalto < 100) {
  nivel = "Licenciado A";
} else if (numeroSalto < 200) {
  nivel = "Licenciado B";
} else {
  nivel = "Experto";
}

console.log("🪂 === REGISTRO DE SALTO EN PARACAÍDAS ===");
console.log(`📅 Fecha del salto: ${dia}/${mes}/${anio} a las ${horas}:${minutos}`);
console.log(`📏 Altura de salida: ${altura} metros`);
console.log(`⏱️  Tiempo de caída libre: ${tiempoCaida} segundos`);
console.log(`💨 Velocidad máxima: ${velocidad} km/h`);
console.log(`🔢 Número de salto del paracaidista: ${numeroSalto}`);
console.log(`🏅 Nivel del paracaidista: ${nivel}`);
console.log("==========================================");