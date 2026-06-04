// Ejercicio 08: Strings y metodos - musica
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 08: Strings y metodos");

// Escribe tu solucion aqui.

console.log("Ejercicio 08: Strings y metodos");

// Nombre de una canción con espacios extra
let cancion = "  Despacito  ";

// trim()
console.log("Canción original:", cancion);
console.log("Sin espacios:", cancion.trim());

// toUpperCase()
console.log("Mayúsculas:", cancion.trim().toUpperCase());

// includes()
let artista = "Luis Fonsi";

console.log("¿Incluye 'Luis'?", artista.includes("Luis"));

// replace()
let nuevaCancion = cancion.trim().replace("Despacito", "Échame la Culpa");
console.log("Nueva canción:", nuevaCancion);

// slice()
console.log("Primeras 5 letras:", nuevaCancion.slice(0, 5));

// Reto extra
let genero = "Pop";

if (genero.includes("Pop")) {
    console.log("El género es Pop.");
} else {
    console.log("Género no identificado.");
}