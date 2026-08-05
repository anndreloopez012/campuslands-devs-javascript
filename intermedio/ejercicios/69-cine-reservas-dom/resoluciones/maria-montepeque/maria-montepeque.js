// 69. Reservas de cine DOM
// Resolucion: maria-montepeque
//
// Idea de la solucion:
// 1. Se genera una matriz (array de filas, cada fila un array de asientos) para representar la sala.
// 2. Se separan en funciones pequenas: crear matriz, buscar, validar, seleccionar, calcular precio,
//    confirmar reserva y renderizar (en consola y, opcionalmente, en el DOM).
// 3. El mismo archivo funciona con `node maria-montepeque.js` (muestra todo por consola)
//    y tambien en el navegador (si se abre maria-montepeque.html) permitiendo click en los asientos.

// ---------------------------------------------------------------------------
// 1. Datos y configuracion de la sala
// ---------------------------------------------------------------------------

const CONFIG_SALA = {
  filas: ['A', 'B', 'C', 'D'],
  columnasPorFila: 8,
  categoriaPorFila: { A: 'vip', B: 'vip', C: 'general', D: 'general' },
  precios: { vip: 25000, general: 18000 }
};

// Asientos ya vendidos antes de que el cliente entre a elegir (datos fijos para poder probar siempre igual).
const ASIENTOS_OCUPADOS_INICIAL = ['A3', 'A4', 'B7', 'C1', 'C2', 'D8'];

// ---------------------------------------------------------------------------
// 2. Construccion de la matriz de asientos
// ---------------------------------------------------------------------------

function crearMatrizAsientos(config = CONFIG_SALA, ocupadosIniciales = ASIENTOS_OCUPADOS_INICIAL) {
  return config.filas.map((fila) => {
    const categoria = config.categoriaPorFila[fila] ?? 'general';
    const precio = config.precios[categoria] ?? config.precios.general;

    return Array.from({ length: config.columnasPorFila }, (_valor, indice) => {
      const numero = indice + 1;
      const id = `${fila}${numero}`;
      return {
        id,
        fila,
        numero,
        categoria,
        precio,
        ocupado: ocupadosIniciales.includes(id)
      };
    });
  });
}

// ---------------------------------------------------------------------------
// 3. Consultas sobre la matriz
// ---------------------------------------------------------------------------

function obtenerAsientoPorId(matriz, id) {
  return matriz.flat().find((asiento) => asiento.id === id);
}

function obtenerAsientosDisponibles(matriz) {
  return matriz.flat().filter((asiento) => !asiento.ocupado);
}

function generarResumenSala(matriz) {
  const todos = matriz.flat();
  const disponibles = todos.filter((asiento) => !asiento.ocupado);
  const disponiblesPorCategoria = disponibles.reduce((acumulado, asiento) => {
    acumulado[asiento.categoria] = (acumulado[asiento.categoria] ?? 0) + 1;
    return acumulado;
  }, {});

  return {
    totalAsientos: todos.length,
    disponibles: disponibles.length,
    ocupados: todos.length - disponibles.length,
    disponiblesPorCategoria
  };
}

// ---------------------------------------------------------------------------
// 4. Validaciones y seleccion
// ---------------------------------------------------------------------------

function validarIdsSeleccionados(ids) {
  if (!Array.isArray(ids) || ids.length === 0) {
    return { valido: false, motivo: 'Debes indicar al menos un asiento.' };
  }

  const idsUnicos = new Set(ids);
  if (idsUnicos.size !== ids.length) {
    return { valido: false, motivo: 'Hay asientos repetidos en la seleccion.' };
  }

  return { valido: true };
}

