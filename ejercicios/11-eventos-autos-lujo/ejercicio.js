// Ejercicio 11: Eventos - autos de lujo
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 11: Eventos");

// Escribe tu solucion aqui.

let main = document.querySelector(".panel")
let titulo = document.querySelector("#titulo")
let descripcion = document.querySelector("#descripcion")
let input = document.querySelector("#input")
let boton = document.querySelector("#accion")


boton.addEventListener("click", function() {
    main.style.backgroundColor = "darkblue"
    titulo.style.color = "white"
    descripcion.style.color = "white"
    boton.style.backgroundColor = "darkgreen" 
    titulo.textContent = input.value || "Lamborghini Aventador"
    descripcion.textContent = "El Lamborghini Aventador es un superdeportivo de lujo fabricado por la marca italiana Lamborghini. Con su diseño agresivo y su potente motor V12, el Aventador ofrece un rendimiento excepcional y una experiencia de conducción emocionante. Es conocido por su velocidad, manejo preciso y exclusividad, convirtiéndolo en uno de los autos más deseados del mundo."
    main.removeChild(input)
})