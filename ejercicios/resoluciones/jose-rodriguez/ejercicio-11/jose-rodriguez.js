document.addEventListener("DOMContentLoaded", () => {
   
    // Paso 1: Selección de Elementos Base
   
    const titulo = document.querySelector("#titulo");
    const descripcion = document.querySelector("#descripcion");
    const botonProbar = document.querySelector("#accion");
    const panelPrincipal = document.querySelector(".panel");

    // Ajustamos los textos iniciales para adaptarlos al tema de autos de lujo
    titulo.textContent = "Configurador de Autos de Lujo";
    descripcion.textContent = "Personaliza las especificaciones de tu superdeportivo en tiempo real.";

   
    // Paso 2: Inyección Dinámica del Interfaz de Usuario (UI)
   
    // Creamos un contenedor interno para nuestro configurador
    const contenedorConfigurador = document.createElement("div");
    contenedorConfigurador.style.marginTop = "20px";
    contenedorConfigurador.style.display = "flex";
    contenedorConfigurador.style.flexDirection = "column";
    contenedorConfigurador.style.gap = "15px";

    // Inyectamos controles HTML interactivos (Selectores y deslizadores)
    contenedorConfigurador.innerHTML = `
        <hr style="border: 0; border-top: 1px solid #d7dde8; margin: 10px 0;">
        
        <div>
            <label style="display:block; font-weight:bold; margin-bottom:5px;">Selecciona el Modelo:</label>
            <select id="selectorModelo" style="width:100%; padding:8px; border-radius:6px; border:1px solid #d7dde8;">
                <option value="Spectre GT">Spectre GT v12</option>
                <option value="Nebula Roadster">Nebula Roadster (Eléctrico)</option>
                <option value="Apex Hypercar">Apex Hypercar Limited Edition</option>
            </select>
        </div>

        <div>
            <label style="display:block; font-weight:bold; margin-bottom:5px;">Velocidad Máxima (km/h):</label>
            <input type="range" id="controlVelocidad" min="200" max="420" value="300" style="width:100%;">
            <span id="displayVelocidad" style="font-size:14px; color:#555;">300 km/h</span>
        </div>

        <div>
            <label style="display:block; font-weight:bold; margin-bottom:5px;">Color de Carrocería:</label>
            <input type="color" id="controlColor" value="#19a974" style="width:100%; height:40px; border:0; cursor:pointer;">
        </div>

        <div id="fichaAuto" style="margin-top:15px; padding:15px; border:1px dashed #1463ff; border-radius:6px; text-align:center;">
            <h3 id="vistaModelo" style="margin:0 0 10px 0; color:#1463ff;">Spectre GT</h3>
            <p id="vistaVelocidad" style="margin:5px 0;">Velocidad punta: <strong>300 km/h</strong></p>
            
            <div id="chasisAuto" class="cube" style="transition: background 0.2s, transform 0.3s; margin: 15px auto 5px auto;"></div>
            <span style="font-size:11px; color:#888;">Renderizado Aero 3D (Chasis)</span>
        </div>

        <p id="alertaSeguridad" style="color:#d9383a; font-weight:bold; text-align:center; margin:5px 0; min-height:20px;"></p>
    `;

    // Ocultamos el botón original "Probar" e introducemos los nuevos controles al panel
    botonProbar.style.display = "none";
    panelPrincipal.appendChild(contenedorConfigurador);

   
    // Paso 3: Captura de los Nuevos Elementos del DOM
   
    const selectorModelo = document.querySelector("#selectorModelo");
    const controlVelocidad = document.querySelector("#controlVelocidad");
    const displayVelocidad = document.querySelector("#displayVelocidad");
    const controlColor = document.querySelector("#controlColor");
    
    const vistaModelo = document.querySelector("#vistaModelo");
    const vistaVelocidad = document.querySelector("#vistaVelocidad");
    const chasisAuto = document.querySelector("#chasisAuto");
    const alertaSeguridad = document.querySelector("#alertaSeguridad");

   
    // Paso 4: Escucha de Eventos (addEventListener, click, input)
   

    // Evento 1: Cambio de Modelo (Escucha evento 'change')
    selectorModelo.addEventListener("change", (evento) => {
        const modeloSeleccionado = evento.target.value;
        vistaModelo.textContent = modeloSeleccionado;
        console.log(`🚙 Modelo actualizado: ${modeloSeleccionado}`);
    });

    // Evento 2: Modificación de Velocidad (Escucha evento 'input' en tiempo real)
    controlVelocidad.addEventListener("input", (evento) => {
        const velocidadActual = evento.target.value;
        
        // Actualizamos los textos en la UI
        displayVelocidad.textContent = `${velocidadActual} km/h`;
        vistaVelocidad.innerHTML = `🚀 Velocidad punta: <strong>${velocidadActual} km/h</strong>`;
        
        // Efecto visual dinámico: a mayor velocidad, alteramos la rotación de la clase .cube
        const rotacionDinamica = 20 + (velocidadActual - 200) * 0.1;
        chasisAuto.style.transform = `rotateX(${rotacionDinamica}deg) rotateY(35deg)`;

        console.log(`⏱️ Velocidad modificada: ${velocidadActual} km/h`);

        // Ejecución de validación del Reto Extra
        validarLimiteVelocidad(parseInt(velocidadActual));
    });

    // Evento 3: Cambio de Color (Escucha evento 'input')
    controlColor.addEventListener("input", (evento) => {
        const colorSeleccionado = evento.target.value;
        
        // Modificamos el estilo directo del chasis afectando la propiedad background del CSS
        chasisAuto.style.backgroundColor = colorSeleccionado;
        console.log(`Color de carrocería cambiado a: ${colorSeleccionado}`);
    });

    // Evento 4: Click en el Chasis (Interactividad extra tipo 'click')
    chasisAuto.addEventListener("click", () => {
        console.log("⚡ ¡Test de alerones activo! Simulando prueba aerodinámica.");
        chasisAuto.style.transform = "rotateX(45deg) rotateY(180deg)";
        
        setTimeout(() => {
            const vel = controlVelocidad.value;
            const rotacionOriginal = 20 + (vel - 200) * 0.1;
            chasisAuto.style.transform = `rotateX(${rotacionOriginal}deg) rotateY(35deg)`;
        }, 600);
    });

   
    // 🟪 Reto extra: Validación de Hypercars
   
    /**
     * Valida si la velocidad seleccionada requiere sistemas de seguridad o licencias adicionales.
     * @param {number} velocidad - Velocidad en km/h
     */
    function validarLimiteVelocidad(velocidad) {
        if (velocidad > 380) {
            alertaSeguridad.textContent = "ADVERTENCIA: Requiere llantas de compuesto de Kevlar y modo 'Track' activo.";
            panelPrincipal.style.borderColor = "#d9383a"; // Borde rojo en el panel
        } else if (velocidad > 320) {
            alertaSeguridad.textContent = "Nota: Se desplegará el alerón retráctil automáticamente a esta velocidad.";
            panelPrincipal.style.borderColor = "#ffb020"; // Borde amarillo (como tu clase .tower)
        } else {
            alertaSeguridad.textContent = "";
            panelPrincipal.style.borderColor = "#d7dde8"; // Restablece borde normal
        }
    }
});