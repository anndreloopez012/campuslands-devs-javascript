// 65. Timer de rounds kickboxing - Resolucion Maria Montepeque

const configTimer = { duracionRoundSeg: 3, duracionDescansoSeg: 2, totalRounds: 2 };

function esConfigValida(config) {
  return (
    config &&
    Number.isInteger(config.duracionRoundSeg) &&
    config.duracionRoundSeg > 0 &&
    Number.isInteger(config.duracionDescansoSeg) &&
    config.duracionDescansoSeg > 0 &&
    Number.isInteger(config.totalRounds) &&
    config.totalRounds > 0
  );
}

function crearEstadoInicial(config) {
  return {
    faseActual: 'round',
    roundActual: 1,
    segundosRestantes: config.duracionRoundSeg,
    corriendo: false,
    finalizado: false
  };
}

function avanzarUnSegundo(estado, config) {
  if (estado.finalizado || !estado.corriendo) return estado;

  if (estado.segundosRestantes > 1) {
    return { ...estado, segundosRestantes: estado.segundosRestantes - 1 };
  }

  if (estado.faseActual === 'round') {
    if (estado.roundActual >= config.totalRounds) {
      return { ...estado, faseActual: 'finalizado', segundosRestantes: 0, corriendo: false, finalizado: true };
    }
    return { ...estado, faseActual: 'descanso', segundosRestantes: config.duracionDescansoSeg };
  }

  return { ...estado, faseActual: 'round', roundActual: estado.roundActual + 1, segundosRestantes: config.duracionRoundSeg };
}

function pausarTimer(estado) {
  return { ...estado, corriendo: false };
}

function reanudarTimer(estado) {
  return estado.finalizado ? estado : { ...estado, corriendo: true };
}

function reiniciarTimer(config) {
  return crearEstadoInicial(config);
}

function simularSegundos(config, cantidadSegundos) {
  if (!esConfigValida(config)) {
    return { valido: false, motivo: 'configuracion invalida (duraciones o rounds deben ser enteros positivos)' };
  }

  let estado = reanudarTimer(crearEstadoInicial(config));
  const historial = [{ ...estado }];

  for (let i = 0; i < cantidadSegundos; i += 1) {
    estado = avanzarUnSegundo(estado, config);
    historial.push({ ...estado });
  }

  return { valido: true, config, historial, estadoFinal: estado };
}

function renderizarEstado(estado) {
  if (typeof document === 'undefined') return;
  const elemento = document.querySelector('#timer-estado');
  if (!elemento) return;

  elemento.textContent = estado.finalizado
    ? 'Finalizado'
    : `${estado.faseActual === 'round' ? 'Round' : 'Descanso'} ${estado.roundActual} - ${estado.segundosRestantes}s`;
}

function inicializarTimer(config) {
  if (typeof document === 'undefined') return;

  let estado = crearEstadoInicial(config);
  let intervalo = null;
  renderizarEstado(estado);

  const botonIniciar = document.querySelector('#boton-iniciar');
  const botonPausar = document.querySelector('#boton-pausar');
  const botonReiniciar = document.querySelector('#boton-reiniciar');

  function tick() {
    estado = avanzarUnSegundo(estado, config);
    renderizarEstado(estado);
    if (estado.finalizado && intervalo) {
      clearInterval(intervalo);
      intervalo = null;
    }
  }

  if (botonIniciar) {
    botonIniciar.addEventListener('click', () => {
      if (estado.finalizado) return;
      estado = reanudarTimer(estado);
      if (!intervalo) intervalo = setInterval(tick, 1000);
    });
  }

  if (botonPausar) {
    botonPausar.addEventListener('click', () => {
      estado = pausarTimer(estado);
      if (intervalo) {
        clearInterval(intervalo);
        intervalo = null;
      }
    });
  }

  if (botonReiniciar) {
    botonReiniciar.addEventListener('click', () => {
      if (intervalo) {
        clearInterval(intervalo);
        intervalo = null;
      }
      estado = reiniciarTimer(config);
      renderizarEstado(estado);
    });
  }
}

console.log('Caso 1: timer de 2 rounds (3s round, 2s descanso), se simulan 8 segundos hasta finalizar');
console.log(JSON.stringify(simularSegundos(configTimer, 8), null, 2));

console.log('\nCaso 2: configuracion invalida (duracion de round en 0)');
console.log(JSON.stringify(simularSegundos({ duracionRoundSeg: 0, duracionDescansoSeg: 2, totalRounds: 2 }, 5), null, 2));

inicializarTimer(configTimer);
