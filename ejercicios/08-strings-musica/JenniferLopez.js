// Ejercicio 08: Strings y metodos - musica
console.log("Ejercicio 08: Strings y metodos");

const cancionSucia = "    Plan A - Paulo Londra    ";
console.log("\n --- PROCESAMIENTO DE AUDIO ---");

const cancionLimpia = cancionSucia.trim();
console.log(`Texto corregido con .trim(): "${cancionLimpia}"`);

console.log(`Título en MAYÚSCULAS: ${cancionLimpia.toUpperCase()}`);

console.log(`Formato de radio: ${cancionLimpia.replace("-", "by")}`);

console.log(`Nombre de la canción sola: ${cancionLimpia.slice(0, 6)}`);


console.log("\n --- MONITOREO DE TRACKS ---");

const trackCompleto = "Rusherking - Los Del Espacio Ft. LIT killah, Tiago";
const esColaboracion = trackCompleto.includes("Ft.");

console.log(`Track analizado: ${trackCompleto}`);
console.log(`¿Este tema incluye una colaboración?: ${esColaboracion}`);

