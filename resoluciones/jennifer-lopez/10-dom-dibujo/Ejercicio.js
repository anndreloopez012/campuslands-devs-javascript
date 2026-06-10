// Ejercicio 10: DOM basico - dibujo
console.log("Ejercicio 10: DOM basico");

const titulo = document.querySelector("#titulo");
const descripcion = document.querySelector("#descripcion");
const boton = document.querySelector("#accion");
const panelPrincipal = document.querySelector(".panel");

titulo.textContent = "-- Taller de Dibujo Digital--";
descripcion.textContent = "Presiona el botón para renderizar una figura geométrica.";
titulo.style.color = "#1463ff"; 

const figura = document.createElement("div");
panelPrincipal.insertBefore(figura, boton); 

boton.addEventListener("click", () => {
    if (!figura.classList.contains("cube") && !figura.classList.contains("tower")) {
        figura.classList.add("cube");
        descripcion.textContent = "Cubo en 3D";
    } else if (figura.classList.contains("cube")) {
        figura.classList.remove("cube");
        figura.classList.add("tower");
        descripcion.textContent = "Ahora es una Torre geométrica.";
    } else {
        figura.classList.remove("tower");
        descripcion.textContent = "Lienzo limpio. ¡Vuelve a intentar!";
    }
});