// Ejercicio 11: Eventos - autos de lujo
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 11: Eventos");

// Escribe tu solucion aqui.

// Seleccionamos elementos
const titulo = document.querySelector("#titulo");
const selector = document.querySelector("#selectorModelo");
const btnActualizar = document.querySelector("#btnActualizar");

// Escuchar el evento
btnActualizar.addEventListener("click", () => {
    const modeloElegido = selector.value;
    
    titulo.textContent = `Auto seleccionado: ${modeloElegido}`;
    console.log("El usuario eligió:", modeloElegido);
});

// Reto Extra
const configuraciones = {
    "Ferrari": "#ff0000",
    "Lamborghini": "#f1c40f",
    "Porsche": "#2e2e2e"
};

// Evento
btnActualizar.addEventListener("click", () => {
    const modeloElegido = selector.value;
    const colorSeleccionado = configuraciones[modeloElegido] || "#19a974";
    visualizador.style.backgroundColor = colorSeleccionado;
});