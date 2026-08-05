// 73. Tienda de ropa con filtros
// Resolucion: maria-montepeque
//
// Idea: catalogo fijo de productos + filtros combinables (categoria, talla, color, precio
// maximo y orden por precio). Cada filtro se valida/normaliza antes de aplicarse, y el
// filtrado se hace con una unica funcion `filter` que combina todas las condiciones.
// El mismo archivo corre con `node maria-montepeque.js` (casos de prueba por consola)
// y en el navegador (maria-montepeque.html) como una tienda con filtros reales.

const PRODUCTOS_TIENDA = [
  { id: 1, nombre: 'Camiseta basica', categoria: 'camisetas', talla: 'M', color: 'blanco', precio: 35000 },
  { id: 2, nombre: 'Camiseta estampada', categoria: 'camisetas', talla: 'L', color: 'negro', precio: 42000 },
  { id: 3, nombre: 'Pantalon jean', categoria: 'pantalones', talla: 'M', color: 'azul', precio: 89000 },
  { id: 4, nombre: 'Pantalon jogger', categoria: 'pantalones', talla: 'S', color: 'negro', precio: 75000 },
  { id: 5, nombre: 'Chaqueta impermeable', categoria: 'chaquetas', talla: 'L', color: 'verde', precio: 150000 },
  { id: 6, nombre: 'Chaqueta de jean', categoria: 'chaquetas', talla: 'M', color: 'azul', precio: 120000 },
  { id: 7, nombre: 'Vestido casual', categoria: 'vestidos', talla: 'S', color: 'rojo', precio: 98000 },
  { id: 8, nombre: 'Vestido de fiesta', categoria: 'vestidos', talla: 'M', color: 'negro', precio: 180000 }
];

const ORDENES_VALIDOS = ['ninguno', 'asc', 'desc'];

// ---------------------------------------------------------------------------
// Filtros: valores por defecto, normalizacion y coincidencia
// ---------------------------------------------------------------------------

function crearFiltrosPorDefecto() {
  return { categoria: 'todas', talla: 'todas', color: 'todos', precioMaximo: Infinity, orden: 'ninguno' };
}

function normalizarFiltros(filtrosParciales = {}) {
  const base = crearFiltrosPorDefecto();
  const precioMaximo = Number(filtrosParciales.precioMaximo);

  return {
    categoria: filtrosParciales.categoria || base.categoria,
    talla: filtrosParciales.talla || base.talla,
    color: filtrosParciales.color || base.color,
    precioMaximo: Number.isFinite(precioMaximo) && precioMaximo > 0 ? precioMaximo : base.precioMaximo,
    orden: ORDENES_VALIDOS.includes(filtrosParciales.orden) ? filtrosParciales.orden : base.orden
  };
}

function coincideConFiltros(producto, filtros) {
  return (
    (filtros.categoria === 'todas' || producto.categoria === filtros.categoria) &&
    (filtros.talla === 'todas' || producto.talla === filtros.talla) &&
    (filtros.color === 'todos' || producto.color === filtros.color) &&
    producto.precio <= filtros.precioMaximo
  );
}

// ---------------------------------------------------------------------------
// Filtrado, orden y resumen (reto extra: orden por precio + resumen estadistico)
// ---------------------------------------------------------------------------

function ordenarPorPrecio(productos, orden) {
  if (orden === 'ninguno') return productos;
  return [...productos].sort((a, b) => (orden === 'asc' ? a.precio - b.precio : b.precio - a.precio));
}

function aplicarFiltros(productos, filtrosParciales) {
  const filtros = normalizarFiltros(filtrosParciales);
  const resultados = productos.filter((producto) => coincideConFiltros(producto, filtros));
  return ordenarPorPrecio(resultados, filtros.orden);
}

function generarResumenPrecios(productos) {
  if (productos.length === 0) return { minimo: 0, maximo: 0, promedio: 0 };
  const precios = productos.map((producto) => producto.precio);
  const total = precios.reduce((acumulado, precio) => acumulado + precio, 0);
  return { minimo: Math.min(...precios), maximo: Math.max(...precios), promedio: Math.round(total / precios.length) };
}

