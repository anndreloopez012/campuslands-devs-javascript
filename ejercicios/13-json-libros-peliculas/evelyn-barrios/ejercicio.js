// Ejercicio 13: JSON - libros y peliculas
// Completa el codigo siguiendo las instrucciones del README.md.
console.log("--- Registro de Libros y Peliculas ---");

// Escribe tu solucion aqui.
const coleccionFavorita = [
    {
        titulo: "El resplandor",
        creador: "Stephen King",
        tipo: "libro",
        anio: 1977
    },
    {
        titulo: "Interstellar",
        creador: "Christopher Nolan",
        tipo: "pelicula",
        anio: 2014
    }
];

const coleccionJSON = JSON.stringify(coleccionFavorita, null, 2);
console.log("Datos serializados (JSON):");
console.log(coleccionJSON);

const coleccionParseada = JSON.parse(coleccionJSON);
console.log("Datos parseados (Objeto JS):");
console.log(coleccionParseada);

if (Array.isArray(coleccionParseada) && coleccionParseada.length > 0) {
    console.log("Reto extra: Validacion de formato de coleccion correcta y con elementos.");
}