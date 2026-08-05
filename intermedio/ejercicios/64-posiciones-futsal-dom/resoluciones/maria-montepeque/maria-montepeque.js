// 64. Tabla futsal interactiva - Resolucion Maria Montepeque

const equipos = ['Halcones FS', 'Titanes FS', 'Rayos FS', 'Cobras FS'];

function crearTablaInicial(equiposBase) {
  return new Map(
    equiposBase.map((nombre) => [
      nombre,
      { equipo: nombre, jugados: 0, ganados: 0, empatados: 0, perdidos: 0, golesFavor: 0, golesContra: 0, puntos: 0 }
    ])
  );
}

function esResultadoValido(resultado, equiposValidos) {
  return (
    resultado &&
    equiposValidos.has(resultado.local) &&
    equiposValidos.has(resultado.visitante) &&
    resultado.local !== resultado.visitante &&
    Number.isInteger(resultado.golesLocal) &&
    resultado.golesLocal >= 0 &&
    Number.isInteger(resultado.golesVisitante) &&
    resultado.golesVisitante >= 0
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

function procesarResultado(tabla, resultado) {
  const nuevaTabla = new Map(tabla);
  nuevaTabla.set(resultado.local, actualizarEquipo(nuevaTabla.get(resultado.local), resultado.golesLocal, resultado.golesVisitante));
  nuevaTabla.set(
    resultado.visitante,
    actualizarEquipo(nuevaTabla.get(resultado.visitante), resultado.golesVisitante, resultado.golesLocal)
  );
  return nuevaTabla;
}

function ordenarTabla(tabla) {
  return [...tabla.values()].sort((a, b) => b.puntos - a.puntos || b.golesFavor - b.golesContra - (a.golesFavor - a.golesContra));
}

function parsearGoles(valorCrudo) {
  const numero = Number(valorCrudo);
  return Number.isInteger(numero) ? numero : NaN;
}

function agregarResultado(tabla, equiposValidos, resultadoCrudo) {
  const resultado = {
    local: resultadoCrudo.local,
    visitante: resultadoCrudo.visitante,
    golesLocal: parsearGoles(resultadoCrudo.golesLocal),
    golesVisitante: parsearGoles(resultadoCrudo.golesVisitante)
  };

  if (!esResultadoValido(resultado, equiposValidos)) {
    return { agregado: false, motivo: 'resultado invalido (equipos iguales/inexistentes o goles no numericos)', tabla };
  }

  return { agregado: true, motivo: 'resultado agregado correctamente', tabla: procesarResultado(tabla, resultado) };
}

function renderizarTabla(tabla) {
  if (typeof document === 'undefined') return;
  const contenedor = document.querySelector('#tabla-posiciones');
  if (!contenedor) return;

  contenedor.innerHTML = '';
  const filas = ordenarTabla(tabla);

  filas.forEach((fila) => {
    const item = document.createElement('div');
    item.className = 'fila-tabla';
    item.textContent = `${fila.equipo} | PJ:${fila.jugados} G:${fila.ganados} E:${fila.empatados} P:${fila.perdidos} GF:${fila.golesFavor} GC:${fila.golesContra} Pts:${fila.puntos}`;
    contenedor.appendChild(item);
  });
}

function inicializarFormulario(equiposIniciales) {
  if (typeof document === 'undefined') return;

  let tablaActual = crearTablaInicial(equiposIniciales);
  const equiposValidos = new Set(equiposIniciales);
  renderizarTabla(tablaActual);

  const formulario = document.querySelector('#form-resultado');
  const selectLocal = document.querySelector('#select-local');
  const selectVisitante = document.querySelector('#select-visitante');
  const inputGolesLocal = document.querySelector('#input-goles-local');
  const inputGolesVisitante = document.querySelector('#input-goles-visitante');
  const mensajeEstado = document.querySelector('#mensaje-estado');
  if (!formulario || !selectLocal || !selectVisitante || !inputGolesLocal || !inputGolesVisitante) return;

  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const resultado = agregarResultado(tablaActual, equiposValidos, {
      local: selectLocal.value,
      visitante: selectVisitante.value,
      golesLocal: inputGolesLocal.value,
      golesVisitante: inputGolesVisitante.value
    });

    tablaActual = resultado.tabla;
    if (mensajeEstado) mensajeEstado.textContent = resultado.motivo;
    renderizarTabla(tablaActual);
  });
}

function gestionarTorneo(equiposBase, resultadosIniciales) {
  const equiposValidos = new Set(equiposBase);
  let tabla = crearTablaInicial(equiposBase);

  const historial = resultadosIniciales.map((resultadoCrudo) => {
    const resultadoProcesado = agregarResultado(tabla, equiposValidos, resultadoCrudo);
    tabla = resultadoProcesado.tabla;
    return { ...resultadoCrudo, agregado: resultadoProcesado.agregado, motivo: resultadoProcesado.motivo };
  });

  renderizarTabla(tabla);

  return {
    totalEquipos: equiposBase.length,
    resultadosProcesados: historial.length,
    resultadosAceptados: historial.filter((item) => item.agregado).length,
    resultadosRechazados: historial.filter((item) => !item.agregado).length,
    historial,
    tablaPosiciones: ordenarTabla(tabla)
  };
}

const resultadosValidos = [
  { local: 'Halcones FS', visitante: 'Titanes FS', golesLocal: 4, golesVisitante: 2 },
  { local: 'Rayos FS', visitante: 'Cobras FS', golesLocal: 3, golesVisitante: 3 },
  { local: 'Titanes FS', visitante: 'Cobras FS', golesLocal: 1, golesVisitante: 5 }
];

console.log('Caso 1: 3 resultados validos cargados desde el formulario');
console.log(JSON.stringify(gestionarTorneo(equipos, resultadosValidos), null, 2));

const resultadosConCasosLimite = [
  ...resultadosValidos,
  { local: 'Halcones FS', visitante: 'Halcones FS', golesLocal: 2, golesVisitante: 0 },
  { local: 'Rayos FS', visitante: 'Titanes FS', golesLocal: 'x', golesVisitante: 2 },
  { local: 'Halcones FS', visitante: 'Panteras FS', golesLocal: 1, golesVisitante: 0 }
];

console.log('\nCaso 2: incluye resultados invalidos (mismo equipo, goles no numericos, equipo inexistente)');
console.log(JSON.stringify(gestionarTorneo(equipos, resultadosConCasosLimite), null, 2));

inicializarFormulario(equipos);
