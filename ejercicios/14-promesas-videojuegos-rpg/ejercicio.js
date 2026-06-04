// Ejercicio 14: Promesas / async basico - videojuegos RPG
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 14: Promesas / async basico");

// Escribe tu solucion aqui.

console.log("Ejercicio 14: Promesas / async basico");

// Crear promesa
function cargarPersonaje() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const personaje = {
                nombre: "Arthas",
                clase: "Guerrero",
                nivel: 25
            };

            resolve(personaje);
        }, 2000);
    });
}

// Consumir promesa con async/await
async function iniciarJuego() {
    try {
        console.log("Cargando personaje...");

        const personaje = await cargarPersonaje();

        console.log("Personaje cargado:");
        console.log(`Nombre: ${personaje.nombre}`);
        console.log(`Clase: ${personaje.clase}`);
        console.log(`Nivel: ${personaje.nivel}`);

        // Reto extra
        if (personaje.nivel >= 20) {
            console.log("Personaje de nivel avanzado.");
        }
    } catch (error) {
        console.log("Error al cargar el personaje.");
    }
}

iniciarJuego();