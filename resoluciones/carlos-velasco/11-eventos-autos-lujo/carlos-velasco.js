const inputElemento = document.getElementById('valor'); 
const boton = document.getElementById('boton-cambio');
const texto = document.getElementById('texto-dinamico');
const div = document.getElementById('conteiner');
const formulario = document.getElementById('formulario');
const botonRojo= document.getElementById('boton-rojo');
const botonAzul = document.getElementById('boton-azul');
const botonNegro = document.getElementById('boton-negro');


div.classList.add("conteiner")
const botonesColor = document.querySelectorAll('.btn-color');

botonesColor.forEach(boton => {
    boton.addEventListener('click', (e) => {
        e.preventDefault();
        texto.style.color = boton.dataset.color; 
    });
});
boton.addEventListener('click', (e) => {
    e.preventDefault(); 
    texto.innerText = inputElemento.value.trim();
    formulario.reset();
});