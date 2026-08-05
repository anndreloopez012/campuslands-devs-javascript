// 76. Check-in de salto
// Resolucion: maria-montepeque
//
// Idea: cada check-in se valida contra 3 reglas (edad minima, viento maximo y equipo completo).
// Las 3 se evaluan siempre, asi que un salto puede quedar rechazado por varios motivos a la vez.
// Los check-ins aprobados o rechazados se guardan en un historial de la jornada (inmutable).
// El mismo archivo corre con `node maria-montepeque.js` (casos de prueba por consola)
// y en el navegador (maria-montepeque.html) como un formulario de check-in real.

const EDAD_MINIMA = 18;
const VIENTO_MAXIMO_KMH = 25;
const EQUIPO_REQUERIDO = ['casco', 'arnes', 'paracaidasPrincipal', 'paracaidasReserva'];

// ---------------------------------------------------------------------------
// Validaciones individuales
// ---------------------------------------------------------------------------

function validarDatosBasicos(datos) {
  if (!datos || typeof datos !== 'object') {
    return { valido: false, motivo: 'Los datos del check-in no son validos.' };
  }
  if (!datos.nombre || typeof datos.nombre !== 'string' || datos.nombre.trim() === '') {
    return { valido: false, motivo: 'El nombre del saltador es obligatorio.' };
  }
  if (!Number.isFinite(Number(datos.edad))) {
    return { valido: false, motivo: 'La edad debe ser un numero valido.' };
  }
  if (!Number.isFinite(Number(datos.velocidadViento))) {
    return { valido: false, motivo: 'La velocidad del viento debe ser un numero valido.' };
  }
  return { valido: true };
}

function obtenerEquipoFaltante(equipo = {}) {
  return EQUIPO_REQUERIDO.filter((pieza) => equipo[pieza] !== true);
}

// ---------------------------------------------------------------------------
// Evaluacion combinada del check-in (puede fallar por varios motivos a la vez)
// ---------------------------------------------------------------------------

function evaluarCheckIn(datos) {
  const motivosRechazo = [];

  if (Number(datos.edad) < EDAD_MINIMA) {
    motivosRechazo.push(`Edad insuficiente: se requieren al menos ${EDAD_MINIMA} anios (tiene ${datos.edad}).`);
  }
  if (Number(datos.velocidadViento) > VIENTO_MAXIMO_KMH) {
    motivosRechazo.push(`Viento demasiado fuerte: maximo ${VIENTO_MAXIMO_KMH} km/h (actual ${datos.velocidadViento} km/h).`);
  }
  const equipoFaltante = obtenerEquipoFaltante(datos.equipo);
  if (equipoFaltante.length > 0) {
    motivosRechazo.push(`Equipo incompleto: falta ${equipoFaltante.join(', ')}.`);
  }

  return { aprobado: motivosRechazo.length === 0, motivosRechazo };
}

// ---------------------------------------------------------------------------
// Registro del check-in en el historial de la jornada
// ---------------------------------------------------------------------------

function generarIdRegistro(historial) {
  return historial.length === 0 ? 1 : Math.max(...historial.map((registro) => registro.id)) + 1;
}

function registrarCheckIn(historial, datos) {
  const validacionBasica = validarDatosBasicos(datos);
  if (!validacionBasica.valido) {
    return { exito: false, motivo: validacionBasica.motivo, historial };
  }

  const evaluacion = evaluarCheckIn(datos);
  const registro = {
    id: generarIdRegistro(historial),
    nombre: datos.nombre.trim(),
    edad: Number(datos.edad),
    velocidadViento: Number(datos.velocidadViento),
    aprobado: evaluacion.aprobado,
    motivosRechazo: evaluacion.motivosRechazo
  };

  return { exito: true, registro, historial: [...historial, registro] };
}

// ---------------------------------------------------------------------------
// Consultas y resumen (reto extra: resumen estadistico de la jornada)
// ---------------------------------------------------------------------------

function filtrarHistorialPorEstado(historial, aprobado) {
  return historial.filter((registro) => registro.aprobado === aprobado);
}

function generarResumenJornada(historial) {
  const total = historial.length;
  const aprobados = filtrarHistorialPorEstado(historial, true).length;
  return {
    total,
    aprobados,
    rechazados: total - aprobados,
    porcentajeAprobacion: total === 0 ? 0 : Math.round((aprobados / total) * 100)
  };
}

// ---------------------------------------------------------------------------
// Salida por consola
// ---------------------------------------------------------------------------

function mostrarRegistroEnConsola(registro) {
  const estado = registro.aprobado ? 'APROBADO' : 'RECHAZADO';
  console.log(`\n[${estado}] ${registro.nombre} (edad ${registro.edad}, viento ${registro.velocidadViento} km/h)`);
  registro.motivosRechazo.forEach((motivo) => console.log(`  - ${motivo}`));
}

// ---------------------------------------------------------------------------
// Interfaz en el DOM
// ---------------------------------------------------------------------------

