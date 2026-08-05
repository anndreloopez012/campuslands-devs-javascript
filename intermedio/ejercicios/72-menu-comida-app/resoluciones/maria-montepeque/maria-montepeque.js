// 72. Menu interactivo comida
// Resolucion: maria-montepeque
//
// Idea de la solucion:
// 1. Un menu fijo de productos (id, nombre, categoria, precio) y un carrito que es un array
//    de items { id, nombre, categoria, precio, cantidad }, siempre tratado de forma inmutable.
// 2. Funciones pequenas para agregar, actualizar cantidad, eliminar y calcular totales con reduce.
// 3. El mismo archivo funciona con `node maria-montepeque.js` (corre casos de prueba por consola)
//    y en el navegador (si se abre maria-montepeque.html) como un carrito interactivo real.

// ---------------------------------------------------------------------------
// 1. Menu de productos
// ---------------------------------------------------------------------------

const MENU_PRODUCTOS = [
  { id: 1, nombre: 'Hamburguesa clasica', categoria: 'platos fuertes', precio: 22000 },
  { id: 2, nombre: 'Pizza margarita', categoria: 'platos fuertes', precio: 35000 },
  { id: 3, nombre: 'Papas fritas', categoria: 'acompanamientos', precio: 12000 },
  { id: 4, nombre: 'Gaseosa', categoria: 'bebidas', precio: 6000 },
  { id: 5, nombre: 'Limonada natural', categoria: 'bebidas', precio: 7000 },
  { id: 6, nombre: 'Brownie', categoria: 'postres', precio: 10000 }
];

const UMBRAL_DESCUENTO = 80000;
const PORCENTAJE_DESCUENTO = 0.05;

// ---------------------------------------------------------------------------
// 2. Consultas sobre el menu y el carrito
// ---------------------------------------------------------------------------

function obtenerProductoPorId(idProducto) {
  return MENU_PRODUCTOS.find((producto) => producto.id === idProducto);
}

function encontrarItemCarrito(carrito, idProducto) {
  return carrito.find((item) => item.id === idProducto);
}

// ---------------------------------------------------------------------------
// 3. Validaciones
// ---------------------------------------------------------------------------

function validarCantidad(cantidad) {
  const numero = Number(cantidad);
  if (!Number.isInteger(numero)) {
    return { valido: false, motivo: 'La cantidad debe ser un numero entero.' };
  }
  return { valido: true, numero };
}

// ---------------------------------------------------------------------------
// 4. Operaciones del carrito (inmutables: siempre devuelven un carrito nuevo)
// ---------------------------------------------------------------------------

function agregarAlCarrito(carrito, idProducto, cantidad = 1) {
  const producto = obtenerProductoPorId(idProducto);
  if (!producto) {
    return { exito: false, motivo: `No existe un producto con id ${idProducto}.`, carrito };
  }

  const validacion = validarCantidad(cantidad);
  if (!validacion.valido || validacion.numero <= 0) {
    return { exito: false, motivo: validacion.motivo ?? 'La cantidad debe ser mayor a 0.', carrito };
  }

  const itemExistente = encontrarItemCarrito(carrito, idProducto);
  const carritoActualizado = itemExistente
    ? carrito.map((item) =>
        item.id === idProducto ? { ...item, cantidad: item.cantidad + validacion.numero } : item
      )
    : [
        ...carrito,
        {
          id: producto.id,
          nombre: producto.nombre,
          categoria: producto.categoria,
          precio: producto.precio,
          cantidad: validacion.numero
        }
      ];

  return { exito: true, carrito: carritoActualizado };
}

function actualizarCantidadCarrito(carrito, idProducto, nuevaCantidad) {
  if (!encontrarItemCarrito(carrito, idProducto)) {
    return { exito: false, motivo: `El producto con id ${idProducto} no esta en el carrito.`, carrito };
  }

  const validacion = validarCantidad(nuevaCantidad);
  if (!validacion.valido) {
    return { exito: false, motivo: validacion.motivo, carrito };
  }

  if (validacion.numero <= 0) {
    const carritoActualizado = carrito.filter((item) => item.id !== idProducto);
    return { exito: true, carrito: carritoActualizado, eliminado: true };
  }

  const carritoActualizado = carrito.map((item) =>
    item.id === idProducto ? { ...item, cantidad: validacion.numero } : item
  );
  return { exito: true, carrito: carritoActualizado };
}

function eliminarDelCarrito(carrito, idProducto) {
  if (!encontrarItemCarrito(carrito, idProducto)) {
    return { exito: false, motivo: `El producto con id ${idProducto} no esta en el carrito.`, carrito };
  }
  return { exito: true, carrito: carrito.filter((item) => item.id !== idProducto) };
}

