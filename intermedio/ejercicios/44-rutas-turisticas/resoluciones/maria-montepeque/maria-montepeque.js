// 44. Rutas turisticas inteligentes - Resolucion Maria Montepeque

const atracciones = [
  { nombre: 'Museo de Arte', distanciaKm: 1.2, prioridad: 5, horaApertura: 9, horaCierre: 18 },
  { nombre: 'Mirador del Cerro', distanciaKm: 4.5, prioridad: 4, horaApertura: 6, horaCierre: 20 },
  { nombre: 'Mercado Central', distanciaKm: 0.8, prioridad: 3, horaApertura: 7, horaCierre: 15 },
  { nombre: 'Catedral Historica', distanciaKm: 1.5, prioridad: 4, horaApertura: 8, horaCierre: 17 },
  { nombre: 'Parque Nocturno', distanciaKm: 2.0, prioridad: 2, horaApertura: 18, horaCierre: 23 }
];

function esAtraccionValida(atraccion) {
  return (
    atraccion &&
    typeof atraccion.nombre === 'string' &&
    atraccion.nombre.trim() !== '' &&
    typeof atraccion.distanciaKm === 'number' &&
    atraccion.distanciaKm >= 0 &&
    typeof atraccion.prioridad === 'number' &&
    atraccion.prioridad >= 1 &&
    atraccion.prioridad <= 5 &&
    typeof atraccion.horaApertura === 'number' &&
    typeof atraccion.horaCierre === 'number' &&
    atraccion.horaApertura >= 0 &&
    atraccion.horaCierre <= 24 &&
    atraccion.horaApertura < atraccion.horaCierre
  );
}

function estaAbiertaAHora(atraccion, hora) {
  return hora >= atraccion.horaApertura && hora < atraccion.horaCierre;
}

function calcularScore(atraccion) {
  return Number((atraccion.prioridad * 20 - atraccion.distanciaKm * 2).toFixed(1));
}

function generarRutaDelDia(atraccionesBase, hora, maxParadas) {
  const atraccionesValidas = atraccionesBase.filter(esAtraccionValida);
  const disponibles = atraccionesValidas.filter((atraccion) => estaAbiertaAHora(atraccion, hora));

  const ordenadas = disponibles
    .map((atraccion) => ({ ...atraccion, score: calcularScore(atraccion) }))
    .sort((a, b) => b.score - a.score);

  const ruta = ordenadas.slice(0, maxParadas);

  return {
    totalAtracciones: atraccionesBase.length,
    atraccionesInvalidas: atraccionesBase.length - atraccionesValidas.length,
    horaConsultada: hora,
    atraccionesDisponibles: disponibles.length,
    ruta: ruta.map((atraccion) => ({
      nombre: atraccion.nombre,
      distanciaKm: atraccion.distanciaKm,
      prioridad: atraccion.prioridad,
      score: atraccion.score
    })),
    distanciaTotalKm: Number(ruta.reduce((total, atraccion) => total + atraccion.distanciaKm, 0).toFixed(1))
  };
}

console.log('Caso 1: ruta a las 14:00 con maximo 3 paradas');
console.log(JSON.stringify(generarRutaDelDia(atracciones, 14, 3), null, 2));

const atraccionesConCasosLimite = [
  ...atracciones,
  { nombre: 'Torre Fantasma', distanciaKm: 3, prioridad: 5, horaApertura: 20, horaCierre: 20 },
  { nombre: 'Sin prioridad', distanciaKm: 1, horaApertura: 9, horaCierre: 18 }
];

console.log('\nCaso 2: ruta a las 19:00 (solo el parque nocturno abierto) con atracciones invalidas mezcladas');
console.log(JSON.stringify(generarRutaDelDia(atraccionesConCasosLimite, 19, 3), null, 2));
