// 80. Cotizador arquitectura 3D
// Resolucion: maria-montepeque
//
// Idea: el precio final se arma en pasos pequenos y encadenados (precio base por m2, costo de
// vistas adicionales, multiplicador de calidad, recargo por urgencia y descuento por proyecto
// grande), cada uno en su propia funcion para poder leer y probar el calculo paso a paso.
// El mismo archivo corre con `node maria-montepeque.js` (casos de prueba por consola)
// y en el navegador (maria-montepeque.html) como un formulario de cotizacion real.

const PRECIO_POR_M2 = 8000;
const PRECIO_POR_VISTA_ADICIONAL = 150000;
const MULTIPLICADOR_CALIDAD = { estandar: 1, premium: 1.4, ultra: 1.8 };
const RECARGO_URGENCIA = { normal: 0, urgente: 0.25, express: 0.5 };
const M2_PARA_DESCUENTO = 200;
const PORCENTAJE_DESCUENTO_GRANDE = 0.1;

// ---------------------------------------------------------------------------
// Validacion de los datos del formulario
// ---------------------------------------------------------------------------

function validarDatosCotizacion(datos) {
  if (!datos || typeof datos !== 'object') {
    return { valido: false, motivo: 'Los datos de la cotizacion no son validos.' };
  }
  if (!Number.isFinite(Number(datos.m2)) || Number(datos.m2) <= 0) {
    return { valido: false, motivo: 'Los metros cuadrados deben ser un numero mayor a 0.' };
  }
  if (!Number.isInteger(Number(datos.vistas)) || Number(datos.vistas) < 1) {
    return { valido: false, motivo: 'Las vistas deben ser un numero entero de al menos 1.' };
  }
  if (!MULTIPLICADOR_CALIDAD[datos.calidad]) {
    return { valido: false, motivo: `Calidad invalida: "${datos.calidad}". Usa ${Object.keys(MULTIPLICADOR_CALIDAD).join(', ')}.` };
  }
  if (!(datos.urgencia in RECARGO_URGENCIA)) {
    return { valido: false, motivo: `Urgencia invalida: "${datos.urgencia}". Usa ${Object.keys(RECARGO_URGENCIA).join(', ')}.` };
  }
  return { valido: true };
}

// ---------------------------------------------------------------------------
// Pasos del calculo (cada uno pequeno y encadenable)
// ---------------------------------------------------------------------------

function calcularPrecioBase(m2) {
  return Number(m2) * PRECIO_POR_M2;
}

function calcularCostoVistas(vistas) {
  const vistasAdicionales = Math.max(Number(vistas) - 1, 0);
  return vistasAdicionales * PRECIO_POR_VISTA_ADICIONAL;
}

function aplicarMultiplicadorCalidad(subtotal, calidad) {
  return subtotal * MULTIPLICADOR_CALIDAD[calidad];
}

function calcularRecargoUrgencia(subtotal, urgencia) {
  return subtotal * RECARGO_URGENCIA[urgencia];
}

// Reto extra: descuento automatico para proyectos grandes.
function calcularDescuentoPorTamano(m2, total) {
  return Number(m2) >= M2_PARA_DESCUENTO ? Math.round(total * PORCENTAJE_DESCUENTO_GRANDE) : 0;
}

// ---------------------------------------------------------------------------
// Cotizacion completa (encadena todos los pasos)
// ---------------------------------------------------------------------------

function generarCotizacion(datos) {
  const validacion = validarDatosCotizacion(datos);
  if (!validacion.valido) {
    return { exito: false, motivo: validacion.motivo };
  }

  const precioBase = calcularPrecioBase(datos.m2);
  const costoVistas = calcularCostoVistas(datos.vistas);
  const subtotal = precioBase + costoVistas;
  const subtotalConCalidad = aplicarMultiplicadorCalidad(subtotal, datos.calidad);
  const recargoUrgencia = calcularRecargoUrgencia(subtotalConCalidad, datos.urgencia);
  const totalAntesDeDescuento = subtotalConCalidad + recargoUrgencia;
  const descuento = calcularDescuentoPorTamano(datos.m2, totalAntesDeDescuento);
  const total = Math.round(totalAntesDeDescuento - descuento);

  return {
    exito: true,
    detalle: { precioBase, costoVistas, subtotal, subtotalConCalidad, recargoUrgencia, descuento, total }
  };
}

// ---------------------------------------------------------------------------
// Salida por consola
// ---------------------------------------------------------------------------

function formatearMoneda(valor) {
  return `$${Math.round(valor).toLocaleString('es-CO')}`;
}

