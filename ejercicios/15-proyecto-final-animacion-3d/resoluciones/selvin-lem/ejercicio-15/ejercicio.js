// Ejercicio 15: Proyecto integrador basico - animacion 3D, MOBA o diseno 3D arquitectura
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 15: Proyecto integrador basico")

// Escribe tu solucion aqui.

const elementosEscena = [
  { 
    nombre: "Torre Principal", 
    selector: ".tower", 
    animacionClase: "animar-torre"
 },
  { 
    nombre: "Módulo Cubo", 
    selector: ".cube", 
    animacionClase: "animar-cubo" 
}
];

const estadoAnimacion = {
  activo: false,
  conteoCiclos: 0
}

const botonToggle = document.querySelector("#toggle")
const contenedorEscena = document.querySelector(".scene")

const estiloAnimacion = document.createElement("style")
estiloAnimacion.textContent = `
  @keyframes balanceoTorre {
    0% { transform: scaleY(1); }
    50% { transform: scaleY(1.05) rotate(1deg); }
    100% { transform: scaleY(1); }
  }
  @keyframes rotacionCubo {
    0% { transform: rotateX(20deg) rotateY(35deg); }
    100% { transform: rotateX(20deg) rotateY(395deg); }
  }
  .animar-torre { animation: balanceoTorre 3s infinite ease-in-out; }
  .animar-cubo { animation: rotacionCubo 4s infinite linear; }
`
document.head.appendChild(estiloAnimacion)

function conmutarRender3D() {
  estadoAnimacion.activo = !estadoAnimacion.activo
  
  console.log("=== CAMBIO DE ESTADO EN ESCENA ===")
  console.log("¿Animación activa?:", estadoAnimacion.activo)

  for (let i = 0; i < elementosEscena.length; i++) {
    const item = elementosEscena[i];
    const elementoDOM = document.querySelector(item.selector)

    if (elementoDOM) {
      if (estadoAnimacion.activo) {
        elementoDOM.classList.add(item.animacionClase)
        console.log("Efecto aplicado a:", item.nombre)
      } else {
        elementoDOM.classList.remove(item.animacionClase)
        console.log("Efecto removido de:", item.nombre)
      }
    }
  }

  if (estadoAnimacion.activo) {
    botonToggle.textContent = "Pausar Escena"
    botonToggle.style.background = "#ffb020"
  } 
  else {
    botonToggle.textContent = "Animar";
    botonToggle.style.background = "#1463ff"
    estadoAnimacion.conteoCiclos = estadoAnimacion.conteoCiclos + 1;

    verificarRendimientoDiseno()
  }
}

// extra: función de validación control de ciclos de renderizado
function verificarRendimientoDiseno() {
  console.log("\n=== CONTROL DE RENDIMIENTO 3D ===");
  console.log("Total de interacciones del usuario:", estadoAnimacion.conteoCiclos);
  
  const limiteRevision = 3;
  if (estadoAnimacion.conteoCiclos >= limiteRevision) {
    console.log("Alerta de optimización: Se sugiere limpiar la caché de texturas del render.");
  }
}

if (botonToggle) {
  botonToggle.addEventListener("click", conmutarRender3D);
} 
else {
  console.log("Error: El botón de control de animación no existe en el DOM.")
}