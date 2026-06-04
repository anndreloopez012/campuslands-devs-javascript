let titulo = document.querySelector("#titulo");
let descripcion = document.querySelector("#descripcion");
let boton = document.querySelector("#accion");
let panel = document.querySelector(".panel");

boton.addEventListener("click",function(){
    panel.style.backgroundColor = "green";
    titulo.textContent = "Hola broo"
    titulo.style.color = "white"
    descripcion.textContent = "Si miras este texto es porque si funciono jajaj "
    descripcion.style.color = "white"
})

