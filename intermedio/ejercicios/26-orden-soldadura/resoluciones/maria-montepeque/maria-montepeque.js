// 26. Control de soldadura - Resolucion Maria Montepeque

const RANGOS_AMPERAJE = {
  acero: { min: 90, max: 150 },
  aluminio: { min: 100, max: 175 },
  inoxidable: { min: 80, max: 130 },
  'hierro fundido': { min: 70, max: 120 }
};

function esTrabajoValido(trabajo) {
  return (
    trabajo &&
    typeof trabajo.id !== 'undefined' &&
    typeof trabajo.material === 'string' &&
    typeof trabajo.amperaje === 'number' &&
    typeof trabajo.inspector === 'string' &&
    trabajo.inspector.trim() !== '' &&
    typeof trabajo.soldador === 'string' &&
    trabajo.soldador.trim() !== '' &&
    typeof trabajo.defectos === 'number'
  );
}

function amperajeEnRango(trabajo) {
  const rango = RANGOS_AMPERAJE[trabajo.material];
  return Boolean(rango) && trabajo.amperaje >= rango.min && trabajo.amperaje <= rango.max;
}

function evaluarTrabajo(trabajo) {
  const materialReconocido = Object.prototype.hasOwnProperty.call(RANGOS_AMPERAJE, trabajo.material);
  const amperajeValido = materialReconocido && amperajeEnRango(trabajo);
  const sinDefectos = trabajo.defectos === 0;
  const aprobado = amperajeValido && sinDefectos;

  let motivo = null;
  if (!materialReconocido) motivo = 'material no reconocido';
  else if (!amperajeValido) motivo = 'amperaje fuera de rango';
  else if (!sinDefectos) motivo = `defectos detectados (${trabajo.defectos})`;

  return {
    id: trabajo.id,
    soldador: trabajo.soldador,
    inspector: trabajo.inspector,
    material: trabajo.material,
    amperaje: trabajo.amperaje,
    amperajeValido,
    aprobado,
    motivo
  };
}

function calcularTasaAprobacion(evaluaciones) {
  if (evaluaciones.length === 0) return 0;
  const aprobados = evaluaciones.reduce((total, evaluacion) => total + (evaluacion.aprobado ? 1 : 0), 0);
  return Number(((aprobados / evaluaciones.length) * 100).toFixed(1));
}

function listarRechazados(evaluaciones) {
  return evaluaciones.filter((evaluacion) => !evaluacion.aprobado);
}

function controlarSoldadura(trabajos) {
  const validos = trabajos.filter(esTrabajoValido);
  const evaluaciones = validos.map(evaluarTrabajo);

  return {
    totalRegistrados: trabajos.length,
    trabajosInvalidos: trabajos.length - validos.length,
    tasaAprobacion: calcularTasaAprobacion(evaluaciones),
    aprobados: evaluaciones.filter((evaluacion) => evaluacion.aprobado),
    rechazados: listarRechazados(evaluaciones)
  };
}

const trabajos = [
  { id: 1, soldador: 'Marco Diaz', inspector: 'Elena Ruiz', material: 'acero', amperaje: 120, defectos: 0 },
  { id: 2, soldador: 'Luis Perez', inspector: 'Elena Ruiz', material: 'aluminio', amperaje: 90, defectos: 0 },
  { id: 3, soldador: 'Ana Torres', inspector: 'Carlos Mendez', material: 'inoxidable', amperaje: 100, defectos: 1 },
  { id: 4, soldador: 'Marco Diaz', inspector: 'Carlos Mendez', material: 'hierro fundido', amperaje: 95, defectos: 0 }
];

console.log('Caso 1: lote de trabajos con materiales validos');
console.log(JSON.stringify(controlarSoldadura(trabajos), null, 2));

const trabajosConCasosLimite = [
  ...trabajos,
  { id: 5, soldador: 'Sofia Leon', inspector: 'Elena Ruiz', material: 'titanio', amperaje: 110, defectos: 0 },
  { id: 6, soldador: 'Sofia Leon', inspector: '', material: 'acero', amperaje: 110 }
];

console.log('\nCaso 2: incluye material no reconocido y un registro invalido (faltan datos)');
console.log(JSON.stringify(controlarSoldadura(trabajosConCasosLimite), null, 2));
