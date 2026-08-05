// 45. Log avanzado de saltos - Resolucion Maria Montepeque

const saltos = [
  { fecha: '2026-05-03', vientoKmh: 12, altitudM: 4000 },
  { fecha: '2026-05-15', vientoKmh: 18, altitudM: 3800 },
  { fecha: '2026-06-02', vientoKmh: 8, altitudM: 4200 },
  { fecha: '2026-06-10', vientoKmh: 10, altitudM: 4100 },
  { fecha: '2026-06-20', vientoKmh: 6, altitudM: 4300 },
  { fecha: '2026-07-05', vientoKmh: 22, altitudM: 3900 }
];

function esSaltoValido(salto) {
  return (
    salto &&
    typeof salto.fecha === 'string' &&
    !Number.isNaN(new Date(salto.fecha).getTime()) &&
    typeof salto.vientoKmh === 'number' &&
    salto.vientoKmh >= 0 &&
    typeof salto.altitudM === 'number' &&
    salto.altitudM > 0
  );
}

function obtenerClaveMes(fechaIso) {
  const fecha = new Date(fechaIso);
  const mes = String(fecha.getUTCMonth() + 1).padStart(2, '0');
  return `${fecha.getUTCFullYear()}-${mes}`;
}

function agruparSaltosPorMes(saltosValidos) {
  return saltosValidos.reduce((porMes, salto) => {
    const clave = obtenerClaveMes(salto.fecha);
    const listaActual = porMes.get(clave) || [];
    porMes.set(clave, [...listaActual, salto]);
    return porMes;
  }, new Map());
}

function calcularEstadisticasMes(saltosDelMes) {
  const totalSaltos = saltosDelMes.length;
  const promedioViento = saltosDelMes.reduce((total, salto) => total + salto.vientoKmh, 0) / totalSaltos;
  const promedioAltitud = saltosDelMes.reduce((total, salto) => total + salto.altitudM, 0) / totalSaltos;

  return {
    totalSaltos,
    promedioViento: Number(promedioViento.toFixed(1)),
    promedioAltitud: Number(promedioAltitud.toFixed(1))
  };
}

function generarResumenSaltos(saltosBase) {
  const saltosValidos = saltosBase.filter(esSaltoValido);
  const agrupados = agruparSaltosPorMes(saltosValidos);

  const resumenPorMes = [...agrupados.entries()]
    .map(([mes, saltosDelMes]) => ({ mes, ...calcularEstadisticasMes(saltosDelMes) }))
    .sort((a, b) => a.mes.localeCompare(b.mes));

  const mejorMes =
    resumenPorMes.length > 0
      ? resumenPorMes.reduce((mejor, actual) => (actual.promedioViento < mejor.promedioViento ? actual : mejor))
      : null;

  return {
    totalSaltos: saltosBase.length,
    saltosInvalidos: saltosBase.length - saltosValidos.length,
    resumenPorMes,
    mejorMes: mejorMes ? mejorMes.mes : null
  };
}

console.log('Caso 1: log con 6 saltos validos entre mayo y julio');
console.log(JSON.stringify(generarResumenSaltos(saltos), null, 2));

const saltosConCasosLimite = [
  ...saltos,
  { fecha: 'fecha-invalida', vientoKmh: 15, altitudM: 4000 },
  { fecha: '2026-07-20', vientoKmh: -5, altitudM: 3900 }
];

console.log('\nCaso 2: incluye salto con fecha invalida y salto con viento negativo');
console.log(JSON.stringify(generarResumenSaltos(saltosConCasosLimite), null, 2));
