// Ejercicio 03: Operadores matematicos - deportes
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 03: Operadores matematicos");

// ==========================================
// 1. DATOS DE ENTRADA (ESTADO)
// ==========================================
const puntosRonda1 = 80;
const puntosRonda2 = 95;
const puntosRonda3 = 65;

const recordMaximo = 300; // El puntaje perfecto posible

// ==========================================
// 2. OPERACIONES LOGICAS
// ==========================================

// A. PUNTOS TOTALES: Usamos el operador de adición (+)
const puntosTotales = puntosRonda1 + puntosRonda2 + puntosRonda3;

// B. PROMEDIO: Sumamos los elementos y dividimos (/) entre la cantidad de rondas (3)
// Nota: Usamos paréntesis () para asegurar que la suma se haga ANTES de la división (Precedencia de operadores)
const promedioPuntos = (puntosRonda1 + puntosRonda2 + puntosRonda3) / 3;

// C. DIFERENCIA: Usamos el operador de sustracción (-) para ver cuánto nos faltó para el récord
const diferenciaParaRecord = recordMaximo - puntosTotales;

// D. PORCENTAJE DE EFECTIVIDAD: (Puntos obtenidos / Record Máximo) * 100
// Usamos multiplicación (*) y división (/)
const porcentajeCompletado = (puntosTotales / recordMaximo) * 100;


// ==========================================
// 3. OUTPUT DE RESULTADOS
// ==========================================
console.log("=== SISTEMA DE ESTADÍSTICAS ===");
console.log(`Puntos Totales Obtenidos: ${puntosTotales} pts`);
console.log(`Promedio por Ronda: ${promedioPuntos.toFixed(2)} pts`); // .toFixed(2) limita a 2 decimales
console.log(`Diferencia para alcanzar el récord: ${diferenciaParaRecord} pts`);
console.log(`Porcentaje de efectividad: ${porcentajeCompletado.toFixed(1)}%`);
console.log("===============================");