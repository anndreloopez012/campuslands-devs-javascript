// Ejercicio 13: JSON - libros y peliculas
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 13: JSON");

// Escribe tu solucion aqui.


const libros = [
  { titulo: "El Principito", autor: "Antoine de Saint-Exupéry", anio: 1943, paginas: 96 },
  { titulo: "1984", autor: "George Orwell", anio: 1949, paginas: 328 },
  { titulo: "El Hobbit", autor: "J.R.R. Tolkien", anio: 1937, paginas: 310 },
];

const peliculas = [
  { titulo: "Inception", director: "Christopher Nolan", anio: 2010, duracionMin: 148 },
  { titulo: "El Rey León", director: "Roger Allers", anio: 1994, duracionMin: 88 },
  { titulo: "Interstellar", director: "Christopher Nolan", anio: 2014, duracionMin: 169 },
];

const librosJSON = JSON.stringify(libros, null, 2);
const peliculasJSON = JSON.stringify(peliculas, null, 2);

console.log(" === LIBROS EN FORMATO JSON ===");
console.log(librosJSON);

console.log("\n === PELÍCULAS EN FORMATO JSON ===");
console.log(peliculasJSON);

const librosParsed = JSON.parse(librosJSON);
const peliculasParsed = JSON.parse(peliculasJSON);

console.log("\n === TÍTULOS DE LIBROS (desde JSON parseado) ===");
librosParsed.forEach((libro, indice) => {
  console.log(`${indice + 1}. "${libro.titulo}" de ${libro.autor} (${libro.anio})`);
});

console.log("\n === TÍTULOS DE PELÍCULAS (desde JSON parseado) ===");
peliculasParsed.forEach((pelicula, indice) => {
  console.log(`${indice + 1}. "${pelicula.titulo}" - Dir: ${pelicula.director} (${pelicula.anio})`);
});

const libroMasLargo = librosParsed.reduce((anterior, actual) => {
  return actual.paginas > anterior.paginas ? actual : anterior;
});

const peliculaMasLarga = peliculasParsed.reduce((anterior, actual) => {
  return actual.duracionMin > anterior.duracionMin ? actual : anterior;
});

console.log("\n === RETO EXTRA: LOS MÁS LARGOS ===");
console.log(` Libro con más páginas: "${libroMasLargo.titulo}" con ${libroMasLargo.paginas} páginas`);
console.log(`  Película más larga: "${peliculaMasLarga.titulo}" con ${peliculaMasLarga.duracionMin} minutos`);
console.log("=====================================");