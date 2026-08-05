// 78. Canvas de dibujo basico
// Resolucion: maria-montepeque
//
// Idea: el dibujo se modela como estado puro (color, grosor, lista de trazos, trazo en curso),
// separado por completo de la pintura real en el canvas. Cada trazo es { color, grosor, puntos }.
// Esto permite probar toda la logica (validaciones, agregar puntos, deshacer, limpiar) con
// `node maria-montepeque.js` sin necesitar un canvas real, y en el navegador (maria-montepeque.html)
// esa misma logica se conecta a los eventos del mouse para dibujar de verdad.

const COLOR_POR_DEFECTO = '#1c7ed6';
const GROSOR_POR_DEFECTO = 3;
const GROSOR_MINIMO = 1;
const GROSOR_MAXIMO = 50;
const PATRON_COLOR_HEX = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;

// ---------------------------------------------------------------------------
// Estado del dibujo
// ---------------------------------------------------------------------------

function crearEstadoDibujo() {
  return { color: COLOR_POR_DEFECTO, grosor: GROSOR_POR_DEFECTO, trazos: [], trazoEnCurso: null };
}

function validarColor(color) {
  return typeof color === 'string' && PATRON_COLOR_HEX.test(color);
}

function validarGrosor(grosor) {
  const numero = Number(grosor);
  return Number.isFinite(numero) && numero >= GROSOR_MINIMO && numero <= GROSOR_MAXIMO;
}

function validarPunto(punto) {
  return punto && Number.isFinite(Number(punto.x)) && Number.isFinite(Number(punto.y));
}

// ---------------------------------------------------------------------------
// Cambios de herramienta (color y grosor)
// ---------------------------------------------------------------------------

function cambiarColor(estado, color) {
  if (!validarColor(color)) {
    return { exito: false, motivo: `Color invalido: "${color}". Usa formato hexadecimal, ej: #ff0000.`, estado };
  }
  return { exito: true, estado: { ...estado, color } };
}

function cambiarGrosor(estado, grosor) {
  if (!validarGrosor(grosor)) {
    return { exito: false, motivo: `El grosor debe ser un numero entre ${GROSOR_MINIMO} y ${GROSOR_MAXIMO}.`, estado };
  }
  return { exito: true, estado: { ...estado, grosor: Number(grosor) } };
}

// ---------------------------------------------------------------------------
// Trazos: iniciar, agregar puntos, finalizar
// ---------------------------------------------------------------------------

function iniciarTrazo(estado, punto) {
  if (!validarPunto(punto)) {
    return { exito: false, motivo: 'El punto inicial no es valido.', estado };
  }
  const trazoEnCurso = { color: estado.color, grosor: estado.grosor, puntos: [{ x: Number(punto.x), y: Number(punto.y) }] };
  return { exito: true, estado: { ...estado, trazoEnCurso } };
}

function agregarPuntoTrazo(estado, punto) {
  if (!estado.trazoEnCurso) {
    return { exito: false, motivo: 'No hay un trazo en curso. Usa iniciarTrazo primero.', estado };
  }
  if (!validarPunto(punto)) {
    return { exito: false, motivo: 'El punto a agregar no es valido.', estado };
  }
  const trazoEnCurso = { ...estado.trazoEnCurso, puntos: [...estado.trazoEnCurso.puntos, { x: Number(punto.x), y: Number(punto.y) }] };
  return { exito: true, estado: { ...estado, trazoEnCurso } };
}

function finalizarTrazo(estado) {
  if (!estado.trazoEnCurso) {
    return { exito: false, motivo: 'No hay un trazo en curso para finalizar.', estado };
  }
  return { exito: true, estado: { ...estado, trazos: [...estado.trazos, estado.trazoEnCurso], trazoEnCurso: null } };
}

// ---------------------------------------------------------------------------
// Limpiar y deshacer (reto extra: deshacer el ultimo trazo)
// ---------------------------------------------------------------------------

function limpiarCanvas(estado) {
  return { ...estado, trazos: [], trazoEnCurso: null };
}

function deshacerUltimoTrazo(estado) {
  if (estado.trazos.length === 0) {
    return { exito: false, motivo: 'No hay trazos para deshacer.', estado };
  }
  return { exito: true, estado: { ...estado, trazos: estado.trazos.slice(0, -1) } };
}

// ---------------------------------------------------------------------------
// Resumen del dibujo (reto extra)
// ---------------------------------------------------------------------------

function generarResumenDibujo(estado) {
  const totalPuntos = estado.trazos.reduce((acumulado, trazo) => acumulado + trazo.puntos.length, 0);
  const conteoColores = estado.trazos.reduce((conteo, trazo) => {
    conteo[trazo.color] = (conteo[trazo.color] ?? 0) + 1;
    return conteo;
  }, {});

  return { totalTrazos: estado.trazos.length, totalPuntos, conteoColores };
}

// ---------------------------------------------------------------------------
// Renderizado real en el canvas (solo en el navegador)
// ---------------------------------------------------------------------------

function redibujarCanvas(ctx, estado) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  estado.trazos.forEach((trazo) => dibujarTrazo(ctx, trazo));
}

function dibujarTrazo(ctx, trazo) {
  if (trazo.puntos.length === 0) return;
  ctx.strokeStyle = trazo.color;
  ctx.lineWidth = trazo.grosor;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(trazo.puntos[0].x, trazo.puntos[0].y);
  trazo.puntos.slice(1).forEach((punto) => ctx.lineTo(punto.x, punto.y));
  ctx.stroke();
}

// ---------------------------------------------------------------------------
// Interfaz en el DOM
// ---------------------------------------------------------------------------

