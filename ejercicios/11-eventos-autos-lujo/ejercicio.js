// Ejercicio 11: Eventos - autos de lujo
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 11: Eventos");

// Escribe tu solucion aqui.

const botonProbar = document.querySelector("#accion")
const tituloFicha = document.querySelector("#titulo")
const descripcionFicha = document.querySelector("#descripcion")
const contenedorPanel = document.querySelector(".panel")

tituloFicha.textContent = "Configurador de Autos de Lujo"
descripcionFicha.textContent = "Modifica las opciones para actualizar la ficha técnica en tiempo real."

const selectorModelo = document.createElement("select")
selectorModelo.innerHTML = `
  <option value="Ferrari F8">Ferrari F8</option>
  <option value="Lamborghini Huracán">Lamborghini Huracán</option>
  <option value="Porsche 911 GT3">Porsche 911 GT3</option>
`

const inputVelocidad = document.createElement("input")
inputVelocidad.type = "number"
inputVelocidad.value = 320
inputVelocidad.placeholder = "Velocidad máxima (km/h)"

contenedorPanel.insertBefore(selectorModelo, botonProbar)
contenedorPanel.insertBefore(inputVelocidad, botonProbar)

const vistaPrevia = document.createElement("div")
vistaPrevia.style.marginTop = "20px"
vistaPrevia.style.padding = "1  0px"
vistaPrevia.style.borderLeft = "4px solid #1463ff"
contenedorPanel.appendChild(vistaPrevia);

function actualizarFicha() {
  const modeloSeleccionado = selectorModelo.value
  const velocidadActual = Number(inputVelocidad.value)

  vistaPrevia.innerHTML = ""
  
  const pModelo = document.createElement("p")
  pModelo.textContent = "Modelo: " + modeloSeleccionado
  
  const pVelocidad = document.createElement("p")
  pVelocidad.textContent = "Velocidad Máxima: " + velocidadActual + " km/h"

  vistaPrevia.appendChild(pModelo)
  vistaPrevia.appendChild(pVelocidad)

  // extra: validación de seguridad
  const limiteSeguridad = 350;
  if (velocidadActual > limiteSeguridad) {
    const alertaSeguridad = document.createElement("strong")
    alertaSeguridad.textContent = "¡Advertencia! Requiere neumáticos especiales de alta resistencia para circuito."
    alertaSeguridad.style.color = "#ffb020"
    vistaPrevia.appendChild(alertaSeguridad)
    console.log("Alerta de sistema: Velocidad crítica de", velocidadActual, "km/h detectada.")
  }
}

inputVelocidad.addEventListener("input", function() {
  console.log("Cambio detectado en velocidad.")
  actualizarFicha()
});

selectorModelo.addEventListener("change", function() {
  console.log("Cambio detectado en modelo.")
  actualizarFicha();
});

botonProbar.addEventListener("click", function() {
  console.log("Configuración del auto guardada con éxito.")
  botonProbar.style.background = "#19a974"
  botonProbar.textContent = "Guardado"
});

actualizarFicha();