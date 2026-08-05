// 59. Comparador de autos premium - Resolucion Maria Montepeque

const autos = [
  { nombre: 'Auto A', consumoKmPorLitro: 18, costo: 25000, potenciaHp: 140 },
  { nombre: 'Auto B', consumoKmPorLitro: 12, costo: 32000, potenciaHp: 220 },
  { nombre: 'Auto C', consumoKmPorLitro: 22, costo: 21000, potenciaHp: 110 },
  { nombre: 'Auto D', consumoKmPorLitro: 9, costo: 45000, potenciaHp: 310 }
];

const perfiles = {
  economico: { pesoConsumo: 0.5, pesoCosto: 0.4, pesoPotencia: 0.1 },
  deportivo: { pesoConsumo: 0.1, pesoCosto: 0.1, pesoPotencia: 0.8 },
  equilibrado: { pesoConsumo: 0.34, pesoCosto: 0.33, pesoPotencia: 0.33 }
};

function esAutoValido(auto) {
  return (
    auto &&
    typeof auto.nombre === 'string' &&
    auto.nombre.trim() !== '' &&
    typeof auto.consumoKmPorLitro === 'number' &&
    auto.consumoKmPorLitro > 0 &&
    typeof auto.costo === 'number' &&
    auto.costo > 0 &&
    typeof auto.potenciaHp === 'number' &&
    auto.potenciaHp > 0
  );
}

function esPerfilValido(perfil) {
  if (!perfil) return false;
  const { pesoConsumo, pesoCosto, pesoPotencia } = perfil;
  const pesosValidos = [pesoConsumo, pesoCosto, pesoPotencia].every((peso) => typeof peso === 'number' && peso >= 0);
  const sumaPesos = pesoConsumo + pesoCosto + pesoPotencia;
  return pesosValidos && Math.abs(sumaPesos - 1) < 0.01;
}

function normalizar(valor, minimo, maximo) {
  return maximo === minimo ? 1 : Number(((valor - minimo) / (maximo - minimo)).toFixed(3));
}

function normalizarAutos(autosValidos) {
  const consumos = autosValidos.map((auto) => auto.consumoKmPorLitro);
  const costos = autosValidos.map((auto) => auto.costo);
  const potencias = autosValidos.map((auto) => auto.potenciaHp);

  return autosValidos.map((auto) => ({
    ...auto,
    consumoNormalizado: normalizar(auto.consumoKmPorLitro, Math.min(...consumos), Math.max(...consumos)),
    costoNormalizado: 1 - normalizar(auto.costo, Math.min(...costos), Math.max(...costos)),
    potenciaNormalizada: normalizar(auto.potenciaHp, Math.min(...potencias), Math.max(...potencias))
  }));
}

function calcularScore(autoNormalizado, perfil) {
  return Number(
    (
      autoNormalizado.consumoNormalizado * perfil.pesoConsumo +
      autoNormalizado.costoNormalizado * perfil.pesoCosto +
      autoNormalizado.potenciaNormalizada * perfil.pesoPotencia
    ).toFixed(3)
  );
}

function compararAutosPorPerfil(autosBase, perfilesBase, nombrePerfil) {
  const autosValidos = autosBase.filter(esAutoValido);
  if (autosValidos.length === 0) {
    return { valido: false, motivo: 'no hay autos validos para comparar' };
  }

  const perfil = perfilesBase[nombrePerfil];
  if (!esPerfilValido(perfil)) {
    return { valido: false, motivo: `perfil "${nombrePerfil}" invalido o inexistente` };
  }

  const ranking = normalizarAutos(autosValidos)
    .map((auto) => ({ nombre: auto.nombre, score: calcularScore(auto, perfil) }))
    .sort((a, b) => b.score - a.score);

  return {
    valido: true,
    totalAutos: autosBase.length,
    autosInvalidos: autosBase.length - autosValidos.length,
    perfil: nombrePerfil,
    ranking,
    ganador: ranking[0].nombre
  };
}

console.log('Caso 1: perfil "economico" (prioriza consumo y costo bajo)');
console.log(JSON.stringify(compararAutosPorPerfil(autos, perfiles, 'economico'), null, 2));

const autosConCasoLimite = [...autos, { nombre: 'Auto Roto', consumoKmPorLitro: 10, costo: -5000, potenciaHp: 150 }];

console.log('\nCaso 2: perfil "deportivo" (prioriza potencia), incluye auto invalido (costo negativo)');
console.log(JSON.stringify(compararAutosPorPerfil(autosConCasoLimite, perfiles, 'deportivo'), null, 2));

console.log('\nCaso 2b: perfil inexistente ("lujo")');
console.log(JSON.stringify(compararAutosPorPerfil(autos, perfiles, 'lujo'), null, 2));
