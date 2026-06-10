// 13. JSON - Libros y películas

// 1. Array de objetos inicial (JavaScript)
const catalogoFavoritos = [
    { titulo: "Intercambiados", tipo: "Película", genero: "Animación" },
    { titulo: "Cien años de soledad", tipo: "Libro", genero: "Realismo mágico" }
];

// 2. Convertir objeto JavaScript a cadena JSON (JSON.stringify)
const jsonString = JSON.stringify(catalogoFavoritos);
console.log("--- Cadena JSON generada (Texto plano) ---");
console.log(jsonString);

// 3. Convertir cadena JSON de regreso a objeto JavaScript (JSON.parse)
const objetoParseado = JSON.parse(jsonString);
console.log("\n--- Elementos del Objeto Parseado ---");
objetoParseado.forEach(function(item) {
    console.log(item.tipo + ": " + item.titulo + " (" + item.genero + ")");
});

// 4. Validación adicional y dato extra (Reto extra)
// Validar que el proceso de conversión mantuvo la integridad de todos los elementos
const longitudOriginal = catalogoFavoritos.length;
const longitudParseada = objetoParseado.length;

console.log("\n--- Validación de Datos (Reto Extra) ---");
if (longitudOriginal === longitudParseada) {
    console.log("Validación: Conversión exitosa. Se procesaron los " + longitudParseada + " elementos correctamente.");
} else {
    console.log("Validación: Error en la conversión de datos.");
}

// Dato extra: Plataforma de consumo sugerida para el primer elemento
const plataformaSugerida = "Netflix";
console.log("Dato extra: La primera obra está disponible para consumir en " + plataformaSugerida + ".");