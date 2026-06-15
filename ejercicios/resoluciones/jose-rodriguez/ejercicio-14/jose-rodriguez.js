
// Paso 1: Base de datos ficticia de Personajes RPG

const baseDatosPersonajes = {
    "guerrero": { clase: "Paladín", nivel: 24, arma: "Espada rúnica de plata", hp: 450 },
    "mago": { clase: "Hechicero elemental", nivel: 28, arma: "Báculo de cristal de fénix", hp: 180 },
    "picaro": { clase: "Asesino de las sombras", nivel: 22, arma: "Dagas de vibranium", hp: 290 }
};


// Paso 2: Crear la Promesa con Temporizador (Promise, setTimeout)

/**
 * Simula una consulta asíncrona a un servidor para extraer un personaje.
 * @param {string} idPersonaje - El identificador clave del héroe.
 * @return {Promise<object>} - Promesa que resuelve con los datos del personaje o rechaza si no existe.
 */
function obtenerPersonajeServidor(idPersonaje) {
    // Retornamos una nueva Promesa que maneja el éxito (resolve) o el fallo (reject)
    return new Promise((resolve, reject) => {
        console.log(`[Servidor] Buscando datos de "${idPersonaje}" en los archivos del Reino...`);

        // Simulamos un retraso de red de 2 segundos (2000 milisegundos)
        setTimeout(() => {
            const heroeEncontrado = baseDatosPersonajes[idPersonaje.toLowerCase()];

            if (heroeEncontrado) {
                // Si existe, la promesa se cumple exitosamente devolviendo el objeto
                resolve(heroeEncontrado);
            } else {
                // Si no existe, rechazamos la promesa enviando un mensaje de error
                reject(new Error(`El personaje "${idPersonaje}" no fue encontrado en la taberna.`));
            }
        }, 2000);
    });
}


// Paso 3: Consumir la Promesa (async, await, try/catch)

/**
 * Función asíncrona principal encargada de la inicialización de la partida.
 * @param {string} nombreSeleccionado - Nombre del héroe a cargar.
 */
async function iniciarPartidaRPG(nombreSeleccionado) {
    console.log("--- INICIANDO PROCESO DE CARGA DEL JUEGO ---");
    
    // El bloque try/catch captura de forma elegante los errores de operaciones asíncronas
    try {
        // Usamos 'await' para pausar la ejecución de esta función hasta que la promesa se resuelva
        const heroe = await obtenerPersonajeServidor(nombreSeleccionado);
        
        console.log("[Carga completada] ¡Datos del héroe sincronizados!");
        console.log(`HÉROE LISTO: ${heroe.clase} (Nivel ${heroe.nivel})`);
        console.log(`Equipamiento actual: ${heroe.arma}`);
        console.log(`Puntos de Vida (HP): ${heroe.hp}`);

        
        // 🟪 Reto extra: Validación y dato extra RPG
        
        console.log("\n--- RETO EXTRA: Sistema de Verificación de Mazmorra ---");
        // Dato extra: Calcular si el nivel del héroe es apto para una mazmorra de nivel 25
        const NIVEL_RECOMENDADO_MAZMORRA = 25;
        
        if (heroe.nivel >= NIVEL_RECOMENDADO_MAZMORRA) {
            console.log(`¡Acceso Autorizado! Tu nivel (${heroe.nivel}) es óptimo para entrar a la Mazmorra Ancestral.`);
        } else {
            const nivelesFaltantes = NIVEL_RECOMENDADO_MAZMORRA - heroe.nivel;
            console.log(`Advertencia de Peligro: La Mazmorra es Nivel ${NIVEL_RECOMENDADO_MAZMORRA}.`);
            console.log(`   Te faltan ${nivelesFaltantes} niveles para mitigar el riesgo. ¡Entra bajo tu propio riesgo!`);
        }

    } catch (error) {
        // Este bloque se ejecuta únicamente si la función 'obtenerPersonajeServidor' ejecuta el reject()
        console.log("\nError Crítico de Carga]: No se pudo iniciar la interfaz de batalla.");
        console.log(` Razón: ${error.message}`);
    } finally {
        // Bloque opcional para ejecutar acciones de cierre sin importar el éxito o fallo
        console.log("\n--- PROCESO DE LOGÍSTICA CONCLUIDO ---");
        console.log("==================================================\n");
    }
}


// Paso 4: Ejecución de las Pruebas


// Prueba Caso A: Cargar un personaje existente que cumple con las condiciones (Mago)
iniciarPartidaRPG("mago");

// Prueba Caso B: Cargar un personaje existente pero de bajo nivel (Pícaro)
// Usamos un pequeño retraso para que las simulaciones en consola no se mezclen de golpe
setTimeout(() => {
    iniciarPartidaRPG("picaro");
}, 3000);

// Prueba Caso C: Cargar un personaje inválido para probar la captura del error en el catch
setTimeout(() => {
    iniciarPartidaRPG("orco_mutilador");
}, 6000);