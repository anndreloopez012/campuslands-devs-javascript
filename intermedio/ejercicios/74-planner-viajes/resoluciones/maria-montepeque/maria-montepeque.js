// 74. Planner de viajes DOM
// Resolucion: maria-montepeque
//
// Idea: actividades { id, nombre, dia, costo, prioridad } agrupadas por dia. El costo por dia
// se calcula con reduce y se compara contra un presupuesto diario para generar alertas.
// El mismo archivo corre con `node maria-montepeque.js` (casos de prueba por consola)
// y en el navegador (maria-montepeque.html) como un planner interactivo real.

const PRESUPUESTO_DIARIO = 150000;
const PESOS_PRIORIDAD = { alta: 3, media: 2, baja: 1 };

const ACTIVIDADES_BASE = [
  { id: 1, nombre: 'Tour por el centro historico', dia: 1, costo: 80000, prioridad: 'alta' },
  { id: 2, nombre: 'Museo de arte', dia: 1, costo: 50000, prioridad: 'media' },
  { id: 3, nombre: 'Cena en restaurante tipico', dia: 1, costo: 90000, prioridad: 'alta' },
  { id: 4, nombre: 'Caminata en la montana', dia: 2, costo: 30000, prioridad: 'media' },
  { id: 5, nombre: 'Compras en el mercado', dia: 2, costo: 60000, prioridad: 'baja' },
  { id: 6, nombre: 'Tour en bicicleta', dia: 3, costo: 70000, prioridad: 'media' },
  { id: 7, nombre: 'Spa y relajacion', dia: 3, costo: 120000, prioridad: 'baja' }
];

// ---------------------------------------------------------------------------
// Validacion y creacion de actividades
// ---------------------------------------------------------------------------

function validarDatosActividad(datos) {
  if (!datos || typeof datos !== 'object') {
    return { valido: false, motivo: 'Los datos de la actividad no son validos.' };
  }

  const { nombre, dia, costo, prioridad } = datos;

  if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
    return { valido: false, motivo: 'El nombre es obligatorio.' };
  }
  if (!Number.isInteger(Number(dia)) || Number(dia) <= 0) {
    return { valido: false, motivo: 'El dia debe ser un numero entero mayor a 0.' };
  }
  if (!Number.isFinite(Number(costo)) || Number(costo) < 0) {
    return { valido: false, motivo: 'El costo debe ser un numero valido mayor o igual a 0.' };
  }
  if (!PESOS_PRIORIDAD[prioridad]) {
    return { valido: false, motivo: `Prioridad invalida: "${prioridad}". Usa alta, media o baja.` };
  }

  return { valido: true };
}

function generarIdActividad(actividades) {
  return actividades.length === 0 ? 1 : Math.max(...actividades.map((actividad) => actividad.id)) + 1;
}

function agregarActividad(actividades, datosActividad) {
  const validacion = validarDatosActividad(datosActividad);
  if (!validacion.valido) {
    return { exito: false, motivo: validacion.motivo, actividades };
  }

  const nuevaActividad = {
    id: generarIdActividad(actividades),
    nombre: datosActividad.nombre.trim(),
    dia: Number(datosActividad.dia),
    costo: Number(datosActividad.costo),
    prioridad: datosActividad.prioridad
  };

  return { exito: true, actividad: nuevaActividad, actividades: [...actividades, nuevaActividad] };
}

// ---------------------------------------------------------------------------
// Agrupacion, costos y alertas (con reduce)
// ---------------------------------------------------------------------------

function agruparPorDia(actividades) {
  return actividades.reduce((grupos, actividad) => {
    grupos[actividad.dia] = [...(grupos[actividad.dia] ?? []), actividad];
    return grupos;
  }, {});
}

function calcularCostoPorDia(actividades) {
  return actividades.reduce((costos, actividad) => {
    costos[actividad.dia] = (costos[actividad.dia] ?? 0) + actividad.costo;
    return costos;
  }, {});
}

function generarAlertasPresupuesto(costosPorDia, presupuestoDiario) {
  return Object.entries(costosPorDia)
    .filter(([, costo]) => costo > presupuestoDiario)
    .map(([dia, costo]) => `Dia ${dia}: excede el presupuesto por $${(costo - presupuestoDiario).toLocaleString('es-CO')}.`);
}

// Reto extra: ordenar las actividades de cada dia por prioridad (alta primero).
function ordenarPorPrioridad(actividades) {
  return [...actividades].sort((a, b) => PESOS_PRIORIDAD[b.prioridad] - PESOS_PRIORIDAD[a.prioridad]);
}

function generarResumenViaje(actividades, presupuestoDiario = PRESUPUESTO_DIARIO) {
  const costosPorDia = calcularCostoPorDia(actividades);
  return {
    totalActividades: actividades.length,
    costoTotal: actividades.reduce((acumulado, actividad) => acumulado + actividad.costo, 0),
    costosPorDia,
    alertas: generarAlertasPresupuesto(costosPorDia, presupuestoDiario)
  };
}

// ---------------------------------------------------------------------------
// Salida por consola
// ---------------------------------------------------------------------------

function mostrarItinerarioEnConsola(actividades, presupuestoDiario = PRESUPUESTO_DIARIO) {
  const grupos = agruparPorDia(actividades);

  Object.keys(grupos)
    .sort((a, b) => Number(a) - Number(b))
    .forEach((dia) => {
      console.log(`\nDia ${dia}:`);
      console.table(ordenarPorPrioridad(grupos[dia]));
    });

  const resumen = generarResumenViaje(actividades, presupuestoDiario);
  console.log('\nResumen del viaje:', resumen);
  if (resumen.alertas.length > 0) {
    console.log('Alertas:');
    resumen.alertas.forEach((alerta) => console.log(`- ${alerta}`));
  }
}