// ---------------------------------------------------------------------------
// Salida por consola
// ---------------------------------------------------------------------------

function mostrarResultadosEnConsola(etiqueta, productos) {
  console.log(`\n${etiqueta} (${productos.length} resultado(s)):`);
  if (productos.length === 0) {
    console.log('Sin resultados para estos filtros.');
    return;
  }
  console.table(productos);
  console.log('Resumen de precios:', generarResumenPrecios(productos));
}

// ---------------------------------------------------------------------------
// Interfaz en el DOM
// ---------------------------------------------------------------------------

function crearTarjetaProducto(producto) {
  const tarjeta = document.createElement('article');
  tarjeta.className = 'producto';
  tarjeta.innerHTML = `
    <h3>${producto.nombre}</h3>
    <p>${producto.categoria} · talla ${producto.talla} · ${producto.color}</p>
    <p class="precio">$${producto.precio.toLocaleString('es-CO')}</p>
  `;
  return tarjeta;
}

function leerFiltrosDelFormulario(formulario) {
  const datos = new FormData(formulario);
  return {
    categoria: datos.get('categoria'),
    talla: datos.get('talla'),
    color: datos.get('color'),
    precioMaximo: datos.get('precioMaximo'),
    orden: datos.get('orden')
  };
}

function iniciarAplicacionDOM() {
  const formulario = document.querySelector('#formulario-filtros');
  const listaProductos = document.querySelector('#lista-productos');
  const contadorElemento = document.querySelector('#contador-resultados');
  const resumenElemento = document.querySelector('#resumen-precios');

  if (!formulario || !listaProductos || !contadorElemento || !resumenElemento) return;

  function renderizarResultados() {
    const resultados = aplicarFiltros(PRODUCTOS_TIENDA, leerFiltrosDelFormulario(formulario));

    listaProductos.innerHTML = '';
    if (resultados.length === 0) {
      listaProductos.innerHTML = '<p class="sin-resultados">No hay productos con estos filtros.</p>';
    } else {
      resultados.forEach((producto) => listaProductos.appendChild(crearTarjetaProducto(producto)));
    }

    contadorElemento.textContent = `${resultados.length} producto(s) encontrado(s)`;
    const resumen = generarResumenPrecios(resultados);
    resumenElemento.textContent = resultados.length
      ? `Precio minimo: $${resumen.minimo.toLocaleString('es-CO')} · maximo: $${resumen.maximo.toLocaleString('es-CO')} · promedio: $${resumen.promedio.toLocaleString('es-CO')}`
      : '';
  }

  formulario.addEventListener('input', renderizarResultados);
  formulario.addEventListener('submit', (evento) => evento.preventDefault());
  renderizarResultados();
}

// ---------------------------------------------------------------------------
// Ejecucion por consola (node maria-montepeque.js) con al menos dos casos de prueba
// ---------------------------------------------------------------------------

function resolverEjercicio() {
  console.log('=== 73. Tienda de ropa con filtros ===');
  mostrarResultadosEnConsola('Catalogo completo', PRODUCTOS_TIENDA);

  // Caso 1: filtro combinado valido con orden por precio.
  const caso1 = aplicarFiltros(PRODUCTOS_TIENDA, { categoria: 'chaquetas', precioMaximo: 200000, orden: 'asc' });
  mostrarResultadosEnConsola('Caso 1 - chaquetas hasta $200.000, orden ascendente', caso1);

  // Caso 2: casos limite - combinacion sin resultados y filtros parciales/invalidos.
  const caso2SinResultados = aplicarFiltros(PRODUCTOS_TIENDA, { categoria: 'camisetas', talla: 'XL' });
  mostrarResultadosEnConsola('Caso 2 - camisetas talla XL (no existe combinacion)', caso2SinResultados);

  const caso2FiltrosInvalidos = aplicarFiltros(PRODUCTOS_TIENDA, { precioMaximo: -50, orden: 'lateral' });
  mostrarResultadosEnConsola('Caso 2 - precioMaximo negativo y orden invalido (se ignoran)', caso2FiltrosInvalidos);

  return { caso1, caso2SinResultados, caso2FiltrosInvalidos };
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', iniciarAplicacionDOM);
} else {
  resolverEjercicio();
}
