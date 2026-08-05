// 70. Terminal sci-fi
// Resolucion: maria-montepeque
//
// Idea de la solucion:
// 1. La nave se modela como un mapa de salas (objeto), cada una con descripcion, salidas y objetos.
// 2. El estado (sala actual, inventario, historial) viaja de comando en comando sin mutar el original.
// 3. Se parsea la entrada del usuario ("ir norte" -> comando "ir", argumento "norte") y un switch
//    ejecuta la accion correspondiente.
// 4. El mismo archivo funciona con `node maria-montepeque.js` (corre una secuencia de comandos de
//    ejemplo por consola) y en el navegador (si se abre maria-montepeque.html) como una terminal real.

// ---------------------------------------------------------------------------
// 1. Datos de la nave y comandos disponibles
// ---------------------------------------------------------------------------

const MAPA_NAVE_BASE = {
  puente: {
    descripcion: 'Puente de mando. Las luces de emergencia parpadean sobre los controles.',
    salidas: { sur: 'pasillo' },
    items: ['tarjeta de acceso']
  },
  pasillo: {
    descripcion: 'Pasillo central. El zumbido de los motores se escucha a lo lejos.',
    salidas: { norte: 'puente', este: 'sala_maquinas', oeste: 'camarotes' },
    items: []
  },
  sala_maquinas: {
    descripcion: 'Sala de maquinas. El reactor principal esta inestable.',
    salidas: { oeste: 'pasillo' },
    items: ['llave inglesa']
  },
  camarotes: {
    descripcion: 'Camarotes de la tripulacion. Todo esta en silencio.',
    salidas: { este: 'pasillo' },
    items: ['linterna']
  }
};

const COMANDOS_DISPONIBLES = ['ayuda', 'mirar', 'ir', 'tomar', 'inventario', 'escanear', 'historial', 'salir'];

// ---------------------------------------------------------------------------
// 2. Creacion y clonado del estado (para no mutar los datos base)
// ---------------------------------------------------------------------------

function clonarMapa(mapa) {
  return Object.fromEntries(
    Object.entries(mapa).map(([id, sala]) => [
      id,
      { ...sala, salidas: { ...sala.salidas }, items: [...sala.items] }
    ])
  );
}

function crearEstadoInicial() {
  return {
    mapa: clonarMapa(MAPA_NAVE_BASE),
    ubicacionActual: 'puente',
    inventario: [],
    historial: [],
    salir: false
  };
}

// ---------------------------------------------------------------------------
// 3. Parseo y validacion de la entrada del usuario
// ---------------------------------------------------------------------------

function validarEntrada(entradaCruda) {
  if (typeof entradaCruda !== 'string' || entradaCruda.trim() === '') {
    return { valido: false, motivo: 'El comando no puede estar vacio.' };
  }
  return { valido: true };
}

function parsearComando(entradaCruda) {
  const partes = entradaCruda.trim().toLowerCase().split(/\s+/);
  const comando = partes[0] ?? '';
  const argumento = partes.slice(1).join(' ');
  return { comando, argumento };
}

// ---------------------------------------------------------------------------
// 4. Acciones disponibles (cada una recibe el estado y devuelve { mensaje, estado, salir? })
// ---------------------------------------------------------------------------

function ejecutarAyuda(estado) {
  return { mensaje: `Comandos disponibles: ${COMANDOS_DISPONIBLES.join(', ')}.`, estado };
}

function ejecutarMirar(estado) {
  const sala = estado.mapa[estado.ubicacionActual];
  const salidas = Object.keys(sala.salidas).join(', ') || 'ninguna';
  const items = sala.items.length ? sala.items.join(', ') : 'nada interesante';
  return { mensaje: `${sala.descripcion}\nSalidas: ${salidas}\nObjetos visibles: ${items}`, estado };
}

