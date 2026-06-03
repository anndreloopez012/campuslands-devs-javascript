// Ejercicio 10: DOM básico - dibujo
// Alumna: Evelyn Barrios

console.log("--- Inicializando Lienzo ---");

// 1. Selección de elementos
// Usamos querySelector para clases y getElementById para IDs específicos
const tituloLienzo = document.querySelector('h1'); 
const tarjetaDibujo = document.querySelector('.panel');
const estadoTexto = document.getElementById('descripcion');

if (tituloLienzo) {
    tituloLienzo.textContent =  "Mi Taller de Arte Interactivo";
}

if (tarjetaDibujo) {
    tarjetaDibujo.style.border = "4px solid #4a90e2";
    tarjetaDibujo.style.borderRadius = "20px";
    tarjetaDibujo.style.backgroundColor = "#fafafa";
    tarjetaDibujo.style.boxShadow = "0 10px 25px rgba(0,0,0,0.2)";
    tarjetaDibujo.style.padding = "20px";
}

if (estadoTexto) {
    estadoTexto.textContent = "Lienzo listo: Esperando trazos...";
    estadoTexto.classList.add('active-status'); 
    
    setTimeout(() => {
        estadoTexto.classList.replace('active-status', 'drawing-mode');
        console.log("Modo dibujo automáticamente.");
    }, 1500);
}
