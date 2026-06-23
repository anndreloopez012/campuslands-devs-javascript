// Ejercicio 14: Promesas / async basico - videojuegos RPG
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 14: Promesas / async basico");

// --------------------SOLUCIÓN--------------------
console.log("-----------------------------------------------------");
function cargarPersonaje(nombre, clase) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const personaje = {
                nombre: nombre,
                clase: clase,
                nivel: 1,
                hp: 150,
                equipamiento: ["Espada de madera", "Escudo oxidado"]
            };
            resolve(personaje);
        }, 2000);
    });
}

async function iniciarPartida() {
    console.log("Conectando al servidor de RPG...");
    console.log("Cargando datos de la partida guardada...");
    console.log("-------------------------------------");
    try {
        const Heroe = await cargarPersonaje("Jak", "Guerrero");
        console.log("¡Personaje cargado con éxito!");
        console.log(`Bienvenido, ${Heroe.nombre} el ${Heroe.clase}.`);
        console.log(`Estadísticas actuales -> Nivel: ${Heroe.nivel} | HP: ${Heroe.hp}`);
        console.log(`Inventario: [${Heroe.equipamiento.join(", ")}]`);
        console.log("-------------------------------------");
        console.log("COMPROBACIÓN EXTRA DE INVENTARIO");
        if (Heroe.equipamiento.includes("Espada de madera")) {
            console.log("Misión: Visita al herrero del pueblo para mejorar tus armas.");
        }
    } catch (error) {
        console.log(`Fallo en el juego: ${error}`);
    } finally {
        console.log("Mundo virtual sincronizado correctamente.");
        console.log("=====================================================");
    }
}

iniciarPartida();

