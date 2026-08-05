// 66. Cronometro de vueltas - Resolucion Maria Montepeque

function esTimestampsValidos(timestamps) {
  return (
    Array.isArray(timestamps) &&
    timestamps.length >= 2 &&
    timestamps.every((valor) => typeof valor === 'number') &&
    timestamps.every((valor, indice) => indice === 0 || valor > timestamps[indice - 1])
  );
}

function calcularTiemposVuelta(timestamps) {
  const tiempos = [];
  for (let i = 1; i < timestamps.length; i += 1) {
    tiempos.push(timestamps[i] - timestamps[i - 1]);
  }
  return tiempos;
}

function formatearTiempo(ms) {
  const totalSegundos = ms / 1000;
  const minutos = Math.floor(totalSegundos / 60);
  const segundos = (totalSegundos % 60).toFixed(2);
  return `${minutos}:${segundos.padStart(5, '0')}`;
}

function encontrarMejorVuelta(tiemposVuelta) {
  if (tiemposVuelta.length === 0) return null;
  const mejorMs = Math.min(...tiemposVuelta);
  return { numeroVuelta: tiemposVuelta.indexOf(mejorMs) + 1, tiempoMs: mejorMs, tiempoFormateado: formatearTiempo(mejorMs) };
}

function generarHistorial(timestampsCronometro) {
  if (!esTimestampsValidos(timestampsCronometro)) {
    return { valido: false, motivo: 'se necesitan al menos 2 marcas de tiempo (inicio + 1 vuelta) en orden ascendente' };
  }

  const tiemposVuelta = calcularTiemposVuelta(timestampsCronometro);
  const historial = tiemposVuelta.map((tiempoMs, indice) => ({
    numeroVuelta: indice + 1,
    tiempoMs,
    tiempoFormateado: formatearTiempo(tiempoMs)
  }));

  const tiempoTotalMs = timestampsCronometro[timestampsCronometro.length - 1] - timestampsCronometro[0];

  return {
    valido: true,
    totalVueltas: historial.length,
    historial,
    mejorVuelta: encontrarMejorVuelta(tiemposVuelta),
    tiempoTotalMs,
    tiempoTotalFormateado: formatearTiempo(tiempoTotalMs)
  };
}

function renderizarHistorial(timestamps) {
  if (typeof document === 'undefined') return;
  const contenedor = document.querySelector('#historial-vueltas');
  if (!contenedor) return;

  const resultado = generarHistorial(timestamps);
  contenedor.innerHTML = '';

  if (!resultado.valido) {
    contenedor.textContent = 'Presiona Iniciar y luego Vuelta para registrar tiempos.';
    return;
  }

  resultado.historial.forEach((vuelta) => {
    const fila = document.createElement('div');
    const esMejor = resultado.mejorVuelta && vuelta.numeroVuelta === resultado.mejorVuelta.numeroVuelta;
    fila.textContent = `Vuelta ${vuelta.numeroVuelta}: ${vuelta.tiempoFormateado}${esMejor ? ' (mejor)' : ''}`;
    contenedor.appendChild(fila);
  });
}

function inicializarCronometro() {
  if (typeof document === 'undefined') return;

  let timestamps = [];
  const botonIniciar = document.querySelector('#boton-iniciar');
  const botonVuelta = document.querySelector('#boton-vuelta');
  const botonReset = document.querySelector('#boton-reset');

  renderizarHistorial(timestamps);

  if (botonIniciar) {
    botonIniciar.addEventListener('click', () => {
      timestamps = [Date.now()];
      renderizarHistorial(timestamps);
    });
  }

  if (botonVuelta) {
    botonVuelta.addEventListener('click', () => {
      if (timestamps.length === 0) return;
      timestamps = [...timestamps, Date.now()];
      renderizarHistorial(timestamps);
    });
  }

  if (botonReset) {
    botonReset.addEventListener('click', () => {
      timestamps = [];
      renderizarHistorial(timestamps);
    });
  }
}

const timestampsCarrera = [0, 61250, 121050, 181550];

console.log('Caso 1: carrera con 3 vueltas registradas (marcas de tiempo en ms)');
console.log(JSON.stringify(generarHistorial(timestampsCarrera), null, 2));

console.log('\nCaso 2: solo se presiono Iniciar, sin ninguna vuelta registrada aun');
console.log(JSON.stringify(generarHistorial([0]), null, 2));

console.log('\nCaso 2b: marcas de tiempo desordenadas (invalidas)');
console.log(JSON.stringify(generarHistorial([0, 5000, 3000]), null, 2));

inicializarCronometro();
