// Ejercicio 13: JSON - libros y peliculas
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 13: JSON");

// Escribe tu solucion aqui.

console.log("========== JSON - Libros y Peliculas ==========");

const libros = [
    {genero: "ciencia ficcion", titulo: "La vuelta al mundo en 80 dias"}, 
    {genero: "ciencia ficcion", titulo: "El principe y el mendigo"}, 
    {genero: "ciencia ficcion", titulo: "El conde de montecristo"},
    {genero: "ciencia ficcion", titulo: "Dueño del mundo"},
    {genero: "ciencia ficcion", titulo: "El hombre invisible"}
];
const peliculas = [
    {titulo: "El señor de los anillos"}, {titulo: "El hobbit"},
    {titulo: "El rey leon"}, 
    {titulo: "El libro de la selva"}, 
    {titulo: "El diario de una pasion"}
];

const librosJSON = JSON.stringify(libros);
const peliculasJSON = JSON.stringify(peliculas);

console.log("Libros en formato JSON:", librosJSON);
console.log("Peliculas en formato JSON:", peliculasJSON);

const librosArray = JSON.parse(librosJSON);
const peliculasArray = JSON.parse(peliculasJSON);

console.log("Libros convertidos de JSON a array:", librosArray);
console.log("Peliculas convertidos de JSON a array:", peliculasArray);
