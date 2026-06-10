
// simulacion de carga de personaje con promesas
const cargarPersonaje = (nombre, nivel) => {
    return new Promise((resolve, reject) => {
        console.log(`Cargando datos de ${nombre}...`);
        
        setTimeout(() => {
            if (nivel > 0) {
                resolve({ nombre, nivel, clase: "Mago", vida: nivel * 10, esExperto: nivel >= 10 }); //reto extra: agregar propiedad esExperto
            } else {
                reject("Error: El nivel debe ser mayor a 0 para entrar al juego.");
            }
        }, 2000);
    });
};

// funcion usando async/await y try/catch
async function iniciarJuego() {
    try {
        const personaje = await cargarPersonaje("Yuumi", 15);
        console.log("¡Personaje cargado con éxito!");
        console.log(`Nombre: ${personaje.nombre} | Clase: ${personaje.clase} | HP: ${personaje.vida} | Es Experto: ${personaje.esExperto}`);
    } catch (error) {
        console.error(error);
    }
}

// ejecucion
iniciarJuego();