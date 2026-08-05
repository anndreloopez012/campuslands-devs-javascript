// 57. Panel DOM de sensores moto - Resolucion Maria Montepeque

const sensores = [
  { nombre: 'Temperatura motor', valor: 92, unidad: 'C', umbralMin: 60, umbralMax: 105 },
  { nombre: 'Presion de aceite', valor: 35, unidad: 'psi', umbralMin: 25, umbralMax: 65 },
  { nombre: 'RPM', valor: 9200, unidad: 'rpm', umbralMin: 800, umbralMax: 9000 },
  { nombre: 'Voltaje bateria', valor: 12.6, unidad: 'V', umbralMin: 12, umbralMax: 14.5 }
];

function esSensorValido(sensor) {
  return (
    sensor &&
    typeof sensor.nombre === 'string' &&
    sensor.nombre.trim() !== '' &&
    typeof sensor.valor === 'number' &&
    typeof sensor.unidad === 'string' &&
    sensor.unidad.trim() !== '' &&
    typeof sensor.umbralMin === 'number' &&
    typeof sensor.umbralMax === 'number' &&
    sensor.umbralMin < sensor.umbralMax
  );
}

function estaEnAlerta(sensor) {
  return sensor.valor < sensor.umbralMin || sensor.valor > sensor.umbralMax;
}

function obtenerClaseEstado(sensor) {
  return estaEnAlerta(sensor) ? 'alerta' : 'normal';
}

function resumirSensor(sensor) {
  return { nombre: sensor.nombre, valor: sensor.valor, unidad: sensor.unidad, estado: obtenerClaseEstado(sensor) };
}

function renderizarSensoresEnDOM(sensoresValidos) {
  if (typeof document === 'undefined') return;
  const contenedor = document.querySelector('#panel-sensores');
  if (!contenedor) return;

  contenedor.innerHTML = '';
  sensoresValidos.forEach((sensor) => {
    const tarjeta = document.createElement('div');
    tarjeta.className = `tarjeta-sensor ${obtenerClaseEstado(sensor)}`;
    tarjeta.innerHTML = `<h3>${sensor.nombre}</h3><p>${sensor.valor} ${sensor.unidad}</p>`;
    contenedor.appendChild(tarjeta);
  });
}

function actualizarLectura(sensoresValidos, nombreSensor, nuevoValor) {
  return sensoresValidos.map((sensor) => (sensor.nombre === nombreSensor ? { ...sensor, valor: nuevoValor } : sensor));
}

function inicializarPanel(sensoresIniciales) {
  if (typeof document === 'undefined') return;

  let sensoresActuales = sensoresIniciales.filter(esSensorValido);
  renderizarSensoresEnDOM(sensoresActuales);

  const boton = document.querySelector('#simular-lectura');
  if (!boton) return;

  boton.addEventListener('click', () => {
    sensoresActuales = sensoresActuales.map((sensor) => ({
      ...sensor,
      valor: Number((sensor.valor + (Math.random() * 10 - 5)).toFixed(1))
    }));
    renderizarSensoresEnDOM(sensoresActuales);
  });
}

function generarPanelSensores(sensoresBase, actualizacion) {
  const sensoresValidos = sensoresBase.filter(esSensorValido);
  const resumenInicial = sensoresValidos.map(resumirSensor);

  const sensoresActualizados = actualizacion
    ? actualizarLectura(sensoresValidos, actualizacion.nombre, actualizacion.nuevoValor)
    : sensoresValidos;
  const resumenFinal = sensoresActualizados.map(resumirSensor);

  renderizarSensoresEnDOM(sensoresActualizados);

  return {
    totalSensores: sensoresBase.length,
    sensoresInvalidos: sensoresBase.length - sensoresValidos.length,
    resumenInicial,
    alertasIniciales: resumenInicial.filter((sensor) => sensor.estado === 'alerta').map((sensor) => sensor.nombre),
    actualizacion,
    resumenFinal,
    alertasFinal: resumenFinal.filter((sensor) => sensor.estado === 'alerta').map((sensor) => sensor.nombre)
  };
}

console.log('Caso 1: panel inicial (RPM ya en alerta) y se actualiza Temperatura motor a 110 (nueva alerta)');
console.log(JSON.stringify(generarPanelSensores(sensores, { nombre: 'Temperatura motor', nuevoValor: 110 }), null, 2));

const sensoresConCasoLimite = [...sensores, { nombre: 'Sensor mal calibrado', valor: 50, unidad: 'x', umbralMin: 80, umbralMax: 20 }];

console.log('\nCaso 2: incluye sensor invalido (umbralMin mayor que umbralMax) y actualiza un sensor inexistente');
console.log(JSON.stringify(generarPanelSensores(sensoresConCasoLimite, { nombre: 'Sensor Fantasma', nuevoValor: 999 }), null, 2));

inicializarPanel(sensores);
