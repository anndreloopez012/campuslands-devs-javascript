// Aseguramos que el DOM esté completamente cargado antes de buscar los elementos
document.addEventListener("DOMContentLoaded", () => {

  
    // Paso 1: Selección de Elementos (querySelector)
  
    const titulo = document.querySelector("#titulo");
    const descripcion = document.querySelector("#descripcion");
    const botonAccion = document.querySelector("#accion");
    const panelPrincipal = document.querySelector(".panel");

    // Registro intermedio para verificar que los elementos existen
    console.log("--- 🕵️ Elementos Seleccionados ---");
    console.log("Botón de acción:", botonAccion);
    console.log("Panel contenedor:", panelPrincipal);
    console.log("----------------------------------\n");


  
    // Paso 2: Modificar Contenido y Estilos Iniciales
  
    // Modificamos el texto plano del encabezado y la descripción
    titulo.textContent = "Estudio de Dibujo Geométrico";
    descripcion.textContent = "Presiona el botón para renderizar las figuras artísticas en el lienzo.";


  
    // Paso 3: Crear interacción y cambiar estilos dinámicamente
  
    // Agregamos un escuchador de eventos al botón para que el usuario controle el cambio
    botonAccion.addEventListener("click", () => {
        
        console.log("🎯 Botón presionado: Renderizando elementos artísticos...");

        // Modificamos estilos directos del botón para reflejar un cambio de estado
        botonAccion.style.backgroundColor = "#19a974"; // Cambia a verde éxito
        botonAccion.textContent = "¡Renderizado!";
        botonAccion.disabled = true; // Deshabilitamos para evitar duplicados

        // Modificamos clases del panel principal
        panelPrincipal.style.borderColor = "#1463ff"; // Destacamos el borde del panel

      
        // 🟪 Reto extra: Dato extra relacionado con dibujo
      
        // Vamos a inyectar dinámicamente un "escenario de dibujo" (.scene) 
        // que contenga el cubo (.cube) y la torre (.tower) definidos en tu CSS.
        
        // 1. Creamos el contenedor del escenario
        const escenario = document.createElement("div");
        escenario.classList.add("scene");
        escenario.style.marginTop = "20px"; // Separación usando estilos directos
        
        // 2. Creamos la figura del Cubo
        const cubo = document.createElement("div");
        cubo.classList.add("cube");
        
        // 3. Creamos la figura de la Torre
        const torre = document.createElement("div");
        torre.classList.add("tower");

        // 4. Creamos una etiqueta de texto para documentar la obra (Dato extra)
        const infoObra = document.createElement("p");
        infoObra.style.fontSize = "12px";
        infoObra.style.color = "#777";
        infoObra.style.textAlign = "center";
        infoObra.style.margin = "10px 0 0 0";
        infoObra.textContent = "Perspectiva: isométrica | Composición: Abstracta 3D";

        // 5. Armamos la estructura introduciendo las figuras dentro del escenario
        escenario.appendChild(cubo);
        escenario.appendChild(torre);
        escenario.appendChild(infoObra);

        // 6. Finalmente, agregamos todo el escenario al final de nuestro panel principal
        panelPrincipal.appendChild(escenario);

        console.log("✅ Lienzo y figuras geométricas agregadas exitosamente al DOM.");
    });
});