function ejecutarIr(estado, direccion) {
  if (!direccion) {
    return { mensaje: 'Indica hacia donde ir. Ejemplo: "ir norte".', estado };
  }

  const sala = estado.mapa[estado.ubicacionActual];
  const destino = sala.salidas[direccion];

  if (!destino) {
    return { mensaje: `No puedes ir hacia "${direccion}" desde aqui.`, estado };
  }

  const nuevoEstado = { ...estado, ubicacionActual: destino };
  return { mensaje: `Te mueves hacia el ${direccion}. Ahora estas en "${destino}".`, estado: nuevoEstado };
}

function ejecutarTomar(estado, nombreItem) {
  if (!nombreItem) {
    return { mensaje: 'Indica que objeto quieres tomar. Ejemplo: "tomar linterna".', estado };
  }

  const sala = estado.mapa[estado.ubicacionActual];
  if (!sala.items.includes(nombreItem)) {
    return { mensaje: `Aqui no hay ningun "${nombreItem}".`, estado };
  }

  const nuevaSala = { ...sala, items: sala.items.filter((item) => item !== nombreItem) };
  const nuevoMapa = { ...estado.mapa, [estado.ubicacionActual]: nuevaSala };
  const nuevoInventario = [...estado.inventario, nombreItem];
  const nuevoEstado = { ...estado, mapa: nuevoMapa, inventario: nuevoInventario };

  return { mensaje: `Tomaste "${nombreItem}".`, estado: nuevoEstado };
}

function ejecutarInventario(estado) {
  const texto = estado.inventario.length ? estado.inventario.join(', ') : 'no tienes objetos todavia';
  return { mensaje: `Inventario: ${texto}.`, estado };
}

// Reto extra: comando de escaneo con un resumen estadistico de la nave.
function ejecutarEscaneo(estado) {
  const salas = Object.values(estado.mapa);
  const objetosRestantes = salas.reduce((acumulado, sala) => acumulado + sala.items.length, 0);
  const mensaje =
    `Escaneo de la nave: ${salas.length} salas registradas, ` +
    `${objetosRestantes} objetos sin recolectar, llevas ${estado.inventario.length} objeto(s) contigo.`;
  return { mensaje, estado };
}

function ejecutarHistorial(estado) {
  if (estado.historial.length === 0) {
    return { mensaje: 'Aun no has ejecutado ningun comando.', estado };
  }
  const texto = estado.historial
    .map((entrada, indice) => `${indice + 1}. > ${entrada.comando}\n   ${entrada.respuesta}`)
    .join('\n');
  return { mensaje: texto, estado };
}

function ejecutarSalir(estado) {
  return { mensaje: 'Cerrando terminal. Hasta la proxima, comandante.', estado, salir: true };
}

// ---------------------------------------------------------------------------
// 5. Despacho de comandos (switch) + registro en el historial
// ---------------------------------------------------------------------------

function despacharComando(estado, comando, argumento) {
  switch (comando) {
    case 'ayuda':
      return ejecutarAyuda(estado);
    case 'mirar':
      return ejecutarMirar(estado);
    case 'ir':
      return ejecutarIr(estado, argumento);
    case 'tomar':
      return ejecutarTomar(estado, argumento);
    case 'inventario':
      return ejecutarInventario(estado);
    case 'escanear':
      return ejecutarEscaneo(estado);
    case 'historial':
      return ejecutarHistorial(estado);
    case 'salir':
      return ejecutarSalir(estado);
    default:
      return { mensaje: `Comando desconocido: "${comando}". Escribe "ayuda" para ver los comandos disponibles.`, estado };
  }
}

function registrarEnHistorial(estado, entradaCruda, mensaje) {
  const nuevaEntrada = { comando: entradaCruda.trim(), respuesta: mensaje };
  return { ...estado, historial: [...estado.historial, nuevaEntrada] };
}

function ejecutarComando(estado, entradaCruda) {
  const validacion = validarEntrada(entradaCruda);
  if (!validacion.valido) {
    return { ...registrarEnHistorial(estado, entradaCruda ?? '', validacion.motivo), salir: estado.salir };
  }

  const { comando, argumento } = parsearComando(entradaCruda);
  const resultado = despacharComando(estado, comando, argumento);
  const estadoConHistorial = registrarEnHistorial(resultado.estado, entradaCruda, resultado.mensaje);

  return { ...estadoConHistorial, salir: Boolean(resultado.salir) };
}