function seleccionarAsientos(matriz, idsDeseados) {
  const validacion = validarIdsSeleccionados(idsDeseados);
  if (!validacion.valido) {
    return { seleccionados: [], errores: [validacion.motivo] };
  }

  const seleccionados = [];
  const errores = [];

  idsDeseados.forEach((id) => {
    const asiento = obtenerAsientoPorId(matriz, id);
    if (!asiento) {
      errores.push(`El asiento ${id} no existe en la sala.`);
      return;
    }
    if (asiento.ocupado) {
      errores.push(`El asiento ${id} ya esta ocupado.`);
      return;
    }
    seleccionados.push(asiento);
  });

  return { seleccionados, errores };
}

// ---------------------------------------------------------------------------
// 5. Calculo de precio (reto extra: descuento por grupo grande)
// ---------------------------------------------------------------------------

function calcularDescuentoPorGrupo(seleccionados) {
  return seleccionados.length >= 4 ? 0.1 : 0;
}

function calcularPrecioTotal(seleccionados) {
  const subtotal = seleccionados.reduce((acumulado, asiento) => acumulado + asiento.precio, 0);
  const descuento = calcularDescuentoPorGrupo(seleccionados);
  const total = Math.round(subtotal - subtotal * descuento);

  return { subtotal, descuento, total };
}

// ---------------------------------------------------------------------------
// 6. Confirmar reserva (no muta la matriz original)
// ---------------------------------------------------------------------------

function confirmarReserva(matriz, seleccionados) {
  const idsConfirmados = new Set(seleccionados.map((asiento) => asiento.id));

  return matriz.map((fila) =>
    fila.map((asiento) => (idsConfirmados.has(asiento.id) ? { ...asiento, ocupado: true } : { ...asiento }))
  );
}

function procesarReserva(matriz, idsDeseados) {
  const { seleccionados, errores } = seleccionarAsientos(matriz, idsDeseados);

  if (errores.length > 0 || seleccionados.length === 0) {
    return { exito: false, errores, seleccionados: [], total: null, matrizActualizada: matriz };
  }

  const { subtotal, descuento, total } = calcularPrecioTotal(seleccionados);
  const matrizActualizada = confirmarReserva(matriz, seleccionados);

  return {
    exito: true,
    errores: [],
    seleccionados: seleccionados.map((asiento) => asiento.id),
    subtotal,
    descuentoAplicado: descuento,
    total,
    matrizActualizada
  };
}

// ---------------------------------------------------------------------------
// 7. Renderizado en consola
// ---------------------------------------------------------------------------

function renderizarMatrizEnConsola(matriz) {
  console.log('\nMapa de la sala (O = disponible, X = ocupado):');
  matriz.forEach((fila) => {
    const filaTexto = fila.map((asiento) => (asiento.ocupado ? ' X ' : ' O ')).join('');
    console.log(`${fila[0].fila} | ${filaTexto}`);
  });
}

// ---------------------------------------------------------------------------
// 8. Renderizado en el DOM (solo corre si existe `document`, es decir, en el navegador)
// ---------------------------------------------------------------------------

function renderizarAsientosEnDOM(matriz, contenedor, alSeleccionar) {
  if (typeof document === 'undefined' || !contenedor) return;

  contenedor.innerHTML = '';
  matriz.flat().forEach((asiento) => {
    const boton = document.createElement('button');
    boton.type = 'button';
    boton.textContent = asiento.id;
    boton.className = `asiento ${asiento.categoria} ${asiento.ocupado ? 'ocupado' : 'disponible'}`;
    boton.disabled = asiento.ocupado;
    boton.addEventListener('click', () => alSeleccionar(asiento.id, boton));
    contenedor.appendChild(boton);
  });
}

