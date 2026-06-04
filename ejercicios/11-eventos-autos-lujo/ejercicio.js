// Ejercicio 11: Eventos - autos de lujo
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 11: Eventos");

// Escribe tu solucion aqui.

console.log("Ejercicio 11: Eventos");

// Seleccionar elementos
const titulo = document.querySelector("#titulo");
const descripcion = document.querySelector("#descripcion");
const boton = document.querySelector("#accion");

// Evento click
boton.addEventListener("click", function () {
    titulo.textContent = "Lamborghini Aventador";
    descripcion.textContent = "Velocidad máxima: 350 km/h";
    titulo.style.color = "gold";
});

// Reto extra
if (titulo && descripcion && boton) {
    console.log("Ficha de auto de lujo cargada correctamente.");
}