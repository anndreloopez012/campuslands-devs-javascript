// 77. Booking tattoo app
// Resolucion: maria-montepeque
//
// Idea: cada artista tiene una lista fija de horarios que ofrece. Las reservas son un array
// separado { id, artistaId, horario, cliente }; un horario esta realmente disponible solo si
// el artista lo ofrece Y no hay ya una reserva para ese artista en ese horario (se busca con find).
// El mismo archivo corre con `node maria-montepeque.js` (casos de prueba por consola)
// y en el navegador (maria-montepeque.html) como una agenda interactiva real.

const ARTISTAS = [
  { id: 1, nombre: 'Camila Rios', estilo: 'blackwork', horarios: ['09:00', '11:00', '15:00'] },
  { id: 2, nombre: 'Julian Vega', estilo: 'realismo', horarios: ['10:00', '13:00', '17:00'] },
  { id: 3, nombre: 'Marcela Suarez', estilo: 'acuarela', horarios: ['09:00', '12:00'] }
];

// ---------------------------------------------------------------------------
// Consultas con find/filter
// ---------------------------------------------------------------------------

function obtenerArtistaPorId(idArtista) {
  return ARTISTAS.find((artista) => artista.id === Number(idArtista));
}

function existeReservaEnHorario(reservas, idArtista, horario) {
  return reservas.some((reserva) => reserva.artistaId === Number(idArtista) && reserva.horario === horario);
}

function listarHorariosLibres(artista, reservas) {
  return artista.horarios.filter((horario) => !existeReservaEnHorario(reservas, artista.id, horario));
}

// ---------------------------------------------------------------------------
// Validacion y confirmacion de la reserva
// ---------------------------------------------------------------------------

function validarDatosReserva(datos) {
  if (!datos || typeof datos !== 'object') {
    return { valido: false, motivo: 'Los datos de la reserva no son validos.' };
  }
  if (!datos.cliente || typeof datos.cliente !== 'string' || datos.cliente.trim() === '') {
    return { valido: false, motivo: 'El nombre del cliente es obligatorio.' };
  }

  const artista = obtenerArtistaPorId(datos.artistaId);
  if (!artista) {
    return { valido: false, motivo: `No existe un artista con id ${datos.artistaId}.` };
  }
  if (!artista.horarios.includes(datos.horario)) {
    return { valido: false, motivo: `${artista.nombre} no ofrece el horario ${datos.horario}.` };
  }

  return { valido: true, artista };
}

function generarIdReserva(reservas) {
  return reservas.length === 0 ? 1 : Math.max(...reservas.map((reserva) => reserva.id)) + 1;
}

function confirmarReserva(reservas, datos) {
  const validacion = validarDatosReserva(datos);
  if (!validacion.valido) {
    return { exito: false, motivo: validacion.motivo, reservas };
  }
  if (existeReservaEnHorario(reservas, validacion.artista.id, datos.horario)) {
    return { exito: false, motivo: `El horario ${datos.horario} con ${validacion.artista.nombre} ya esta reservado.`, reservas };
  }

  const nuevaReserva = {
    id: generarIdReserva(reservas),
    artistaId: validacion.artista.id,
    horario: datos.horario,
    cliente: datos.cliente.trim()
  };

  return { exito: true, reserva: nuevaReserva, reservas: [...reservas, nuevaReserva] };
}

// ---------------------------------------------------------------------------
// Resumen de la agenda (reto extra: reservas por artista)
// ---------------------------------------------------------------------------

function generarResumenAgenda(reservas) {
  return ARTISTAS.map((artista) => ({
    artista: artista.nombre,
    reservadas: reservas.filter((reserva) => reserva.artistaId === artista.id).length,
    libres: listarHorariosLibres(artista, reservas).length
  }));
}

// ---------------------------------------------------------------------------
// Salida por consola
// ---------------------------------------------------------------------------

function mostrarAgendaEnConsola(reservas) {
  console.log('\nAgenda actual:');
  if (reservas.length === 0) {
    console.log('Sin reservas todavia.');
  } else {
    console.table(reservas.map((r) => ({ ...r, artista: obtenerArtistaPorId(r.artistaId).nombre })));
  }
  console.log('Resumen por artista:');
  console.table(generarResumenAgenda(reservas));
}

// ---------------------------------------------------------------------------
// Interfaz en el DOM
// ---------------------------------------------------------------------------

function crearTarjetaArtista(artista, reservas, onSeleccionarHorario) {
  const tarjeta = document.createElement('article');
  tarjeta.className = 'artista';

  const titulo = document.createElement('h3');
  titulo.textContent = `${artista.nombre} · ${artista.estilo}`;
  tarjeta.appendChild(titulo);

  const horariosLibres = listarHorariosLibres(artista, reservas);
  if (horariosLibres.length === 0) {
    const sinCupo = document.createElement('p');
    sinCupo.className = 'sin-cupo';
    sinCupo.textContent = 'Sin horarios disponibles.';
    tarjeta.appendChild(sinCupo);
  } else {
    horariosLibres.forEach((horario) => {
      const boton = document.createElement('button');
      boton.type = 'button';
      boton.textContent = horario;
      boton.addEventListener('click', () => onSeleccionarHorario(artista.id, horario));
      tarjeta.appendChild(boton);
    });
  }

  return tarjeta;
}

