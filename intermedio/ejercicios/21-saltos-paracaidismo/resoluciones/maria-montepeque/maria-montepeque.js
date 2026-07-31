// 21. Bitacora de paracaidismo - Resolucion Maria Montepeque

function validarSalto(salto) {
  return (
    salto &&
    typeof salto.nombre === 'string' &&
    typeof salto.alturaMetros === 'number' &&
    salto.alturaMetros > 0 &&
    typeof salto.vientoKmh === 'number' &&
    salto.vientoKmh >= 0 &&
    typeof salto.experienciaSaltos === 'number' &&
    salto.experienciaSaltos >= 0
  );
}

function clasificarRiesgo(salto) {
  if (salto.vientoKmh > 30 || salto.experienciaSaltos < 5) return 'alto';
  if (salto.vientoKmh > 15 || salto.experienciaSaltos < 20) return 'moderado';
  return 'bajo';
}

function esRecomendado(salto) {
  return clasificarRiesgo(salto) !== 'alto';
}

function calcularAlturaPromedio(saltos) {
  if (saltos.length === 0) return 0;
  return Number((saltos.reduce((total, salto) => total + salto.alturaMetros, 0) / saltos.length).toFixed(2));
}

function filtrarNoRecomendados(saltos) {
  return saltos.filter((salto) => !esRecomendado(salto));
}

function analizarBitacora(saltos) {
  const validos = saltos.filter(validarSalto);

  return {
    saltos: validos.map((salto) => ({ nombre: salto.nombre, riesgo: clasificarRiesgo(salto) })),
    alturaPromedio: calcularAlturaPromedio(validos),
    noRecomendados: filtrarNoRecomendados(validos).map((salto) => salto.nombre),
    saltosInvalidos: saltos.length - validos.length
  };
}

const saltos = [
  { nombre: 'Salto Amanecer', alturaMetros: 4000, vientoKmh: 10, experienciaSaltos: 50 },
  { nombre: 'Salto Tormenta', alturaMetros: 3500, vientoKmh: 35, experienciaSaltos: 15 },
  { nombre: 'Salto Novato', alturaMetros: 3000, vientoKmh: 12, experienciaSaltos: 2 }
];

console.log('Caso 1: bitacora con saltos de distinto nivel de riesgo');
console.log(JSON.stringify(analizarBitacora(saltos), null, 2));

const saltosConInvalido = [...saltos, { nombre: 'Salto sin datos', vientoKmh: 10 }];

console.log('\nCaso 2: incluye un salto invalido (sin altura ni experiencia)');
console.log(JSON.stringify(analizarBitacora(saltosConInvalido), null, 2));
