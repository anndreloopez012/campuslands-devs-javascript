// 51. Balance quimico simple - Resolucion Maria Montepeque

const ecuaciones = [
  { nombre: 'Formacion de agua', reactivos: { H: 4, O: 2 }, productos: { H: 4, O: 2 } },
  { nombre: 'Combustion de metano', reactivos: { C: 1, H: 4, O: 4 }, productos: { C: 1, H: 4, O: 3 } },
  { nombre: 'Formacion de sal', reactivos: { Na: 2, Cl: 2 }, productos: { Na: 2, Cl: 1, Fe: 1 } }
];

function esConteoValido(conteo) {
  return (
    conteo &&
    typeof conteo === 'object' &&
    !Array.isArray(conteo) &&
    Object.keys(conteo).length > 0 &&
    Object.values(conteo).every((cantidad) => typeof cantidad === 'number' && cantidad >= 0)
  );
}

function esEcuacionValida(ecuacion) {
  return (
    ecuacion &&
    typeof ecuacion.nombre === 'string' &&
    ecuacion.nombre.trim() !== '' &&
    esConteoValido(ecuacion.reactivos) &&
    esConteoValido(ecuacion.productos)
  );
}

function obtenerElementosUnicos(reactivos, productos) {
  return [...new Set([...Object.keys(reactivos), ...Object.keys(productos)])];
}

function compararElemento(elemento, reactivos, productos) {
  const cantidadReactivos = reactivos[elemento] || 0;
  const cantidadProductos = productos[elemento] || 0;

  return {
    elemento,
    reactivos: cantidadReactivos,
    productos: cantidadProductos,
    balanceado: cantidadReactivos === cantidadProductos,
    diferencia: cantidadProductos - cantidadReactivos
  };
}

function generarSugerencia(comparacion) {
  if (comparacion.balanceado) return null;
  if (comparacion.diferencia > 0) return `agregar ${comparacion.diferencia} de ${comparacion.elemento} en reactivos`;
  return `agregar ${Math.abs(comparacion.diferencia)} de ${comparacion.elemento} en productos`;
}

function evaluarEcuacion(ecuacion) {
  const elementos = obtenerElementosUnicos(ecuacion.reactivos, ecuacion.productos);
  const comparaciones = elementos.map((elemento) => compararElemento(elemento, ecuacion.reactivos, ecuacion.productos));
  const desbalanceados = comparaciones.filter((comparacion) => !comparacion.balanceado);

  return {
    nombre: ecuacion.nombre,
    balanceada: desbalanceados.length === 0,
    comparaciones,
    elementosDesbalanceados: desbalanceados.map((comparacion) => comparacion.elemento),
    sugerencias: desbalanceados.map(generarSugerencia)
  };
}

function analizarEcuaciones(ecuacionesBase) {
  const ecuacionesValidas = ecuacionesBase.filter(esEcuacionValida);
  const evaluaciones = ecuacionesValidas.map(evaluarEcuacion);

  return {
    totalEcuaciones: ecuacionesBase.length,
    ecuacionesInvalidas: ecuacionesBase.length - ecuacionesValidas.length,
    evaluaciones,
    balanceadas: evaluaciones.filter((evaluacion) => evaluacion.balanceada).map((evaluacion) => evaluacion.nombre),
    desbalanceadas: evaluaciones.filter((evaluacion) => !evaluacion.balanceada).map((evaluacion) => evaluacion.nombre)
  };
}

console.log('Caso 1: 3 ecuaciones (una balanceada, dos desbalanceadas por distintos motivos)');
console.log(JSON.stringify(analizarEcuaciones(ecuaciones), null, 2));

const ecuacionesConCasosLimite = [
  ...ecuaciones,
  { nombre: 'Sin reactivos', reactivos: {}, productos: { H: 2 } },
  { nombre: 'Cantidad negativa', reactivos: { O: -2 }, productos: { O: 2 } }
];

console.log('\nCaso 2: incluye ecuacion sin elementos en reactivos y ecuacion con cantidad negativa');
console.log(JSON.stringify(analizarEcuaciones(ecuacionesConCasosLimite), null, 2));
