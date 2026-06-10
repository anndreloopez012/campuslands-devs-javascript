// Ejercicio 14: Promesas / async basico - videojuegos RPG
// Completa el codigo siguiendo las instrucciones del README.md.
console.log("--- Sistema de Carga RPG ---");

// Escribe tu solucion aqui.
const cargarPersonaje = () => {
    return new Promise((resolve, reject) => {
        const exito = true;
        console.log("Cargando datos del guerrero desde el servidor...");
        setTimeout(() => {
            if (exito) {
                resolve({
                    nombre: "Aragorn",
                    clase: "Guerrero",
                    nivel: 20,
                    hp: 150
                });
            } else {
                reject("Error: No se pudo conectar con el servidor de RPG.");
            }
        }, 2000);
    });
};

async function iniciarPartida() {
    try {
        const personaje = await cargarPersonaje();
        console.log("Personaje cargado correctamente:");
        console.log("------------------------------");
        console.log(`Nombre: ${personaje.nombre}`);
        console.log(`Clase: ${personaje.clase}`);
        console.log(`Nivel: ${personaje.nivel}`);
        console.log(`Puntos de vida: ${personaje.hp}`);
        console.log("------------------------------");

        if (personaje.nivel >= 10) {
            console.log("Estatus: Jugador veterano detectado.");
        }
    } catch (error) {
        console.log(error);
    } finally {
        console.log("Proceso de carga finalizado.");
    }
}

iniciarPartida();