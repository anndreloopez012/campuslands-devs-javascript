// 10. DOM básico - Dibujo

// 1. Selección de elementos (querySelector)
const titulo = document.querySelector("#titulo");
const descripcion = document.querySelector("#descripcion");
const boton = document.querySelector("#accion");
const panel = document.querySelector(".panel");

// 2. Modificar contenido de texto (textContent)
titulo.textContent = "Estudio de Dibujo Geométrico";
descripcion.textContent = "Lienzo de dibujo técnico listo para interactuar.";

// 3. Modificar estilos en línea (style)
// Cambiamos el estilo del botón usando propiedades CSS válidas
boton.style.backgroundColor = "#19a974";
boton.style.transform = "scale(1.05)";

// 4. Manipular clases de CSS (classList)
// El CSS define la clase .scene con el mismo tamaño y borde que .panel
panel.classList.add("scene");

// 5. Validación adicional y dato extra (Reto extra)
// Validamos si la clase nueva se aplicó correctamente en el elemento
const contieneClaseScene = panel.classList.contains("scene");

if (contieneClaseScene) {
    console.log("Validación: La clase .scene se vinculó con éxito al panel.");
} else {
    console.log("Validación: Hubo un problema al agregar la clase.");
}

// Dato extra relacionado con el CSS de dibujo geométrico proporcionado
const elementosDisponibles = ["Cubo (.cube)", "Torre (.tower)"];
console.log("Modelos 3D listos en la hoja de estilos: " + elementosDisponibles.join(", "));