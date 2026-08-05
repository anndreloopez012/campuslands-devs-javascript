// 31. Simulador de zona battle royale - Resolucion Maria Montepeque

const jugadoresIniciales = [
  { id: 1, nombre: 'Nova', posicion: { x: 10, y: 10 }, vida: 100 },
  { id: 2, nombre: 'Raze', posicion: { x: 60, y: 60 }, vida: 100 },
  { id: 3, nombre: 'Echo', posicion: { x: 15, y: 12 }, vida: 100 },
  { id: 4, nombre: 'Blitz', posicion: { x: 80, y: 5 }, vida: 100 }
];

const fasesZona = [
  { fase: 1, centro: { x: 10, y: 10 }, radio: 20, danoPorFase: 5 },
  { fase: 2, centro: { x: 10, y: 10 }, radio: 10, danoPorFase: 10 },
  { fase: 3, centro: { x: 10, y: 10 }, radio: 5, danoPorFase: 20 }
];

function esJugadorValido(jugador) {
  return (
    jugador &&
    typeof jugador.nombre === 'string' &&
    jugador.nombre.trim() !== '' &&
    jugador.posicion &&
    typeof jugador.posicion.x === 'number' &&
    typeof jugador.posicion.y === 'number' &&
    typeof jugador.vida === 'number' &&
    jugador.vida > 0
  );
}

function esFaseValida(fase) {
  return (
    fase &&
    fase.centro &&
    typeof fase.centro.x === 'number' &&
    typeof fase.centro.y === 'number' &&
    typeof fase.radio === 'number' &&
    fase.radio >= 0 &&
    typeof fase.danoPorFase === 'number' &&
    fase.danoPorFase >= 0
  );
}

function calcularDistancia(posicionA, posicionB) {
  return Math.sqrt((posicionA.x - posicionB.x) ** 2 + (posicionA.y - posicionB.y) ** 2);
}

function estaFueraDeZona(jugador, fase) {
  return calcularDistancia(jugador.posicion, fase.centro) > fase.radio;
}

function aplicarFase(jugadores, fase) {
  return jugadores.map((jugador) => {
    if (jugador.vida <= 0 || !estaFueraDeZona(jugador, fase)) return jugador;
    return { ...jugador, vida: Math.max(0, jugador.vida - fase.danoPorFase) };
  });
}

function simularBattleRoyale(jugadoresBase, fases) {
  const jugadoresValidos = jugadoresBase.filter(esJugadorValido);
  const fasesValidas = fases.filter(esFaseValida);

  const estadoFinal = fasesValidas.reduce((estado, fase) => aplicarFase(estado, fase), jugadoresValidos);

  return {
    totalJugadores: jugadoresBase.length,
    jugadoresInvalidos: jugadoresBase.length - jugadoresValidos.length,
    fasesAplicadas: fasesValidas.length,
    fasesInvalidas: fases.length - fasesValidas.length,
    estadoFinal,
    sobrevivientes: estadoFinal.filter((jugador) => jugador.vida > 0),
    eliminados: estadoFinal.filter((jugador) => jugador.vida <= 0)
  };
}

console.log('Caso 1: 4 jugadores, 3 fases de zona que se cierran progresivamente');
console.log(JSON.stringify(simularBattleRoyale(jugadoresIniciales, fasesZona), null, 2));

const jugadoresConCasosLimite = [
  ...jugadoresIniciales,
  { id: 5, nombre: 'Sin posicion', vida: 100 },
  { id: 6, nombre: 'Eliminado previo', posicion: { x: 50, y: 50 }, vida: 0 },
  { id: 7, nombre: 'Grim', posicion: { x: 90, y: 90 }, vida: 30 }
];

const fasesConCasoInvalido = [...fasesZona, { fase: 4, centro: { x: 10, y: 10 }, radio: -5, danoPorFase: 'mucho' }];

console.log('\nCaso 2: incluye jugador sin posicion, jugador ya eliminado y fase invalida');
console.log(JSON.stringify(simularBattleRoyale(jugadoresConCasosLimite, fasesConCasoInvalido), null, 2));
