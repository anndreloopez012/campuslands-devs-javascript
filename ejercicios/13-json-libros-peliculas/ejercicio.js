// Ejercicio 13: JSON - libros y peliculas
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 13: JSON");

// Escribe tu solucion aqui.

console.log("========== JSON - Libros y Peliculas ==========");

const libros = ["La vuelta al mundo en 80 dias", "El principe y el mendigo", "El conde de montecristo", "Dueño del mundo", "El hombre invisible "];
const peliculas = ["El señor de los anillos", "El hobbit", "El rey leon", "El libro de la selva", "El diario de una pasion"];

const librosJSON = JSON.stringify(libros);
const peliculasJSON = JSON.stringify(peliculas);

console.log("Libros en formato JSON:", librosJSON);
console.log("Peliculas en formato JSON:", peliculasJSON);

const librosArray = JSON.parse(librosJSON);
const peliculasArray = JSON.parse(peliculasJSON);

console.log("Libros convertidos de JSON a array:", librosArray);
console.log("Peliculas convertidos de JSON a array:", peliculasArray);
