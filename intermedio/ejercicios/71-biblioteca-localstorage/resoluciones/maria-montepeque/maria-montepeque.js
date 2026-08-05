// 71. Biblioteca con localStorage
// Resolucion: maria-montepeque
//
// Idea de la solucion:
// 1. Un CRUD de libros (agregar, actualizar estado, eliminar, listar/filtrar) que siempre lee y
//    escribe a traves de un "almacenamiento" con la misma interfaz que localStorage
//    (getItem/setItem), guardando los datos como JSON.
// 2. En el navegador ese almacenamiento es el `localStorage` real (persiste entre recargas).
//    En Node no existe `localStorage`, asi que se usa un almacenamiento en memoria con la
//    misma forma, para poder ejecutar y probar el CRUD con `node maria-montepeque.js`.
// 3. Funciones pequenas: validar, leer, guardar, agregar, actualizar, eliminar, filtrar y renderizar.

// ---------------------------------------------------------------------------
// 1. Configuracion y datos semilla
// ---------------------------------------------------------------------------

const CLAVE_ALMACENAMIENTO = 'biblioteca_libros';
const ESTADOS_VALIDOS = ['pendiente', 'leyendo', 'leido'];

const LIBROS_SEMILLA = [
  { id: 1, titulo: 'Cien anios de soledad', autor: 'Gabriel Garcia Marquez', anio: 1967, estado: 'leido' },
  { id: 2, titulo: 'Dune', autor: 'Frank Herbert', anio: 1965, estado: 'pendiente' },
  { id: 3, titulo: 'El nombre del viento', autor: 'Patrick Rothfuss', anio: 2007, estado: 'leyendo' }
];

// ---------------------------------------------------------------------------
// 2. Almacenamiento: localStorage real en el navegador, en memoria en Node
// ---------------------------------------------------------------------------

function crearAlmacenamientoEnMemoria() {
  const datos = new Map();
  return {
    getItem: (clave) => (datos.has(clave) ? datos.get(clave) : null),
    setItem: (clave, valor) => datos.set(clave, String(valor)),
    removeItem: (clave) => datos.delete(clave)
  };
}

function obtenerAlmacenamiento() {
  return typeof localStorage !== 'undefined' ? localStorage : crearAlmacenamientoEnMemoria();
}

// ---------------------------------------------------------------------------
// 3. Lectura y escritura (JSON)
// ---------------------------------------------------------------------------

function leerLibros(almacenamiento) {
  const crudo = almacenamiento.getItem(CLAVE_ALMACENAMIENTO);
  if (!crudo) return [];

  try {
    const datos = JSON.parse(crudo);
    return Array.isArray(datos) ? datos : [];
  } catch (error) {
    console.warn('No se pudo leer la biblioteca guardada, se reinicia vacia.', error.message);
    return [];
  }
}

function guardarLibros(almacenamiento, libros) {
  almacenamiento.setItem(CLAVE_ALMACENAMIENTO, JSON.stringify(libros));
}

function inicializarBiblioteca(almacenamiento, librosSemilla = LIBROS_SEMILLA) {
  const librosGuardados = leerLibros(almacenamiento);
  if (librosGuardados.length > 0) return librosGuardados;

  guardarLibros(almacenamiento, librosSemilla);
  return librosSemilla;
}

// ---------------------------------------------------------------------------
// 4. Validaciones
// ---------------------------------------------------------------------------

function validarDatosLibro(datosLibro) {
  if (!datosLibro || typeof datosLibro !== 'object') {
    return { valido: false, motivo: 'Los datos del libro no son validos.' };
  }

  const { titulo, autor, anio } = datosLibro;

  if (!titulo || typeof titulo !== 'string' || titulo.trim() === '') {
    return { valido: false, motivo: 'El titulo es obligatorio.' };
  }
  if (!autor || typeof autor !== 'string' || autor.trim() === '') {
    return { valido: false, motivo: 'El autor es obligatorio.' };
  }

  const anioNumero = Number(anio);
  if (!Number.isInteger(anioNumero) || anioNumero <= 0) {
    return { valido: false, motivo: 'El anio debe ser un numero entero valido.' };
  }

  return { valido: true };
}

function generarIdLibro(libros) {
  if (libros.length === 0) return 1;
  return Math.max(...libros.map((libro) => libro.id)) + 1;
}

// ---------------------------------------------------------------------------
// 5. CRUD
// ---------------------------------------------------------------------------

