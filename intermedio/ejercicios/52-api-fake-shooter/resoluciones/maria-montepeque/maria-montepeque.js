// 52. Cliente API fake shooter - Resolucion Maria Montepeque

const baseDatosJugadores = {
  ShadowFox: { kills: 245, muertes: 180, precision: 34.5, partidasJugadas: 62 },
  NightViper: { kills: 310, muertes: 210, precision: 41.2, partidasJugadas: 75 },
  IronWolf: { kills: 190, muertes: 205, precision: 28.7, partidasJugadas: 58 }
};

function fakeFetchStats(nombreJugador, delayMs = 50) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof nombreJugador !== 'string' || nombreJugador.trim() === '') {
        reject(new Error('nombre de jugador invalido'));
        return;
      }

      const stats = baseDatosJugadores[nombreJugador];
      if (!stats) {
        reject(new Error(`jugador "${nombreJugador}" no encontrado`));
        return;
      }

      resolve({ nombre: nombreJugador, ...stats });
    }, delayMs);
  });
}

function calcularKD(stats) {
  return stats.muertes === 0 ? stats.kills : Number((stats.kills / stats.muertes).toFixed(2));
}

async function obtenerResumenJugador(nombreJugador) {
  try {
    const stats = await fakeFetchStats(nombreJugador);
    return {
      exito: true,
      nombre: stats.nombre,
      kills: stats.kills,
      muertes: stats.muertes,
      kd: calcularKD(stats),
      precision: stats.precision,
      partidasJugadas: stats.partidasJugadas
    };
  } catch (error) {
    return { exito: false, nombre: nombreJugador, error: error.message };
  }
}

async function obtenerResumenMultiple(nombresJugadores) {
  const resultados = [];

  for (const nombre of nombresJugadores) {
    const resumen = await obtenerResumenJugador(nombre);
    resultados.push(resumen);
  }

  return {
    totalConsultas: nombresJugadores.length,
    exitosas: resultados.filter((resultado) => resultado.exito).length,
    fallidas: resultados.filter((resultado) => !resultado.exito).length,
    resultados
  };
}

async function ejecutarCasosDePrueba() {
  console.log('Caso 1: consultar 2 jugadores que existen en la base de datos');
  const resumen1 = await obtenerResumenMultiple(['ShadowFox', 'NightViper']);
  console.log(JSON.stringify(resumen1, null, 2));

  console.log('\nCaso 2: incluye un jugador inexistente y un nombre invalido (vacio)');
  const resumen2 = await obtenerResumenMultiple(['IronWolf', 'GhostRecon', '']);
  console.log(JSON.stringify(resumen2, null, 2));
}

ejecutarCasosDePrueba();
