// 32. Temporada modo carrera - Resolucion Maria Montepeque

const equipos = ['Tigres', 'Aguilas', 'Lobos', 'Halcones'];

const jornadas = [
  { local: 'Tigres', visitante: 'Aguilas', golesLocal: 2, golesVisitante: 1 },
  { local: 'Lobos', visitante: 'Halcones', golesLocal: 0, golesVisitante: 0 },
  { local: 'Aguilas', visitante: 'Lobos', golesLocal: 3, golesVisitante: 3 },
  { local: 'Halcones', visitante: 'Tigres', golesLocal: 1, golesVisitante: 2 },
  { local: 'Tigres', visitante: 'Lobos', golesLocal: 1, golesVisitante: 1 },
  { local: 'Aguilas', visitante: 'Halcones', golesLocal: 4, golesVisitante: 0 }
];

function crearTablaInicial(nombresEquipos) {
  return new Map(
    nombresEquipos.map((nombre) => [
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

function procesarJornada(tabla, partido) {
  tabla.set(partido.local, actualizarEquipo(tabla.get(partido.local), partido.golesLocal, partido.golesVisitante));
  tabla.set(
    partido.visitante,
    actualizarEquipo(tabla.get(partido.visitante), partido.golesVisitante, partido.golesLocal)
  );
  return tabla;
}

function ordenarTabla(tabla) {
  return [...tabla.values()]
    .map((equipo) => ({ ...equipo, diferencia: equipo.golesFavor - equipo.golesContra }))
    .sort((a, b) => b.puntos - a.puntos || b.diferencia - a.diferencia || b.golesFavor - a.golesFavor);
}

function simularTemporada(nombresEquipos, resultadosJornadas) {
  const equiposValidos = new Set(nombresEquipos);
  const partidosValidos = resultadosJornadas.filter((partido) => esPartidoValido(partido, equiposValidos));

  const tablaFinal = partidosValidos.reduce((tabla, partido) => procesarJornada(tabla, partido), crearTablaInicial(nombresEquipos));

  return {
    totalEquipos: nombresEquipos.length,
    partidosJugados: partidosValidos.length,
    partidosInvalidos: resultadosJornadas.length - partidosValidos.length,
    tablaPosiciones: ordenarTabla(tablaFinal)
  };
}

console.log('Caso 1: temporada completa con 6 jornadas validas');
console.log(JSON.stringify(simularTemporada(equipos, jornadas), null, 2));

const jornadasConCasosLimite = [
  ...jornadas,
  { local: 'Tigres', visitante: 'Tigres', golesLocal: 1, golesVisitante: 0 },
  { local: 'Panteras', visitante: 'Tigres', golesLocal: 2, golesVisitante: 1 },
  { local: 'Lobos', visitante: 'Halcones', golesLocal: -1, golesVisitante: 2 }
];

console.log('\nCaso 2: incluye equipo jugando contra si mismo, equipo inexistente y goles negativos');
console.log(JSON.stringify(simularTemporada(equipos, jornadasConCasosLimite), null, 2));
