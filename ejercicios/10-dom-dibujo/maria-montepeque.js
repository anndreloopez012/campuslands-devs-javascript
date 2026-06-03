// Ejercicio 10: DOM basico - dibujo
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 10: DOM basico");

// Escribe tu solucion aqui.

const titulo = document.querySelector("#titulo");
const descripcion = document.querySelector("#descripcion");
const boton = document.querySelector("#accion");
const panel = document.querySelector(".panel");

titulo.textContent = "Mi tarjeta de dibujo";
descripcion.textContent = "Presiona el boton para dibujar una figura.";
titulo.style.color = "#1463ff";

const figura = document.createElement("div");
figura.classList.add("cube");
panel.appendChild(figura);

let activo = false;
boton.addEventListener("click", () => {
    activo = !activo;
    figura.style.background = activo ? "#ff5c5c" : "#19a974";
    boton.textContent = activo ? "Reiniciar" : "Probar";
    descripcion.textContent = activo ? "Figura coloreada!" : "Figura reiniciada.";
});