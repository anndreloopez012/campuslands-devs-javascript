// 20. Comparador de turismo - Resolucion Maria Montepeque

function validarPaquete(paquete) {
  return (
    paquete &&
    typeof paquete.nombre === 'string' &&
    typeof paquete.precio === 'number' &&
    paquete.precio > 0 &&
    typeof paquete.duracionDias === 'number' &&
    paquete.duracionDias > 0 &&
    typeof paquete.rating === 'number' &&
    paquete.rating >= 0 &&
    paquete.rating <= 5
  );
}

function calcularScore(paquete) {
  const scoreRating = paquete.rating * 20;
  const scoreDuracion = Math.min(paquete.duracionDias * 5, 30);
  const scorePrecio = Math.max(30 - paquete.precio / 50, 0);
  return Number((scoreRating + scoreDuracion + scorePrecio).toFixed(2));
}

function filtrarPorPresupuesto(paquetes, presupuestoMaximo) {
  return paquetes.filter((paquete) => paquete.precio <= presupuestoMaximo);
}

function ordenarPorScore(paquetes) {
  return [...paquetes].sort((a, b) => b.score - a.score);
}

function compararPaquetes(paquetes, presupuestoMaximo) {
  const validos = paquetes.filter(validarPaquete);
  const dentroDePresupuesto = filtrarPorPresupuesto(validos, presupuestoMaximo);
  const conScore = dentroDePresupuesto.map((paquete) => ({ ...paquete, score: calcularScore(paquete) }));
  const ordenados = ordenarPorScore(conScore);

  return {
    ranking: ordenados.map((paquete) => ({ nombre: paquete.nombre, precio: paquete.precio, score: paquete.score })),
    recomendado: ordenados.length > 0 ? ordenados[0].nombre : null,
    paquetesFueraDePresupuesto: validos.length - dentroDePresupuesto.length,
    paquetesInvalidos: paquetes.length - validos.length
  };
}

const paquetes = [
  { nombre: 'Playa Relax', precio: 450, duracionDias: 5, rating: 4.5, tipo: 'playa' },
  { nombre: 'Aventura Montana', precio: 600, duracionDias: 7, rating: 4.8, tipo: 'aventura' },
  { nombre: 'City Break', precio: 300, duracionDias: 3, rating: 4.0, tipo: 'ciudad' }
];

console.log('Caso 1: comparacion con presupuesto de 500');
console.log(JSON.stringify(compararPaquetes(paquetes, 500), null, 2));

console.log('\nCaso 2: comparacion con presupuesto amplio (todos entran)');
console.log(JSON.stringify(compararPaquetes(paquetes, 1000), null, 2));

const paquetesConInvalido = [...paquetes, { nombre: 'Paquete Roto', precio: -100, duracionDias: 2, rating: 3 }];

console.log('\nCaso 3: incluye un paquete invalido (precio negativo)');
console.log(JSON.stringify(compararPaquetes(paquetesConInvalido, 1000), null, 2));
