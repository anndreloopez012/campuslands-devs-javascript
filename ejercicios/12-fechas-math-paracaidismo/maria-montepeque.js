// Ejercicio 12: Fechas y Math - paracaidismo
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 12: Fechas y Math");

// Escribe tu solucion aqui.

const fecha = new Date();
const altura = Math.round(2000 + Math.random() * 2000);  // 2000-4000 m
const caidaLibre = Math.round(20 + Math.random() * 40);  // 20-60 s

console.log(`Fecha del salto: ${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString()}`);
console.log(`Altura: ${altura} m`);
console.log(`Caida libre: ${caidaLibre} s`);
console.log(`Velocidad promedio: ${Math.round(altura / caidaLibre)} m/s`);

if (altura < 2500) {
    console.log("Salto bajo, poco tiempo de caida libre.");
} else {
    console.log("Altura ideal para un buen salto.");
}