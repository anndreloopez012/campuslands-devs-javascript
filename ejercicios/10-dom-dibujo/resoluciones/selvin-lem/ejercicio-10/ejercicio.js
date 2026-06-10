// Ejercicio 10: DOM basico - dibujo
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 10: DOM basico");

// Escribe tu solucion aqui.

const botonAccion = document.querySelector("#accion")
const tituloPrincipal = document.querySelector("#titulo")
const descripcionTexto = document.querySelector("#descripcion")
const contenedorPanel = document.querySelector(".panel")

// extra: validación de existencia de elementos en la página
if (botonAccion && tituloPrincipal && descripcionTexto) {
  console.log("Validación: Todos los elementos del DOM fueron encontrados con éxito.")

  botonAccion.addEventListener("click", function() {
    
    tituloPrincipal.textContent = "¡Lienzo de Dibujo Activo!"
    descripcionTexto.textContent = "Se ha renderizado un cubo geométrico usando clases de CSS dinámicas."

    tituloPrincipal.style.color = "#1463ff"
    botonAccion.style.background = "#2a3b50" 
    botonAccion.textContent = "Dibujado"

    const figuraDibujo = document.createElement("div")
    
    figuraDibujo.classList.add("cube")
    contenedorPanel.insertBefore(figuraDibujo, botonAccion)

    console.log("Estado del DOM: Tarjeta actualizada y figura renderizada.")
  })

} else {
  console.log("Error: No se pudieron encontrar algunos elementos en el archivo HTML.")
}