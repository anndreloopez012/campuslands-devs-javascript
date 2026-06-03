// Ejercicio 08: Strings y metodos - musica
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 08: Strings y metodos");

// Escribe tu solucion aqui.

// Ejercicio 08: Manipulacion de strings

let cancionSucia = "  Bohemian Rhapsody - Queen ";
let artista = "queen";

// trim(): quitar espacios en blanco al inicio y al final
let cancionLimpia = cancionSucia.trim();

// toUpperCase(): convertir todo a mayusculas para estandarizar
let artistaMayus = artista.toUpperCase();

// replace(): cambiar una parte del texto
let cancionCorregida = cancionLimpia.replace("Bohemian Rhapsody", "Bohemian Rhapsody (Remastered)");

// includes(): verificar si contiene un texto especifico
let esQueen = cancionLimpia.toUpperCase().includes("QUEEN");

// slice(): extraer una parte del texto
let iniciales = cancionLimpia.slice(0, 8);

console.log(`Canción: ${cancionCorregida}`);
console.log(`Artista: ${artistaMayus}`);
console.log(`¿Es de Queen?: ${esQueen}`);
console.log(`Fragmento inicial: ${iniciales}`);

// Reto extra
// validacion de formato
if (cancionLimpia.includes("-")) {
    console.log("Formato válido: contiene guion separador.");
}