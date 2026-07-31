// 24. Pipeline de animacion 3D - Resolucion Maria Montepeque

const ETAPAS = ['modelado', 'rigging', 'animacion', 'render', 'entrega'];

function validarAsset(asset) {
  return (
    asset &&
    typeof asset.nombre === 'string' &&
    typeof asset.departamento === 'string' &&
    Array.isArray(asset.etapasCompletadas) &&
    asset.etapasCompletadas.every((etapa) => ETAPAS.includes(etapa))
  );
}

function calcularProgreso(asset) {
  return Math.round((asset.etapasCompletadas.length / ETAPAS.length) * 100);
}

function estaBloqueado(asset) {
  return Boolean(asset.bloqueado);
}

function agruparPorDepartamento(assets) {
  return assets.reduce((grupos, asset) => {
    grupos[asset.departamento] = grupos[asset.departamento] ?? [];
    grupos[asset.departamento].push({ nombre: asset.nombre, progreso: calcularProgreso(asset) });
    return grupos;
  }, {});
}

function generarReporte(assets) {
  const validos = assets.filter(validarAsset);

  return {
    reportePorDepartamento: agruparPorDepartamento(validos),
    tareasBloqueadas: validos.filter(estaBloqueado).map((asset) => asset.nombre),
    assetsInvalidos: assets.length - validos.length
  };
}

const assets = [
  { nombre: 'Personaje Heroe', departamento: 'personajes', etapasCompletadas: ['modelado', 'rigging'], bloqueado: false },
  {
    nombre: 'Escenario Ciudad',
    departamento: 'entornos',
    etapasCompletadas: ['modelado', 'rigging', 'animacion', 'render', 'entrega'],
    bloqueado: false
  },
  { nombre: 'Vehiculo Nave', departamento: 'props', etapasCompletadas: ['modelado'], bloqueado: true }
];

console.log('Caso 1: reporte del pipeline por departamento');
console.log(JSON.stringify(generarReporte(assets), null, 2));

const assetsConInvalido = [
  ...assets,
  { nombre: 'Asset Roto', departamento: 'props', etapasCompletadas: ['etapaInventada'] }
];

console.log('\nCaso 2: incluye un asset invalido (etapa que no existe en el pipeline)');
console.log(JSON.stringify(generarReporte(assetsConInvalido), null, 2));
