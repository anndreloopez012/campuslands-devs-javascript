// Ejercicio 10: DOM basico - dibujo
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 10: DOM basico");

// Escribe tu solucion aqui.

console.log("Ejercicio 10: DOM basico");

// Seleccionar elementos
const titulo = document.querySelector("#titulo");
const descripcion = document.querySelector("#descripcion");
const boton = document.querySelector("#accion");

// Cambiar texto
titulo.textContent = "Dibujo Creativo";
descripcion.textContent = "Modificando el DOM con JavaScript.";

// Cambiar estilos
titulo.style.color = "blue";
descripcion.style.color = "green";

// Agregar clase
titulo.classList.add("destacado");

// Reto extra
boton.textContent = "Ver dibujo";