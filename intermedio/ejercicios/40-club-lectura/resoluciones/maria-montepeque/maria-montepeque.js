// 40. Club de lectura - Resolucion Maria Montepeque

const libro = { titulo: 'Cien Anios de Soledad', totalPaginas: 471 };
const semanaActual = 4;
const totalSemanas = 8;

const miembros = [
  { id: 1, nombre: 'Elena', paginasLeidas: 260 },
  { id: 2, nombre: 'Marco', paginasLeidas: 150 },
  { id: 3, nombre: 'Sofia', paginasLeidas: 471 },
  { id: 4, nombre: 'Diego', paginasLeidas: 90 }
];

function esLibroValido(datosLibro) {
  return (
    datosLibro &&
    typeof datosLibro.titulo === 'string' &&
    datosLibro.titulo.trim() !== '' &&
    typeof datosLibro.totalPaginas === 'number' &&
    datosLibro.totalPaginas > 0
  );
}

function esMiembroValido(miembro) {
  return (
    miembro &&
    typeof miembro.nombre === 'string' &&
    miembro.nombre.trim() !== '' &&
    typeof miembro.paginasLeidas === 'number' &&
    miembro.paginasLeidas >= 0
  );
}

function calcularPorcentaje(paginasLeidas, totalPaginas) {
  return Number((((paginasLeidas / totalPaginas) * 100)).toFixed(1));
}

function calcularPaginasEsperadas(datosLibro, semana, semanasTotales) {
  return (datosLibro.totalPaginas / semanasTotales) * semana;
}

function evaluarMiembro(miembro, datosLibro, paginasEsperadas) {
  const porcentaje = calcularPorcentaje(miembro.paginasLeidas, datosLibro.totalPaginas);
  const atrasado = miembro.paginasLeidas < paginasEsperadas;

  return {
    nombre: miembro.nombre,
    paginasLeidas: miembro.paginasLeidas,
    porcentaje,
    atrasado,
    paginasAtraso: atrasado ? Number((paginasEsperadas - miembro.paginasLeidas).toFixed(1)) : 0,
    completado: miembro.paginasLeidas >= datosLibro.totalPaginas
  };
}

function calcularPromedioProgreso(evaluaciones) {
  const suma = evaluaciones.reduce((total, evaluacion) => total + evaluacion.porcentaje, 0);
  return Number((suma / evaluaciones.length).toFixed(1));
}

function generarResumenClub(datosLibro, miembrosBase, semana, semanasTotales) {
  if (!esLibroValido(datosLibro)) {
    return { valido: false, motivo: 'libro invalido' };
  }

  const miembrosValidos = miembrosBase.filter(esMiembroValido);
  const paginasEsperadas = calcularPaginasEsperadas(datosLibro, semana, semanasTotales);
  const evaluaciones = miembrosValidos.map((miembro) => evaluarMiembro(miembro, datosLibro, paginasEsperadas));
  const atrasados = evaluaciones.filter((evaluacion) => evaluacion.atrasado);

  return {
    valido: true,
    libro: datosLibro.titulo,
    semanaActual: semana,
    totalSemanas: semanasTotales,
    paginasEsperadasHastaAhora: Number(paginasEsperadas.toFixed(1)),
    totalMiembros: miembrosBase.length,
    miembrosInvalidos: miembrosBase.length - miembrosValidos.length,
    promedioProgreso: evaluaciones.length > 0 ? calcularPromedioProgreso(evaluaciones) : 0,
    miembros: evaluaciones,
    atrasados: atrasados.map((evaluacion) => evaluacion.nombre)
  };
}

console.log('Caso 1: club con 4 miembros en la semana 4 de 8');
console.log(JSON.stringify(generarResumenClub(libro, miembros, semanaActual, totalSemanas), null, 2));

const miembrosConCasosLimite = [
  ...miembros,
  { id: 5, nombre: 'Paula', paginasLeidas: -10 },
  { id: 6, paginasLeidas: 100 }
];

console.log('\nCaso 2: incluye miembros invalidos (paginas negativas y sin nombre)');
console.log(JSON.stringify(generarResumenClub(libro, miembrosConCasosLimite, semanaActual, totalSemanas), null, 2));
