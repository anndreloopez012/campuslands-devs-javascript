// Ejercicio 15: Proyecto integrador basico - animacion 3D, MOBA o diseno 3D arquitectura

console.log("Ejercicio 15: Proyecto integrador basico");

const escena = document.querySelector(".scene");
const torre = document.querySelector(".tower");
const cubo = document.querySelector(".cube");
const botonAnimar = document.querySelector("#toggle");

const componentesProyecto = [
    { elemento: "Estructura Base", material: "Concreto Reforzado", escala: "1:100" },
    { elemento: "Fachada Cubo", material: "Vidrio Templado Reflectivo", escala: "1:100" }
];

let maquetacionActiva = false;

const infoPanel = document.createElement("div");
infoPanel.style.marginTop = "20px";
infoPanel.style.fontSize = "14px";
infoPanel.style.lineHeight = "1.6";
escena.appendChild(infoPanel);

function mostrarFichaTecnica() {
    let contenidoHTML = "ESPECIFICACIONES DE DISENO 3D:<br>";
    
    componentesProyecto.forEach((componente) => {
        contenidoHTML += `- ${componente.elemento}: ${componente.material} (Escala ${componente.escala})<br>`;
    });
    
    infoPanel.innerHTML = contenidoHTML;
}

function actualizarAnimacion() {
    if (maquetacionActiva) {
        cubo.style.transition = "transform 3s linear";
        cubo.style.transform = "rotateX(45deg) rotateY(180deg) scale(1.1)";
        torre.style.transition = "background-color 1.5s ease";
        torre.style.backgroundColor = "#ff5722";
        botonAnimar.textContent = "Detener Render";
        botonAnimar.style.backgroundColor = "#e74c3c";
    } else {
        cubo.style.transform = "rotateX(20deg) rotateY(35deg) scale(1)";
        torre.style.backgroundColor = "#ffb020";
        botonAnimar.textContent = "Animar Render 3D";
        botonAnimar.style.backgroundColor = "#1463ff";
    }
}

botonAnimar.addEventListener("click", () => {
    maquetacionActiva = !maquetacionActiva;
    console.log("Estado del renderizado 3D: " + maquetacionActiva);
    actualizarAnimacion();
});

function validarPlanosEstructurales() {
    const alertaSeguridad = document.createElement("p");
    alertaSeguridad.style.fontWeight = "bold";
    alertaSeguridad.style.marginTop = "10px";
    
    if (componentesProyecto[0].material.includes("Concreto")) {
        alertaSeguridad.textContent = "Planos Estructurales: Aprobacion Sismica Verificada.";
        alertaSeguridad.style.color = "#19a974";
    } else {
        alertaSeguridad.textContent = "Advertencia estructural en los materiales.";
        alertaSeguridad.style.color = "#d9534f";
    }
    escena.appendChild(alertaSeguridad);
}

mostrarFichaTecnica();
validarPlanosEstructurales();
botonAnimar.textContent = "Animar Render 3D";