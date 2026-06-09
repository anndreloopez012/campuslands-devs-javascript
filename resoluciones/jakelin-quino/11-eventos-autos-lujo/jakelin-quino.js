// Ejercicio 11: Eventos - autos de lujo
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 11: Eventos");

// -----------------SOLUCIÓN-----------------
const titulo = document.querySelector("#titulo");
const descripcion = document.querySelector("#descripcion");
const boton = document.querySelector("#accion");
let velocidadActual = 320;
let autoConfigurado = false;

boton.addEventListener("click", function() {
    if (!autoConfigurado) {
        titulo.textContent = "Ferrari SF90 Stradale";
        descripcion.textContent = `Velocidad Máxima: ${velocidadActual} km/h | Color: Rojo Corinto`;
        boton.textContent = "Incrementar Velocidad";
        boton.style.background = "#ff1493";
        autoConfigurado = true;
    } else {
        velocidadActual += 30;
        descripcion.textContent = `Velocidad Máxima: ${velocidadActual} km/h | Color: Rojo Corinto`;
        if (velocidadActual >= 440) {
            descripcion.textContent = `¡LÍMITE ALCANZADO! Velocidad: ${velocidadActual} km/h.`;
            boton.textContent = "Adiós Ferrari";
            boton.style.background = "#19a974";
            boton.disabled = true;
        }
    }
});