// ---------------------------------------------------------------------------
// Interfaz en el DOM
// ---------------------------------------------------------------------------

function crearBloqueDia(dia, actividadesDelDia, costoDia, presupuestoDiario) {
  const bloque = document.createElement('section');
  bloque.className = costoDia > presupuestoDiario ? 'dia dia--excedido' : 'dia';

  const titulo = document.createElement('h3');
  titulo.textContent = `Dia ${dia} · $${costoDia.toLocaleString('es-CO')}`;
  bloque.appendChild(titulo);

  const lista = document.createElement('ul');
  ordenarPorPrioridad(actividadesDelDia).forEach((actividad) => {
    const item = document.createElement('li');
    item.textContent = `${actividad.nombre} (${actividad.prioridad}) - $${actividad.costo.toLocaleString('es-CO')}`;
    lista.appendChild(item);
  });
  bloque.appendChild(lista);

  if (costoDia > presupuestoDiario) {
    const alerta = document.createElement('p');
    alerta.className = 'alerta';
    alerta.textContent = `Excede el presupuesto por $${(costoDia - presupuestoDiario).toLocaleString('es-CO')}.`;
    bloque.appendChild(alerta);
  }

  return bloque;
}

function iniciarAplicacionDOM() {
  const formulario = document.querySelector('#formulario-actividad');
  const contenedorItinerario = document.querySelector('#itinerario');
  const resumenElemento = document.querySelector('#resumen-viaje');
  const mensajeElemento = document.querySelector('#mensaje-estado');

  if (!formulario || !contenedorItinerario || !resumenElemento || !mensajeElemento) return;

  let actividadesActuales = [...ACTIVIDADES_BASE];

  function renderizarItinerario() {
    const grupos = agruparPorDia(actividadesActuales);
    const costosPorDia = calcularCostoPorDia(actividadesActuales);

    contenedorItinerario.innerHTML = '';
    Object.keys(grupos)
      .sort((a, b) => Number(a) - Number(b))
      .forEach((dia) => {
        contenedorItinerario.appendChild(
          crearBloqueDia(dia, grupos[dia], costosPorDia[dia], PRESUPUESTO_DIARIO)
        );
      });

    const resumen = generarResumenViaje(actividadesActuales);
    resumenElemento.textContent = `Total de actividades: ${resumen.totalActividades} · Costo total: $${resumen.costoTotal.toLocaleString('es-CO')}`;
  }

  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const datos = new FormData(formulario);
    const resultado = agregarActividad(actividadesActuales, {
      nombre: datos.get('nombre'),
      dia: datos.get('dia'),
      costo: datos.get('costo'),
      prioridad: datos.get('prioridad')
    });

    if (!resultado.exito) {
      mensajeElemento.textContent = resultado.motivo;
      mensajeElemento.className = 'mensaje error';
      return;
    }

    actividadesActuales = resultado.actividades;
    mensajeElemento.textContent = `Actividad agregada: "${resultado.actividad.nombre}".`;
    mensajeElemento.className = 'mensaje exito';
    formulario.reset();
    renderizarItinerario();
  });

  renderizarItinerario();
}

// ---------------------------------------------------------------------------
// Ejecucion por consola (node maria-montepeque.js) con al menos dos casos de prueba
// ---------------------------------------------------------------------------

function resolverEjercicio() {
  console.log('=== 74. Planner de viajes DOM ===');
  console.log(`Presupuesto diario: $${PRESUPUESTO_DIARIO.toLocaleString('es-CO')}`);

  // Caso 1: itinerario base, con dias que exceden el presupuesto (dia 1 y dia 3).
  console.log('\nCaso 1 - itinerario base:');
  mostrarItinerarioEnConsola(ACTIVIDADES_BASE);

  // Caso 2: validaciones - actividad valida agregada y varios datos invalidos rechazados.
  console.log('\nCaso 2 - validaciones al agregar actividades:');
  const conActividadValida = agregarActividad(ACTIVIDADES_BASE, {
    nombre: 'Excursion a la playa',
    dia: 2,
    costo: 45000,
    prioridad: 'alta'
  });
  console.log('Agregar actividad valida:', conActividadValida.exito ? conActividadValida.actividad : conActividadValida.motivo);

  const sinNombre = agregarActividad(ACTIVIDADES_BASE, { nombre: '', dia: 1, costo: 20000, prioridad: 'media' });
  console.log('Agregar sin nombre:', sinNombre.exito ? 'agregada' : sinNombre.motivo);

  const diaInvalido = agregarActividad(ACTIVIDADES_BASE, { nombre: 'Actividad rara', dia: 0, costo: 20000, prioridad: 'media' });
  console.log('Agregar con dia 0:', diaInvalido.exito ? 'agregada' : diaInvalido.motivo);

  const prioridadInvalida = agregarActividad(ACTIVIDADES_BASE, { nombre: 'Actividad sin prioridad', dia: 1, costo: 20000, prioridad: 'urgente' });
  console.log('Agregar con prioridad invalida:', prioridadInvalida.exito ? 'agregada' : prioridadInvalida.motivo);

  return { itinerarioFinal: conActividadValida.actividades };
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', iniciarAplicacionDOM);
} else {
  resolverEjercicio();
}
