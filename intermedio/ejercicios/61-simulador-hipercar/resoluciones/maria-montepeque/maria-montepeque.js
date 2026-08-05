// 61. Simulador de aceleracion hypercar - Resolucion Maria Montepeque

const vehiculo = {
  modelo: 'Bugatti Chiron',
  aceleracionKmhPorSegundo: 35,
  velocidadMaxima: 420
};

function esVehiculoValido(datosVehiculo) {
  return (
    datosVehiculo &&
    typeof datosVehiculo.modelo === 'string' &&
    datosVehiculo.modelo.trim() !== '' &&
    typeof datosVehiculo.aceleracionKmhPorSegundo === 'number' &&
    datosVehiculo.aceleracionKmhPorSegundo > 0 &&
    typeof datosVehiculo.velocidadMaxima === 'number' &&
    datosVehiculo.velocidadMaxima > 0
  );
}

function generarTablaVelocidad(datosVehiculo, duracionSegundos) {
  const tabla = [];

  for (let segundo = 0; segundo <= duracionSegundos; segundo += 1) {
    const velocidadCalculada = datosVehiculo.aceleracionKmhPorSegundo * segundo;
    const velocidadKmh = Number(Math.min(velocidadCalculada, datosVehiculo.velocidadMaxima).toFixed(1));
    tabla.push({ segundo, velocidadKmh });
  }

  return tabla;
}

function detectarTiempo0a100(tabla) {
  for (let indice = 0; indice < tabla.length; indice += 1) {
    if (tabla[indice].velocidadKmh >= 100) return tabla[indice].segundo;
  }
  return null;
}

function simularAceleracion(datosVehiculo, duracionSegundos) {
  if (!esVehiculoValido(datosVehiculo)) {
    return { valido: false, motivo: 'parametros del vehiculo invalidos' };
  }

  if (typeof duracionSegundos !== 'number' || duracionSegundos <= 0) {
    return { valido: false, motivo: 'duracion de simulacion invalida' };
  }

  const tabla = generarTablaVelocidad(datosVehiculo, duracionSegundos);
  const velocidadFinalKmh = tabla[tabla.length - 1].velocidadKmh;

  return {
    valido: true,
    modelo: datosVehiculo.modelo,
    duracionSegundos,
    tabla,
    tiempo0a100Segundos: detectarTiempo0a100(tabla),
    velocidadFinalKmh,
    alcanzoVelocidadMaxima: velocidadFinalKmh >= datosVehiculo.velocidadMaxima
  };
}

console.log('Caso 1: Bugatti Chiron acelerando durante 12 segundos');
console.log(JSON.stringify(simularAceleracion(vehiculo, 12), null, 2));

const vehiculoVelocidadLimitada = { modelo: 'Kart electrico', aceleracionKmhPorSegundo: 20, velocidadMaxima: 60 };

console.log('\nCaso 2: vehiculo con velocidad maxima baja (60 km/h), se limita antes de llegar a los 100');
console.log(JSON.stringify(simularAceleracion(vehiculoVelocidadLimitada, 6), null, 2));

console.log('\nCaso 2b: parametros invalidos (aceleracion negativa) y duracion invalida (0 segundos)');
console.log(JSON.stringify(simularAceleracion({ modelo: 'Auto Roto', aceleracionKmhPorSegundo: -10, velocidadMaxima: 200 }, 0), null, 2));