function agregarLibro(almacenamiento, datosLibro) {
  const validacion = validarDatosLibro(datosLibro);
  if (!validacion.valido) {
    return { exito: false, motivo: validacion.motivo, libros: leerLibros(almacenamiento) };
  }

  const libros = leerLibros(almacenamiento);
  const nuevoLibro = {
    id: generarIdLibro(libros),
    titulo: datosLibro.titulo.trim(),
    autor: datosLibro.autor.trim(),
    anio: Number(datosLibro.anio),
    estado: 'pendiente'
  };

  const librosActualizados = [...libros, nuevoLibro];
  guardarLibros(almacenamiento, librosActualizados);

  return { exito: true, libro: nuevoLibro, libros: librosActualizados };
}

function actualizarEstadoLibro(almacenamiento, id, nuevoEstado) {
  if (!ESTADOS_VALIDOS.includes(nuevoEstado)) {
    return {
      exito: false,
      motivo: `Estado invalido: "${nuevoEstado}". Usa uno de: ${ESTADOS_VALIDOS.join(', ')}.`,
      libros: leerLibros(almacenamiento)
    };
  }

  const libros = leerLibros(almacenamiento);
  if (!libros.some((libro) => libro.id === id)) {
    return { exito: false, motivo: `No existe un libro con id ${id}.`, libros };
  }

  const librosActualizados = libros.map((libro) =>
    libro.id === id ? { ...libro, estado: nuevoEstado } : libro
  );
  guardarLibros(almacenamiento, librosActualizados);

  return { exito: true, libros: librosActualizados };
}

function eliminarLibro(almacenamiento, id) {
  const libros = leerLibros(almacenamiento);
  if (!libros.some((libro) => libro.id === id)) {
    return { exito: false, motivo: `No existe un libro con id ${id}.`, libros };
  }

  const librosActualizados = libros.filter((libro) => libro.id !== id);
  guardarLibros(almacenamiento, librosActualizados);

  return { exito: true, libros: librosActualizados };
}

// ---------------------------------------------------------------------------
// 6. Filtros y resumen (reto extra: resumen estadistico por estado)
// ---------------------------------------------------------------------------

function filtrarLibrosPorEstado(libros, estado) {
  if (!estado || estado === 'todos') return libros;
  return libros.filter((libro) => libro.estado === estado);
}

function generarResumenBiblioteca(libros) {
  return ESTADOS_VALIDOS.reduce(
    (resumen, estado) => {
      resumen[estado] = libros.filter((libro) => libro.estado === estado).length;
      return resumen;
    },
    { total: libros.length }
  );
}

// ---------------------------------------------------------------------------
// 7. Interfaz en el DOM (usa localStorage real, persiste entre recargas)
// ---------------------------------------------------------------------------

function crearFilaLibro(libro, almacenamiento, onCambio) {
  const fila = document.createElement('li');
  fila.className = 'libro';

  const info = document.createElement('span');
  info.textContent = `${libro.titulo} - ${libro.autor} (${libro.anio})`;

  const selectorEstado = document.createElement('select');
  ESTADOS_VALIDOS.forEach((estado) => {
    const opcion = document.createElement('option');
    opcion.value = estado;
    opcion.textContent = estado;
    opcion.selected = estado === libro.estado;
    selectorEstado.appendChild(opcion);
  });
  selectorEstado.addEventListener('change', () => {
    actualizarEstadoLibro(almacenamiento, libro.id, selectorEstado.value);
    onCambio();
  });

  const botonEliminar = document.createElement('button');
  botonEliminar.type = 'button';
  botonEliminar.textContent = 'Eliminar';
  botonEliminar.addEventListener('click', () => {
    eliminarLibro(almacenamiento, libro.id);
    onCambio();
  });

  fila.append(info, selectorEstado, botonEliminar);
  return fila;
}

