
// Seleccionamos elementos
const titulo = document.querySelector("#titulo");
const selector = document.querySelector("#selectorModelo");
const btnActualizar = document.querySelector("#btnActualizar");
const visualizador = document.querySelector("#visualizador");

// Reto Extra
const configuraciones = {
    "Ferrari": "#ff0000",
    "Lamborghini": "#f1c40f",
    "Porsche": "#2e2e2e"
};

// Escuchar el evento
btnActualizar.addEventListener("click", () => {
    const modeloElegido = selector.value;
    
    // actualizamos titulo
    titulo.textContent = `Auto seleccionado: ${modeloElegido}`;
    console.log("El usuario eligió:", modeloElegido);

    // color base
    const colorSeleccionado = configuraciones[modeloElegido] || "#19a974";
    visualizador.style.backgroundColor = colorSeleccionado;
});