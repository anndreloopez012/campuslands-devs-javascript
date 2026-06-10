// 14. Promesas / async básico - Videojuegos RPG

// 1. Crear una función que retorna una Promesa (Simula carga del servidor)
function cargarPersonaje(nombre) {
    return new Promise(function(resolve, reject) {
        const exitoConexion = true; // Control de la simulación

        // setTimeout para simular la espera asíncrona de 1.5 segundos
        setTimeout(function() {
            if (exitoConexion) {
                resolve({
                    nombre: nombre,
                    clase: "Guerrero",
                    nivel: 1,
                    vida: 100
                });
            } else {
                reject("Error de conexión: El servidor RPG no responde.");
            }
        }, 1500);
    });
}

// 2. Consumir la promesa usando una función async / await con try/catch
async function iniciarPartida() {
    console.log("Conectando al servidor del juego...");
    console.log("Cargando datos del héroe...");

    try {
        // await detiene la ejecución hasta que la promesa se resuelva
        const personaje = await cargarPersonaje("Arthas");
        
        console.log("\n--- ¡Personaje Cargado con Éxito! ---");
        console.log("Héroe: " + personaje.nombre);
        console.log("Clase: " + personaje.clase);
        console.log("Nivel inicial: " + personaje.nivel);

        // 3. Validación adicional y dato extra (Reto extra)
        console.log("\n--- Estado de la Partida (Reto Extra) ---");
        if (personaje.vida > 0) {
            console.log("Validación: Estado de salud óptimo para entrar a la mazmorra.");
        } else {
            console.log("Validación: El personaje necesita descansar en la posada.");
        }

        const puntosExperienciaSiguienteNivel = 1000;
        console.log("Dato extra: Experiencia requerida para nivel 2: " + puntosExperienciaSiguienteNivel + " XP.");

    } catch (error) {
        // Captura el error si la promesa es rechazada (reject)
        console.log("\n--- Falla del Sistema ---");
        console.log(error);
    }
}

// 4. Ejecutar la función asíncrona
iniciarPartida();