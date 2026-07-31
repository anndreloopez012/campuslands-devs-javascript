// 23. Comisiones de dibujo - Resolucion Maria Montepeque

const catalogoEstilos = {
  lineArt: 20,
  flatColor: 35,
  renderCompleto: 60,
  ilustracionCompleta: 90
};

function validarComision(comision) {
  return (
    comision &&
    typeof comision.cliente === 'string' &&
    typeof comision.estilo === 'string' &&
    catalogoEstilos[comision.estilo] !== undefined &&
    typeof comision.nivelDetalle === 'number' &&
    comision.nivelDetalle >= 1 &&
    comision.nivelDetalle <= 3 &&
    typeof comision.usoComercial === 'boolean' &&
    typeof comision.urgente === 'boolean'
  );
}

function calcularPrecioBase(comision) {
  return catalogoEstilos[comision.estilo] * comision.nivelDetalle;
}

function aplicarExtras(precioBase, comision) {
  let precio = precioBase;
  if (comision.usoComercial) precio += precioBase * 0.5;
  if (comision.urgente) precio += precioBase * 0.25;
  return precio;
}

function formatearMoneda(valor) {
  return `$${valor.toFixed(2)}`;
}

function cotizarComision(comision) {
  const precioBase = calcularPrecioBase(comision);
  const precioFinal = aplicarExtras(precioBase, comision);

  return {
    cliente: comision.cliente,
    estilo: comision.estilo,
    precioBase: formatearMoneda(precioBase),
    extras: { usoComercial: comision.usoComercial, urgente: comision.urgente },
    precioFinal: formatearMoneda(precioFinal)
  };
}

function generarResumen(comisiones) {
  const validas = comisiones.filter(validarComision);

  return {
    cotizaciones: validas.map(cotizarComision),
    comisionesInvalidas: comisiones.length - validas.length
  };
}

const comisiones = [
  { cliente: 'Karla', estilo: 'renderCompleto', nivelDetalle: 2, usoComercial: false, urgente: true },
  { cliente: 'Estudio Norte', estilo: 'ilustracionCompleta', nivelDetalle: 3, usoComercial: true, urgente: false }
];

console.log('Caso 1: cotizaciones normales');
console.log(JSON.stringify(generarResumen(comisiones), null, 2));

const comisionesConInvalida = [
  ...comisiones,
  { cliente: 'Sin estilo', estilo: 'inexistente', nivelDetalle: 1, usoComercial: false, urgente: false }
];

console.log('\nCaso 2: incluye una comision invalida (estilo inexistente en el catalogo)');
console.log(JSON.stringify(generarResumen(comisionesConInvalida), null, 2));
