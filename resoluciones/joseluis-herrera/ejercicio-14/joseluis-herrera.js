function PersonajeRPG() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ nombre: "CaptainMomu", Nivel: 7, Poder: "Agua/Fuego" });
    }, 3000);
  });
}

async function Mostrar() {
  const Personaje = await PersonajeRPG(); 
  console.log("El personaje es:", Personaje);
}

Mostrar();