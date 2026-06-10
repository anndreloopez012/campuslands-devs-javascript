// Ejercicio 14: Promesas / async basico - videojuegos RPG

console.log("Ejercicio 14: Promesas / async basico");

// Escribe tu solucion aqui.

function cargarPersonaje(nombre) {
  return new Promise((resolve, reject) => {
    console.log("Cargando personaje...");
    setTimeout(() => {
      if (!nombre) return reject("Error: el personaje no tiene nombre.");
      resolve({ nombre, clase: "Mago", nivel: 7, hp: 120 });
    }, 1000);
  });
}

async function iniciar() {
  try {
    const heroe = await cargarPersonaje("Aerin");
    console.log(
      `Listo: ${heroe.nombre} | ${heroe.clase} Nv.${heroe.nivel} | HP ${heroe.hp}`,
    );
    console.log(
      heroe.nivel >= 5
        ? "Personaje apto para la mazmorra."
        : "Sube de nivel antes de entrar.",
    );
  } catch (error) {
    console.log(error);
  }
}

iniciar();
