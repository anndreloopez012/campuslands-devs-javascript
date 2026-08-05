// 34. Subasta de autos de lujo - Resolucion Maria Montepeque

const autosSubasta = [
  { id: 1, modelo: 'Ferrari 488', ofertaMinima: 200000 },
  { id: 2, modelo: 'Lamborghini Huracan', ofertaMinima: 220000 },
  { id: 3, modelo: 'Porsche 911 Turbo', ofertaMinima: 150000 }
];

const ofertas = [
  { autoId: 1, postor: 'Carlos Vega', monto: 210000 },
  { autoId: 1, postor: 'Ana Ruiz', monto: 225000 },
  { autoId: 1, postor: 'Luis Marin', monto: 180000 },
  { autoId: 2, postor: 'Sofia Leon', monto: 215000 },
  { autoId: 3, postor: 'Carlos Vega', monto: 160000 },
  { autoId: 3, postor: 'Ana Ruiz', monto: 175000 }
];

function esAutoValido(auto) {
  return (
    auto &&
    typeof auto.id !== 'undefined' &&
    typeof auto.modelo === 'string' &&
    auto.modelo.trim() !== '' &&
    typeof auto.ofertaMinima === 'number' &&
    auto.ofertaMinima > 0
  );
}

function esOfertaValida(oferta, idsAutosValidos) {
  return (
    oferta &&
    idsAutosValidos.has(oferta.autoId) &&
    typeof oferta.postor === 'string' &&
    oferta.postor.trim() !== '' &&
    typeof oferta.monto === 'number' &&
    oferta.monto > 0
  );
}

function agruparOfertasPorAuto(ofertasValidas) {
  return ofertasValidas.reduce((mapa, oferta) => {
    const listaActual = mapa.get(oferta.autoId) || [];
    mapa.set(oferta.autoId, [...listaActual, oferta]);
    return mapa;
  }, new Map());
}

function seleccionarGanador(ofertasValidasDelAuto) {
  if (ofertasValidasDelAuto.length === 0) return null;
  return [...ofertasValidasDelAuto].sort((a, b) => b.monto - a.monto)[0];
}

function procesarAuto(auto, ofertasPorAuto) {
  const todasLasOfertas = ofertasPorAuto.get(auto.id) || [];
  const ofertasQueSuperanMinimo = todasLasOfertas.filter((oferta) => oferta.monto >= auto.ofertaMinima);
  const ganador = seleccionarGanador(ofertasQueSuperanMinimo);

  return {
    auto: auto.modelo,
    ofertaMinima: auto.ofertaMinima,
    totalOfertas: todasLasOfertas.length,
    ofertasValidas: ofertasQueSuperanMinimo.length,
    ofertasRechazadas: todasLasOfertas.length - ofertasQueSuperanMinimo.length,
    ganador: ganador ? { postor: ganador.postor, monto: ganador.monto } : null,
    estado: ganador ? 'vendido' : 'sin ofertas validas'
  };
}

function procesarSubasta(autos, listaOfertas) {
  const autosValidos = autos.filter(esAutoValido);
  const idsAutosValidos = new Set(autosValidos.map((auto) => auto.id));
  const ofertasValidasEstructura = listaOfertas.filter((oferta) => esOfertaValida(oferta, idsAutosValidos));
  const ofertasPorAuto = agruparOfertasPorAuto(ofertasValidasEstructura);

  return {
    totalAutos: autos.length,
    autosInvalidos: autos.length - autosValidos.length,
    totalOfertas: listaOfertas.length,
    ofertasDescartadas: listaOfertas.length - ofertasValidasEstructura.length,
    resultados: autosValidos.map((auto) => procesarAuto(auto, ofertasPorAuto))
  };
}

console.log('Caso 1: subasta con 3 autos y ofertas validas');
console.log(JSON.stringify(procesarSubasta(autosSubasta, ofertas), null, 2));

const autosConCasoLimite = [...autosSubasta, { id: 4, modelo: 'Sin oferta minima' }];

const ofertasConCasosLimite = [
  ...ofertas,
  { autoId: 4, postor: 'Elena Ruiz', monto: 100000 },
  { autoId: 99, postor: 'Postor fantasma', monto: 500000 },
  { autoId: 2, postor: '', monto: 300000 },
  { autoId: 3, postor: 'Marco Diaz', monto: 100000 }
];

console.log('\nCaso 2: incluye auto invalido, autoId inexistente, postor vacio y oferta bajo el minimo');
console.log(JSON.stringify(procesarSubasta(autosConCasoLimite, ofertasConCasosLimite), null, 2));