// ---------------------------------------------------------------------------
// 5. Calculos con reduce
// ---------------------------------------------------------------------------

function calcularSubtotalItem(item) {
  return item.precio * item.cantidad;
}

function calcularTotalCarrito(carrito) {
  return carrito.reduce((acumulado, item) => acumulado + calcularSubtotalItem(item), 0);
}

function calcularCantidadTotalItems(carrito) {
  return carrito.reduce((acumulado, item) => acumulado + item.cantidad, 0);
}

// Reto extra: descuento automatico por monto alto + resumen de gasto por categoria.
function calcularDescuentoPorMonto(subtotal) {
  return subtotal >= UMBRAL_DESCUENTO ? PORCENTAJE_DESCUENTO : 0;
}

function generarResumenPorCategoria(carrito) {
  return carrito.reduce((resumen, item) => {
    resumen[item.categoria] = (resumen[item.categoria] ?? 0) + calcularSubtotalItem(item);
    return resumen;
  }, {});
}

function generarFacturaCarrito(carrito) {
  const subtotal = calcularTotalCarrito(carrito);
  const descuento = calcularDescuentoPorMonto(subtotal);
  const total = Math.round(subtotal - subtotal * descuento);

  return {
    cantidadItems: calcularCantidadTotalItems(carrito),
    subtotal,
    descuento,
    total,
    porCategoria: generarResumenPorCategoria(carrito)
  };
}

// ---------------------------------------------------------------------------
// 6. Renderizado en consola
// ---------------------------------------------------------------------------

function mostrarTablaEnConsola(etiqueta, filas) {
  console.log(`\n${etiqueta}`);
  if (filas.length === 0) {
    console.log('(sin datos)');
    return;
  }
  if (typeof console.table === 'function') {
    console.table(filas);
  } else {
    filas.forEach((fila) => console.log(fila));
  }
}

function renderizarCarritoEnConsola(carrito) {
  const filas = carrito.map((item) => ({ ...item, subtotal: calcularSubtotalItem(item) }));
  mostrarTablaEnConsola('Carrito actual:', filas);
}

// ---------------------------------------------------------------------------
// 7. Interfaz en el DOM
// ---------------------------------------------------------------------------

function crearTarjetaProducto(producto, onAgregar) {
  const tarjeta = document.createElement('article');
  tarjeta.className = 'producto';

  const nombre = document.createElement('h3');
  nombre.textContent = producto.nombre;

  const detalle = document.createElement('p');
  detalle.textContent = `${producto.categoria} · $${producto.precio.toLocaleString('es-CO')}`;

  const botonAgregar = document.createElement('button');
  botonAgregar.type = 'button';
  botonAgregar.textContent = 'Agregar al carrito';
  botonAgregar.addEventListener('click', () => onAgregar(producto.id));

  tarjeta.append(nombre, detalle, botonAgregar);
  return tarjeta;
}

function crearFilaCarrito(item, onCambiarCantidad, onEliminar) {
  const fila = document.createElement('li');
  fila.className = 'item-carrito';

  const nombre = document.createElement('span');
  nombre.textContent = item.nombre;

  const botonMenos = document.createElement('button');
  botonMenos.type = 'button';
  botonMenos.textContent = '-';
  botonMenos.addEventListener('click', () => onCambiarCantidad(item.id, item.cantidad - 1));

  const cantidad = document.createElement('span');
  cantidad.textContent = item.cantidad;

  const botonMas = document.createElement('button');
  botonMas.type = 'button';
  botonMas.textContent = '+';
  botonMas.addEventListener('click', () => onCambiarCantidad(item.id, item.cantidad + 1));

  const subtotal = document.createElement('span');
  subtotal.textContent = `$${calcularSubtotalItem(item).toLocaleString('es-CO')}`;

  const botonEliminar = document.createElement('button');
  botonEliminar.type = 'button';
  botonEliminar.textContent = 'Eliminar';
  botonEliminar.addEventListener('click', () => onEliminar(item.id));

  fila.append(nombre, botonMenos, cantidad, botonMas, subtotal, botonEliminar);
  return fila;
}

