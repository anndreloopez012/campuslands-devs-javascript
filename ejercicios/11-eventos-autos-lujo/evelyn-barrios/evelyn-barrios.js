// Ejercicio 11: Eventos - autos de lujo
// Alumna: Evelyn Barrios

console.log("--- Cargando Concesionario ---");

// 1. Selección de elementos (según el index.html del ejercicio)
const titulo = document.getElementById('titulo');
const descripcion = document.getElementById('descripcion');
const botonAccion = document.getElementById('accion');
const panel = document.querySelector('.panel');
const colorInput = document.getElementById('colorInput');

// Datos del auto 
const autoLujo = {
    modelo: "Ferrari SF90 Stradale",
    velocidad: "340 km/h",
    color: "Gris Titanio"
};


botonAccion.addEventListener('click', () => {
    titulo.textContent = ` ${autoLujo.modelo}`;
    descripcion.textContent = `Potencia máxima: ${autoLujo.velocidad} | Color: ${autoLujo.color}`;
    panel.style.backgroundColor = "#0d0d0d";
    panel.style.color = "#ffffff";
    panel.style.borderColor = "#bdc3c7";
    
    console.log("Ficha técnica desplegada.");
});

colorInput.addEventListener('input', (event) => {
    const nuevoColor = event.target.value;
    panel.style.backgroundColor = nuevoColor;
    panel.style.color = (nuevoColor === "#ffffff") ? "#17202a" : "#ffffff";
});

panel.addEventListener('mouseover', () => {
    panel.style.boxShadow = "0 0 20px #bdc3c7";
    titulo.style.textShadow = "2px 2px 10px rgba(189, 195, 199, 0.8)";
});

panel.addEventListener('mouseout', () => {
    panel.style.boxShadow = "none";
});
