// 48. Render farm 3D - Resolucion Maria Montepeque

const nodos = [
  { nombre: 'Nodo-A', potencia: 120 },
  { nombre: 'Nodo-B', potencia: 90 },
  { nombre: 'Nodo-C', potencia: 150 }
];

const trabajos = [
  { nombre: 'Escena Bosque', framesTotales: 600, complejidad: 1.5 },
  { nombre: 'Escena Ciudad', framesTotales: 900, complejidad: 1.2 },
  { nombre: 'Escena Espacio', framesTotales: 450, complejidad: 2.0 },
  { nombre: 'Escena Interior', framesTotales: 300, complejidad: 1.0 }
];

function esNodoValido(nodo) {
  return nodo && typeof nodo.nombre === 'string' && nodo.nombre.trim() !== '' && typeof nodo.potencia === 'number' && nodo.potencia > 0;
}

function esTrabajoValido(trabajo) {
  return (
    trabajo &&
    typeof trabajo.nombre === 'string' &&
    trabajo.nombre.trim() !== '' &&
    typeof trabajo.framesTotales === 'number' &&
    trabajo.framesTotales > 0 &&
    typeof trabajo.complejidad === 'number' &&
    trabajo.complejidad > 0
  );
}

function estimarTiempoEnNodo(trabajo, nodo) {
  return Number(((trabajo.framesTotales * trabajo.complejidad) / nodo.potencia).toFixed(2));
}

function encontrarNodoMenosCargado(cargaPorNodo) {
  return [...cargaPorNodo.entries()].reduce((menor, actual) => (actual[1] < menor[1] ? actual : menor))[0];
}

function asignarTrabajos(nodosValidos, trabajosValidos) {
  const cargaPorNodo = new Map(nodosValidos.map((nodo) => [nodo.nombre, 0]));
  const nodosPorNombre = new Map(nodosValidos.map((nodo) => [nodo.nombre, nodo]));

  const asignaciones = trabajosValidos.map((trabajo) => {
    const nombreNodoElegido = encontrarNodoMenosCargado(cargaPorNodo);
    const nodoElegido = nodosPorNombre.get(nombreNodoElegido);
    const tiempoEstimadoMin = estimarTiempoEnNodo(trabajo, nodoElegido);

    cargaPorNodo.set(nombreNodoElegido, cargaPorNodo.get(nombreNodoElegido) + tiempoEstimadoMin);

    return { trabajo: trabajo.nombre, nodoAsignado: nombreNodoElegido, tiempoEstimadoMin };
  });

  return { asignaciones, cargaPorNodo };
}

function simularRenderFarm(nodosBase, trabajosBase) {
  const nodosValidos = nodosBase.filter(esNodoValido);

  if (nodosValidos.length === 0) {
    return { valido: false, motivo: 'no hay nodos validos disponibles' };
  }

  const trabajosValidos = trabajosBase.filter(esTrabajoValido);
  const { asignaciones, cargaPorNodo } = asignarTrabajos(nodosValidos, trabajosValidos);

  const cargaFinal = [...cargaPorNodo.entries()].map(([nombre, minutos]) => ({
    nodo: nombre,
    minutosOcupado: Number(minutos.toFixed(2))
  }));

  return {
    valido: true,
    totalNodos: nodosBase.length,
    nodosInvalidos: nodosBase.length - nodosValidos.length,
    totalTrabajos: trabajosBase.length,
    trabajosInvalidos: trabajosBase.length - trabajosValidos.length,
    asignaciones,
    cargaPorNodo: cargaFinal,
    tiempoTotalEstimadoMin: Number(Math.max(...cargaFinal.map((carga) => carga.minutosOcupado)).toFixed(2))
  };
}

console.log('Caso 1: 3 nodos y 4 trabajos distribuidos por menor carga');
console.log(JSON.stringify(simularRenderFarm(nodos, trabajos), null, 2));

const nodosConCasoLimite = [...nodos, { nombre: 'Nodo-Roto', potencia: 0 }];
const trabajosConCasoLimite = [...trabajos, { nombre: 'Escena Corrupta', framesTotales: -100, complejidad: 1 }];

console.log('\nCaso 2: incluye nodo invalido (potencia 0) y trabajo invalido (frames negativos)');
console.log(JSON.stringify(simularRenderFarm(nodosConCasoLimite, trabajosConCasoLimite), null, 2));
