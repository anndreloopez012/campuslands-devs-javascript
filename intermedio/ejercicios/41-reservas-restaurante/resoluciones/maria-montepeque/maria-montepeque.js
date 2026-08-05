// 41. Reservas de restaurante - Resolucion Maria Montepeque

const DURACION_RESERVA_MIN = 90;

const mesas = [
  { id: 1, capacidad: 2 },
  { id: 2, capacidad: 4 },
  { id: 3, capacidad: 4 },
  { id: 4, capacidad: 6 }
];

const reservasExistentes = [
  { mesaId: 2, cliente: 'Carlos Vega', personas: 3, horario: '2026-08-03T19:00' },
  { mesaId: 2, cliente: 'Ana Ruiz', personas: 4, horario: '2026-08-03T21:00' },
  { mesaId: 4, cliente: 'Luis Marin', personas: 6, horario: '2026-08-03T20:00' }
];

const solicitudesNuevas = [
  { mesaId: 1, cliente: 'Elena Ruiz', personas: 2, horario: '2026-08-03T18:00' },
  { mesaId: 2, cliente: 'Marco Diaz', personas: 5, horario: '2026-08-03T19:30' },
  { mesaId: 4, cliente: 'Sofia Leon', personas: 4, horario: '2026-08-03T20:30' }
];

function esMesaValida(mesa) {
  return mesa && typeof mesa.id !== 'undefined' && typeof mesa.capacidad === 'number' && mesa.capacidad > 0;
}

function esReservaValida(reserva, idsMesasValidas) {
  return (
    reserva &&
    idsMesasValidas.has(reserva.mesaId) &&
    typeof reserva.cliente === 'string' &&
    reserva.cliente.trim() !== '' &&
    typeof reserva.personas === 'number' &&
    reserva.personas > 0 &&
    !Number.isNaN(new Date(reserva.horario).getTime())
  );
}

function seSuperponen(horarioA, horarioB, duracionMin) {
  const inicioA = new Date(horarioA).getTime();
  const finA = inicioA + duracionMin * 60000;
  const inicioB = new Date(horarioB).getTime();
  const finB = inicioB + duracionMin * 60000;
  return inicioA < finB && inicioB < finA;
}

function intentarReservar(solicitud, mesasValidas, reservasActuales) {
  const mesa = mesasValidas.find((mesaBuscada) => mesaBuscada.id === solicitud.mesaId);

  if (!mesa) {
    return { aceptada: false, motivo: 'mesa inexistente' };
  }

  if (solicitud.personas > mesa.capacidad) {
    return { aceptada: false, motivo: `excede la capacidad de la mesa (${mesa.capacidad} personas)` };
  }

  const hayConflicto = reservasActuales.some(
    (reserva) => reserva.mesaId === solicitud.mesaId && seSuperponen(reserva.horario, solicitud.horario, DURACION_RESERVA_MIN)
  );

  if (hayConflicto) {
    return { aceptada: false, motivo: 'la mesa ya esta reservada en ese horario' };
  }

  return { aceptada: true, motivo: 'reserva confirmada' };
}

function procesarSolicitudesReserva(mesasBase, reservasBase, solicitudes) {
  const mesasValidas = mesasBase.filter(esMesaValida);
  const idsMesasValidas = new Set(mesasValidas.map((mesa) => mesa.id));
  const reservasValidas = reservasBase.filter((reserva) => esReservaValida(reserva, idsMesasValidas));

  const reservasAcumuladas = [...reservasValidas];
  const resultados = solicitudes.map((solicitud) => {
    const resultado = intentarReservar(solicitud, mesasValidas, reservasAcumuladas);
    if (resultado.aceptada) reservasAcumuladas.push(solicitud);
    return { ...solicitud, ...resultado };
  });

  return {
    totalMesas: mesasBase.length,
    mesasInvalidas: mesasBase.length - mesasValidas.length,
    reservasExistentesInvalidas: reservasBase.length - reservasValidas.length,
    solicitudesProcesadas: resultados,
    solicitudesAceptadas: resultados.filter((resultado) => resultado.aceptada).length,
    solicitudesRechazadas: resultados.filter((resultado) => !resultado.aceptada).length
  };
}

console.log('Caso 1: 3 solicitudes nuevas (una valida, una excede capacidad, una en conflicto de horario)');
console.log(JSON.stringify(procesarSolicitudesReserva(mesas, reservasExistentes, solicitudesNuevas), null, 2));

const reservasConCasoLimite = [...reservasExistentes, { mesaId: 3, personas: 2, horario: '2026-08-03T18:30' }];

const solicitudesConCasosLimite = [
  ...solicitudesNuevas,
  { mesaId: 99, cliente: 'Postor fantasma', personas: 2, horario: '2026-08-03T18:00' }
];

console.log('\nCaso 2: incluye reserva existente invalida (sin cliente) y solicitud a mesa inexistente');
console.log(JSON.stringify(procesarSolicitudesReserva(mesas, reservasConCasoLimite, solicitudesConCasosLimite), null, 2));