function leerEquipoDelFormulario(formulario) {
  return EQUIPO_REQUERIDO.reduce((equipo, pieza) => {
    equipo[pieza] = formulario.querySelector(`[name="${pieza}"]`).checked;
    return equipo;
  }, {});
}

function crearFilaHistorial(registro) {
  const fila = document.createElement('li');
  fila.className = registro.aprobado ? 'registro registro--aprobado' : 'registro registro--rechazado';
  fila.textContent = `${registro.nombre} - ${registro.aprobado ? 'Aprobado' : 'Rechazado'}`;
  return fila;
}

function iniciarAplicacionDOM() {
  const formulario = document.querySelector('#formulario-checkin');
  const resultadoElemento = document.querySelector('#resultado-checkin');
  const listaHistorial = document.querySelector('#lista-historial');
  const resumenElemento = document.querySelector('#resumen-jornada');

  if (!formulario || !resultadoElemento || !listaHistorial || !resumenElemento) return;

  let historialJornada = [];

  function renderizarHistorial() {
    listaHistorial.innerHTML = '';
    historialJornada.forEach((registro) => listaHistorial.appendChild(crearFilaHistorial(registro)));

    const resumen = generarResumenJornada(historialJornada);
    resumenElemento.textContent =
      `Total: ${resumen.total} · Aprobados: ${resumen.aprobados} · Rechazados: ${resumen.rechazados} · ` +
      `Aprobacion: ${resumen.porcentajeAprobacion}%`;
  }

  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const datos = new FormData(formulario);
    const resultado = registrarCheckIn(historialJornada, {
      nombre: datos.get('nombre'),
      edad: datos.get('edad'),
      velocidadViento: datos.get('velocidadViento'),
      equipo: leerEquipoDelFormulario(formulario)
    });

    if (!resultado.exito) {
      resultadoElemento.textContent = resultado.motivo;
      resultadoElemento.className = 'resultado resultado--error';
      return;
    }

    historialJornada = resultado.historial;
    const { registro } = resultado;
    resultadoElemento.textContent = registro.aprobado
      ? `Salto APROBADO para ${registro.nombre}.`
      : `Salto RECHAZADO para ${registro.nombre}: ${registro.motivosRechazo.join(' ')}`;
    resultadoElemento.className = registro.aprobado ? 'resultado resultado--ok' : 'resultado resultado--error';

    formulario.reset();
    renderizarHistorial();
  });

  renderizarHistorial();
}

// ---------------------------------------------------------------------------
// Ejecucion por consola (node maria-montepeque.js) con al menos dos casos de prueba
// ---------------------------------------------------------------------------

function resolverEjercicio() {
  console.log('=== 76. Check-in de salto ===');
  console.log(`Reglas: edad minima ${EDAD_MINIMA} anios, viento maximo ${VIENTO_MAXIMO_KMH} km/h, equipo: ${EQUIPO_REQUERIDO.join(', ')}.`);

  let historial = [];

  // Caso 1: tres saltadores - uno aprobado, uno rechazado por edad, uno por viento.
  console.log('\nCaso 1 - jornada normal:');
  const equipoCompleto = { casco: true, arnes: true, paracaidasPrincipal: true, paracaidasReserva: true };

  historial = registrarCheckIn(historial, { nombre: 'Laura Gomez', edad: 25, velocidadViento: 15, equipo: equipoCompleto }).historial;
  historial = registrarCheckIn(historial, { nombre: 'Pedro Ruiz', edad: 16, velocidadViento: 15, equipo: equipoCompleto }).historial;
  historial = registrarCheckIn(historial, { nombre: 'Ana Torres', edad: 30, velocidadViento: 40, equipo: equipoCompleto }).historial;

  historial.forEach(mostrarRegistroEnConsola);

  // Caso 2: casos limite - edad y viento justo en el limite (deben aprobar), equipo incompleto
  // con varios motivos a la vez, y datos invalidos.
  console.log('\nCaso 2 - casos limite:');
  const limiteExacto = registrarCheckIn(historial, {
    nombre: 'Carlos Mora',
    edad: EDAD_MINIMA,
    velocidadViento: VIENTO_MAXIMO_KMH,
    equipo: equipoCompleto
  });
  historial = limiteExacto.historial;
  mostrarRegistroEnConsola(limiteExacto.registro);

  const equipoIncompleto = { casco: true, arnes: false, paracaidasPrincipal: true, paracaidasReserva: false };
  const rechazoMultiple = registrarCheckIn(historial, {
    nombre: 'Sofia Diaz',
    edad: 15,
    velocidadViento: 35,
    equipo: equipoIncompleto
  });
  historial = rechazoMultiple.historial;
  mostrarRegistroEnConsola(rechazoMultiple.registro);

  const datosInvalidos = registrarCheckIn(historial, { nombre: '', edad: 20, velocidadViento: 10, equipo: equipoCompleto });
  console.log('\nRegistro con nombre vacio:', datosInvalidos.exito ? 'registrado' : datosInvalidos.motivo);

  console.log('\nResumen de la jornada:', generarResumenJornada(historial));

  return { historial };
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', iniciarAplicacionDOM);
} else {
  resolverEjercicio();
}
