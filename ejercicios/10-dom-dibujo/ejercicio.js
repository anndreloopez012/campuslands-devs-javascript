// Ejercicio 10: DOM basico - dibujo
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 10: DOM basico");

// Escribe tu solucion aqui.


const tarjeta       = document.querySelector("#tarjeta");
const tituloObra    = document.querySelector("#titulo-obra");
const artista       = document.querySelector("#artista");
const tecnica       = document.querySelector("#tecnica");
const anio          = document.querySelector("#anio");
const etiquetaEstado = document.querySelector("#etiqueta-estado");
const botonToggle   = document.querySelector("#btn-toggle");
const divValidacion = document.querySelector("#validacion");
const mensajeVal    = document.querySelector("#mensaje-validacion");

// Compruebo que los elementos existen antes de seguir
console.log("Elementos seleccionados:", {
  tarjeta, tituloObra, artista, tecnica, anio, etiquetaEstado
});

// ── PASO 2: Cambiar texto con textContent ──
// Datos de la obra de arte

const datosObra = {
  titulo:  "La tarde azul",
  artista: "Sofía Ramírez",
  tecnica: "Acuarela sobre papel",
  anio:    2023,
};

tituloObra.textContent = datosObra.titulo;
artista.textContent    = "Artista: " + datosObra.artista;
tecnica.textContent    = "Técnica: " + datosObra.tecnica;
anio.textContent       = "Año: "     + datosObra.anio;

console.log("Texto actualizado con los datos de la obra.");

// Le pongo un color de fondo suave al cuerpo de la tarjeta

tituloObra.style.color     = "#3e2723";
artista.style.fontStyle    = "italic";
tecnica.style.color        = "#6d4c41";

console.log("Estilos aplicados a título, artista y técnica.");

// Controlo si la obra está "vendida" o "disponible" con un botón

let estaVendida = false; // estado inicial

botonToggle.addEventListener("click", function () {
  estaVendida = !estaVendida; // cambio el estado

  if (estaVendida) {
    // Marcar como vendida
    etiquetaEstado.textContent = "Vendida";
    etiquetaEstado.classList.add("vendida");
    tarjeta.classList.add("obra-vendida");
    botonToggle.textContent = "Marcar como disponible";
    console.log("La obra ahora está: vendida");
  } else {
    // Volver a disponible
    etiquetaEstado.textContent = "Disponible";
    etiquetaEstado.classList.remove("vendida");
    tarjeta.classList.remove("obra-vendida");
    botonToggle.textContent = "Marcar como vendida";
    console.log("La obra ahora está: disponible");
  }

  // Cada vez que cambia el estado, ejecuto la validación extra
  validarObra();
});