function mostrarCotizacionEnConsola(etiqueta, datos, resultado) {
  console.log(`\n${etiqueta}`);
  console.log('Datos:', datos);
  if (!resultado.exito) {
    console.log('Rechazada:', resultado.motivo);
    return;
  }
  const { precioBase, costoVistas, subtotalConCalidad, recargoUrgencia, descuento, total } = resultado.detalle;
  console.log(`Precio base (m2): ${formatearMoneda(precioBase)}`);
  console.log(`Costo vistas adicionales: ${formatearMoneda(costoVistas)}`);
  console.log(`Subtotal con calidad aplicada: ${formatearMoneda(subtotalConCalidad)}`);
  console.log(`Recargo por urgencia: ${formatearMoneda(recargoUrgencia)}`);
  console.log(`Descuento por proyecto grande: ${formatearMoneda(descuento)}`);
  console.log(`TOTAL: ${formatearMoneda(total)}`);
}

// ---------------------------------------------------------------------------
// Interfaz en el DOM
// ---------------------------------------------------------------------------

function mostrarResumenEnDOM(contenedor, resultado) {
  if (!resultado.exito) {
    contenedor.innerHTML = `<p class="error">${resultado.motivo}</p>`;
    return;
  }
  const { precioBase, costoVistas, subtotalConCalidad, recargoUrgencia, descuento, total } = resultado.detalle;
  contenedor.innerHTML = `
    <ul>
      <li>Precio base (m2): ${formatearMoneda(precioBase)}</li>
      <li>Costo vistas adicionales: ${formatearMoneda(costoVistas)}</li>
      <li>Subtotal con calidad: ${formatearMoneda(subtotalConCalidad)}</li>
      <li>Recargo por urgencia: ${formatearMoneda(recargoUrgencia)}</li>
      <li>Descuento por proyecto grande: -${formatearMoneda(descuento)}</li>
    </ul>
    <p class="total">TOTAL: ${formatearMoneda(total)}</p>
  `;
}

function iniciarAplicacionDOM() {
  const formulario = document.querySelector('#formulario-cotizacion');
  const resumenElemento = document.querySelector('#resumen-cotizacion');

  if (!formulario || !resumenElemento) return;

  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const datosFormulario = new FormData(formulario);
    const resultado = generarCotizacion({
      m2: datosFormulario.get('m2'),
      vistas: datosFormulario.get('vistas'),
      calidad: datosFormulario.get('calidad'),
      urgencia: datosFormulario.get('urgencia')
    });
    mostrarResumenEnDOM(resumenElemento, resultado);
  });
}

// ---------------------------------------------------------------------------
// Ejecucion por consola (node maria-montepeque.js) con al menos dos casos de prueba
// ---------------------------------------------------------------------------

function resolverEjercicio() {
  console.log('=== 80. Cotizador arquitectura 3D ===');

  // Caso 1: proyecto normal y proyecto grande con descuento.
  const proyectoNormal = { m2: 80, vistas: 2, calidad: 'premium', urgencia: 'normal' };
  mostrarCotizacionEnConsola('Caso 1 - proyecto normal', proyectoNormal, generarCotizacion(proyectoNormal));

  const proyectoGrande = { m2: 250, vistas: 3, calidad: 'ultra', urgencia: 'urgente' };
  mostrarCotizacionEnConsola('Caso 1 - proyecto grande (aplica descuento)', proyectoGrande, generarCotizacion(proyectoGrande));

  // Caso 2: casos limite y validaciones - m2 invalido, vistas invalidas,
  // calidad invalida y urgencia invalida.
  console.log('\nCaso 2 - validaciones y casos limite:');
  mostrarCotizacionEnConsola(
    'm2 en 0 (invalido)',
    { m2: 0, vistas: 1, calidad: 'estandar', urgencia: 'normal' },
    generarCotizacion({ m2: 0, vistas: 1, calidad: 'estandar', urgencia: 'normal' })
  );
  mostrarCotizacionEnConsola(
    'vistas decimales (invalido)',
    { m2: 50, vistas: 1.5, calidad: 'estandar', urgencia: 'normal' },
    generarCotizacion({ m2: 50, vistas: 1.5, calidad: 'estandar', urgencia: 'normal' })
  );
  mostrarCotizacionEnConsola(
    'calidad invalida',
    { m2: 50, vistas: 1, calidad: 'lujo', urgencia: 'normal' },
    generarCotizacion({ m2: 50, vistas: 1, calidad: 'lujo', urgencia: 'normal' })
  );
  mostrarCotizacionEnConsola(
    'urgencia invalida',
    { m2: 50, vistas: 1, calidad: 'estandar', urgencia: 'ya-mismo' },
    generarCotizacion({ m2: 50, vistas: 1, calidad: 'estandar', urgencia: 'ya-mismo' })
  );

  return { proyectoNormal: generarCotizacion(proyectoNormal), proyectoGrande: generarCotizacion(proyectoGrande) };
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', iniciarAplicacionDOM);
} else {
  resolverEjercicio();
}
