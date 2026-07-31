// 22. Agenda de tatuajes - Resolucion Maria Montepeque

function validarCita(cita) {
  return (
    cita &&
    typeof cita.cliente === 'string' &&
    typeof cita.artista === 'string' &&
    typeof cita.fecha === 'string' &&
    !Number.isNaN(new Date(cita.fecha).getTime()) &&
    typeof cita.precioTotal === 'number' &&
    cita.precioTotal > 0 &&
    typeof cita.deposito === 'number' &&
    cita.deposito >= 0
  );
}

function estaDisponible(citas, artista, fecha) {
  return !citas.some((cita) => cita.artista === artista && cita.fecha === fecha);
}

function agendarCita(citas, nuevaCita) {
  if (!validarCita(nuevaCita)) {
    return { exito: false, mensaje: 'Datos de la cita incompletos o invalidos' };
  }
  if (!estaDisponible(citas, nuevaCita.artista, nuevaCita.fecha)) {
    return { exito: false, mensaje: `${nuevaCita.artista} ya tiene una cita agendada el ${nuevaCita.fecha}` };
  }
  return { exito: true, citas: [...citas, nuevaCita] };
}

function calcularPagoPendiente(cita) {
  return cita.precioTotal - cita.deposito;
}

function ordenarPorFecha(citas) {
  return [...citas].sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
}

function listarAgenda(citas) {
  const validas = citas.filter(validarCita);

  return {
    agenda: ordenarPorFecha(validas).map((cita) => ({
      cliente: cita.cliente,
      artista: cita.artista,
      fecha: cita.fecha,
      pagoPendiente: calcularPagoPendiente(cita)
    })),
    citasInvalidas: citas.length - validas.length
  };
}

const citas = [
  { cliente: 'Laura', artista: 'Nico', fecha: '2026-08-05', precioTotal: 200, deposito: 50 },
  { cliente: 'Pedro', artista: 'Ana', fecha: '2026-08-03', precioTotal: 150, deposito: 150 }
];

console.log('Caso 1: agenda ordenada por fecha');
console.log(JSON.stringify(listarAgenda(citas), null, 2));

console.log('\nCaso 2: agendar nueva cita en horario disponible');
const nuevaCita = { cliente: 'Marco', artista: 'Nico', fecha: '2026-08-10', precioTotal: 300, deposito: 100 };
const resultado = agendarCita(citas, nuevaCita);
console.log(resultado);
if (resultado.exito) {
  console.log(JSON.stringify(listarAgenda(resultado.citas), null, 2));
}

console.log('\nCaso 3: intentar agendar el mismo artista en la misma fecha (conflicto)');
console.log(agendarCita(citas, { cliente: 'Otro', artista: 'Nico', fecha: '2026-08-05', precioTotal: 200, deposito: 50 }));
