// Ejercicio 13: JSON - libros y peliculas
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 13: JSON");

// --------------------SOLUCIÓN--------------------
console.log("-----------------------------------------------------");
const coleccionFavoritos = [
    { id: 1, titulo: "El Señor de los Anillos", tipo: "libro", año: 1954 },
    { id: 2, titulo: "Inception", tipo: "pelicula", año: 2010 },
    { id: 3, titulo: "Harry Potter", tipo: "libro", año: 1997 }
];

const datosJson = JSON.stringify(coleccionFavoritos);
console.log("DATOS EN CADENA DE TEXTO (JSON string)");
console.log(datosJson);
console.log(`Tipo de dato: ${typeof datosJson}`);
console.log("-----------------------------------------------------");

const datosParseados = JSON.parse(datosJson);
console.log("DATOS PARSEADOS (Objeto JS)");
console.log(datosParseados);
console.log(`Tipo de dato: ${typeof datosParseados}`);
console.log("-----------------------------------------------------");

console.log("VALIDACIÓN Y FILTRADO DE PELÍCULAS");
if (Array.isArray(datosParseados) && datosParseados.length > 0) {
    const soloPeliculas = datosParseados.filter(item => item.tipo === "pelicula");
    console.log("Películas encontradas en la colección:");
    console.log(soloPeliculas);
    if (soloPeliculas.length > 0) {
        console.log(`Validación exitosa: Se encontró la película "${soloPeliculas[0].titulo}".`);
    }
} else {
    console.log("Alerta: El formato JSON no contiene una lista válida.");
}
console.log("-----------------------------------------------------");