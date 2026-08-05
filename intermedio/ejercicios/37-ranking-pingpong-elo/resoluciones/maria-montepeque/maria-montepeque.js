// 37. Ranking ELO pingpong - Resolucion Maria Montepeque

const K_FACTOR = 32;

const jugadores = [
  { id: 1, nombre: 'Ana', rating: 1500 },
  { id: 2, nombre: 'Luis', rating: 1450 },
  { id: 3, nombre: 'Marta', rating: 1600 },
  { id: 4, nombre: 'Pedro', rating: 1550 }
];

const partidos = [
  { jugadorA: 'Ana', jugadorB: 'Luis', ganador: 'Ana' },
  { jugadorA: 'Marta', jugadorB: 'Pedro', ganador: 'Pedro' },
  { jugadorA: 'Ana', jugadorB: 'Marta', ganador: 'Marta' }
];

function esJugadorValido(jugador) {
  return jugador && typeof jugador.nombre === 'string' && jugador.nombre.trim() !== '' && typeof jugador.rating === 'number';
}

function esPartidoValido(partido, tablaRatings) {
  return (
    partido &&
    tablaRatings.has(partido.jugadorA) &&
    tablaRatings.has(partido.jugadorB) &&
    partido.jugadorA !== partido.jugadorB &&
    (partido.ganador === partido.jugadorA || partido.ganador === partido.jugadorB)
  );
}

function calcularResultadoEsperado(ratingJugador, ratingRival) {
  return 1 / (1 + Math.pow(10, (ratingRival - ratingJugador) / 400));
}

function calcularNuevoRating(ratingActual, resultadoEsperado, resultadoReal) {
  return Math.round(ratingActual + K_FACTOR * (resultadoReal - resultadoEsperado));
}

function procesarPartido(tablaRatings, partido) {
  const ratingA = tablaRatings.get(partido.jugadorA);
  const ratingB = tablaRatings.get(partido.jugadorB);

  const esperadoA = calcularResultadoEsperado(ratingA, ratingB);
  const esperadoB = calcularResultadoEsperado(ratingB, ratingA);

  const resultadoA = partido.ganador === partido.jugadorA ? 1 : 0;
  const resultadoB = partido.ganador === partido.jugadorB ? 1 : 0;

  tablaRatings.set(partido.jugadorA, calcularNuevoRating(ratingA, esperadoA, resultadoA));
  tablaRatings.set(partido.jugadorB, calcularNuevoRating(ratingB, esperadoB, resultadoB));

  return tablaRatings;
}

function simularTemporada(jugadoresBase, listaPartidos) {
  const jugadoresValidos = jugadoresBase.filter(esJugadorValido);
  const tablaRatings = new Map(jugadoresValidos.map((jugador) => [jugador.nombre, jugador.rating]));
  const partidosValidos = listaPartidos.filter((partido) => esPartidoValido(partido, tablaRatings));

  const ratingsFinales = partidosValidos.reduce((tabla, partido) => procesarPartido(tabla, partido), tablaRatings);

  const rankingFinal = jugadoresValidos
    .map((jugador) => {
      const ratingFinal = ratingsFinales.get(jugador.nombre);
      return {
        nombre: jugador.nombre,
        ratingInicial: jugador.rating,
        ratingFinal,
        diferencia: ratingFinal - jugador.rating
      };
    })
    .sort((a, b) => b.ratingFinal - a.ratingFinal);

  return {
    totalJugadores: jugadoresBase.length,
    jugadoresInvalidos: jugadoresBase.length - jugadoresValidos.length,
    totalPartidos: listaPartidos.length,
    partidosInvalidos: listaPartidos.length - partidosValidos.length,
    rankingFinal
  };
}

console.log('Caso 1: temporada con 4 jugadores y 3 partidos validos');
console.log(JSON.stringify(simularTemporada(jugadores, partidos), null, 2));

const jugadoresConCasoLimite = [...jugadores, { id: 5, nombre: 'Sin rating' }];

const partidosConCasosLimite = [
  ...partidos,
  { jugadorA: 'Luis', jugadorB: 'Luis', ganador: 'Luis' },
  { jugadorA: 'Ana', jugadorB: 'Zoe', ganador: 'Ana' },
  { jugadorA: 'Pedro', jugadorB: 'Luis', ganador: 'Marta' }
];

console.log('\nCaso 2: incluye jugador sin rating y partidos invalidos (mismo jugador, rival inexistente, ganador ajeno)');
console.log(JSON.stringify(simularTemporada(jugadoresConCasoLimite, partidosConCasosLimite), null, 2));
