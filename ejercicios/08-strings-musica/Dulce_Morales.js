// 08. Strings y métodos - Música

// 1. Datos iniciales con espacios extras para limpiar
const entradaCancion = "   Bohemian Rhapsody   ";
const artistaOriginal = "queen";
const metaDatos = "Año: 1975 - Género: Rock";

// 2. Manipulación de Strings (Métodos requeridos)
const cancionLimpia = entradaCancion.trim(); // trim
const artistaMayuscula = artistaOriginal.toUpperCase(); // toUpperCase
const contieneRock = metaDatos.includes("Rock"); // includes
const generoCorregido = metaDatos.replace("Rock", "Classic Rock"); // replace
const extrareAnio = metaDatos.slice(5, 9); // slice

// 3. Mostrar resultados en consola
console.log("Canción limpia: " + cancionLimpia);
console.log("Artista: " + artistaMayuscula);
console.log("¿Es género Rock?: " + contieneRock);
console.log("Metadatos actualizados: " + generoCorregido);
console.log("Año extraído: " + extrareAnio);

// 4. Validación adicional y dato extra (Reto extra)
const duracionTexto = "05:55";
const esCancionLarga = duracionTexto.startsWith("05") || duracionTexto.startsWith("06");

console.log("Duración de la canción: " + duracionTexto);
if (esCancionLarga) {
    console.log("Validación: La canción es larga (supera los 5 minutos).");
} else {
    console.log("Validación: La canción tiene una duración estándar.");
}