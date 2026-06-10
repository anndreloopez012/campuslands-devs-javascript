// Seleccionamos los elementos del DOM
const titulo = document.querySelector("#titulo");
const descripcion = document.querySelector("#descripcion");
const boton = document.querySelector("#accion");


// cambiamos el texto del titulo 
titulo.textContent = "Holaa Brooo :D";
descripcion.textContent = "Este es un ejercicio de DOM, espero que te guste :)";

//cambiamos el color del boton
boton.style.backgroundColor = "green";

//Agregamos clases 
boton.classList.add("boton-principal");
