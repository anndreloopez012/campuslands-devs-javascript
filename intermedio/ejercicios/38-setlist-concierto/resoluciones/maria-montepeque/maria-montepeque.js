// 38. Setlist de concierto - Resolucion Maria Montepeque

const canciones = [
  { id: 1, titulo: 'Ignition', energia: 6, duracionMin: 3.5 },
  { id: 2, titulo: 'Firestorm', energia: 9, duracionMin: 4.0 },
  { id: 3, titulo: 'Slow Burn', energia: 3, duracionMin: 5.2 },
  { id: 4, titulo: 'Midnight Drive', energia: 5, duracionMin: 4.5 },
  { id: 5, titulo: 'Wildfire', energia: 10, duracionMin: 3.8 },
  { id: 6, titulo: 'Fade Out', energia: 2, duracionMin: 4.2 }
];

function esCancionValida(cancion) {
  return (
    cancion &&
    typeof cancion.titulo === 'string' &&
    cancion.titulo.trim() !== '' &&
    typeof cancion.energia === 'number' &&
    cancion.energia >= 0 &&
    cancion.energia <= 10 &&
    typeof cancion.duracionMin === 'number' &&
    cancion.duracionMin > 0
  );
}

function calcularEnergiaPromedio(cancionesValidas) {
  const sumaEnergia = cancionesValidas.reduce((total, cancion) => total + cancion.energia, 0);
  return sumaEnergia / cancionesValidas.length;
}

function seleccionarApertura(cancionesValidas, energiaPromedio) {
  return cancionesValidas.reduce((masCercana, actual) => {
    const diferenciaActual = Math.abs(actual.energia - energiaPromedio);
    const diferenciaMasCercana = Math.abs(masCercana.energia - energiaPromedio);
    return diferenciaActual < diferenciaMasCercana ? actual : masCercana;
  });
}

function seleccionarCierre(cancionesRestantes) {
  return [...cancionesRestantes].sort((a, b) => a.energia - b.energia)[0];
}

function ordenarBloqueCentral(cancionesCentro) {
  return [...cancionesCentro].sort((a, b) => a.energia - b.energia);
}

function calcularDuracionTotal(setlistOrdenado) {
  return Number(setlistOrdenado.reduce((total, cancion) => total + cancion.duracionMin, 0).toFixed(1));
}

function resumirCancion(cancion) {
  return { titulo: cancion.titulo, energia: cancion.energia, duracionMin: cancion.duracionMin };
}

function armarSetlist(cancionesBase) {
  const cancionesValidas = cancionesBase.filter(esCancionValida);

  if (cancionesValidas.length < 3) {
    return {
      totalCanciones: cancionesBase.length,
      cancionesInvalidas: cancionesBase.length - cancionesValidas.length,
      valido: false,
      motivo: 'se necesitan al menos 3 canciones validas para armar apertura, bloque central y cierre'
    };
  }

  const energiaPromedio = calcularEnergiaPromedio(cancionesValidas);
  const apertura = seleccionarApertura(cancionesValidas, energiaPromedio);
  const restantesSinApertura = cancionesValidas.filter((cancion) => cancion.id !== apertura.id);
  const cierre = seleccionarCierre(restantesSinApertura);
  const bloqueCentral = ordenarBloqueCentral(restantesSinApertura.filter((cancion) => cancion.id !== cierre.id));

  const setlistFinal = [apertura, ...bloqueCentral, cierre];
  const picoEnergia = bloqueCentral.length > 0 ? bloqueCentral[bloqueCentral.length - 1] : apertura;

  return {
    totalCanciones: cancionesBase.length,
    cancionesInvalidas: cancionesBase.length - cancionesValidas.length,
    valido: true,
    apertura: apertura.titulo,
    picoEnergia: picoEnergia.titulo,
    cierre: cierre.titulo,
    setlist: setlistFinal.map(resumirCancion),
    duracionTotalMin: calcularDuracionTotal(setlistFinal)
  };
}

console.log('Caso 1: setlist con 6 canciones validas');
console.log(JSON.stringify(armarSetlist(canciones), null, 2));

const cancionesConCasosLimite = [
  { id: 1, titulo: 'Ignition', energia: 6, duracionMin: 3.5 },
  { id: 2, titulo: 'Sin energia' },
  { id: 3, titulo: 'Energia fuera de rango', energia: 15, duracionMin: 3 }
];

console.log('\nCaso 2: solo 1 cancion valida (no alcanza el minimo de 3 para armar setlist)');
console.log(JSON.stringify(armarSetlist(cancionesConCasosLimite), null, 2));
