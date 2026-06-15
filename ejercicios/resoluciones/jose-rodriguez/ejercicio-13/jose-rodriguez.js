
// Paso 1: Crear un arreglo de objetos (Array of Objects)

// Una colección mixta de cultura pop: libros y películas favoritas
const coleccionFavoritos = [
    {
        id: 1,
        tipo: "pelicula",
        titulo: "Interstellar",
        directorOAutor: "Christopher Nolan",
        anio: 2014,
        vistoOLeido: true
    },
    {
        id: 2,
        tipo: "libro",
        titulo: "El Psicoanalista",
        directorOAutor: "John Katzenbach",
        anio: 2002,
        vistoOLeido: true
    },
    {
        id: 3,
        tipo: "pelicula",
        titulo: "Dune: Parte Dos",
        directorOAutor: "Denis Villeneuve",
        anio: 2024,
        vistoOLeido: false
    }
];

console.log("--- 1. Estructura Original en JavaScript ---");
console.log("Tipo de dato de la colección:", typeof coleccionFavoritos); // Imprime 'object' (arreglo)
console.log(coleccionFavoritos);
console.log("-----------------------------------------------\n");



// Paso 2: Serializar a Texto Plano (JSON.stringify)

// Convertimos el objeto vivo de JS a una cadena de texto JSON legible para servidores o archivos
// Los parámetros adicionales (null, 2) sirven para darle un formato indentado y bonito en la consola
const jsonSerializado = JSON.stringify(coleccionFavoritos, null, 2);

console.log("--- 2. Datos Serializados con JSON.stringify ---");
console.log("Tipo de dato actual:", typeof jsonSerializado); // Imprime 'string'
console.log(jsonSerializado); // Nota que ahora todas las propiedades tienen comillas dobles ""
console.log("---------------------------------------------------\n");



// Paso 3: Parsear de regreso a JavaScript (JSON.parse)

// Imaginemos que recibimos el string 'jsonSerializado' desde una base de datos externa.
// Lo reconstruimos para volver a manipularlo con código JS.
const coleccionReconstruida = JSON.parse(jsonSerializado);

console.log("--- 3. Datos Reconstruidos con JSON.parse ---");
console.log("¿Volvió a ser un objeto utilizable?:", Array.isArray(coleccionReconstruida)); // true
// Accedemos a una posición específica usando índices y propiedades de objetos para demostrar que funciona
console.log(`Mi película favorita es: ${coleccionReconstruida[0].titulo} de ${coleccionReconstruida[0].directorOAutor}`);
console.log("------------------------------------------------\n");



// 🟪 Reto extra: Validación y Dato Extra

/**
 * Intenta parsear de forma segura una cadena de texto JSON externa y valida
 * que los elementos de entretenimiento cumplan con reglas de negocio.
 * @param {string} jsonString - Cadena de texto que se intentará parsear.
 */
function procesarYValidarContenido(jsonString) {
    console.log("--- RETO EXTRA: Validador de Datos JSON Integrado ---");
    
    try {
        // Validación 1: Intentar parsear dentro de un bloque try/catch para evitar que el programa se rompa si el JSON está mal formateado
        const datosParseados = JSON.parse(jsonString);
        
        if (!Array.isArray(datosParseados)) {
            console.log("Validación rechazada: El JSON no contiene una lista válida.");
            return;
        }

        // Recorremos la lista reconstruida para aplicar lógica de negocio (Dato extra)
        datosParseados.forEach((item, indice) => {
            // Validación 2: Asegurar que tengan campos obligatorios
            if (!item.titulo || !item.anio) {
                console.log(`Elemento en índice [${indice}] omitido por falta de campos críticos.`);
                return;
            }

            // Dato extra matemático: Calcular la antigüedad del elemento cultural
            const anioActual = new Date().getFullYear();
            const antiguedad = anioActual - item.anio;

            // Formateo dinámico según su tipo
            const emoji = item.tipo === "pelicula" ? "🎬" : "📖";
            console.log(`${emoji} "${item.titulo}" (${item.anio}) -> Tiene ${antiguedad} años de haber sido lanzada/publicada.`);
        });

    } catch (error) {
        // Si el JSON tenía una coma de más, le faltaba un corchete, etc., se captura el error limpiamente aquí
        console.log("Error Crítico: La cadena de texto proveída no es un JSON válido.");
        console.log(`Detalle del error: ${error.message}`);
    }
}

// Pruebas del Reto Extra
// Prueba A: Enviando un JSON válido (Reutilizamos el nuestro)
procesarYValidarContenido(jsonSerializado);

// Prueba B: Enviando un JSON roto a propósito (Falta cerrar una comilla en el título)
console.log("\nSimulando la recepción de un JSON corrupto de internet:");
const jsonCorrupto = '[ { "tipo": "libro, "titulo": "Invalido" } ]';
procesarYValidarContenido(jsonCorrupto);