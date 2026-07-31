// 16. Biblioteca tech - Resolucion Maria Montepeque

function validarLibro(libro) {
  return (
    libro &&
    typeof libro.id === 'number' &&
    typeof libro.titulo === 'string' &&
    typeof libro.paginasTotal === 'number' &&
    libro.paginasTotal > 0 &&
    typeof libro.paginasLeidas === 'number' &&
    libro.paginasLeidas >= 0 &&
    typeof libro.prestado === 'boolean'
  );
}

function calcularPorcentajeLeido(libro) {
  return Math.round((libro.paginasLeidas / libro.paginasTotal) * 100);
}

function buscarLibroPorId(libros, id) {
  return libros.find((libro) => libro.id === id) ?? null;
}

function prestarLibro(libros, id) {
  const libro = buscarLibroPorId(libros, id);
  if (!libro) return { exito: false, mensaje: `Libro con id ${id} no existe` };
  if (libro.prestado) return { exito: false, mensaje: `El libro "${libro.titulo}" ya esta prestado` };

  return {
    exito: true,
    libros: libros.map((actual) => (actual.id === id ? { ...actual, prestado: true } : actual))
  };
}

function devolverLibro(libros, id) {
  const libro = buscarLibroPorId(libros, id);
  if (!libro) return { exito: false, mensaje: `Libro con id ${id} no existe` };
  if (!libro.prestado) return { exito: false, mensaje: `El libro "${libro.titulo}" no estaba prestado` };

  return {
    exito: true,
    libros: libros.map((actual) => (actual.id === id ? { ...actual, prestado: false } : actual))
  };
}

function filtrarPorEstado(libros, estado) {
  if (estado === 'prestado') return libros.filter((libro) => libro.prestado);
  if (estado === 'disponible') return libros.filter((libro) => !libro.prestado);
  if (estado === 'pendiente') return libros.filter((libro) => libro.paginasLeidas === 0);
  return [];
}

function resumenLibro(libro) {
  return {
    id: libro.id,
    titulo: libro.titulo,
    prestado: libro.prestado,
    porcentajeLeido: calcularPorcentajeLeido(libro)
  };
}

function gestionarBiblioteca(libros) {
  const validos = libros.filter(validarLibro);

  return {
    disponibles: filtrarPorEstado(validos, 'disponible').map(resumenLibro),
    prestados: filtrarPorEstado(validos, 'prestado').map(resumenLibro),
    pendientesDeLectura: filtrarPorEstado(validos, 'pendiente').map(resumenLibro),
    librosInvalidos: libros.length - validos.length
  };
}

const libros = [
  { id: 1, titulo: 'Clean Code', paginasTotal: 464, paginasLeidas: 464, prestado: false },
  { id: 2, titulo: 'You Dont Know JS', paginasTotal: 278, paginasLeidas: 120, prestado: true },
  { id: 3, titulo: 'Eloquent JavaScript', paginasTotal: 472, paginasLeidas: 0, prestado: false }
];

console.log('Caso 1: estado inicial de la biblioteca');
console.log(gestionarBiblioteca(libros));

console.log('\nCaso 2: prestar el libro id 1 y luego intentar prestarlo de nuevo');
const prestamo = prestarLibro(libros, 1);
console.log(prestamo);
if (prestamo.exito) {
  console.log(gestionarBiblioteca(prestamo.libros));
}
console.log(prestarLibro(prestamo.libros ?? libros, 1));

console.log('\nCaso 3: devolver un libro que no existe (validacion)');
console.log(devolverLibro(libros, 99));
