
// lista
const favoritos = [
    { titulo: "El Principito", tipo: "libro", autor: "Antoine de Saint-Exupéry" },
    { titulo: "Harry Potter y las reliquias de la muerte: parte 2", tipo: "pelicula", director: "David Yates" },
    { titulo: "Beggining Middle End", tipo: "Música", compositor: "Leah Nobel" }
];

// Convertimos el array de objetos a formato JSON
const favoritosJSON = JSON.stringify(favoritos, null, 2);
console.log("--- Datos en formato JSON (Serializados) ---");
console.log(favoritosJSON);

// Parseamos el JSON de vuelta a un objeto JavaScript
const favoritosObjeto = JSON.parse(favoritosJSON);
console.log("\n--- Datos convertidos a Objeto JS (Parseados) ---");
console.log(favoritosObjeto[0].titulo);

// Reto extra
console.log("\n--- Validación de contenido ---");
favoritosObjeto.forEach(item => {
    const creador = item.tipo === "libro" ? `Autor: ${item.autor}` : `Director: ${item.director}`;
    console.log(`- ${item.titulo} (${item.tipo.toUpperCase()}) | ${creador}`);
});