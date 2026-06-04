// Ejercicio 15: Proyecto integrador basico - animacion 3D, MOBA o diseno 3D arquitectura
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 15: Proyecto integrador basico");

// Escribe tu solucion aqui.

// Seleccionamos elementos
const btn = document.querySelector("#toggle");
const cubo = document.querySelector(".cube");
const torre = document.querySelector(".tower");

// Estado de la animacion (Reto extra: validacion de estado)
let estaAnimado = false;

btn.addEventListener("click", () => {
    if (!estaAnimado) {
        // animacion
        cubo.style.transform = "rotateX(20deg) rotateY(35deg) translateY(-50px)";
        torre.style.transform = "scaleY(1.2)";
        btn.textContent = "Resetear";
        console.log("Escena: Modo animado activado");
    } else {
        // reseteo
        cubo.style.transform = "rotateX(20deg) rotateY(35deg) translateY(0px)";
        torre.style.transform = "scaleY(1)";
        btn.textContent = "Animar";
        console.log("Escena: Estado inicial");
    }
    
    // Cambiamos el valor de la validacion
    estaAnimado = !estaAnimado;
});