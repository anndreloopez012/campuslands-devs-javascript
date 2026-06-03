// Ejercicio 10: DOM basico - dibujo
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 10: DOM basico");

// Escribe tu solucion aqui.

let main = document.querySelector(".panel")
let titulo = document.querySelector("#titulo")
let descripcion = document.querySelector("#descripcion")
let boton = document.querySelector("#accion")


boton.addEventListener("click", function() {
    main.style.backgroundColor = "black"
    titulo.style.color = "white"
    titulo.textContent = "Dibujo La Mona Lisa"
    descripcion.textContent = "La Mona Lisa es una pintura de Leonardo da Vinci, creada entre 1503 y 1506. Es una de las obras de arte más famosas del mundo y se encuentra en el Museo del Louvre en París."
    descripcion.style.color = "white"
    boton.style.backgroundColor = "green" 
    boton.textContent = "Dibujo"
    main.className = "panel-clicked"   
    alert("La clase del main ahora es: " + main.className)
    main.className = "panel"
})