function iniciarAplicacionDOM() {
  const contenedorAsientos = document.querySelector('#mapa-asientos');
  const totalElemento = document.querySelector('#total-a-pagar');
  const resumenElemento = document.querySelector('#resumen-seleccion');
  const mensajeElemento = document.querySelector('#mensaje-estado');
  const botonReservar = document.querySelector('#boton-reservar');

  if (!contenedorAsientos || !totalElemento || !resumenElemento || !mensajeElemento || !botonReservar) return;

  let matrizActual = crearMatrizAsientos();
  let idsSeleccionados = new Set();

  function actualizarTotales() {
    const seleccionados = matrizActual.flat().filter((asiento) => idsSeleccionados.has(asiento.id));
    const { total, descuento } = calcularPrecioTotal(seleccionados);

    totalElemento.textContent = `Total a pagar: $${total.toLocaleString('es-CO')} (descuento: ${descuento * 100}%)`;
    resumenElemento.textContent = seleccionados.length
      ? `Asientos elegidos: ${seleccionados.map((asiento) => asiento.id).join(', ')}`
      : 'Ningun asiento seleccionado todavia.';
  }

  function alternarSeleccion(id, boton) {
    if (boton.disabled) return;

    if (idsSeleccionados.has(id)) {
      idsSeleccionados.delete(id);
      boton.classList.remove('seleccionado');
    } else {
      idsSeleccionados.add(id);
      boton.classList.add('seleccionado');
    }
    actualizarTotales();
  }

  function dibujarSala() {
    renderizarAsientosEnDOM(matrizActual, contenedorAsientos, alternarSeleccion);
    actualizarTotales();
  }

  botonReservar.addEventListener('click', () => {
    const resultado = procesarReserva(matrizActual, Array.from(idsSeleccionados));

    if (!resultado.exito) {
      mensajeElemento.textContent = resultado.errores.join(' ');
      mensajeElemento.className = 'mensaje error';
      return;
    }

    matrizActual = resultado.matrizActualizada;
    idsSeleccionados = new Set();
    mensajeElemento.textContent = `Reserva confirmada. Total pagado: $${resultado.total.toLocaleString('es-CO')}`;
    mensajeElemento.className = 'mensaje exito';
    dibujarSala();
  });

  dibujarSala();
}

// ---------------------------------------------------------------------------
// 9. Ejecucion por consola (node maria-montepeque.js) con al menos dos casos de prueba
// ---------------------------------------------------------------------------

function mostrarResultadoReserva(etiqueta, resultado) {
  const { matrizActualizada, ...resultadoSinMatriz } = resultado;
  console.log(`\n${etiqueta}:`);
  console.log(resultadoSinMatriz);
}

function resolverEjercicio() {
  const matrizInicial = crearMatrizAsientos();

  console.log('=== 69. Reservas de cine DOM ===');
  renderizarMatrizEnConsola(matrizInicial);
  console.log('\nResumen inicial de la sala:', generarResumenSala(matrizInicial));
  console.log('Asientos disponibles:', obtenerAsientosDisponibles(matrizInicial).length);

  // Caso 1: seleccion valida de varios asientos disponibles.
  const caso1 = procesarReserva(matrizInicial, ['B1', 'B2', 'C5']);
  mostrarResultadoReserva('Caso 1 - seleccion valida (B1, B2, C5)', caso1);

  // Caso 2: seleccion con errores (un asiento ya ocupado y otro que no existe).
  const caso2 = procesarReserva(matrizInicial, ['A3', 'Z9']);
  mostrarResultadoReserva('Caso 2 - seleccion invalida (A3 ocupado, Z9 no existe)', caso2);

  // Caso 3 (reto extra): grupo de 4 boletas sobre la sala ya actualizada, aplica descuento del 10%.
  const matrizTrasCaso1 = caso1.matrizActualizada;
  const caso3 = procesarReserva(matrizTrasCaso1, ['D1', 'D2', 'D3', 'D4']);
  mostrarResultadoReserva('Caso 3 - grupo de 4 boletas con descuento (D1-D4)', caso3);

  console.log('\nResumen de la sala tras las reservas:', generarResumenSala(caso3.matrizActualizada));

  return { matrizInicial, caso1, caso2, caso3 };
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', iniciarAplicacionDOM);
} else {
  resolverEjercicio();
}
