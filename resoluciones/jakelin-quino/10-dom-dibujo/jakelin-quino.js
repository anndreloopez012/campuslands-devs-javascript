// Ejercicio 10: DOM basico - dibujo
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 10: DOM basico");

// -----------------------SOLUCIÓN-----------------------
const titulo = document.querySelector("#titulo");
const descripcion = document.querySelector("#descripcion");
const boton = document.querySelector("#accion");
const panel = document.querySelector(".panel");

boton.addEventListener("click", function() {
    titulo.textContent = "Dibujo Técnico: Torre y Cubo";
    descripcion.textContent = "Se han renderizado las figuras geométricas.";
    const cubo = document.createElement("div");
    cubo.classList.add("cube");
    const torre = document.createElement("div");
    torre.classList.add("tower");
    panel.insertBefore(cubo, boton);
    panel.insertBefore(torre, boton);
    panel.style.borderColor = "#1463ff";
    panel.style.boxShadow = "0 4px 12px rgba(20, 99, 255, 0.15)";
    boton.textContent = "Dibujo Completado";
    boton.style.background = "#19a974";
    boton.disabled = true;
});