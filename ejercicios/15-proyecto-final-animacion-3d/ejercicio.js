// Ejercicio 15: Proyecto integrador basico - animacion 3D, MOBA o diseno 3D arquitectura
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 15: Proyecto integrador basico");

// Escribe tu solucion aqui.

console.log("========== Promesas / async basico - Videojuegos RPG ==========")

function cargarPersonaje(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            try {
                resolve(console.log("Personaje cargado correctamente"))
            } catch (error) {
                reject(console.log("Error: ", error))
            }
        }, 3000)
    })
}

async function personaje() {
    console.log("Cargando personaje RPG ...")
    const cargaPersonaje = await cargarPersonaje()
    console.log(cargaPersonaje)
}

personaje()