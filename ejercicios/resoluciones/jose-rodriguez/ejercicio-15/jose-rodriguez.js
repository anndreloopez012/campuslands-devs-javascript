document.addEventListener("DOMContentLoaded", () => {
   
    // Paso 1: Selección de Elementos Base del DOM
   
    const botonAnimar = document.querySelector("#toggle");
    const cuboElemento = document.querySelector(".cube");
    const torreElemento = document.querySelector(".tower");
    const contenedorEscena = document.querySelector(".scene");

    // Registro intermedio para verificar la correcta vinculación
    console.log("--- Inicializando Proyecto Arquitectura 3D ---");
    console.log("Nodo Cubo:", cuboElemento);
    console.log("Nodo Torre:", torreElemento);
    console.log("-------------------------------------------------\n");

   
    // Paso 2: Estado de la Aplicación (Objetos y Arrays)
   
    // Objeto de configuración para controlar los estados de la animación
    const estadoAnimacion = {
        activo: false,
        anguloRotacion: 35,
        idIntervalo: null
    };

    // Colección de materiales arquitectónicos (Array de Objetos)
    const catalogoMateriales = [
        { nombre: "Concreto Visto", colorCubo: "#7f8c8d", colorTorre: "#bdc3c7", densidad: "2400 kg/m³" },
        { nombre: "Cristal Templado", colorCubo: "#3498db", colorTorre: "#2980b9", densidad: "2500 kg/m³" },
        { nombre: "Cobre Oxidado", colorCubo: "#19a974", colorTorre: "#d35400", densidad: "8960 kg/m³" }, // Color base de tu CSS incluido
        { nombre: "Madera de Cedro", colorCubo: "#e67e22", colorTorre: "#ffb020", densidad: "500 kg/m³" }   // Color base de tu CSS incluido
    ];

   
    // Paso 3: Inyección de Controles Arquitectónicos en la UI
   
    // Creamos un panel de control superior para interactuar con la escena
    const panelControl = document.createElement("div");
    panelControl.style.marginBottom = "20px";
    panelControl.style.display = "flex";
    panelControl.style.flexDirection = "column";
    panelControl.style.gap = "10px";

    panelControl.innerHTML = `
        <h2 style="margin: 0 0 5px 0; font-size: 20px; color: #1463ff;">Estudio Arquitectónico 3D</h2>
        <p style="margin: 0 0 10px 0; font-size: 13px; color: #555;">Renderizado de volumetrías geométricas elementales.</p>
        
        <div>
            <label style="font-weight: bold; font-size: 14px; display: block; margin-bottom: 5px;">Material Estructural:</label>
            <select id="selectorMaterial" style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid #d7dde8; background: white; cursor: pointer;">
                ${catalogoMateriales.map((mat, index) => `<option value="${index}">${mat.nombre}</option>`).join("")}
            </select>
        </div>
        <hr style="border: 0; border-top: 1px solid #d7dde8; margin: 10px 0;">
    `;

    // Insertamos el panel al inicio del contenedor principal antes de las figuras
    contenedorEscena.insertBefore(panelControl, torreElemento);

    // Capturamos el selector recién inyectado
    const selectorMaterial = document.querySelector("#selectorMaterial");

    // Contenedor inferior para el Reto Extra (Ficha Técnica)
    const fichaTecnica = document.createElement("div");
    fichaTecnica.style.marginTop = "20px";
    fichaTecnica.style.padding = "12px";
    fichaTecnica.style.borderRadius = "6px";
    fichaTecnica.style.background = "#f8f9fa";
    fichaTecnica.style.fontSize = "12px";
    fichaTecnica.style.borderLeft = "4px solid #1463ff";
    contenedorEscena.appendChild(fichaTecnica);

   
    // Paso 4: Funciones de Animación y Renderizado
   
    /**
     * Aplica los colores del material seleccionado a los elementos del DOM.
     * @param {number} indice - Posición del material en el array.
     */
    function aplicarMaterial(indice) {
        const material = catalogoMateriales[indice];
        
        // Modificación directa de estilos inline respetando las clases del CSS
        cuboElemento.style.backgroundColor = material.colorCubo;
        torreElemento.style.backgroundColor = material.colorTorre;
        
        console.log(`Material aplicado: ${material.nombre}`);
        actualizarFichaTecnica(material);
    }

    /**
     * Ejecuta el bucle de rotación matemática para simular animación 3D.
     */
    function actualizarAnimacion() {
        estadoAnimacion.anguloRotacion = (estadoAnimacion.anguloRotacion + 1) % 360;
        
        // Modificamos dinámicamente la propiedad transform que definiste en el CSS
        cuboElemento.style.transform = `rotateX(20deg) rotateY(${estadoAnimacion.anguloRotacion}deg)`;
        
        // Añadimos una ligera torsión a la torre para integrarla en la escena
        torreElemento.style.transform = `rotateY(${-estadoAnimacion.anguloRotacion * 0.5}deg)`;
    }

   
    // 🟪 Reto Extra: Validación y Datos Arquitectónicos
   
    /**
     * Genera y valida la información de ingeniería de la estructura.
     * @param {object} material - Objeto con los datos del material activo.
     */
    function actualizarFichaTecnica(material) {
        // Cálculo extra ficticio: Si el material es muy denso, emitimos una alerta estructural
        const esPesado = parseInt(material.densidad) > 5000;
        const estadoCarga = esPesado 
            ? "<span style='color: #e74c3c; font-weight: bold;'>Alerta: Requiere cimentación profunda.</span>" 
            : "<span style='color: #19a974; font-weight: bold;'>Carga estructural segura para suelo estándar.</span>";

        fichaTecnica.innerHTML = `
            <strong style="color: #17202a; display: block; margin-bottom: 4px;">📊 ESPECIFICACIONES TÉCNICAS DE LA COMPOSICIÓN:</strong>
            • <strong>Volumen Base:</strong> Torre Prismática + Cubo Rotado<br>
            • <strong>Densidad Estructura:</strong> ${material.densidad}<br>
            • <strong>Estudio de Suelos:</strong> ${estadoCarga}
        `;
    }

   
    // Paso 5: Gestión de Eventos (Listeners)
   
    
    // Evento A: Cambiar el material de construcción
    selectorMaterial.addEventListener("change", (evento) => {
        const indiceSeleccionado = parseInt(evento.target.value);
        aplicarMaterial(indiceSeleccionado);
    });

    // Evento B: Control de la Animación 3D (Click en el botón)
    botonAnimar.addEventListener("click", () => {
        estadoAnimacion.activo = !estadoAnimacion.activo;

        if (estadoAnimacion.activo) {
            // Iniciamos un intervalo de alta frecuencia para una animación fluida
            estadoAnimacion.idIntervalo = setInterval(actualizarAnimacion, 16); // ~60 FPS
            
            botonAnimar.textContent = "Detener";
            botonAnimar.style.backgroundColor = "#e74c3c"; // Cambia a rojo de detención
            console.log("Animación de renderizado activada.");
        } else {
            // Limpiamos el intervalo de memoria para evitar fugas de rendimiento
            clearInterval(estadoAnimacion.idIntervalo);
            
            botonAnimar.textContent = "Animar";
            botonAnimar.style.backgroundColor = "#1463ff"; // Restablece al color azul base
            console.log("Animación pausada.");
        }
    });

    // Carga inicial por defecto con el primer material del catálogo
    aplicarMaterial(0);
});