function iniciarAplicacionDOM() {
  const almacenamiento = obtenerAlmacenamiento();
  const formulario = document.querySelector('#formulario-libro');
  const listaLibros = document.querySelector('#lista-libros');
  const resumenElemento = document.querySelector('#resumen-biblioteca');
  const mensajeElemento = document.querySelector('#mensaje-estado');
  const botonesFiltro = document.querySelectorAll('[data-estado]');

  if (!formulario || !listaLibros || !resumenElemento || !mensajeElemento) return;

  inicializarBiblioteca(almacenamiento);
  let filtroActual = 'todos';

  function renderizarBiblioteca() {
    const libros = leerLibros(almacenamiento);
    const librosFiltrados = filtrarLibrosPorEstado(libros, filtroActual);

    listaLibros.innerHTML = '';
    if (librosFiltrados.length === 0) {
      const vacio = document.createElement('li');
      vacio.textContent = 'No hay libros para este filtro.';
      listaLibros.appendChild(vacio);
    } else {
      librosFiltrados.forEach((libro) => {
        listaLibros.appendChild(crearFilaLibro(libro, almacenamiento, renderizarBiblioteca));
      });
    }

    const resumen = generarResumenBiblioteca(libros);
    resumenElemento.textContent =
      `Total: ${resumen.total} | Pendiente: ${resumen.pendiente} | ` +
      `Leyendo: ${resumen.leyendo} | Leido: ${resumen.leido}`;
  }

  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const datosFormulario = new FormData(formulario);
    const resultado = agregarLibro(almacenamiento, {
      titulo: datosFormulario.get('titulo'),
      autor: datosFormulario.get('autor'),
      anio: datosFormulario.get('anio')
    });

    if (!resultado.exito) {
      mensajeElemento.textContent = resultado.motivo;
      mensajeElemento.className = 'mensaje error';
      return;
    }

    mensajeElemento.textContent = `Libro agregado: "${resultado.libro.titulo}".`;
    mensajeElemento.className = 'mensaje exito';
    formulario.reset();
    renderizarBiblioteca();
  });

  botonesFiltro.forEach((boton) => {
    boton.addEventListener('click', () => {
      filtroActual = boton.dataset.estado;
      botonesFiltro.forEach((otro) => otro.classList.toggle('activo', otro === boton));
      renderizarBiblioteca();
    });
  });

  renderizarBiblioteca();
}

// ---------------------------------------------------------------------------
// 8. Renderizado y ejecucion por consola (node maria-montepeque.js)
// ---------------------------------------------------------------------------

function mostrarLibrosEnConsola(etiqueta, libros) {
  console.log(`\n${etiqueta}`);
  if (typeof console.table === 'function') {
    console.table(libros);
  } else {
    libros.forEach((libro) => console.log(libro));
  }
}

function resolverEjercicio() {
  const almacenamiento = obtenerAlmacenamiento();
  guardarLibros(almacenamiento, []); // punto de partida limpio para poder repetir la demo siempre igual
  const librosIniciales = inicializarBiblioteca(almacenamiento);

  console.log('=== 71. Biblioteca con localStorage ===');
  mostrarLibrosEnConsola('Biblioteca inicial (semilla):', librosIniciales);

  // Caso 1: CRUD valido - agregar, actualizar estado y filtrar.
  console.log('\nCaso 1 - CRUD valido:');
  const resultadoAgregar = agregarLibro(almacenamiento, {
    titulo: 'Fahrenheit 451',
    autor: 'Ray Bradbury',
    anio: 1953
  });
  console.log('Agregar libro:', resultadoAgregar.exito ? resultadoAgregar.libro : resultadoAgregar.motivo);

  const resultadoEstado = actualizarEstadoLibro(almacenamiento, resultadoAgregar.libro.id, 'leyendo');
  console.log('Actualizar estado a "leyendo":', resultadoEstado.exito ? 'ok' : resultadoEstado.motivo);

  const librosLeyendo = filtrarLibrosPorEstado(leerLibros(almacenamiento), 'leyendo');
  mostrarLibrosEnConsola('Libros en estado "leyendo":', librosLeyendo);

  // Caso 2: validaciones y errores - libro incompleto, estado invalido, id inexistente.
  console.log('\nCaso 2 - validaciones y errores:');
  const libroInvalido = agregarLibro(almacenamiento, { titulo: '', autor: 'Anonimo', anio: 2020 });
  console.log('Agregar libro sin titulo:', libroInvalido.exito ? 'agregado' : libroInvalido.motivo);

  const estadoInvalido = actualizarEstadoLibro(almacenamiento, resultadoAgregar.libro.id, 'perdido');
  console.log('Actualizar a estado invalido:', estadoInvalido.exito ? 'ok' : estadoInvalido.motivo);

  const eliminarInexistente = eliminarLibro(almacenamiento, 9999);
  console.log('Eliminar id inexistente:', eliminarInexistente.exito ? 'ok' : eliminarInexistente.motivo);

  const librosFinales = leerLibros(almacenamiento);
  console.log('\nResumen final de la biblioteca:', generarResumenBiblioteca(librosFinales));
  mostrarLibrosEnConsola('Estado final de la biblioteca:', librosFinales);

  return { librosIniciales, librosFinales };
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', iniciarAplicacionDOM);
} else {
  resolverEjercicio();
}
