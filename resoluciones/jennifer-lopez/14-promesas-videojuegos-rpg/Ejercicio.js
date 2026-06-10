// Ejercicio 14: Promesas / async basico - videojuegos RPG
console.log("Ejercicio 14: Promesas / async basico");

function cargarPersonajeServidor(nombreHéroe) {
    return new Promise((resolve, reject) => {
        console.log(` Conectando al servidor... Cargando datos de ${nombreHéroe}...`);
    
        setTimeout(() => {
            const exito = true; 

            if (exito) {
                const personaje = {
                    nombre: nombreHéroe,
                    clase: "Guerrero Mágico",
                    nivel: 25,
                    vidaMaxima: 450
                };
                resolve(personaje);
            } else {
                reject("Error de conexión: Servidor RPG fuera de línea.");
            }
        }, 2000);
    });
}

async function iniciarPartida() {
    console.log("\n --- INICIANDO VIDEOJUEGO RPG ---");
    
    try {
        const héroeCargado = await cargarPersonajeServidor("KoroSensei");
        
        console.log("\n¡Personaje cargado con éxito!");
        
        console.log("ESTADÍSTICAS DEL HÉROE:\n" + JSON.stringify(héroeCargado, null, 2));

        console.log("\n--- RECOMPENSA DE BIENVENIDA (Reto Extra) ---");
        if (héroeCargado.nivel >= 20) {
            console.log(`¡Felicidades! Por ser Nivel ${héroeCargado.nivel}, has desbloqueado la 'Espada del Caos'.`);
        } else {
            console.log("Sigue subiendo de nivel para reclamar equipamiento legendario.");
        }

    } catch (error) {
        console.log("\n ALERTA DEL SISTEMA:");
        console.log(error);
    } finally {
        console.log("\n Fin del proceso de carga.");
    }
}

iniciarPartida();