function iniciarAplicacionDOM() {
  const listaArtistas = document.querySelector('#lista-artistas');
  const formulario = document.querySelector('#formulario-reserva');
  const seleccionElemento = document.querySelector('#seleccion-actual');
  const mensajeElemento = document.querySelector('#mensaje-estado');
  const listaAgenda = document.querySelector('#lista-agenda');

  if (!listaArtistas || !formulario || !seleccionElemento || !mensajeElemento || !listaAgenda) return;

  let reservasActuales = [];
  let seleccionActual = null;

  function renderizarTodo() {
    listaArtistas.innerHTML = '';
    ARTISTAS.forEach((artista) => {
      listaArtistas.appendChild(crearTarjetaArtista(artista, reservasActuales, seleccionarHorario));
    });

    listaAgenda.innerHTML = '';
    reservasActuales.forEach((reserva) => {
      const item = document.createElement('li');
      item.textContent = `${obtenerArtistaPorId(reserva.artistaId).nombre} - ${reserva.horario} - ${reserva.cliente}`;
      listaAgenda.appendChild(item);
    });
  }

  function seleccionarHorario(idArtista, horario) {
    seleccionActual = { idArtista, horario };
    seleccionElemento.textContent = `Horario elegido: ${obtenerArtistaPorId(idArtista).nombre} a las ${horario}.`;
  }

  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    if (!seleccionActual) {
      mensajeElemento.textContent = 'Elige un horario antes de confirmar.';
      mensajeElemento.className = 'mensaje error';
      return;
    }

    const cliente = new FormData(formulario).get('cliente');
    const resultado = confirmarReserva(reservasActuales, {
      artistaId: seleccionActual.idArtista,
      horario: seleccionActual.horario,
      cliente
    });

    if (!resultado.exito) {
      mensajeElemento.textContent = resultado.motivo;
      mensajeElemento.className = 'mensaje error';
      return;
    }

    reservasActuales = resultado.reservas;
    seleccionActual = null;
    seleccionElemento.textContent = '';
    mensajeElemento.textContent = `Reserva confirmada para ${resultado.reserva.cliente}.`;
    mensajeElemento.className = 'mensaje exito';
    formulario.reset();
    renderizarTodo();
  });

  renderizarTodo();
}

// ---------------------------------------------------------------------------
// Ejecucion por consola (node maria-montepeque.js) con al menos dos casos de prueba
// ---------------------------------------------------------------------------

function resolverEjercicio() {
  console.log('=== 77. Booking tattoo app ===');
  let reservas = [];

  // Caso 1: reservas validas para dos artistas distintos.
  console.log('\nCaso 1 - reservas validas:');
  const reserva1 = confirmarReserva(reservas, { artistaId: 1, horario: '09:00', cliente: 'Valentina Cruz' });
  reservas = reserva1.reservas;
  console.log('Reserva 1:', reserva1.exito ? reserva1.reserva : reserva1.motivo);

  const reserva2 = confirmarReserva(reservas, { artistaId: 2, horario: '13:00', cliente: 'Andres Leon' });
  reservas = reserva2.reservas;
  console.log('Reserva 2:', reserva2.exito ? reserva2.reserva : reserva2.motivo);

  mostrarAgendaEnConsola(reservas);

  // Caso 2: casos limite - horario ya ocupado, horario que el artista no ofrece,
  // artista inexistente y cliente vacio.
  console.log('\nCaso 2 - validaciones y casos limite:');
  const horarioOcupado = confirmarReserva(reservas, { artistaId: 1, horario: '09:00', cliente: 'Otro Cliente' });
  console.log('Reservar horario ya ocupado:', horarioOcupado.exito ? 'confirmada' : horarioOcupado.motivo);

  const horarioNoOfrecido = confirmarReserva(reservas, { artistaId: 1, horario: '20:00', cliente: 'Otro Cliente' });
  console.log('Reservar horario que el artista no ofrece:', horarioNoOfrecido.exito ? 'confirmada' : horarioNoOfrecido.motivo);

  const artistaInexistente = confirmarReserva(reservas, { artistaId: 99, horario: '09:00', cliente: 'Otro Cliente' });
  console.log('Reservar con artista inexistente:', artistaInexistente.exito ? 'confirmada' : artistaInexistente.motivo);

  const clienteVacio = confirmarReserva(reservas, { artistaId: 3, horario: '12:00', cliente: '' });
  console.log('Reservar sin nombre de cliente:', clienteVacio.exito ? 'confirmada' : clienteVacio.motivo);

  mostrarAgendaEnConsola(reservas);

  return { reservasFinales: reservas };
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', iniciarAplicacionDOM);
} else {
  resolverEjercicio();
}
