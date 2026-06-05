// Ejercicio 14: Promesas / async basico - videojuegos RPG
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 14: Promesas / async basico");

// Escribe tu solucion aqui.


function cargarPersonaje(nombre) {
  return new Promise((resolve, reject) => {
    console.log(`⏳ Cargando personaje "${nombre}"...`);

    setTimeout(() => {
      if (!nombre) {
        reject("❌ Error: el nombre del personaje no puede estar vacío.");
        return;
      }

      const personaje = {
        nombre: nombre,
        clase: "Mago",
        nivel: 12,
        hp: 180,
        mana: 300,
        habilidades: ["Bola de fuego", "Escudo arcano", "Teletransporte"],
      };

      resolve(personaje);
    }, 1500); // simula 1.5 segundos de espera (como una llamada a API)
  });
}

function cargarInventario(nombrePersonaje) {
  return new Promise((resolve) => {
    console.log(`🎒 Cargando inventario de "${nombrePersonaje}"...`);

    setTimeout(() => {
      const inventario = [
        { item: "Espada de fuego", tipo: "arma", ataque: 45 },
        { item: "Poción de vida", tipo: "consumible", cura: 100 },
        { item: "Capa del mago", tipo: "armadura", defensa: 20 },
      ];

      resolve(inventario);
    }, 1000);
  });
}

async function iniciarJuego() {
  console.log("🎮 === INICIANDO JUEGO RPG ===\n");

  try {
    const personaje = await cargarPersonaje("Gandalf Jr.");

    console.log("\n✅ Personaje cargado:");
    console.log(`   Nombre : ${personaje.nombre}`);
    console.log(`   Clase  : ${personaje.clase}`);
    console.log(`   Nivel  : ${personaje.nivel}`);
    console.log(`   HP     : ${personaje.hp}`);
    console.log(`   Mana   : ${personaje.mana}`);
    console.log(`   Habilidades: ${personaje.habilidades.join(", ")}`);

    const inventario = await cargarInventario(personaje.nombre);

    console.log("\n✅ Inventario cargado:");
    inventario.forEach((item, indice) => {
      console.log(`   ${indice + 1}. ${item.item} (${item.tipo})`);
    });

    const ataqueTotal = inventario
      .filter((item) => item.ataque)
      .reduce((suma, item) => suma + item.ataque, 0);

    const defensaTotal = inventario
      .filter((item) => item.defensa)
      .reduce((suma, item) => suma + item.defensa, 0);

    console.log("\n⚡ === RETO EXTRA: ESTADÍSTICAS DE COMBATE ===");
    console.log(`   Ataque total  : ${ataqueTotal}`);
    console.log(`   Defensa total : ${defensaTotal}`);
    console.log(`   Poder total   : ${personaje.nivel * 10 + ataqueTotal + defensaTotal}`);
    console.log("\n🏰 ¡Personaje listo para la aventura!");

  } catch (error) {
    console.log("\n" + error);
    console.log("⚠️  No se pudo iniciar el juego. Revisa los datos del personaje.");
  }
}

iniciarJuego();