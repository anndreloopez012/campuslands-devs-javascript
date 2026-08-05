// 33. Plan de mantenimiento moto - Resolucion Maria Montepeque

const REGLAS_MANTENIMIENTO = [
  { servicio: 'cambio de aceite', intervaloKm: 3000, prioridadBase: 'alta' },
  { servicio: 'revision de frenos', intervaloKm: 6000, prioridadBase: 'alta' },
  { servicio: 'cambio de cadena', intervaloKm: 12000, prioridadBase: 'media' },
  { servicio: 'revision de suspension', intervaloKm: 10000, prioridadBase: 'media' },
  { servicio: 'cambio de llantas', intervaloKm: 15000, prioridadBase: 'baja' }
];

const SINTOMAS_SERVICIO = {
  'ruido en frenos': 'revision de frenos',
  'vibracion en cadena': 'cambio de cadena',
  'perdida de potencia': 'cambio de aceite',
  'rebote en suspension': 'revision de suspension'
};

const ORDEN_PRIORIDAD = { alta: 3, media: 2, baja: 1 };

function esMotoValida(moto) {
  return (
    moto &&
    typeof moto.modelo === 'string' &&
    moto.modelo.trim() !== '' &&
    typeof moto.kilometrajeActual === 'number' &&
    moto.kilometrajeActual >= 0 &&
    moto.kilometrajeUltimoServicio &&
    typeof moto.kilometrajeUltimoServicio === 'object' &&
    Array.isArray(moto.sintomas)
  );
}

function calcularKmDesdeUltimoServicio(moto, servicio) {
  const kmUltimoServicio = moto.kilometrajeUltimoServicio[servicio] || 0;
  return moto.kilometrajeActual - kmUltimoServicio;
}

function evaluarPorKilometraje(moto) {
  return REGLAS_MANTENIMIENTO.filter((regla) => calcularKmDesdeUltimoServicio(moto, regla.servicio) >= regla.intervaloKm).map(
    (regla) => ({
      servicio: regla.servicio,
      prioridad: regla.prioridadBase,
      motivo: `kilometraje vencido (${calcularKmDesdeUltimoServicio(moto, regla.servicio)} km desde ultimo servicio)`
    })
  );
}

function evaluarPorSintomas(moto) {
  return moto.sintomas
    .filter((sintoma) => Object.prototype.hasOwnProperty.call(SINTOMAS_SERVICIO, sintoma))
    .map((sintoma) => ({
      servicio: SINTOMAS_SERVICIO[sintoma],
      prioridad: 'alta',
      motivo: `sintoma reportado: ${sintoma}`
    }));
}

function combinarYPriorizar(itemsKilometraje, itemsSintomas) {
  const planPorServicio = new Map();

  [...itemsKilometraje, ...itemsSintomas].forEach((item) => {
    const existente = planPorServicio.get(item.servicio);

    if (!existente) {
      planPorServicio.set(item.servicio, { servicio: item.servicio, prioridad: item.prioridad, motivos: [item.motivo] });
      return;
    }

    existente.motivos.push(item.motivo);
    if (ORDEN_PRIORIDAD[item.prioridad] > ORDEN_PRIORIDAD[existente.prioridad]) {
      existente.prioridad = item.prioridad;
    }
  });

  return [...planPorServicio.values()].sort((a, b) => ORDEN_PRIORIDAD[b.prioridad] - ORDEN_PRIORIDAD[a.prioridad]);
}

function generarPlanMantenimiento(moto) {
  const itemsKilometraje = evaluarPorKilometraje(moto);
  const itemsSintomas = evaluarPorSintomas(moto);

  return {
    modelo: moto.modelo,
    kilometrajeActual: moto.kilometrajeActual,
    planPriorizado: combinarYPriorizar(itemsKilometraje, itemsSintomas)
  };
}

function generarPlanesFlota(motos) {
  const motosValidas = motos.filter(esMotoValida);

  return {
    totalMotos: motos.length,
    motosInvalidas: motos.length - motosValidas.length,
    planes: motosValidas.map(generarPlanMantenimiento)
  };
}

const flota = [
  {
    id: 1,
    modelo: 'Rebel 300',
    kilometrajeActual: 12500,
    kilometrajeUltimoServicio: { 'cambio de aceite': 10000, 'revision de frenos': 8000, 'cambio de cadena': 1000 },
    sintomas: ['ruido en frenos']
  },
  {
    id: 2,
    modelo: 'MT-07',
    kilometrajeActual: 5000,
    kilometrajeUltimoServicio: { 'cambio de aceite': 3500, 'revision de frenos': 0 },
    sintomas: []
  }
];

console.log('Caso 1: flota con motos que requieren mantenimiento por kilometraje y por sintomas');
console.log(JSON.stringify(generarPlanesFlota(flota), null, 2));

const flotaConCasosLimite = [
  ...flota,
  { id: 3, modelo: 'Sin kilometraje', kilometrajeUltimoServicio: {}, sintomas: [] },
  {
    id: 4,
    modelo: 'CBR 500',
    kilometrajeActual: 2000,
    kilometrajeUltimoServicio: {},
    sintomas: ['olor a quemado', 'ruido en frenos']
  }
];

console.log('\nCaso 2: incluye moto invalida (sin kilometraje) y sintoma desconocido junto a uno valido');
console.log(JSON.stringify(generarPlanesFlota(flotaConCasosLimite), null, 2));
