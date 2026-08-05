// 75. Lista turistica interactiva
// Resolucion: maria-montepeque
//
// Idea: catalogo fijo de lugares turisticos { id, nombre, categoria, ciudad, rating, descripcion }.
// Un solo termino de busqueda se compara contra nombre, categoria y ciudad; los resultados se
// ordenan por rating y se puede pedir el detalle de un lugar por id.
// El mismo archivo corre con `node maria-montepeque.js` (casos de prueba por consola)
// y en el navegador (maria-montepeque.html) con busqueda en tiempo real.

const LUGARES_TURISTICOS = [
  { id: 1, nombre: 'Catedral de Sal', categoria: 'religioso', ciudad: 'Zipaquira', rating: 4.7, descripcion: 'Templo construido dentro de una mina de sal subterranea.' },
  { id: 2, nombre: 'Ciudad Amurallada', categoria: 'cultura', ciudad: 'Cartagena', rating: 4.8, descripcion: 'Centro historico rodeado por murallas coloniales.' },
  { id: 3, nombre: 'Comuna 13', categoria: 'cultura', ciudad: 'Medellin', rating: 4.6, descripcion: 'Barrio con arte urbano y escaleras electricas.' },
  { id: 4, nombre: 'Monserrate', categoria: 'naturaleza', ciudad: 'Bogota', rating: 4.5, descripcion: 'Cerro con mirador y santuario en la cima.' },
  { id: 5, nombre: 'Playa Johnny Cay', categoria: 'playa', ciudad: 'San Andres', rating: 4.4, descripcion: 'Isla con aguas cristalinas cerca de San Andres.' },
  { id: 6, nombre: 'Valle de Cocora', categoria: 'naturaleza', ciudad: 'Salento', rating: 4.9, descripcion: 'Valle con las palmas de cera mas altas del mundo.' },
  { id: 7, nombre: 'Parque Tayrona', categoria: 'aventura', ciudad: 'Santa Marta', rating: 4.7, descripcion: 'Parque natural con selva, playas y senderismo.' },
  { id: 8, nombre: 'Cristo Rey', categoria: 'religioso', ciudad: 'Cali', rating: 4.2, descripcion: 'Monumento con vista panoramica de la ciudad.' }
];

// ---------------------------------------------------------------------------
// Busqueda (nombre, categoria o ciudad) y orden por rating
// ---------------------------------------------------------------------------

function normalizarTexto(texto) {
  return String(texto ?? '').toLowerCase().trim();
}

function coincideConBusqueda(lugar, termino) {
  const terminoNormalizado = normalizarTexto(termino);
  if (terminoNormalizado === '') return true;

  return [lugar.nombre, lugar.categoria, lugar.ciudad].some((campo) =>
    normalizarTexto(campo).includes(terminoNormalizado)
  );
}

function filtrarLugares(lugares, termino) {
  return lugares.filter((lugar) => coincideConBusqueda(lugar, termino));
}

function ordenarPorRating(lugares, orden = 'desc') {
  return [...lugares].sort((a, b) => (orden === 'asc' ? a.rating - b.rating : b.rating - a.rating));
}

function buscarYOrdenar(lugares, termino, orden = 'desc') {
  return ordenarPorRating(filtrarLugares(lugares, termino), orden);
}

// ---------------------------------------------------------------------------
// Detalle de un lugar
// ---------------------------------------------------------------------------

function obtenerDetalleLugar(lugares, id) {
  const lugar = lugares.find((item) => item.id === Number(id));
  if (!lugar) {
    return { encontrado: false, motivo: `No existe un lugar con id ${id}.` };
  }
  return { encontrado: true, lugar };
}

// Reto extra: resumen estadistico de los resultados de una busqueda.
function generarResumenBusqueda(resultados) {
  if (resultados.length === 0) return { total: 0, ratingPromedio: 0 };
  const total = resultados.length;
  const sumaRatings = resultados.reduce((acumulado, lugar) => acumulado + lugar.rating, 0);
  return { total, ratingPromedio: Number((sumaRatings / total).toFixed(2)) };
}

// ---------------------------------------------------------------------------
// Salida por consola
// ---------------------------------------------------------------------------

