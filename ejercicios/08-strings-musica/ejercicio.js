// Ejercicio 08: Strings y metodos - musica
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 08: Strings y metodos");

// Escribe tu solucion aqui.

const archivoMusical = "A$AP Rocky, The Weeknd.mp3";

console.log("=== TEXTO ORIGINAL ===");
console.log("Archivo:", archivoMusical);

const sinExtension = archivoMusical.replace(".mp3", "");
const textoCorregidoArtista1 = sinExtension.replace("$", "S");

const textoFinal = textoCorregidoArtista1.replace("The Weeknd", "The Weekend");

console.log("\n=== TEXTO PROCESADO ===");
console.log("Resultado final:", textoFinal);

// extra: validacion de genero
console.log("\n=== CLASIFICACIÓN DE GÉNERO ===");

const tieneRap = textoFinal.includes("ASAP Rocky");
const tieneRnB = textoFinal.includes("The Weekend");

if (tieneRap && tieneRnB) {
  console.log("Género: Colaboración de Rap y R&B");
} 
else if (tieneRap) {
  console.log("Género: Hip-Hop / Rap");
} 
else if (tieneRnB) {
  console.log("Género: R&B / Pop");
} 
else {
  console.log("Género: No identificado");
}
