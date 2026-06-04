// 11. Eventos - Autos de lujo

// 1. Selección de elementos del DOM
const titulo = document.querySelector("#titulo");
const descripcion = document.querySelector("#descripcion");
const botonAccion = document.querySelector("#accion");
const panel = document.querySelector(".panel");

// Datos iniciales del auto de lujo
let velocidadActual = 0;
const velocidadMaxima = 320; 

// Inicializar textos en la ficha
titulo.textContent = "Superdeportivo GT";
descripcion.textContent = "Velocidad actual: " + velocidadActual + " km/h";
botonAccion.textContent = "Acelerar";

// 2. Escuchar el evento 'click' para cambiar modelo y velocidad
botonAccion.addEventListener("click", function() {
    // Incrementar velocidad de 40 en 40 km/h
    if (velocidadActual < velocidadMaxima) {
        velocidadActual += 40;
        descripcion.textContent = "Velocidad actual: " + velocidadActual + " km/h";
        console.log("Acelerando... Velocidad actual: " + velocidadActual + " km/h");
    }

    // Validación adicional (Reto extra)
    if (velocidadActual >= velocidadMaxima) {
        descripcion.textContent = "Velocidad máxima alcanzada: " + velocidadMaxima + " km/h";
        botonAccion.style.backgroundColor = "#ff2020"; // Cambia a color de advertencia rojo
        botonAccion.textContent = "Límite alcanzado";
    }
});

// 3. Simular evento 'input' mediante un cambio de color al pasar el mouse por el panel
// Nota: Dado que el HTML no tiene un elemento <input>, usamos 'mouseover' en el panel para cambiar color
panel.addEventListener("mouseover", function() {
    panel.style.borderColor = "#1463ff";
    console.log("Inspeccionando el auto: Color de chasis resaltado");
});

panel.addEventListener("mouseout", function() {
    panel.style.borderColor = "#d7dde8";
});

// 4. Dato extra relacionado con autos de lujo
const caballosFuerza = 750;
console.log("Especificaciones de fábrica: " + caballosFuerza + " HP (Caballos de fuerza).");