function obtenerPuntoDelMouse(canvas, evento) {
  const rect = canvas.getBoundingClientRect();
  return { x: evento.clientX - rect.left, y: evento.clientY - rect.top };
}

function iniciarAplicacionDOM() {
  const canvas = document.querySelector('#lienzo');
  const entradaColor = document.querySelector('#entrada-color');
  const entradaGrosor = document.querySelector('#entrada-grosor');
  const botonLimpiar = document.querySelector('#boton-limpiar');
  const botonDeshacer = document.querySelector('#boton-deshacer');
  const resumenElemento = document.querySelector('#resumen-dibujo');

  if (!canvas || !entradaColor || !entradaGrosor || !botonLimpiar || !botonDeshacer || !resumenElemento) return;

  const ctx = canvas.getContext('2d');
  let estado = crearEstadoDibujo();
  let dibujando = false;

  function actualizarResumen() {
    const resumen = generarResumenDibujo(estado);
    resumenElemento.textContent = `Trazos: ${resumen.totalTrazos} · Puntos: ${resumen.totalPuntos}`;
  }

  canvas.addEventListener('mousedown', (evento) => {
    dibujando = true;
    estado = iniciarTrazo(estado, obtenerPuntoDelMouse(canvas, evento)).estado;
  });

  canvas.addEventListener('mousemove', (evento) => {
    if (!dibujando) return;
    estado = agregarPuntoTrazo(estado, obtenerPuntoDelMouse(canvas, evento)).estado;
    redibujarCanvas(ctx, estado);
    dibujarTrazo(ctx, estado.trazoEnCurso);
  });

  function terminarTrazoActual() {
    if (!dibujando) return;
    dibujando = false;
    estado = finalizarTrazo(estado).estado;
    redibujarCanvas(ctx, estado);
    actualizarResumen();
  }

  canvas.addEventListener('mouseup', terminarTrazoActual);
  canvas.addEventListener('mouseleave', terminarTrazoActual);

  entradaColor.addEventListener('input', () => {
    estado = cambiarColor(estado, entradaColor.value).estado;
  });

  entradaGrosor.addEventListener('input', () => {
    estado = cambiarGrosor(estado, entradaGrosor.value).estado;
  });

  botonLimpiar.addEventListener('click', () => {
    estado = limpiarCanvas(estado);
    redibujarCanvas(ctx, estado);
    actualizarResumen();
  });

  botonDeshacer.addEventListener('click', () => {
    const resultado = deshacerUltimoTrazo(estado);
    estado = resultado.estado;
    redibujarCanvas(ctx, estado);
    actualizarResumen();
  });

  actualizarResumen();
}

// ---------------------------------------------------------------------------
// Ejecucion por consola (node maria-montepeque.js) con al menos dos casos de prueba
// ---------------------------------------------------------------------------

function resolverEjercicio() {
  console.log('=== 78. Canvas de dibujo basico ===');
  let estado = crearEstadoDibujo();

  // Caso 1: dibujar un trazo, cambiar de color y dibujar otro, luego limpiar.
  console.log('\nCaso 1 - dibujar, cambiar color y limpiar:');
  estado = iniciarTrazo(estado, { x: 0, y: 0 }).estado;
  estado = agregarPuntoTrazo(estado, { x: 10, y: 10 }).estado;
  estado = agregarPuntoTrazo(estado, { x: 20, y: 5 }).estado;
  estado = finalizarTrazo(estado).estado;
  console.log('Trazo 1 finalizado:', estado.trazos[0]);

  estado = cambiarColor(estado, '#ff0000').estado;
  estado = iniciarTrazo(estado, { x: 30, y: 30 }).estado;
  estado = agregarPuntoTrazo(estado, { x: 40, y: 35 }).estado;
  estado = finalizarTrazo(estado).estado;
  console.log('Resumen antes de limpiar:', generarResumenDibujo(estado));

  estado = limpiarCanvas(estado);
  console.log('Resumen despues de limpiar:', generarResumenDibujo(estado));

  // Caso 2: validaciones y casos limite - color invalido, grosor fuera de rango,
  // agregar punto sin trazo en curso, y deshacer.
  console.log('\nCaso 2 - validaciones y casos limite:');
  const colorInvalido = cambiarColor(estado, 'azul');
  console.log('Cambiar a color invalido "azul":', colorInvalido.exito ? 'aplicado' : colorInvalido.motivo);

  const grosorInvalido = cambiarGrosor(estado, 100);
  console.log('Cambiar a grosor invalido (100):', grosorInvalido.exito ? 'aplicado' : grosorInvalido.motivo);

  const puntoSinTrazo = agregarPuntoTrazo(estado, { x: 5, y: 5 });
  console.log('Agregar punto sin trazo en curso:', puntoSinTrazo.exito ? 'agregado' : puntoSinTrazo.motivo);

  estado = iniciarTrazo(estado, { x: 1, y: 1 }).estado;
  estado = finalizarTrazo(estado).estado;
  estado = iniciarTrazo(estado, { x: 2, y: 2 }).estado;
  estado = finalizarTrazo(estado).estado;
  console.log('Trazos antes de deshacer:', generarResumenDibujo(estado).totalTrazos);
  estado = deshacerUltimoTrazo(estado).estado;
  console.log('Trazos despues de deshacer:', generarResumenDibujo(estado).totalTrazos);

  const deshacerVacio = deshacerUltimoTrazo(limpiarCanvas(estado));
  console.log('Deshacer sin trazos:', deshacerVacio.exito ? 'ok' : deshacerVacio.motivo);

  return { estadoFinal: estado };
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', iniciarAplicacionDOM);
} else {
  resolverEjercicio();
}
