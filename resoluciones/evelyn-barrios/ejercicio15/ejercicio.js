// Ejercicio 15: Proyecto integrador basico - animacion 3D, MOBA o diseno 3D arquitectura
// Completa el codigo siguiendo las instrucciones del README.md.
console.log("--- Proyecto Integrador: Animacion 3D ---");

// Escribe tu solucion aqui.
const btnToggle = document.getElementById('toggle');
const crystal = document.querySelector('.crystal');

if (btnToggle && crystal) {
    btnToggle.addEventListener('click', () => {
        const isActive = crystal.classList.toggle('active-crystal');

        btnToggle.textContent = isActive ? "Desactivar" : "Activar Energía";
        
        console.log(isActive 
            ? "Energía fluyendo: Cristal levitando." 
            : "Energía disipada: Cristal en reposo.");
    });
}