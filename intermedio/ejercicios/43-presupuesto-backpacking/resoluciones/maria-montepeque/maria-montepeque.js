// 43. Presupuesto backpacking - Resolucion Maria Montepeque

const presupuestoDiarioMax = 60;

const gastos = [
  { dia: 1, categoria: 'transporte', monto: 15 },
  { dia: 1, categoria: 'comida', monto: 20 },
  { dia: 1, categoria: 'hospedaje', monto: 18 },
  { dia: 2, categoria: 'comida', monto: 25 },
  { dia: 2, categoria: 'hospedaje', monto: 18 },
  { dia: 2, categoria: 'actividades', monto: 30 },
  { dia: 3, categoria: 'transporte', monto: 10 },
  { dia: 3, categoria: 'comida', monto: 15 },
  { dia: 3, categoria: 'hospedaje', monto: 18 }
];

function esGastoValido(gasto) {
  return (
    gasto &&
    typeof gasto.dia === 'number' &&
    gasto.dia > 0 &&
    typeof gasto.categoria === 'string' &&
    gasto.categoria.trim() !== '' &&
    typeof gasto.monto === 'number' &&
    gasto.monto > 0
  );
}

function agruparPorCategoria(gastosValidos) {
  return gastosValidos.reduce((totales, gasto) => {
    totales[gasto.categoria] = Number(((totales[gasto.categoria] || 0) + gasto.monto).toFixed(2));
    return totales;
  }, {});
}

function agruparPorDia(gastosValidos) {
  return gastosValidos.reduce((totalesPorDia, gasto) => {
    totalesPorDia.set(gasto.dia, (totalesPorDia.get(gasto.dia) || 0) + gasto.monto);
    return totalesPorDia;
  }, new Map());
}

function calcularPromedioDiario(totalesDelDia) {
  const suma = totalesDelDia.reduce((total, dia) => total + dia.total, 0);
  return Number((suma / totalesDelDia.length).toFixed(2));
}

function detectarDiasFueraDePresupuesto(totalesDelDia, presupuestoMax) {
  return totalesDelDia.filter((dia) => dia.total > presupuestoMax);
}

function generarResumenPresupuesto(gastosBase, presupuestoMax) {
  const gastosValidos = gastosBase.filter(esGastoValido);
  const totalPorCategoria = agruparPorCategoria(gastosValidos);

  const totalPorDiaMap = agruparPorDia(gastosValidos);
  const totalPorDia = [...totalPorDiaMap.entries()]
    .map(([dia, total]) => ({ dia, total: Number(total.toFixed(2)) }))
    .sort((a, b) => a.dia - b.dia);

  const totalGeneral = Object.values(totalPorCategoria).reduce((total, monto) => total + monto, 0);

  return {
    totalRegistros: gastosBase.length,
    registrosInvalidos: gastosBase.length - gastosValidos.length,
    presupuestoDiarioMax: presupuestoMax,
    totalGeneral: Number(totalGeneral.toFixed(2)),
    totalPorCategoria,
    totalPorDia,
    promedioDiario: totalPorDia.length > 0 ? calcularPromedioDiario(totalPorDia) : 0,
    diasFueraDePresupuesto: detectarDiasFueraDePresupuesto(totalPorDia, presupuestoMax)
  };
}

console.log('Caso 1: viaje de 3 dias, todos dentro del presupuesto diario de $60');
console.log(JSON.stringify(generarResumenPresupuesto(gastos, presupuestoDiarioMax), null, 2));

const gastosConCasosLimite = [
  ...gastos,
  { dia: 4, categoria: 'hospedaje', monto: 40 },
  { dia: 4, categoria: 'actividades', monto: 35 },
  { dia: 5, categoria: 'comida', monto: -10 },
  { dia: 5, monto: 20 }
];

console.log('\nCaso 2: incluye un dia que excede el presupuesto y gastos invalidos (monto negativo y sin categoria)');
console.log(JSON.stringify(generarResumenPresupuesto(gastosConCasosLimite, presupuestoDiarioMax), null, 2));
