// 62. Dashboard multi-deporte - Resolucion Maria Montepeque

const registrosFutbol = [
  { atleta: 'Diaz', goles: 18, partidosJugados: 30 },
  { atleta: 'Fernandez', goles: 10, partidosJugados: 28 }
];

const registrosBasquet = [
  { atleta: 'Johnson', puntosAnotados: 620, partidosJugados: 40 },
  { atleta: 'Lee', puntosAnotados: 450, partidosJugados: 38 }
];

const registrosTenis = [
  { atleta: 'Alvarez', setsGanados: 55, setsJugados: 70 },
  { atleta: 'Kim', setsGanados: 30, setsJugados: 60 }
];

function esRegistroFutbolValido(registro) {
  return (
    registro &&
    typeof registro.atleta === 'string' &&
    registro.atleta.trim() !== '' &&
    typeof registro.goles === 'number' &&
    registro.goles >= 0 &&
    typeof registro.partidosJugados === 'number' &&
    registro.partidosJugados > 0
  );
}

function esRegistroBasquetValido(registro) {
  return (
    registro &&
    typeof registro.atleta === 'string' &&
    registro.atleta.trim() !== '' &&
    typeof registro.puntosAnotados === 'number' &&
    registro.puntosAnotados >= 0 &&
    typeof registro.partidosJugados === 'number' &&
    registro.partidosJugados > 0
  );
}

function esRegistroTenisValido(registro) {
  return (
    registro &&
    typeof registro.atleta === 'string' &&
    registro.atleta.trim() !== '' &&
    typeof registro.setsGanados === 'number' &&
    registro.setsGanados >= 0 &&
    typeof registro.setsJugados === 'number' &&
    registro.setsJugados > 0 &&
    registro.setsGanados <= registro.setsJugados
  );
}

function normalizarFutbol(registro) {
  return {
    atleta: registro.atleta,
    deporte: 'futbol',
    metricaClave: Number((registro.goles / registro.partidosJugados).toFixed(2)),
    unidad: 'goles/partido'
  };
}

function normalizarBasquet(registro) {
  return {
    atleta: registro.atleta,
    deporte: 'basquet',
    metricaClave: Number((registro.puntosAnotados / registro.partidosJugados).toFixed(2)),
    unidad: 'puntos/partido'
  };
}

function normalizarTenis(registro) {
  return {
    atleta: registro.atleta,
    deporte: 'tenis',
    metricaClave: Number(((registro.setsGanados / registro.setsJugados) * 100).toFixed(2)),
    unidad: '% sets ganados'
  };
}

function normalizarRendimiento(valor, minimo, maximo) {
  return maximo === minimo ? 100 : Number((((valor - minimo) / (maximo - minimo)) * 100).toFixed(1));
}

function calcularRendimientoGrupo(registrosNormalizados) {
  if (registrosNormalizados.length === 0) return [];
  const valores = registrosNormalizados.map((registro) => registro.metricaClave);
  const minimo = Math.min(...valores);
  const maximo = Math.max(...valores);

  return registrosNormalizados.map((registro) => ({
    ...registro,
    rendimiento: normalizarRendimiento(registro.metricaClave, minimo, maximo)
  }));
}

function generarDashboard(futbolBase, basquetBase, tenisBase) {
  const futbolNormalizado = futbolBase.filter(esRegistroFutbolValido).map(normalizarFutbol);
  const basquetNormalizado = basquetBase.filter(esRegistroBasquetValido).map(normalizarBasquet);
  const tenisNormalizado = tenisBase.filter(esRegistroTenisValido).map(normalizarTenis);

  const rankingGeneral = [
    ...calcularRendimientoGrupo(futbolNormalizado),
    ...calcularRendimientoGrupo(basquetNormalizado),
    ...calcularRendimientoGrupo(tenisNormalizado)
  ].sort((a, b) => b.rendimiento - a.rendimiento);

  return {
    totalRegistrosFutbol: futbolBase.length,
    futbolInvalidos: futbolBase.length - futbolNormalizado.length,
    totalRegistrosBasquet: basquetBase.length,
    basquetInvalidos: basquetBase.length - basquetNormalizado.length,
    totalRegistrosTenis: tenisBase.length,
    tenisInvalidos: tenisBase.length - tenisNormalizado.length,
    rankingGeneral,
    mejorAtleta: rankingGeneral.length > 0 ? rankingGeneral[0].atleta : null
  };
}

console.log('Caso 1: dashboard con 2 atletas por deporte (futbol, basquet, tenis)');
console.log(JSON.stringify(generarDashboard(registrosFutbol, registrosBasquet, registrosTenis), null, 2));

const futbolConCasoLimite = [...registrosFutbol, { atleta: 'Sin partidos', goles: 5, partidosJugados: 0 }];
const tenisConCasoLimite = [...registrosTenis, { atleta: 'Sets imposibles', setsGanados: 20, setsJugados: 10 }];

console.log('\nCaso 2: incluye registros invalidos (0 partidos jugados, sets ganados mayor a sets jugados)');
console.log(JSON.stringify(generarDashboard(futbolConCasoLimite, registrosBasquet, tenisConCasoLimite), null, 2));
