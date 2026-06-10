// Ejercicio 03: Operadores matematicos - deportes
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 03: Operadores matematicos");

// Escribe tu solucion aqui.

console.log("********************************************");
console.log("Estadísticas de la Liga Nacional de Baloncesto");

const EqA = 257;
const EqB = 287;
const EqC = 263;
const EqD = 221;
const EqE = 295;

const equipos = [
  { nombre: 'Equipo A', puntos: EqA },
  { nombre: 'Equipo B', puntos: EqB },
  { nombre: 'Equipo C', puntos: EqC },
  { nombre: 'Equipo D', puntos: EqD },
  { nombre: 'Equipo E', puntos: EqE }
];

const puntosTotales = EqA + EqB + EqC + EqD + EqE;
const promedio = puntosTotales / equipos.length;

console.log("Total de puntos en la liga:", puntosTotales);
console.log("Promedio General de puntos:", promedio);

equipos.forEach(equipo => {
  const diferenciaPromedio = equipo.puntos - promedio;
  const puntosPorCuarto = equipo.puntos / 4;
  const residuoPuntos = equipo.puntos % 4;

  console.log("\n--- " + equipo.nombre + " ---");
  console.log("Puntos: " + equipo.puntos);
  console.log("Diferencia vs Promedio:", diferenciaPromedio.toFixed(2));
  console.log("Promedio por Cuarto:", puntosPorCuarto.toFixed(2));
  console.log("Residuo de puntos:", residuoPuntos);

  // El reto extra se ejecuta dentro del ciclo para cada equipo
  const porcentajeEficiencia = (equipo.puntos / 300) * 100;

  let evaluacion = '';
  if (porcentajeEficiencia >= 90) {
    evaluacion = 'Ofensiva de Élite';
  } else if (porcentajeEficiencia >= 80) {
    evaluacion = 'Ofensiva Sólida';
  } else {
    evaluacion = 'Ofensiva por Mejorar';
  }

  console.log("Eficiencia Ofensiva: " + porcentajeEficiencia.toFixed(1) + "%");
  console.log("Evaluación de Rendimiento: ", evaluacion);
}); // <-- La llave ahora cierra aquí, al final de todo el proceso por equipo