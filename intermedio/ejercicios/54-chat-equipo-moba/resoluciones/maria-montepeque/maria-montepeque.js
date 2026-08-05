// 54. Chat de equipo MOBA - Resolucion Maria Montepeque

const mensajesEquipo = [
  { autor: 'TopLaner', rol: 'top', texto: 'Enemigo top se fue por el rio, cuidado' },
  { autor: 'JungleKing', rol: 'jungla', texto: 'Voy a invadir la jungla enemiga en el minuto 3' },
  { autor: 'MidMage', rol: 'medio', texto: 'Necesito ayuda para hacer roam a top' },
  { autor: 'ADCarry', rol: 'tirador', texto: '' },
  { autor: 'SupportHeal', rol: 'soporte', texto: 'Vision puesta en el rio, listos para gank' }
];

function esMensajeValido(mensaje) {
  return (
    mensaje &&
    typeof mensaje.autor === 'string' &&
    mensaje.autor.trim() !== '' &&
    typeof mensaje.rol === 'string' &&
    mensaje.rol.trim() !== '' &&
    typeof mensaje.texto === 'string' &&
    mensaje.texto.trim() !== ''
  );
}

function agregarMensaje(listaMensajes, nuevoMensaje) {
  if (!esMensajeValido(nuevoMensaje)) {
    return { agregado: false, motivo: 'mensaje invalido (autor, rol o texto vacio)', listaMensajes };
  }
  return { agregado: true, motivo: 'mensaje agregado correctamente', listaMensajes: [...listaMensajes, nuevoMensaje] };
}

function filtrarPorRol(listaMensajes, rol) {
  return listaMensajes.filter((mensaje) => mensaje.rol === rol);
}

function formatearMensaje(mensaje) {
  return `[${mensaje.rol}] ${mensaje.autor}: ${mensaje.texto}`;
}

function renderizarMensajesEnDOM(listaMensajes) {
  if (typeof document === 'undefined') return;
  const contenedor = document.querySelector('#chat-mensajes');
  if (!contenedor) return;

  contenedor.innerHTML = '';
  listaMensajes.forEach((mensaje) => {
    const item = document.createElement('li');
    item.textContent = formatearMensaje(mensaje);
    contenedor.appendChild(item);
  });
}

function inicializarChat(mensajesIniciales) {
  if (typeof document === 'undefined') return;

  const formulario = document.querySelector('#chat-formulario');
  const inputAutor = document.querySelector('#chat-autor');
  const inputRol = document.querySelector('#chat-rol');
  const inputTexto = document.querySelector('#chat-texto');
  if (!formulario || !inputAutor || !inputRol || !inputTexto) return;

  let mensajesActuales = mensajesIniciales.filter(esMensajeValido);
  renderizarMensajesEnDOM(mensajesActuales);

  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const resultado = agregarMensaje(mensajesActuales, {
      autor: inputAutor.value,
      rol: inputRol.value,
      texto: inputTexto.value
    });

    if (resultado.agregado) {
      mensajesActuales = resultado.listaMensajes;
      renderizarMensajesEnDOM(mensajesActuales);
      inputTexto.value = '';
    }
  });
}

function gestionarChat(mensajesBase, nuevoMensaje, rolFiltro) {
  const mensajesValidosIniciales = mensajesBase.filter(esMensajeValido);
  const resultadoAgregar = agregarMensaje(mensajesValidosIniciales, nuevoMensaje);
  const mensajesFiltrados = filtrarPorRol(resultadoAgregar.listaMensajes, rolFiltro);

  renderizarMensajesEnDOM(resultadoAgregar.listaMensajes);

  return {
    totalMensajesBase: mensajesBase.length,
    mensajesInvalidosBase: mensajesBase.length - mensajesValidosIniciales.length,
    intentoAgregar: { agregado: resultadoAgregar.agregado, motivo: resultadoAgregar.motivo },
    totalMensajesFinal: resultadoAgregar.listaMensajes.length,
    rolFiltro,
    mensajesFiltrados: mensajesFiltrados.map(formatearMensaje)
  };
}

console.log('Caso 1: agregar mensaje valido de rol "top" y filtrar mensajes de ese rol');
console.log(
  JSON.stringify(
    gestionarChat(mensajesEquipo, { autor: 'TopLaner', rol: 'top', texto: 'Recuperando vida en la base' }, 'top'),
    null,
    2
  )
);

console.log('\nCaso 2: intenta agregar mensaje invalido (texto vacio) y filtrar un rol sin mensajes');
console.log(
  JSON.stringify(gestionarChat(mensajesEquipo, { autor: 'MidMage', rol: 'medio', texto: '' }, 'entrenador'), null, 2)
);

inicializarChat(mensajesEquipo);
