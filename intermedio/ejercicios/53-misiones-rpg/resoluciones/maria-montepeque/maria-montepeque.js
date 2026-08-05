// 53. Gestor de misiones RPG - Resolucion Maria Montepeque

const misiones = [
  { id: 1, nombre: 'Primeros pasos', nivelRequerido: 1, prerequisitos: [] },
  { id: 2, nombre: 'El bosque oscuro', nivelRequerido: 3, prerequisitos: [1] },
  { id: 3, nombre: 'Ruinas antiguas', nivelRequerido: 5, prerequisitos: [1] },
  { id: 4, nombre: 'El dragon dormido', nivelRequerido: 8, prerequisitos: [2, 3] },
  { id: 5, nombre: 'Torneo de arena', nivelRequerido: 4, prerequisitos: [1] }
];

function esMisionValida(mision) {
  return (
    mision &&
    typeof mision.id !== 'undefined' &&
    typeof mision.nombre === 'string' &&
    mision.nombre.trim() !== '' &&
    typeof mision.nivelRequerido === 'number' &&
    mision.nivelRequerido > 0 &&
    Array.isArray(mision.prerequisitos)
  );
}

function estaDisponible(mision, nivelJugador, completadas) {
  return (
    !completadas.has(mision.id) &&
    nivelJugador >= mision.nivelRequerido &&
    mision.prerequisitos.every((idPrerequisito) => completadas.has(idPrerequisito))
  );
}

function filtrarDisponibles(misionesValidas, nivelJugador, completadas) {
  return misionesValidas.filter((mision) => estaDisponible(mision, nivelJugador, completadas));
}

function completarMision(misionesValidas, idMisionCompletar, nivelJugador, completadasActuales) {
  const mision = misionesValidas.find((m) => m.id === idMisionCompletar);

  if (!mision) {
    return { exito: false, motivo: 'mision inexistente' };
  }

  if (!estaDisponible(mision, nivelJugador, completadasActuales)) {
    return { exito: false, motivo: 'mision no disponible (nivel insuficiente o prerequisitos incompletos)' };
  }

  const disponiblesAntes = filtrarDisponibles(misionesValidas, nivelJugador, completadasActuales);
  const idsDisponiblesAntes = new Set(disponiblesAntes.map((m) => m.id));

  const completadasNuevas = new Set([...completadasActuales, idMisionCompletar]);
  const disponiblesDespues = filtrarDisponibles(misionesValidas, nivelJugador, completadasNuevas);
  const nuevasDesbloqueadas = disponiblesDespues.filter((m) => !idsDisponiblesAntes.has(m.id));

  return {
    exito: true,
    misionCompletada: mision.nombre,
    misionesCompletadas: [...completadasNuevas],
    misionesDisponibles: disponiblesDespues.map((m) => m.nombre),
    nuevasMisionesDesbloqueadas: nuevasDesbloqueadas.map((m) => m.nombre)
  };
}

function gestionarMisiones(misionesBase, nivelJugador, completadasIniciales, idMisionACompletar) {
  const misionesValidas = misionesBase.filter(esMisionValida);
  const completadasSet = new Set(completadasIniciales);
  const disponiblesIniciales = filtrarDisponibles(misionesValidas, nivelJugador, completadasSet);
  const resultado = completarMision(misionesValidas, idMisionACompletar, nivelJugador, completadasSet);

  return {
    totalMisiones: misionesBase.length,
    misionesInvalidas: misionesBase.length - misionesValidas.length,
    nivelJugador,
    misionesDisponiblesIniciales: disponiblesIniciales.map((m) => m.nombre),
    resultado
  };
}

console.log('Caso 1: jugador nivel 8 completa "Ruinas antiguas" y desbloquea "El dragon dormido"');
console.log(JSON.stringify(gestionarMisiones(misiones, 8, [1, 2], 3), null, 2));

const misionesConCasoLimite = [...misiones, { id: 6, nombre: 'Sin prerequisitos', nivelRequerido: 2 }];

console.log('\nCaso 2: intenta completar una mision inexistente (id 99), incluye mision base invalida');
console.log(JSON.stringify(gestionarMisiones(misionesConCasoLimite, 2, [1], 99), null, 2));

console.log('\nCaso 2b: intenta completar una mision con nivel insuficiente ("El dragon dormido" en nivel 2)');
console.log(JSON.stringify(gestionarMisiones(misiones, 2, [1, 2, 3], 4), null, 2));
