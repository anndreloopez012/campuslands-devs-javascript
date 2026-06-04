// 15. Proyecto integrador básico - Diseño 3D Arquitectura

// 1. Objetos y Arrays (Datos de la escena arquitectónica)
const configuracionEscena = {
    renderizador: "Motor Nativo CSS3D",
    escala: "1:100"
};

const elementos3D = [
    { selector: ".cube", nombre: "Bloque Habitacional" },
    { selector: ".tower", nombre: "Torre de Control" }
];

// 2. Selección del DOM
const botonToggle = document.querySelector("#toggle");
const cubo = document.querySelector(".cube");
const torre = document.querySelector(".tower");

let animacionActiva = false;

// 3. Funciones de control de la animación
function activarAnimacion() {
    // Aplicamos transformaciones y transiciones de animación 3D mediante estilos inline
    cubo.style.transition = "transform 2s linear";
    cubo.style.transform = "rotateX(180deg) rotateY(215deg) scale(1.1)";
    
    torre.style.transition = "transform 2s ease-in-out";
    torre.style.transform = "translateY(-10px) scaleY(1.05)";
    
    botonToggle.textContent = "Detener Render";
    botonToggle.style.backgroundColor = "#ff2020";
    animacionActiva = true;
    console.log("Renderizado de animación en curso...");
}

function detenerAnimacion() {
    // Restauramos a los valores iniciales del CSS base
    cubo.style.transform = "rotateX(20deg) rotateY(35deg) scale(1)";
    torre.style.transform = "none";
    
    botonToggle.textContent = "Animar";
    botonToggle.style.backgroundColor = "#1463ff";
    animacionActiva = false;
    console.log("Animación pausada. Estructuras en posición de reposo.");
}

// 4. Eventos (Manejo de interacciones)
botonToggle.addEventListener("click", function() {
    if (!animacionActiva) {
        activarAnimacion();
    } else {
        detenerAnimacion();
    }
});

// 5. Validación adicional y dato extra (Reto extra)
console.log("--- Inicialización del Proyecto Integrador ---");
console.log("Motor activo: " + configuracionEscena.renderizador);

// Recorrido de array para validar existencia de estructuras en el DOM
let estructurasValidas = 0;
elementos3D.forEach(function(objeto) {
    const nodo = document.querySelector(objeto.selector);
    if (nodo) {
        estructurasValidas++;
        console.log("Estructura detectada: " + objeto.nombre);
    }
});

if (estructurasValidas === elementos3D.length) {
    console.log("Validación: Escena 3D cargada íntegramente sin errores de malla.");
} else {
    console.log("Validación: Error. Faltan componentes en la escena.");
}