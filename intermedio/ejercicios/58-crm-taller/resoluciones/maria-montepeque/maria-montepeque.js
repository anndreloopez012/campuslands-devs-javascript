// 58. Mini CRM de taller - Resolucion Maria Montepeque

const clientes = [
  { id: 1, nombre: 'Carlos Vega', telefono: '5555-0001' },
  { id: 2, nombre: 'Ana Ruiz', telefono: '5555-0002' },
  { id: 3, nombre: 'Luis Marin', telefono: '5555-0003' }
];

const motos = [
  { id: 1, clienteId: 1, modelo: 'Yamaha FZ', placa: 'P123ABC' },
  { id: 2, clienteId: 1, modelo: 'Honda CB1', placa: 'P456DEF' },
  { id: 3, clienteId: 2, modelo: 'Suzuki GN', placa: 'P789GHI' }
];

const ordenes = [
  { id: 1, motoId: 1, descripcion: 'Cambio de aceite', costo: 25, estado: 'completada' },
  { id: 2, motoId: 1, descripcion: 'Revision de frenos', costo: 40, estado: 'pendiente' },
  { id: 3, motoId: 2, descripcion: 'Cambio de llanta', costo: 60, estado: 'completada' },
  { id: 4, motoId: 3, descripcion: 'Ajuste de cadena', costo: 15, estado: 'completada' }
];

function esClienteValido(cliente) {
  return (
    cliente &&
    typeof cliente.id !== 'undefined' &&
    typeof cliente.nombre === 'string' &&
    cliente.nombre.trim() !== '' &&
    typeof cliente.telefono === 'string' &&
    cliente.telefono.trim() !== ''
  );
}

function esMotoValida(moto) {
  return (
    moto &&
    typeof moto.id !== 'undefined' &&
    typeof moto.clienteId !== 'undefined' &&
    typeof moto.modelo === 'string' &&
    moto.modelo.trim() !== '' &&
    typeof moto.placa === 'string' &&
    moto.placa.trim() !== ''
  );
}

function esOrdenValida(orden) {
  return (
    orden &&
    typeof orden.id !== 'undefined' &&
    typeof orden.motoId !== 'undefined' &&
    typeof orden.descripcion === 'string' &&
    orden.descripcion.trim() !== '' &&
    typeof orden.costo === 'number' &&
    orden.costo >= 0 &&
    typeof orden.estado === 'string'
  );
}

function buscarClientePorId(clientesValidos, id) {
  return clientesValidos.find((cliente) => cliente.id === id);
}

function obtenerMotosDeCliente(motosValidas, clienteId) {
  return motosValidas.filter((moto) => moto.clienteId === clienteId);
}

function obtenerOrdenesDeMoto(ordenesValidas, motoId) {
  return ordenesValidas.filter((orden) => orden.motoId === motoId);
}

function generarReporteMoto(moto, ordenesValidas) {
  const ordenesMoto = obtenerOrdenesDeMoto(ordenesValidas, moto.id);
  return {
    modelo: moto.modelo,
    placa: moto.placa,
    totalOrdenes: ordenesMoto.length,
    totalGastado: ordenesMoto.reduce((total, orden) => total + orden.costo, 0),
    ordenesPendientes: ordenesMoto.filter((orden) => orden.estado === 'pendiente').length
  };
}

function generarReporteCliente(clientesValidos, motosValidas, ordenesValidas, clienteId) {
  const cliente = buscarClientePorId(clientesValidos, clienteId);
  if (!cliente) {
    return { encontrado: false, motivo: 'cliente inexistente' };
  }

  const reporteMotos = obtenerMotosDeCliente(motosValidas, clienteId).map((moto) => generarReporteMoto(moto, ordenesValidas));

  return {
    encontrado: true,
    cliente: cliente.nombre,
    telefono: cliente.telefono,
    totalMotos: reporteMotos.length,
    motos: reporteMotos,
    gastoTotalCliente: reporteMotos.reduce((total, moto) => total + moto.totalGastado, 0)
  };
}

function gestionarCRM(clientesBase, motosBase, ordenesBase, clienteIdConsultado) {
  const clientesValidos = clientesBase.filter(esClienteValido);
  const motosValidas = motosBase.filter(esMotoValida);
  const ordenesValidas = ordenesBase.filter(esOrdenValida);

  return {
    totalClientes: clientesBase.length,
    clientesInvalidos: clientesBase.length - clientesValidos.length,
    totalMotos: motosBase.length,
    motosInvalidas: motosBase.length - motosValidas.length,
    totalOrdenes: ordenesBase.length,
    ordenesInvalidas: ordenesBase.length - ordenesValidas.length,
    reporte: generarReporteCliente(clientesValidos, motosValidas, ordenesValidas, clienteIdConsultado)
  };
}

console.log('Caso 1: reporte del cliente 1 (Carlos Vega, 2 motos con ordenes)');
console.log(JSON.stringify(gestionarCRM(clientes, motos, ordenes, 1), null, 2));

const motosConCasoLimite = [...motos, { id: 4, modelo: 'Sin cliente asignado', placa: 'P000XYZ' }];
const ordenesConCasoLimite = [...ordenes, { id: 5, motoId: 3, descripcion: 'Orden con costo invalido', costo: -20, estado: 'pendiente' }];

console.log('\nCaso 2: consulta a cliente inexistente (id 99), incluye moto y orden invalidas');
console.log(JSON.stringify(gestionarCRM(clientes, motosConCasoLimite, ordenesConCasoLimite, 99), null, 2));
