// Ejercicio 13: JSON - libros y peliculas
console.log("Ejercicio 13: JSON");

const misFavoritos = [
    { tipo: "libro", titulo: "Harry Potter", autor: "J.K. Rowling" },
    { tipo: "pelicula", titulo: "Assassination Classroom: 365 Days", director: "Seiji Kishi" }
];

console.log("1. Datos originales en JavaScript (Array de Objetos):\n" + JSON.stringify(misFavoritos, null, 2));

const datosEnviadosJSON = JSON.stringify(misFavoritos);

console.log("\n2. Datos empaquetados en TEXTO plano (JSON.stringify):");
console.log(datosEnviadosJSON); 

const datosRecibidosJS = JSON.parse(datosEnviadosJSON);

console.log("\n3. Datos devueltos a objetos de JavaScript (JSON.parse):\n" + JSON.stringify(datosRecibidosJS, null, 2));
console.log("\n --- AUDITORÍA DE BIBLIOTECA (Reto Extra) ---");

let conteoLibros = 0;
let conteoPeliculas = 0;

datosRecibidosJS.forEach((item) => {
    if (item.tipo === "libro") conteoLibros++;
    if (item.tipo === "pelicula") conteoPeliculas++;
});

console.log(`Análisis completado: Se encontraron ${conteoLibros} libro(s) y ${conteoPeliculas} película(s).`);
console.log("Estructura JSON válida y verificada.");