// Ejercicio 11: Eventos - autos de lujo
console.log("Ejercicio 11: Eventos");

const titulo = document.querySelector("#titulo");
const descripcion = document.querySelector("#descripcion");
const boton = document.querySelector("#accion");
const panel = document.querySelector(".panel");

titulo.textContent = " Ficha Técnica: Deportivo";
descripcion.textContent = "Modelo: Ferrari | Velocidad: 0 km/h";
boton.textContent = "Cambiar Color";

const controlVelocidad = document.createElement("input");
controlVelocidad.type = "range";
controlVelocidad.min = "0";
controlVelocidad.max = "350";
controlVelocidad.value = "0";
controlVelocidad.style.display = "block";
controlVelocidad.style.margin = "15px 0";

panel.insertBefore(controlVelocidad, boton);

controlVelocidad.addEventListener("input", (evento) => {

    const velocidadActual = evento.target.value;
    descripcion.textContent = `Modelo: Ferrari LaFerrari | Velocidad: ${velocidadActual} km/h`;
});

boton.addEventListener("click", () => {

    panel.style.background = panel.style.background === "rgb(255, 204, 204)" ? "#ffffff" : "#ffcccc"; 
});


const alertaPista = document.createElement("p");
alertaPista.style.fontWeight = "bold";
panel.appendChild(alertaPista);

controlVelocidad.addEventListener("input", (evento) => {
    alertaPista.textContent = evento.target.value > 300 ? " ¡ADVERTENCIA: Modo Pista Activo!" : "";
    alertaPista.style.color = "red";
});
