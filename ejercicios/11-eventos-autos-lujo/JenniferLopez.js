// Ejercicio 11: Eventos - autos de lujo
console.log("Ejercicio 11: Eventos");

const titulo = document.querySelector("#titulo");
const descripcion = document.querySelector("#descripcion");
const boton = document.querySelector("#accion");
const panel = document.querySelector(".panel");

let modeloActual = "Ferrari";
let velocidadActual = 0;

titulo.textContent = "🏎️ Ficha: Superdeportivo";
descripcion.textContent = `Modelo: ${modeloActual} | Velocidad: ${velocidadActual} km/h`;
boton.textContent = "Cambiar Auto y Color";

const barraVelocidad = document.createElement("input");
barraVelocidad.type = "range";
barraVelocidad.min = "0";
barraVelocidad.max = "350";
barraVelocidad.value = "0";
panel.insertBefore(barraVelocidad, boton);

barraVelocidad.addEventListener("input", (evento) => {
    velocidadActual = evento.target.value; 

    let mensajeReto = "";
    if (velocidadActual > 300) {
        mensajeReto = "  ¡Alerón activo! Modo Pista";
    }

    descripcion.textContent = `Modelo: ${modeloActual} | Velocidad: ${velocidadActual} km/h${mensajeReto}`;
});

boton.addEventListener("click", () => {
    if (modeloActual === "Ferrari") {
        modeloActual = "Lamborghini";
        panel.style.background = "#fff2cc"; 
    } else {
        modeloActual = "Ferrari";
        panel.style.background = "#ffcccc";
    }
    
    let mensajeReto = velocidadActual > 300 ? "  ¡Alerón activo! Modo Pista" : "";
    descripcion.textContent = `Modelo: ${modeloActual} | Velocidad: ${velocidadActual} km/h${mensajeReto}`;
});