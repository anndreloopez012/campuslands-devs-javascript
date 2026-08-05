// 28. Mercado de skins - Resolucion Maria Montepeque

const UMBRAL_CAIDA_FUERTE = 15;
const UMBRAL_SUBIDA_FUERTE = 10;

function esSkinValida(skin) {
  return (
    skin &&
    typeof skin.nombre === 'string' &&
    skin.nombre.trim() !== '' &&
    Array.isArray(skin.historialPrecios) &&
    skin.historialPrecios.length >= 2 &&
    skin.historialPrecios.every((precio) => typeof precio === 'number' && precio > 0)
  );
}

function calcularVariacionPorcentual(historial) {
  const precioInicial = historial[0];
  const precioActual = historial[historial.length - 1];
  return Number((((precioActual - precioInicial) / precioInicial) * 100).toFixed(1));
}

function detectarCaidaFuerte(historial) {
  const precioMaximo = Math.max(...historial);
  const precioActual = historial[historial.length - 1];
  const caidaDesdeMaximo = ((precioMaximo - precioActual) / precioMaximo) * 100;
  return caidaDesdeMaximo >= UMBRAL_CAIDA_FUERTE;
}

function recomendarAccion(variacionPorcentual, caidaFuerte) {
  if (caidaFuerte) return 'comprar';
  if (variacionPorcentual >= UMBRAL_SUBIDA_FUERTE) return 'vender';
  return 'esperar';
}

function analizarSkin(skin) {
  const historial = skin.historialPrecios;
  const variacionPorcentual = calcularVariacionPorcentual(historial);
  const caidaFuerte = detectarCaidaFuerte(historial);

  return {
    id: skin.id,
    nombre: skin.nombre,
    arma: skin.arma,
    precioActual: historial[historial.length - 1],
    variacionPorcentual,
    caidaFuerte,
    recomendacion: recomendarAccion(variacionPorcentual, caidaFuerte)
  };
}

function analizarMercado(skins) {
  const validas = skins.filter(esSkinValida);
  const analisis = validas.map(analizarSkin);

  return {
    totalSkins: skins.length,
    skinsInvalidas: skins.length - validas.length,
    analisis,
    oportunidadesCompra: analisis.filter((item) => item.recomendacion === 'comprar')
  };
}

const skins = [
  { id: 1, nombre: 'Dragon Lore', arma: 'AWP', historialPrecios: [120, 118, 110, 95, 90] },
  { id: 2, nombre: 'Fire Serpent', arma: 'AK-47', historialPrecios: [80, 85, 90, 95, 100] },
  { id: 3, nombre: 'Asiimov', arma: 'M4A4', historialPrecios: [50, 49, 48, 47, 46] }
];

console.log('Caso 1: mercado con tendencias variadas (caida fuerte, subida fuerte, estable)');
console.log(JSON.stringify(analizarMercado(skins), null, 2));

const skinsConCasosLimite = [
  ...skins,
  { id: 4, nombre: 'Howl', arma: 'M4A4', historialPrecios: [200] },
  { id: 5, nombre: '', arma: 'Glock', historialPrecios: [30, 32, 35] }
];

console.log('\nCaso 2: incluye skins invalidas (historial de un solo precio y nombre vacio)');
console.log(JSON.stringify(analizarMercado(skinsConCasosLimite), null, 2));