// ---------------------------------------------------------------------------
// 6. Ejecucion de una secuencia de comandos (util para consola y para pruebas)
// ---------------------------------------------------------------------------

function ejecutarSecuenciaComandos(comandos) {
  return comandos.reduce((estado, entradaCruda) => {
    if (estado.salir) return estado;
    return ejecutarComando(estado, entradaCruda);
  }, crearEstadoInicial());
}

function renderizarHistorialEnConsola(estado) {
  console.log('\n=== Historial de la sesion ===');
  estado.historial.forEach((entrada, indice) => {
    console.log(`${indice + 1}. > ${entrada.comando}`);
    console.log(`   ${entrada.respuesta}`);
  });
}

// ---------------------------------------------------------------------------
// 7. Interfaz en el DOM (solo corre en el navegador)
// ---------------------------------------------------------------------------

function agregarLineaAlLog(contenedor, texto, clase) {
  if (typeof document === 'undefined' || !contenedor) return;
  const linea = document.createElement('p');
  linea.textContent = texto;
  if (clase) linea.className = clase;
  contenedor.appendChild(linea);
  contenedor.scrollTop = contenedor.scrollHeight;
}

function iniciarAplicacionDOM() {
  const logTerminal = document.querySelector('#log-terminal');
  const formulario = document.querySelector('#formulario-comando');
  const entradaComando = document.querySelector('#entrada-comando');

  if (!logTerminal || !formulario || !entradaComando) return;

  let estadoActual = crearEstadoInicial();

  agregarLineaAlLog(logTerminal, 'Terminal de la nave lista. Escribe "ayuda" para ver los comandos.', 'sistema');

  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const entradaCruda = entradaComando.value;

    if (estadoActual.salir) {
      agregarLineaAlLog(logTerminal, 'La sesion ya termino. Recarga la pagina para empezar de nuevo.', 'error');
      return;
    }

    agregarLineaAlLog(logTerminal, `> ${entradaCruda}`, 'comando');
    estadoActual = ejecutarComando(estadoActual, entradaCruda);

    const ultimaEntrada = estadoActual.historial[estadoActual.historial.length - 1];
    agregarLineaAlLog(logTerminal, ultimaEntrada.respuesta, 'respuesta');

    if (estadoActual.salir) {
      entradaComando.disabled = true;
    }

    entradaComando.value = '';
    entradaComando.focus();
  });
}

// ---------------------------------------------------------------------------
// 8. Ejecucion por consola (node maria-montepeque.js) con al menos dos casos de prueba
// ---------------------------------------------------------------------------

function resolverEjercicio() {
  console.log('=== 70. Terminal sci-fi ===');

  // Caso 1: secuencia normal de comandos validos, incluyendo el reto extra "escanear".
  const secuenciaCaso1 = [
    'mirar',
    'ir sur',
    'ir este',
    'tomar llave inglesa',
    'ir oeste',
    'ir oeste',
    'tomar linterna',
    'inventario',
    'escanear',
    'ir arriba'
  ];
  console.log('\nCaso 1 - secuencia de comandos validos:');
  const estadoCaso1 = ejecutarSecuenciaComandos(secuenciaCaso1);
  renderizarHistorialEnConsola(estadoCaso1);

  // Caso 2: entradas invalidas (vacia, comando inexistente) y el comando "salir".
  const secuenciaCaso2 = ['', '   ', 'autodestruir', 'ayuda', 'salir', 'mirar'];
  console.log('\nCaso 2 - entradas vacias, comando desconocido y salir:');
  const estadoCaso2 = ejecutarSecuenciaComandos(secuenciaCaso2);
  renderizarHistorialEnConsola(estadoCaso2);

  return { estadoCaso1, estadoCaso2 };
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', iniciarAplicacionDOM);
} else {
  resolverEjercicio();
}