function iniciarAplicacionDOM() {
  const listaMenu = document.querySelector('#lista-menu');
  const listaCarrito = document.querySelector('#lista-carrito');
  const resumenElemento = document.querySelector('#resumen-carrito');
  const mensajeElemento = document.querySelector('#mensaje-estado');

  if (!listaMenu || !listaCarrito || !resumenElemento || !mensajeElemento) return;

  let carritoActual = [];

  function actualizarResumen() {
    const factura = generarFacturaCarrito(carritoActual);
    resumenElemento.textContent =
      `Items: ${factura.cantidadItems} | Subtotal: $${factura.subtotal.toLocaleString('es-CO')} | ` +
      `Descuento: ${factura.descuento * 100}% | Total: $${factura.total.toLocaleString('es-CO')}`;
  }

  function renderizarCarrito() {
    listaCarrito.innerHTML = '';
    if (carritoActual.length === 0) {
      const vacio = document.createElement('li');
      vacio.textContent = 'El carrito esta vacio.';
      listaCarrito.appendChild(vacio);
    } else {
      carritoActual.forEach((item) => {
        listaCarrito.appendChild(crearFilaCarrito(item, manejarCambioCantidad, manejarEliminar));
      });
    }
    actualizarResumen();
  }

  function manejarAgregar(idProducto) {
    const resultado = agregarAlCarrito(carritoActual, idProducto, 1);
    if (!resultado.exito) {
      mensajeElemento.textContent = resultado.motivo;
      mensajeElemento.className = 'mensaje error';
      return;
    }
    carritoActual = resultado.carrito;
    mensajeElemento.textContent = '';
    mensajeElemento.className = 'mensaje';
    renderizarCarrito();
  }

  function manejarCambioCantidad(idProducto, nuevaCantidad) {
    const resultado = actualizarCantidadCarrito(carritoActual, idProducto, nuevaCantidad);
    if (!resultado.exito) {
      mensajeElemento.textContent = resultado.motivo;
      mensajeElemento.className = 'mensaje error';
      return;
    }
    carritoActual = resultado.carrito;
    renderizarCarrito();
  }

  function manejarEliminar(idProducto) {
    const resultado = eliminarDelCarrito(carritoActual, idProducto);
    if (!resultado.exito) {
      mensajeElemento.textContent = resultado.motivo;
      mensajeElemento.className = 'mensaje error';
      return;
    }
    carritoActual = resultado.carrito;
    renderizarCarrito();
  }

  MENU_PRODUCTOS.forEach((producto) => {
    listaMenu.appendChild(crearTarjetaProducto(producto, manejarAgregar));
  });

  renderizarCarrito();
}

// ---------------------------------------------------------------------------
// 8. Ejecucion por consola (node maria-montepeque.js) con al menos dos casos de prueba
// ---------------------------------------------------------------------------

function resolverEjercicio() {
  console.log('=== 72. Menu interactivo comida ===');
  mostrarTablaEnConsola('Menu disponible:', MENU_PRODUCTOS);

  // Caso 1: flujo normal - agregar productos validos, subir cantidad, ver total y descuento.
  console.log('\nCaso 1 - flujo normal de compra:');
  let carrito = [];
  carrito = agregarAlCarrito(carrito, 1, 2).carrito; // 2 hamburguesas
  carrito = agregarAlCarrito(carrito, 2, 1).carrito; // 1 pizza
  carrito = agregarAlCarrito(carrito, 4, 2).carrito; // 2 gaseosas
  const resultadoActualizar = actualizarCantidadCarrito(carrito, 4, 3); // sube gaseosas a 3
  carrito = resultadoActualizar.carrito;

  renderizarCarritoEnConsola(carrito);
  console.log('Factura:', generarFacturaCarrito(carrito));

  // Caso 2: casos limite y errores - producto inexistente, cantidad invalida, eliminar item
  // que no esta en el carrito, y bajar la cantidad a 0 (debe eliminar el item).
  console.log('\nCaso 2 - validaciones y casos limite:');
  const productoInexistente = agregarAlCarrito(carrito, 999, 1);
  console.log('Agregar producto inexistente:', productoInexistente.exito ? 'agregado' : productoInexistente.motivo);

  const cantidadInvalida = agregarAlCarrito(carrito, 3, -2);
  console.log('Agregar cantidad negativa:', cantidadInvalida.exito ? 'agregado' : cantidadInvalida.motivo);

  const eliminarInexistente = eliminarDelCarrito(carrito, 5);
  console.log('Eliminar producto que no esta en el carrito:', eliminarInexistente.exito ? 'ok' : eliminarInexistente.motivo);

  const bajarACero = actualizarCantidadCarrito(carrito, 1, 0);
  console.log('Bajar cantidad de hamburguesas a 0:', bajarACero.eliminado ? 'item eliminado del carrito' : 'sin cambios');
  carrito = bajarACero.carrito;

  renderizarCarritoEnConsola(carrito);
  console.log('Factura final:', generarFacturaCarrito(carrito));

  return { carritoFinal: carrito };
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', iniciarAplicacionDOM);
} else {
  resolverEjercicio();
}
