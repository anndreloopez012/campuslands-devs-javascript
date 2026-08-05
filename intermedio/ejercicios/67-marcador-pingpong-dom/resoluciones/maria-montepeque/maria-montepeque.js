// 67. Marcador pingpong DOM - Resolucion Maria Montepeque

const PUNTOS_PARA_GANAR_SET = 11;
const SETS_PARA_GANAR_PARTIDO = 3;

function crearEstadoInicial() {
  return {
    puntosJugadorA: 0,
    puntosJugadorB: 0,
    setsJugadorA: 0,
    setsJugadorB: 0,
    historialSets: [],
    ganadorPartido: null
  };
}

function esJugadorValido(jugador) {
  return jugador === 'A' || jugador === 'B';
}

function haGanadoSet(puntosA, puntosB) {
  const maximo = Math.max(puntosA, puntosB);
  const diferencia = Math.abs(puntosA - puntosB);
  return maximo >= PUNTOS_PARA_GANAR_SET && diferencia >= 2;
}

function sumarPunto(estado, jugador) {
  if (!esJugadorValido(jugador) || estado.ganadorPartido) return estado;

  const estadoConPunto =
    jugador === 'A' ? { ...estado, puntosJugadorA: estado.puntosJugadorA + 1 } : { ...estado, puntosJugadorB: estado.puntosJugadorB + 1 };

  if (!haGanadoSet(estadoConPunto.puntosJugadorA, estadoConPunto.puntosJugadorB)) {
    return estadoConPunto;
  }

  const ganadorSet = estadoConPunto.puntosJugadorA > estadoConPunto.puntosJugadorB ? 'A' : 'B';
  const setsJugadorA = estadoConPunto.setsJugadorA + (ganadorSet === 'A' ? 1 : 0);
  const setsJugadorB = estadoConPunto.setsJugadorB + (ganadorSet === 'B' ? 1 : 0);

  return {
    puntosJugadorA: 0,
    puntosJugadorB: 0,
    setsJugadorA,
    setsJugadorB,
    historialSets: [
      ...estadoConPunto.historialSets,
      { puntosA: estadoConPunto.puntosJugadorA, puntosB: estadoConPunto.puntosJugadorB, ganador: ganadorSet }
    ],
    ganadorPartido: setsJugadorA >= SETS_PARA_GANAR_PARTIDO ? 'A' : setsJugadorB >= SETS_PARA_GANAR_PARTIDO ? 'B' : null
  };
}

function simularSecuenciaPuntos(secuenciaJugadores) {
  let estado = crearEstadoInicial();

  secuenciaJugadores.forEach((jugador) => {
    estado = sumarPunto(estado, jugador);
  });

  return { estadoFinal: estado, totalPuntosProcesados: secuenciaJugadores.length };
}

function renderizarMarcador(estado) {
  if (typeof document === 'undefined') return;
  const marcador = document.querySelector('#marcador-actual');
  const setsInfo = document.querySelector('#sets-info');
  const ganadorInfo = document.querySelector('#ganador-info');
  if (!marcador) return;

  marcador.textContent = `${estado.puntosJugadorA} - ${estado.puntosJugadorB}`;
  if (setsInfo) setsInfo.textContent = `Sets: ${estado.setsJugadorA} - ${estado.setsJugadorB}`;
  if (ganadorInfo) ganadorInfo.textContent = estado.ganadorPartido ? `Gana el partido: Jugador ${estado.ganadorPartido}` : '';
}

function inicializarMarcador() {
  if (typeof document === 'undefined') return;

  let estado = crearEstadoInicial();
  renderizarMarcador(estado);

  const botonPuntoA = document.querySelector('#boton-punto-a');
  const botonPuntoB = document.querySelector('#boton-punto-b');
  const botonReset = document.querySelector('#boton-reset-marcador');

  if (botonPuntoA) {
    botonPuntoA.addEventListener('click', () => {
      estado = sumarPunto(estado, 'A');
      renderizarMarcador(estado);
    });
  }

  if (botonPuntoB) {
    botonPuntoB.addEventListener('click', () => {
      estado = sumarPunto(estado, 'B');
      renderizarMarcador(estado);
    });
  }

  if (botonReset) {
    botonReset.addEventListener('click', () => {
      estado = crearEstadoInicial();
      renderizarMarcador(estado);
    });
  }
}

console.log('Caso 1: jugador A gana el primer set 11-0');
const secuenciaSetLimpio = Array(11).fill('A');
console.log(JSON.stringify(simularSecuenciaPuntos(secuenciaSetLimpio), null, 2));

console.log('\nCaso 2: set con deuce (empate en 10-10, gana A por diferencia de 2 puntos, 13-11)');
const secuenciaDeuce = [
  ...Array(10).fill('A'),
  ...Array(10).fill('B'),
  'A',
  'B',
  'A',
  'A'
];
console.log(JSON.stringify(simularSecuenciaPuntos(secuenciaDeuce), null, 2));

console.log('\nCaso 2b: jugador invalido ("C") es ignorado sin romper el estado');
console.log(JSON.stringify(simularSecuenciaPuntos(['A', 'A', 'C', 'B']), null, 2));

inicializarMarcador();
