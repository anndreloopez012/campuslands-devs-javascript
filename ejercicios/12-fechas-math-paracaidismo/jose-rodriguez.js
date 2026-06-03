// Ejercicio 12: Fechas y Math - paracaidismo
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 12: Fechas y Math");


// 1. FUNCIÓN PURA: CÁLCULOS AVANZADOS Y VALIDACIÓN DE PARACAIDISMO

function procesarMetricasSalto(alturaMetros, tiempoSegundos) {
  const velocidadMetrosPorSegundo = (alturaMetros / tiempoSegundos) * 2;
  const velocidadKmH = Math.round(velocidadMetrosPorSegundo * 3.6);
  
  const deceleracion = velocidadMetrosPorSegundo / 1.5;
  const gravedad = 9.81;
  const fuerzasG = Math.round((deceleracion / gravedad) * 10) / 10;

  let estadoSeguridad = "Seguro";
  let alertas = [];

  if (alturaMetros < 4) {
    estadoSeguridad = "Peligro Crítico";
    alertas.push("🚨 Altura de salto extremadamente baja. Riesgo alto de impacto severo.");
  }

  if (fuerzasG > 5) {
    estadoSeguridad = "Riesgo de Pérdida de Conciencia (G-Loc)";
    alertas.push("⚠️ Desaceleración violenta. Las fuerzas G superan el límite seguro para el cuerpo humano.");
  } else if (fuerzasG > 3) {
    estadoSeguridad = "Precaución";
    alertas.push("📉 Apertura brusca. Alta presión corporal sostenida.");
  }

  return {
    velocidadEstimada: `${velocidadKmH} km/h`,
    impactoFuerzaG: `${fuerzasG} G`,
    diagnostico: estadoSeguridad,
    notificaciones: alertas.length > 0 ? alertas : ["✅ Parámetros de desaceleración nominales."]
  };
}


// 2. FUNCIÓN ORQUESTADORA DE LA LOGICA DEL SALTO

function ejecutarSimulacionSalto() {
  const alturaSalto = Math.round(Math.random() * (12 - 2) + 2);
  const tiempoCaida = Math.round((Math.random() * (4 - 1) + 1) * 100) / 100;

  const fechaActual = new Date();
  const fechaFormateada = fechaActual.toLocaleString("es-GT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  const telemetriaAvanzada = procesarMetricasSalto(alturaSalto, tiempoCaida);

  // Siempre imprimimos la telemetría en la consola (Funciona en Node y Navegador)
  console.log(`\n=== LOG DE TELEMETRÍA TELEMÁTICA [${fechaFormateada}] ===`);
  console.log(`Altura: ${alturaSalto} m | Tiempo: ${tiempoCaida} s`);
  console.log(`Velocidad de Caída: ${telemetriaAvanzada.velocidadEstimada}`);
  console.log(`Fuerza de Apertura: ${telemetriaAvanzada.impactoFuerzaG}`);
  console.log(`Diagnóstico médico: ${telemetriaAvanzada.diagnostico}`);
  console.log(`Alertas de Sistema:`, telemetriaAvanzada.notificaciones);
  console.log("==========================================================");

  // Retornamos los datos por si el entorno del navegador los necesita para actualizar la UI
  return { alturaSalto, telemetriaAvanzada, fechaFormateada, tiempoCaida };
}


// 3. DETECCIÓN DE ENTORNO AUTOMÁTICA (NAVEGADOR VS NODE.JS)

if (typeof document !== "undefined") {
  // --- ENTORNO: NAVEGADOR ---
  // El DOM existe seguros, procedemos a capturar elementos y asignar eventos
  const tituloElemento = document.querySelector("#titulo");
  const descripcionElemento = document.querySelector("#descripcion");
  const botonAccion = document.querySelector("#accion");

  if (botonAccion) {
    botonAccion.addEventListener("click", () => {
      const datos = ejecutarSimulacionSalto();
      
      // Actualizamos la interfaz gráfica del HTML
      tituloElemento.textContent = `🪂 Salto: ${datos.alturaSalto}m (${datos.telemetriaAvanzada.velocidadEstimada})`;
      descripcionElemento.innerHTML = `
        ⏱️ Tiempo: ${datos.tiempoCaida}s | 🚀 Impacto: ${datos.telemetriaAvanzada.impactoFuerzaG}<br>
        📋 Estado: <strong>${datos.telemetriaAvanzada.diagnostico}</strong><br>
        📅 ${datos.fechaFormateada}
      `;

      botonAccion.textContent = "Volver a Saltar";
      botonAccion.style.background = datos.telemetriaAvanzada.diagnostico.includes("Peligro") ? "#ff4444" : "#19a974";
    });
  }
} else {
  // --- ENTORNO: NODE.JS (TU CONSOLA) ---
  // Como no hay DOM, ejecutamos una simulación directa en la terminal inmediatamente al lanzar el comando
  console.log("⚠️ Entorno Node.js detectado. Ejecutando simulación de telemetría sin interfaz gráfica...");
  ejecutarSimulacionSalto();
}