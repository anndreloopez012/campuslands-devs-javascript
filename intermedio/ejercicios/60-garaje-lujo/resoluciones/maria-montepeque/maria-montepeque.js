// 60. Garaje de lujo - Resolucion Maria Montepeque

class AutoLujo {
  constructor(modelo, valorMercado, tasaImpuesto, costoMantenimientoAnual) {
    this.modelo = modelo;
    this.valorMercado = valorMercado;
    this.tasaImpuesto = tasaImpuesto;
    this.costoMantenimientoAnual = costoMantenimientoAnual;
  }

  calcularImpuesto() {
    return Number((this.valorMercado * this.tasaImpuesto).toFixed(2));
  }

  calcularCostoAnualTotal() {
    return Number((this.calcularImpuesto() + this.costoMantenimientoAnual).toFixed(2));
  }

  esCostosoDeMantener(umbral) {
    return this.calcularCostoAnualTotal() > umbral;
  }
}

const datosGaraje = [
  { modelo: 'Ferrari 488', valorMercado: 280000, tasaImpuesto: 0.03, costoMantenimientoAnual: 8000 },
  { modelo: 'Porsche 911', valorMercado: 150000, tasaImpuesto: 0.025, costoMantenimientoAnual: 4500 },
  { modelo: 'Lamborghini Huracan', valorMercado: 260000, tasaImpuesto: 0.035, costoMantenimientoAnual: 9500 },
  { modelo: 'Audi R8', valorMercado: 170000, tasaImpuesto: 0.028, costoMantenimientoAnual: 5000 }
];

function esDatoAutoValido(dato) {
  return (
    dato &&
    typeof dato.modelo === 'string' &&
    dato.modelo.trim() !== '' &&
    typeof dato.valorMercado === 'number' &&
    dato.valorMercado > 0 &&
    typeof dato.tasaImpuesto === 'number' &&
    dato.tasaImpuesto >= 0 &&
    typeof dato.costoMantenimientoAnual === 'number' &&
    dato.costoMantenimientoAnual >= 0
  );
}

function crearGaraje(datosAutosValidos) {
  return datosAutosValidos.map((dato) => new AutoLujo(dato.modelo, dato.valorMercado, dato.tasaImpuesto, dato.costoMantenimientoAnual));
}

function filtrarAutosCostosos(garaje, umbral) {
  return garaje.filter((auto) => auto.esCostosoDeMantener(umbral));
}

function resumirAuto(auto, umbral) {
  return {
    modelo: auto.modelo,
    valorMercado: auto.valorMercado,
    impuestoAnual: auto.calcularImpuesto(),
    costoMantenimientoAnual: auto.costoMantenimientoAnual,
    costoAnualTotal: auto.calcularCostoAnualTotal(),
    costoso: auto.esCostosoDeMantener(umbral)
  };
}

function generarReporteGaraje(datosAutosBase, umbralCostoAnual) {
  const datosValidos = datosAutosBase.filter(esDatoAutoValido);
  const garaje = crearGaraje(datosValidos);

  return {
    totalAutosRegistrados: datosAutosBase.length,
    autosInvalidos: datosAutosBase.length - datosValidos.length,
    umbralCostoAnual,
    resumen: garaje.map((auto) => resumirAuto(auto, umbralCostoAnual)),
    autosCostosos: filtrarAutosCostosos(garaje, umbralCostoAnual).map((auto) => auto.modelo)
  };
}

console.log('Caso 1: garaje de 4 autos con umbral de mantenimiento anual de $12,000');
console.log(JSON.stringify(generarReporteGaraje(datosGaraje, 12000), null, 2));

const datosGarajeConCasoLimite = [
  ...datosGaraje,
  { modelo: 'Auto sin impuesto', valorMercado: 90000, costoMantenimientoAnual: 3000 },
  { modelo: 'Valor invalido', valorMercado: -50000, tasaImpuesto: 0.02, costoMantenimientoAnual: 2000 }
];

console.log('\nCaso 2: incluye autos invalidos (sin tasaImpuesto, valorMercado negativo) con umbral mas bajo de $9,000');
console.log(JSON.stringify(generarReporteGaraje(datosGarajeConCasoLimite, 9000), null, 2));
