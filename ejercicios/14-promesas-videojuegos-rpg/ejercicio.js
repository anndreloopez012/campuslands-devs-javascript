// Ejercicio 14: Promesas / async basico - videojuegos RPG
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 14: Promesas / async basico");

// Escribe tu solucion aqui.

function solicitarPersonajeServidor() {
  return new Promise((resolve, reject) => {
    console.log("Conectando al servidor del Reino Virtual...")
    
    setTimeout(() => {
      // extra: simular exito o fallo
      const exitoConexion = Math.random() > 0.2;

      if (exitoConexion) {
        const heroeRPG = {
          clase: "Guerrero Místico",
          nivel: 42,
          vidaMaxima: 3500
        };
        resolve(heroeRPG)
      } 
      else {
        reject("Error 503: Tiempo de espera agotado al conectar con la taberna del servidor."); 
      }
    }, 2000);
  });
}

async function iniciarPartida() {
  console.log("=== INICIANDO PANTALLA DE CARGA ===");
  
  try {
    const personaje = await solicitarPersonajeServidor();
    
    console.log("\n=== ¡PERSONAJE CARGADO CON ÉXITO! ===");
    console.log("Clase seleccionada:", personaje.clase);
    console.log("Nivel del avatar:", personaje.nivel);
    console.log("Puntos de salud:", personaje.vidaMaxima);
    console.log("Estado: Listo para entrar.");

  } catch (error) {
    console.log("\n=== CONTROL DE FALLOS ===");
    console.log("No se pudo cargar la partida.");
    console.log("Motivo del fallo:", error);
    console.log("Sugerencia: Revisa tu conexión a internet e inténtalo de nuevo.");
  }
}

iniciarPartida();