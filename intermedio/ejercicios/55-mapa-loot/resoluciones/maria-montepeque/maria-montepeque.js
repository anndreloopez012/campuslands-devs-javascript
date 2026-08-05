// 55. Mapa de loot battle royale - Resolucion Maria Montepeque

const mapaZonas = [
  [{ loot: 15, peligroso: false }, { loot: 40, peligroso: true }, { loot: 20, peligroso: false }],
  [{ loot: 5, peligroso: false }, { loot: 30, peligroso: false }, { loot: 10, peligroso: true }],
  [{ loot: 25, peligroso: false }, { loot: 12, peligroso: false }, { loot: 35, peligroso: false }]
];

function esZonaValida(zona) {
  return zona && typeof zona.loot === 'number' && zona.loot >= 0 && typeof zona.peligroso === 'boolean';
}

function esMatrizValida(matriz) {
  if (!Array.isArray(matriz) || matriz.length === 0) return false;
  const columnas = matriz[0].length;
  return matriz.every((fila) => Array.isArray(fila) && fila.length === columnas && fila.every(esZonaValida));
}

function calcularLootPorFila(matriz) {
  return matriz.map((fila, indice) => ({
    fila: indice,
    lootTotal: fila.reduce((total, zona) => total + zona.loot, 0)
  }));
}

function calcularLootPorColumna(matriz) {
  const numColumnas = matriz[0].length;
  const resultado = [];

  for (let columna = 0; columna < numColumnas; columna += 1) {
    let total = 0;
    for (let fila = 0; fila < matriz.length; fila += 1) {
      total += matriz[fila][columna].loot;
    }
    resultado.push({ columna, lootTotal: total });
  }

  return resultado;
}

function encontrarCoordenadaRecomendada(matriz) {
  let mejor = null;

  for (let fila = 0; fila < matriz.length; fila += 1) {
    for (let columna = 0; columna < matriz[fila].length; columna += 1) {
      const zona = matriz[fila][columna];
      if (zona.peligroso) continue;
      if (!mejor || zona.loot > mejor.loot) {
        mejor = { fila, columna, loot: zona.loot };
      }
    }
  }

  return mejor;
}

function listarZonasPeligrosas(matriz) {
  const zonasPeligrosas = [];

  for (let fila = 0; fila < matriz.length; fila += 1) {
    for (let columna = 0; columna < matriz[fila].length; columna += 1) {
      if (matriz[fila][columna].peligroso) {
        zonasPeligrosas.push({ fila, columna, loot: matriz[fila][columna].loot });
      }
    }
  }

  return zonasPeligrosas;
}

function analizarMapaLoot(matrizBase) {
  if (!esMatrizValida(matrizBase)) {
    return { valido: false, motivo: 'matriz de zonas invalida (filas desiguales o zonas mal formadas)' };
  }

  return {
    valido: true,
    filas: matrizBase.length,
    columnas: matrizBase[0].length,
    lootPorFila: calcularLootPorFila(matrizBase),
    lootPorColumna: calcularLootPorColumna(matrizBase),
    zonasPeligrosas: listarZonasPeligrosas(matrizBase),
    coordenadaRecomendada: encontrarCoordenadaRecomendada(matrizBase)
  };
}

console.log('Caso 1: mapa 3x3 con zonas peligrosas mezcladas');
console.log(JSON.stringify(analizarMapaLoot(mapaZonas), null, 2));

const mapaTodoPeligroso = [
  [{ loot: 10, peligroso: true }, { loot: 20, peligroso: true }],
  [{ loot: 30, peligroso: true }, { loot: 40, peligroso: true }]
];

console.log('\nCaso 2: mapa donde todas las zonas son peligrosas (sin coordenada segura recomendada)');
console.log(JSON.stringify(analizarMapaLoot(mapaTodoPeligroso), null, 2));

const mapaInvalido = [
  [{ loot: 10, peligroso: false }, { loot: 20, peligroso: false }],
  [{ loot: 30, peligroso: false }]
];

console.log('\nCaso 2b: matriz invalida (filas con distinta cantidad de columnas)');
console.log(JSON.stringify(analizarMapaLoot(mapaInvalido), null, 2));
