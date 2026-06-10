// Ejercicio 08: Strings y metodos - musica

console.log("Ejercicio 08: Strings y metodos");

// Escribe tu solucion aqui.

const cancion = "   bohemian rhapsody   ";
const artista = "Queen";

const limpia = cancion.trim();
console.log("Sin espacios:", `"${limpia}"`);
console.log("En mayusculas:", limpia.toUpperCase());
console.log("Contiene 'rhapsody'?", limpia.includes("rhapsody"));
console.log("Reemplazo:", limpia.replace("bohemian", "bohemio"));
console.log("Primeras 8 letras:", limpia.slice(0, 8));
console.log(`${limpia.toUpperCase()} - ${artista}`);

if (limpia.length > 20) {
  console.log("Titulo largo para mostrar en pantalla.");
} else {
  console.log("Titulo de largo normal.");
}
