// Ejercicio 15: Proyecto integrador basico - animacion 3D, MOBA o diseno 3D arquitectura
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 15: Proyecto integrador basico");

// --------------------SOLUCIÓN--------------------
const boton = document.querySelector("#toggle");
const cubo = document.querySelector(".cube");
const torre = document.querySelector(".tower");

const estilosAnimacion = document.createElement("style");
estilosAnimacion.textContent = `
    .animacion-activa {
        transition: transform 2s linear infinite;
        transform: rotateX(360deg) rotateY(360deg) !important;
    }
    .defensa-activa {
        transition: filter 0.5s ease, transform 0.5s ease;
        filter: hue-rotate(90deg) drop-shadow(0 0 15px #ffb020);
        transform: scale(1.05);
    }
`;
document.head.appendChild(estilosAnimacion);

let escenaActiva = false;
boton.addEventListener("click", function() {
    escenaActiva = !escenaActiva;
    if (escenaActiva) {
        cubo.classList.add("animacion-activa");
        torre.classList.add("defensa-activa");
        boton.textContent = "Sin animación";
        boton.style.background = "#ffb020";
    } else {
        cubo.classList.remove("animacion-activa");
        torre.classList.remove("defensa-activa");
        boton.textContent = "Animar";
        boton.style.background = "#1463ff";
    }
    console.log(`¿Animación corriendo?: ${escenaActiva}`);
});