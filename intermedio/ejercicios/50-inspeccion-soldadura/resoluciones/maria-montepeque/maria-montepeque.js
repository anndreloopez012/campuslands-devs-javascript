// 50. Inspeccion visual soldadura - Resolucion Maria Montepeque

const UMBRAL_APROBACION = 80;

const piezas = [
  {
    id: 1,
    nombre: 'Junta A-12',
    items: [
      { criterio: 'penetracion completa', cumple: true, critico: true },
      { criterio: 'sin porosidad', cumple: true, critico: true },
      { criterio: 'acabado uniforme', cumple: false, critico: false },
      { criterio: 'sin salpicaduras', cumple: true, critico: false }
    ]
  },
  {
    id: 2,
    nombre: 'Junta B-07',
    items: [
      { criterio: 'penetracion completa', cumple: false, critico: true },
      { criterio: 'sin porosidad', cumple: true, critico: true },
      { criterio: 'acabado uniforme', cumple: true, critico: false }
    ]
  },
  {
    id: 3,
    nombre: 'Junta C-03',
    items: [
      { criterio: 'penetracion completa', cumple: true, critico: true },
      { criterio: 'sin porosidad', cumple: true, critico: true },
      { criterio: 'acabado uniforme', cumple: true, critico: false },
      { criterio: 'sin salpicaduras', cumple: true, critico: false }
    ]
  }
];

function esItemValido(item) {
  return item && typeof item.criterio === 'string' && item.criterio.trim() !== '' && typeof item.cumple === 'boolean' && typeof item.critico === 'boolean';
}

function esPiezaValida(pieza) {
  return (
    pieza &&
    typeof pieza.nombre === 'string' &&
    pieza.nombre.trim() !== '' &&
    Array.isArray(pieza.items) &&
    pieza.items.length > 0 &&
    pieza.items.every(esItemValido)
  );
}

function calcularPorcentajeCumplido(items) {
  const cumplidos = items.filter((item) => item.cumple).length;
  return Number(((cumplidos / items.length) * 100).toFixed(1));
}

function obtenerFallasCriticas(items) {
  return items.filter((item) => item.critico && !item.cumple).map((item) => item.criterio);
}

function tieneFallasCriticas(items) {
  return items.some((item) => item.critico && !item.cumple);
}

function evaluarPieza(pieza) {
  const porcentajeCumplido = calcularPorcentajeCumplido(pieza.items);
  const fallasCriticas = obtenerFallasCriticas(pieza.items);
  const aprobado = !tieneFallasCriticas(pieza.items) && porcentajeCumplido >= UMBRAL_APROBACION;

  return {
    id: pieza.id,
    nombre: pieza.nombre,
    porcentajeCumplido,
    fallasCriticas,
    dictamen: aprobado ? 'aprobado' : 'rechazado'
  };
}

function generarInspeccion(piezasBase) {
  const piezasValidas = piezasBase.filter(esPiezaValida);
  const evaluaciones = piezasValidas.map(evaluarPieza);

  return {
    totalPiezas: piezasBase.length,
    piezasInvalidas: piezasBase.length - piezasValidas.length,
    umbralAprobacion: UMBRAL_APROBACION,
    evaluaciones,
    aprobadas: evaluaciones.filter((evaluacion) => evaluacion.dictamen === 'aprobado').map((evaluacion) => evaluacion.nombre),
    rechazadas: evaluaciones.filter((evaluacion) => evaluacion.dictamen === 'rechazado').map((evaluacion) => evaluacion.nombre)
  };
}

console.log('Caso 1: inspeccion de 3 piezas (una por debajo del umbral, otra con falla critica, una aprobada)');
console.log(JSON.stringify(generarInspeccion(piezas), null, 2));

const piezasConCasosLimite = [
  ...piezas,
  { id: 4, nombre: 'Sin items', items: [] },
  { id: 5, nombre: 'Item invalido', items: [{ criterio: 'x', cumple: 'si', critico: true }] }
];

console.log('\nCaso 2: incluye pieza sin items y pieza con item invalido (cumple no booleano)');
console.log(JSON.stringify(generarInspeccion(piezasConCasosLimite), null, 2));
