// Seleccionamos los elementos del DOM
const titulo = document.querySelector("#titulo");
const descripcion = document.querySelector("#descripcion");
const boton = document.querySelector("#accion");
const panel = document.querySelector(".panel");

// Escuchamos el evento
boton.addEventListener("click", () => {
    
    // Cambiamos contenido de texto
    titulo.textContent = "Activado";
    descripcion.textContent = "DOM modificado";

    // Cambiamos estilos del panel
    panel.style.backgroundColor = "#3c3340";
    panel.style.border = "2px solid #ffffff";

    // Creamos y añadimos el cubo
    const nuevoElemento = document.createElement("div");
    nuevoElemento.classList.add("cube");
    panel.appendChild(nuevoElemento);

    // Ocultamos el boton para finalizar la interaccion
    boton.style.display = "none";
});