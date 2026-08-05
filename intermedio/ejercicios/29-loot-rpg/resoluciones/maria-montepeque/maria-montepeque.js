// 29. Sistema de loot RPG - Resolucion Maria Montepeque

const PESOS_RAREZA = {
  comun: 50,
  raro: 30,
  epico: 15,
  legendario: 5
};

const tablaLootMazmorra = [
  { id: 1, nombre: 'Pocion de vida', rareza: 'comun' },
  { id: 2, nombre: 'Espada corta', rareza: 'comun' },
  { id: 3, nombre: 'Escudo de hierro', rareza: 'raro' },
  { id: 4, nombre: 'Arco elfico', rareza: 'raro' },
  { id: 5, nombre: 'Armadura de dragon', rareza: 'epico' },
  { id: 6, nombre: 'Espada del vacio', rareza: 'legendario' }
];

function esItemValido(item) {
  return (
    item &&
    typeof item.nombre === 'string' &&
    item.nombre.trim() !== '' &&
    typeof item.rareza === 'string' &&
    Object.prototype.hasOwnProperty.call(PESOS_RAREZA, item.rareza)
  );
}

function construirTablaProbabilidades(tabla) {
  const itemsValidos = tabla.filter(esItemValido);
  const pesoTotal = itemsValidos.reduce((total, item) => total + PESOS_RAREZA[item.rareza], 0);

  return itemsValidos.map((item) => ({
    ...item,
    peso: PESOS_RAREZA[item.rareza],
    probabilidad: Number(((PESOS_RAREZA[item.rareza] / pesoTotal) * 100).toFixed(2))
  }));
}

function simularDrop(tablaProbabilidades, generadorAleatorio) {
  const pesoTotal = tablaProbabilidades.reduce((total, item) => total + item.peso, 0);
  let punto = generadorAleatorio() * pesoTotal;

  for (const item of tablaProbabilidades) {
    punto -= item.peso;
    if (punto <= 0) return item;
  }

  return tablaProbabilidades[tablaProbabilidades.length - 1];
}

function calcularResumenPorRareza(historial) {
  return historial.reduce((resumen, drop) => {
    resumen[drop.rareza] = (resumen[drop.rareza] || 0) + 1;
    return resumen;
  }, {});
}

function simularMazmorra(tablaLoot, numeroDrops, generadorAleatorio = Math.random) {
  const tablaProbabilidades = construirTablaProbabilidades(tablaLoot);

  if (tablaProbabilidades.length === 0) {
    return {
      totalDrops: 0,
      itemsInvalidos: tablaLoot.length,
      tablaProbabilidades: [],
      historial: [],
      resumenPorRareza: {},
      mensaje: 'tabla de loot vacia o invalida'
    };
  }

  const historial = [];
  for (let intento = 1; intento <= numeroDrops; intento += 1) {
    const drop = simularDrop(tablaProbabilidades, generadorAleatorio);
    historial.push({ intento, nombre: drop.nombre, rareza: drop.rareza });
  }

  return {
    totalDrops: historial.length,
    itemsInvalidos: tablaLoot.length - tablaProbabilidades.length,
    tablaProbabilidades,
    historial,
    resumenPorRareza: calcularResumenPorRareza(historial)
  };
}

function crearGeneradorSecuencial(valores) {
  let indice = 0;
  return () => {
    const valor = valores[indice % valores.length];
    indice += 1;
    return valor;
  };
}

console.log('Caso 1: 8 drops en mazmorra con aleatoriedad real (Math.random)');
console.log(JSON.stringify(simularMazmorra(tablaLootMazmorra, 8), null, 2));

const tablaConCasosLimite = [
  ...tablaLootMazmorra,
  { id: 7, nombre: 'Reliquia mitica', rareza: 'mitica' },
  { id: 8, nombre: '', rareza: 'comun' }
];

const generadorDeterminista = crearGeneradorSecuencial([0, 0.55, 0.82, 0.96]);

console.log('\nCaso 2: incluye items invalidos (rareza desconocida y nombre vacio) con drops deterministas');
console.log(JSON.stringify(simularMazmorra(tablaConCasosLimite, 4, generadorDeterminista), null, 2));
