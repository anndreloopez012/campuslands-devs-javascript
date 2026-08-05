// 63. Torneo futbol asincrono - Resolucion Maria Montepeque

const equiposDB = ['Tigres', 'Aguilas', 'Lobos', 'Halcones'];

const partidosDB = [
  { local: 'Tigres', visitante: 'Aguilas', golesLocal: 2, golesVisitante: 1 },
  { local: 'Lobos', visitante: 'Halcones', golesLocal: 0, golesVisitante: 0 },
  { local: 'Aguilas', visitante: 'Lobos', golesLocal: 3, golesVisitante: 3 },
  { local: 'Halcones', visitante: 'Tigres', golesLocal: 1, golesVisitante: 2 }
];

function fakeCargarEquipos(forzarError = false, delayMs = 30) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (forzarError) {
        reject(new Error('no se pudo cargar la lista de equipos'));
        return;
      }
      resolve(equiposDB);
    }, delayMs);
  });
}

function fakeCargarPartidos(forzarError = false, delayMs = 30) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (forzarError) {
        reject(new Error('no se pudo cargar la lista de partidos'));
        return;
      }
      resolve(partidosDB);
    }, delayMs);
  });
}

function crearTablaInicial(equipos) {
  return new Map(
    equipos.map((nombre) => [
      nombre,
      { equipo: nombre, jugados: 0, ganados: 0, empatados: 0, perdidos: 0, golesFavor: 0, golesContra: 0, puntos: 0 }
    ])
  );
}

function esPartidoValido(partido, equiposValidos) {
  return (
    partido &&
    equiposValidos.has(partido.local) &&
    equiposValidos.has(partido.visitante) &&
    partido.local !== partido.visitante &&
    typeof partido.golesLocal === 'number' &&
    partido.golesLocal >= 0 &&
    typeof partido.golesVisitante === 'number' &&
    partido.golesVisitante >= 0
  );
}

function actualizarEquipo(estadisticas, golesFavor, golesContra) {
  const gano = golesFavor > golesContra;
  const empato = golesFavor === golesContra;

  return {
    ...estadisticas,
    jugados: estadisticas.jugados + 1,
    ganados: estadisticas.ganados + (gano ? 1 : 0),
    empatados: estadisticas.empatados + (empato ? 1 : 0),
    perdidos: estadisticas.perdidos + (!gano && !empato ? 1 : 0),
    golesFavor: estadisticas.golesFavor + golesFavor,
    golesContra: estadisticas.golesContra + golesContra,
    puntos: estadisticas.puntos + (gano ? 3 : empato ? 1 : 0)
  };
}

function construirTabla(equipos, partidos) {
  const equiposValidos = new Set(equipos);
  const partidosValidos = partidos.filter((partido) => esPartidoValido(partido, equiposValidos));

  const tabla = partidosValidos.reduce((acumulado, partido) => {
    acumulado.set(partido.local, actualizarEquipo(acumulado.get(partido.local), partido.golesLocal, partido.golesVisitante));
    acumulado.set(
      partido.visitante,
      actualizarEquipo(acumulado.get(partido.visitante), partido.golesVisitante, partido.golesLocal)
    );
    return acumulado;
  }, crearTablaInicial(equipos));

  const posiciones = [...tabla.values()].sort(
    (a, b) => b.puntos - a.puntos || b.golesFavor - b.golesContra - (a.golesFavor - a.golesContra)
  );

  return { posiciones, partidosInvalidos: partidos.length - partidosValidos.length };
}

async function cargarTorneo(forzarErrorEquipos = false, forzarErrorPartidos = false) {
  try {
    const [equipos, partidos] = await Promise.all([
      fakeCargarEquipos(forzarErrorEquipos),
      fakeCargarPartidos(forzarErrorPartidos)
    ]);

    const { posiciones, partidosInvalidos } = construirTabla(equipos, partidos);

    return {
      exito: true,
      totalEquipos: equipos.length,
      totalPartidos: partidos.length,
      partidosInvalidos,
      tablaPosiciones: posiciones
    };
  } catch (error) {
    return { exito: false, error: error.message };
  }
}

async function ejecutarCasosDePrueba() {
  console.log('Caso 1: carga exitosa de equipos y partidos, construye tabla de posiciones');
  const resultado1 = await cargarTorneo(false, false);
  console.log(JSON.stringify(resultado1, null, 2));

  console.log('\nCaso 2: falla la carga de partidos (error de red simulado)');
  const resultado2 = await cargarTorneo(false, true);
  console.log(JSON.stringify(resultado2, null, 2));
}

ejecutarCasosDePrueba();