function mostrarResultadosEnConsola(etiqueta, resultados) {
  console.log(`\n${etiqueta} (${resultados.length} resultado(s)):`);
  if (resultados.length === 0) {
    console.log('Sin resultados para esta busqueda.');
    return;
  }
  console.table(resultados.map(({ id, nombre, categoria, ciudad, rating }) => ({ id, nombre, categoria, ciudad, rating })));
  console.log('Resumen:', generarResumenBusqueda(resultados));
}

// ---------------------------------------------------------------------------
// Interfaz en el DOM
// ---------------------------------------------------------------------------

function crearFilaLugar(lugar, onSeleccionar) {
  const fila = document.createElement('li');
  fila.textContent = `${lugar.nombre} · ${lugar.ciudad} · ${lugar.rating} ★`;
  fila.addEventListener('click', () => onSeleccionar(lugar.id));
  return fila;
}

function mostrarDetalleEnDOM(contenedor, lugar) {
  contenedor.innerHTML = lugar
    ? `<h3>${lugar.nombre}</h3><p>${lugar.categoria} · ${lugar.ciudad} · ${lugar.rating} ★</p><p>${lugar.descripcion}</p>`
    : '<p class="sin-seleccion">Elige un lugar de la lista para ver el detalle.</p>';
}

function iniciarAplicacionDOM() {
  const entradaBusqueda = document.querySelector('#entrada-busqueda');
  const listaResultados = document.querySelector('#lista-resultados');
  const contadorElemento = document.querySelector('#contador-resultados');
  const detalleElemento = document.querySelector('#detalle-lugar');

  if (!entradaBusqueda || !listaResultados || !contadorElemento || !detalleElemento) return;

  function seleccionarLugar(id) {
    const resultado = obtenerDetalleLugar(LUGARES_TURISTICOS, id);
    mostrarDetalleEnDOM(detalleElemento, resultado.encontrado ? resultado.lugar : null);
  }

  function renderizarResultados() {
    const resultados = buscarYOrdenar(LUGARES_TURISTICOS, entradaBusqueda.value);

    listaResultados.innerHTML = '';
    if (resultados.length === 0) {
      listaResultados.innerHTML = '<li class="sin-resultados">No hay lugares que coincidan.</li>';
    } else {
      resultados.forEach((lugar) => listaResultados.appendChild(crearFilaLugar(lugar, seleccionarLugar)));
    }

    const resumen = generarResumenBusqueda(resultados);
    contadorElemento.textContent = resultados.length
      ? `${resumen.total} lugar(es) · rating promedio ${resumen.ratingPromedio}`
      : '0 lugares encontrados';
  }

  entradaBusqueda.addEventListener('input', renderizarResultados);
  mostrarDetalleEnDOM(detalleElemento, null);
  renderizarResultados();
}

// ---------------------------------------------------------------------------
// Ejecucion por consola (node maria-montepeque.js) con al menos dos casos de prueba
// ---------------------------------------------------------------------------

function resolverEjercicio() {
  console.log('=== 75. Lista turistica interactiva ===');
  mostrarResultadosEnConsola('Catalogo completo, ordenado por rating', ordenarPorRating(LUGARES_TURISTICOS));

  // Caso 1: busqueda valida por ciudad y por categoria.
  const caso1Ciudad = buscarYOrdenar(LUGARES_TURISTICOS, 'Cartagena');
  mostrarResultadosEnConsola('Caso 1 - busqueda por ciudad "Cartagena"', caso1Ciudad);

  const caso1Categoria = buscarYOrdenar(LUGARES_TURISTICOS, 'naturaleza');
  mostrarResultadosEnConsola('Caso 1 - busqueda por categoria "naturaleza"', caso1Categoria);

  // Caso 2: busqueda sin resultados y detalle de un id que no existe.
  const caso2SinResultados = buscarYOrdenar(LUGARES_TURISTICOS, 'antartida');
  mostrarResultadosEnConsola('Caso 2 - busqueda sin resultados "antartida"', caso2SinResultados);

  const detalleInvalido = obtenerDetalleLugar(LUGARES_TURISTICOS, 999);
  console.log('\nCaso 2 - detalle de id inexistente:', detalleInvalido.encontrado ? detalleInvalido.lugar : detalleInvalido.motivo);

  const detalleValido = obtenerDetalleLugar(LUGARES_TURISTICOS, 6);
  console.log('Caso 2 - detalle de id valido (6):', detalleValido.lugar);

  return { caso1Ciudad, caso1Categoria, caso2SinResultados };
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', iniciarAplicacionDOM);
} else {
  resolverEjercicio();
}
