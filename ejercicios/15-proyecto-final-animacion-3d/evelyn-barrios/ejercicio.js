// Ejercicio 15: Proyecto integrador basico - animacion 3D, MOBA o diseno 3D arquitectura
// Completa el codigo siguiendo las instrucciones del README.md.
console.log("--- Proyecto Integrador: Animacion 3D ---");

// Escribe tu solucion aqui.
const btnToggle = document.getElementById('toggle');
const cube = document.querySelector('.cube');
const tower = document.querySelector('.tower');

if (btnToggle && cube && tower) {
    btnToggle.addEventListener('click', () => {
        // Alternamos las clases de CSS que contienen las animaciones
        cube.classList.toggle('animating-cube');
        tower.classList.toggle('animating-tower');

        if (cube.classList.contains('animating-cube')) {
            btnToggle.textContent = "Detener Animacion";
            console.log("Estado: Animacion en ejecucion.");
        } else {
            btnToggle.textContent = "Animar";
            console.log("Estado: Animacion pausada.");
        }
    });
}