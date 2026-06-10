// Ejercicio 09: Funciones - pingpong
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 09: Funciones");

// Escribe tu solucion aqui.

// extra:calcular la efectividad del saque
function calcularEfectSaque(saquesTotales, saquesAses) {
  if (saquesTotales === 0) {
    return 0;
  }
  return (saquesAses / saquesTotales) * 100;
}

function determinarGanador(puntosJose, puntosDhoman) {
  const puntosGanar = 5;

  if (puntosJose >= puntosGanar && puntosJose > puntosDhoman) {
    return "Ganador del partido: José";
  } 
  else if (puntosDhoman >= puntosGanar && puntosDhoman > puntosJose) {
    return "Ganador del partido: Dhoman";
  } 
  else {
    return "El partido sigue en juego...";
  }
}

function generarReportePartido(nombreA, puntosA, nombreB, puntosB) {
  console.log("=== TABLERO DE PING-PONG ===");
  console.log(nombreA, ":", puntosA, "puntos");
  console.log(nombreB, ":", puntosB, "puntos");
  
  const resultado = determinarGanador(puntosA, puntosB);
  console.log("Estado:", resultado);
}

// --- EJECUCIÓN DEL SCRIPT ---

// exta: simulación de estadisticas
const efectividadJose = calcularEfectSaque(10, 4); //saques y ases
console.log("=== ESTADÍSTICAS DE RENDIMIENTO ===");
console.log("Efectividad de saque de José:", efectividadJose, "%");

console.log(""); 

generarReportePartido("José", 5, "Dhoman", 3);