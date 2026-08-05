// 36. Bracket de kickboxing - Resolucion Maria Montepeque

const peleadores = [
  { id: 1, nombre: 'Rocco', puntaje: 87 },
  { id: 2, nombre: 'Kade', puntaje: 92 },
  { id: 3, nombre: 'Dimitri', puntaje: 78 },
  { id: 4, nombre: 'Naoki', puntaje: 85 },
  { id: 5, nombre: 'Bruno', puntaje: 90 },
  { id: 6, nombre: 'Ilya', puntaje: 81 },
  { id: 7, nombre: 'Marcus', puntaje: 88 },
  { id: 8, nombre: 'Kenji', puntaje: 94 }
];

function esPeleadorValido(peleador) {
  return (
    peleador &&
    typeof peleador.nombre === 'string' &&
    peleador.nombre.trim() !== '' &&
    typeof peleador.puntaje === 'number' &&
    peleador.puntaje >= 0
  );
}

function formarParejas(participantes) {
  const parejas = [];
  for (let indice = 0; indice < participantes.length; indice += 2) {
    const rival = indice + 1 < participantes.length ? participantes[indice + 1] : null;
    parejas.push([participantes[indice], rival]);
  }
  return parejas;
}

function determinarGanador([peleadorA, peleadorB]) {
  if (!peleadorB) return { ganador: peleadorA, motivo: 'pase directo (bye)' };
  if (peleadorA.puntaje === peleadorB.puntaje) {
    return { ganador: peleadorA, motivo: 'empate en puntaje, gana por posicion en el bracket' };
  }
  const ganador = peleadorA.puntaje > peleadorB.puntaje ? peleadorA : peleadorB;
  return { ganador, motivo: `mayor puntaje (${ganador.puntaje})` };
}

function nombrarRonda(cantidadParticipantes) {
  if (cantidadParticipantes <= 2) return 'Final';
  if (cantidadParticipantes <= 4) return 'Semifinal';
  if (cantidadParticipantes <= 8) return 'Cuartos de final';
  return 'Ronda eliminatoria';
}

function jugarRonda(participantes, nombreRonda) {
  const resultados = formarParejas(participantes).map((pareja) => {
    const { ganador, motivo } = determinarGanador(pareja);
    return {
      enfrentamiento: pareja.map((peleador) => (peleador ? peleador.nombre : 'BYE')),
      ganador: ganador.nombre,
      motivo,
      ganadorCompleto: ganador
    };
  });

  return {
    ronda: nombreRonda,
    enfrentamientos: resultados.map(({ ganadorCompleto, ...resto }) => resto),
    avanzan: resultados.map((resultado) => resultado.ganadorCompleto)
  };
}

function construirBracket(peleadoresBase) {
  const peleadoresValidos = peleadoresBase.filter(esPeleadorValido);
  const rondas = [];
  let participantesActuales = peleadoresValidos;

  while (participantesActuales.length > 1) {
    const resultadoRonda = jugarRonda(participantesActuales, nombrarRonda(participantesActuales.length));
    rondas.push({ ronda: resultadoRonda.ronda, enfrentamientos: resultadoRonda.enfrentamientos });
    participantesActuales = resultadoRonda.avanzan;
  }

  return {
    totalPeleadores: peleadoresBase.length,
    peleadoresInvalidos: peleadoresBase.length - peleadoresValidos.length,
    rondas,
    campeon: participantesActuales.length === 1 ? participantesActuales[0].nombre : null
  };
}

console.log('Caso 1: bracket completo de 8 peleadores (cuartos, semifinal y final)');
console.log(JSON.stringify(construirBracket(peleadores), null, 2));

const peleadoresConCasosLimite = [
  { id: 1, nombre: 'Rocco', puntaje: 87 },
  { id: 2, nombre: 'Kade', puntaje: 92 },
  { id: 3, nombre: 'Dimitri', puntaje: 78 },
  { id: 4, nombre: 'Naoki', puntaje: 85 },
  { id: 5, nombre: 'Bruno', puntaje: 90 },
  { id: 6, nombre: 'Sin puntaje' }
];

console.log('\nCaso 2: 5 peleadores validos (numero impar, hay bye) y 1 invalido sin puntaje');
console.log(JSON.stringify(construirBracket(peleadoresConCasosLimite), null, 2));
