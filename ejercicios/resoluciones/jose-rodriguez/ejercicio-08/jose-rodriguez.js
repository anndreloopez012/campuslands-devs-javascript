
// Paso 1: Datos de entrada (Texto "sucio" o sin formato)

// Imaginemos que un usuario buscó una canción dejando espacios extra y con mayúsculas desordenadas
const entradaUsuario = "   lofi hip hop beats para programar   ";
const trackIncompleto = "ARTISTA_DESCONOCIDO - Canción de Prueba";

console.log("--- ENTRADA ORIGINAL ---");
console.log(`Texto recibido: "${entradaUsuario}"\n`);



// Paso 2: Limpieza y Transformación (trim, toUpperCase)

// Usamos .trim() para borrar los espacios en blanco de los extremos
const textoLimpio = entradaUsuario.trim();
console.log(`1. Después de .trim(): "${textoLimpio}"`);

// Usamos .toUpperCase() para convertir todo a mayúsculas (útil para estandarizar etiquetas)
const textoMayusculas = textoLimpio.toUpperCase();
console.log(`2. Después de .toUpperCase(): "${textoMayusculas}"\n`);



// Paso 3: Búsqueda y Reemplazo (includes, replace, slice)

console.log("--- ANÁLISIS Y MODIFICACIÓN ---");

// .includes() devuelve true o false si encuentra una palabra clave
const buscadorPalabra = "lofi";
const tieneLofi = textoLimpio.includes(buscadorPalabra);
console.log(`¿El texto incluye la palabra "${buscadorPalabra}"?: ${tieneLofi}`);

// .replace() intercambia una porción de texto por otra
// Vamos a corregir el nombre del artista en 'trackIncompleto'
const trackCorregido = trackIncompleto.replace("ARTISTA_DESCONOCIDO", "Lofi Girl");
console.log(`Canción corregida (.replace()): "${trackCorregido}"`);

// .slice() corta un fragmento del string indicando el índice de inicio y fin
// Vamos a extraer sólo los primeros 4 caracteres de la cadena limpia
const generoExtraido = textoLimpio.slice(0, 4);
console.log(`Género extraído (.slice(0, 4)): "${generoExtraido}"\n`);



//  Reto extra: Validación y formateo musical

// Simulemos una función que valida y genera el formato estándar "Artista - Canción"
function formatearMetadatosMúsica(artista, cancion) {
    console.log("--- RETO EXTRA: Formateador de Metadatos ---");

    // Validación básica: Que no vengan vacíos
    if (!artista || !cancion) {
        console.log("Error: El artista o la canción no pueden estar vacíos.");
        return;
    }

    // Limpieza profunda usando los conceptos aprendidos
    const artistaFormateado = artista.trim().toUpperCase();
    
    // Dejamos la canción limpia en espacios, pero usamos una transformación simple
    const cancionFormateada = cancion.trim();

    // Validación adicional: Si la canción es muy larga, la recortamos con un indicador (...)
    let cancionFinal = cancionFormateada;
    if (cancionFormateada.length > 20) {
        cancionFinal = cancionFormateada.slice(0, 17) + "...";
    }

    // Resultado final estructurado
    const metadatoCompleto = `${artistaFormateado} — ${cancionFinal}`;
    console.log(`Archivo listo para streaming: ${metadatoCompleto}`);
}

// Ejecución de pruebas del Reto Extra
formatearMetadatosMúsica("  chillhop records  ", "   Summer Vibes In The City 2026   ");
formatearMetadatosMúsica("Idealism", "Phantasia");