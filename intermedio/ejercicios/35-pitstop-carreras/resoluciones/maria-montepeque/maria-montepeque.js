// 35. Estrategia de pit stop - Resolucion Maria Montepeque

const carrera = {
  totalVueltas: 40,
  tiempoVueltaBase: 90,
  desgastePorVuelta: 0.5,
  tiempoPerdidoPitStop: 22
};

const estrategias = [
  { nombre: 'Sin parada', vueltasParada: [] },
  { nombre: 'Una parada temprana', vueltasParada: [15] },
  { nombre: 'Una parada tardia', vueltasParada: [25] },
  { nombre: 'Dos paradas', vueltasParada: [13, 27] }
];

function esCarreraValida(datosCarrera) {
  return (
    datosCarrera &&
    typeof datosCarrera.totalVueltas === 'number' &&
    datosCarrera.totalVueltas > 0 &&
    typeof datosCarrera.tiempoVueltaBase === 'number' &&
    datosCarrera.tiempoVueltaBase > 0 &&
    typeof datosCarrera.desgastePorVuelta === 'number' &&
    datosCarrera.desgastePorVuelta >= 0 &&
    typeof datosCarrera.tiempoPerdidoPitStop === 'number' &&
    datosCarrera.tiempoPerdidoPitStop >= 0
  );
}

function esEstrategiaValida(estrategia, totalVueltas) {
  if (
    !estrategia ||
    typeof estrategia.nombre !== 'string' ||
    estrategia.nombre.trim() === '' ||
    !Array.isArray(estrategia.vueltasParada)
  ) {
    return false;
  }

  const sinDuplicados = new Set(estrategia.vueltasParada).size === estrategia.vueltasParada.length;

  return (
    sinDuplicados &&
    estrategia.vueltasParada.every(
      (vuelta) => typeof vuelta === 'number' && vuelta >= 1 && vuelta < totalVueltas
    )
  );
}

function generarNumerosVuelta(totalVueltas) {
  return Array.from({ length: totalVueltas }, (_, indice) => indice + 1);
}

function calcularTiempoEstrategia(datosCarrera, vueltasParada) {
  const setParadas = new Set(vueltasParada);
  const vueltas = generarNumerosVuelta(datosCarrera.totalVueltas);

  const resultado = vueltas.reduce(
    (estado, vuelta) => {
      const vueltasDesdeParada = estado.vueltasDesdeParada + 1;
      const tiempoVuelta = datosCarrera.tiempoVueltaBase + vueltasDesdeParada * datosCarrera.desgastePorVuelta;
      const paraEnEstaVuelta = setParadas.has(vuelta);

      return {
        tiempoTotal: estado.tiempoTotal + tiempoVuelta + (paraEnEstaVuelta ? datosCarrera.tiempoPerdidoPitStop : 0),
        vueltasDesdeParada: paraEnEstaVuelta ? 0 : vueltasDesdeParada
      };
    },
    { tiempoTotal: 0, vueltasDesdeParada: 0 }
  );

  return Number(resultado.tiempoTotal.toFixed(2));
}

function evaluarEstrategia(datosCarrera, estrategia) {
  return {
    nombre: estrategia.nombre,
    numeroParadas: estrategia.vueltasParada.length,
    vueltasParada: estrategia.vueltasParada,
    tiempoTotalSegundos: calcularTiempoEstrategia(datosCarrera, estrategia.vueltasParada)
  };
}

function compararEstrategias(datosCarrera, listaEstrategias) {
  if (!esCarreraValida(datosCarrera)) {
    return { valido: false, motivo: 'datos de carrera invalidos' };
  }

  const estrategiasValidas = listaEstrategias.filter((estrategia) => esEstrategiaValida(estrategia, datosCarrera.totalVueltas));
  const evaluaciones = estrategiasValidas.map((estrategia) => evaluarEstrategia(datosCarrera, estrategia));
  const tiempoMinimo = evaluaciones.length > 0 ? Math.min(...evaluaciones.map((e) => e.tiempoTotalSegundos)) : null;

  return {
    totalEstrategias: listaEstrategias.length,
    estrategiasInvalidas: listaEstrategias.length - estrategiasValidas.length,
    evaluaciones,
    estrategiaRecomendada: evaluaciones.find((e) => e.tiempoTotalSegundos === tiempoMinimo) || null
  };
}

console.log('Caso 1: carrera de 40 vueltas comparando 4 estrategias de parada');
console.log(JSON.stringify(compararEstrategias(carrera, estrategias), null, 2));

const estrategiasConCasosLimite = [
  ...estrategias,
  { nombre: 'Parada repetida', vueltasParada: [10, 10] },
  { nombre: 'Parada fuera de rango', vueltasParada: [50] },
  { nombre: '', vueltasParada: [20] }
];

console.log('\nCaso 2: incluye estrategias invalidas (parada repetida, fuera de rango y sin nombre)');
console.log(JSON.stringify(compararEstrategias(carrera, estrategiasConCasosLimite), null, 2));
