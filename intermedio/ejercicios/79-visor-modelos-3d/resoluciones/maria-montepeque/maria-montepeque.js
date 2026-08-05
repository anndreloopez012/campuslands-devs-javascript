// 79. Visor de assets 3D
// Resolucion: maria-montepeque
//
// Idea: assets { id, nombre, departamento, etapa, progreso, aprobado } filtrables por etapa y
// departamento. Solo se puede aprobar un asset cuando su progreso llega a 100%, asi que el
// avance y la aprobacion quedan como dos operaciones separadas y validadas por su cuenta.
// El mismo archivo corre con `node maria-montepeque.js` (casos de prueba por consola)
// y en el navegador (maria-montepeque.html) como un visor/panel real.

const ETAPAS_VALIDAS = ['modelado', 'rigging', 'texturizado', 'render'];

const ASSETS_3D = [
  { id: 1, nombre: 'Dragon principal', departamento: 'personajes', etapa: 'texturizado', progreso: 70, aprobado: false },
  { id: 2, nombre: 'Escenario bosque', departamento: 'entorno', etapa: 'modelado', progreso: 40, aprobado: false },
  { id: 3, nombre: 'Heroe protagonista', departamento: 'personajes', etapa: 'rigging', progreso: 85, aprobado: false },
  { id: 4, nombre: 'Espada magica', departamento: 'props', etapa: 'render', progreso: 100, aprobado: true },
  { id: 5, nombre: 'Castillo', departamento: 'entorno', etapa: 'texturizado', progreso: 60, aprobado: false },
  { id: 6, nombre: 'Vehiculo futurista', departamento: 'props', etapa: 'modelado', progreso: 20, aprobado: false }
];

// ---------------------------------------------------------------------------
// Consultas y filtros combinados
// ---------------------------------------------------------------------------

function obtenerAssetPorId(assets, id) {
  return assets.find((asset) => asset.id === Number(id));
}

function filtrarAssets(assets, filtros = {}) {
  const etapa = filtros.etapa || 'todas';
  const departamento = filtros.departamento || 'todos';
  return assets.filter(
    (asset) => (etapa === 'todas' || asset.etapa === etapa) && (departamento === 'todos' || asset.departamento === departamento)
  );
}

// ---------------------------------------------------------------------------
// Validaciones
// ---------------------------------------------------------------------------

function validarProgreso(progreso) {
  const numero = Number(progreso);
  return Number.isFinite(numero) && numero >= 0 && numero <= 100;
}

// ---------------------------------------------------------------------------
// Actualizar progreso y marcar como aprobado (inmutable)
// ---------------------------------------------------------------------------

function actualizarProgreso(assets, id, nuevoProgreso) {
  const asset = obtenerAssetPorId(assets, id);
  if (!asset) {
    return { exito: false, motivo: `No existe un asset con id ${id}.`, assets };
  }
  if (!validarProgreso(nuevoProgreso)) {
    return { exito: false, motivo: 'El progreso debe ser un numero entre 0 y 100.', assets };
  }

  const progresoNumero = Number(nuevoProgreso);
  const assetsActualizados = assets.map((item) =>
    item.id === Number(id) ? { ...item, progreso: progresoNumero, aprobado: progresoNumero === 100 ? item.aprobado : false } : item
  );

  return { exito: true, assets: assetsActualizados };
}

function marcarComoAprobado(assets, id) {
  const asset = obtenerAssetPorId(assets, id);
  if (!asset) {
    return { exito: false, motivo: `No existe un asset con id ${id}.`, assets };
  }
  if (asset.aprobado) {
    return { exito: false, motivo: `"${asset.nombre}" ya estaba aprobado.`, assets };
  }
  if (asset.progreso < 100) {
    return { exito: false, motivo: `"${asset.nombre}" tiene ${asset.progreso}% de progreso; debe llegar a 100% antes de aprobarse.`, assets };
  }

  const assetsActualizados = assets.map((item) => (item.id === Number(id) ? { ...item, aprobado: true } : item));
  return { exito: true, assets: assetsActualizados };
}

// ---------------------------------------------------------------------------
// Resumen de produccion (reto extra)
// ---------------------------------------------------------------------------

function generarResumenProduccion(assets) {
  const total = assets.length;
  const aprobados = assets.filter((asset) => asset.aprobado).length;
  const progresoPromedio = total === 0 ? 0 : Math.round(assets.reduce((acumulado, asset) => acumulado + asset.progreso, 0) / total);
  const porEtapa = ETAPAS_VALIDAS.reduce((resumen, etapa) => {
    resumen[etapa] = assets.filter((asset) => asset.etapa === etapa).length;
    return resumen;
  }, {});

  return { total, aprobados, progresoPromedio, porEtapa };
}

// ---------------------------------------------------------------------------
// Salida por consola
// ---------------------------------------------------------------------------

function mostrarAssetsEnConsola(etiqueta, assets) {
  console.log(`\n${etiqueta} (${assets.length} asset(s)):`);
  if (assets.length === 0) {
    console.log('Sin assets para este filtro.');
    return;
  }
  console.table(assets);
}

// ---------------------------------------------------------------------------
// Interfaz en el DOM
// ---------------------------------------------------------------------------

function crearTarjetaAsset(asset, onAprobar) {
  const tarjeta = document.createElement('article');
  tarjeta.className = 'asset';
  tarjeta.innerHTML = `
    <h3>${asset.nombre}</h3>
    <p>${asset.departamento} · ${asset.etapa}</p>
    <div class="barra-progreso"><div class="relleno" style="width:${asset.progreso}%"></div></div>
    <p class="porcentaje">${asset.progreso}%</p>
  `;

  const boton = document.createElement('button');
  boton.type = 'button';
  boton.textContent = asset.aprobado ? 'Aprobado' : 'Marcar como aprobado';
  boton.disabled = asset.aprobado || asset.progreso < 100;
  boton.addEventListener('click', () => onAprobar(asset.id));
  tarjeta.appendChild(boton);

  return tarjeta;
}

function iniciarAplicacionDOM() {
  const listaAssets = document.querySelector('#lista-assets');
  const selectorEtapa = document.querySelector('#filtro-etapa');
  const selectorDepartamento = document.querySelector('#filtro-departamento');
  const resumenElemento = document.querySelector('#resumen-produccion');
  const mensajeElemento = document.querySelector('#mensaje-estado');

  if (!listaAssets || !selectorEtapa || !selectorDepartamento || !resumenElemento || !mensajeElemento) return;

  let assetsActuales = ASSETS_3D;

  function renderizar() {
    const filtrados = filtrarAssets(assetsActuales, { etapa: selectorEtapa.value, departamento: selectorDepartamento.value });

    listaAssets.innerHTML = '';
    if (filtrados.length === 0) {
      listaAssets.innerHTML = '<p class="sin-resultados">No hay assets con estos filtros.</p>';
    } else {
      filtrados.forEach((asset) => listaAssets.appendChild(crearTarjetaAsset(asset, aprobarAsset)));
    }

    const resumen = generarResumenProduccion(assetsActuales);
    resumenElemento.textContent = `Total: ${resumen.total} · Aprobados: ${resumen.aprobados} · Progreso promedio: ${resumen.progresoPromedio}%`;
  }

  function aprobarAsset(id) {
    const resultado = marcarComoAprobado(assetsActuales, id);
    if (!resultado.exito) {
      mensajeElemento.textContent = resultado.motivo;
      mensajeElemento.className = 'mensaje error';
      return;
    }
    assetsActuales = resultado.assets;
    mensajeElemento.textContent = '';
    mensajeElemento.className = 'mensaje';
    renderizar();
  }

  selectorEtapa.addEventListener('change', renderizar);
  selectorDepartamento.addEventListener('change', renderizar);
  renderizar();
}

// ---------------------------------------------------------------------------
// Ejecucion por consola (node maria-montepeque.js) con al menos dos casos de prueba
// ---------------------------------------------------------------------------

function resolverEjercicio() {
  console.log('=== 79. Visor de assets 3D ===');
  mostrarAssetsEnConsola('Catalogo completo', ASSETS_3D);
  console.log('Resumen de produccion:', generarResumenProduccion(ASSETS_3D));

  // Caso 1: filtros combinados por etapa y departamento.
  mostrarAssetsEnConsola('Caso 1 - filtro por etapa "texturizado"', filtrarAssets(ASSETS_3D, { etapa: 'texturizado' }));
  mostrarAssetsEnConsola('Caso 1 - filtro por departamento "entorno"', filtrarAssets(ASSETS_3D, { departamento: 'entorno' }));
  mostrarAssetsEnConsola(
    'Caso 1 - filtro combinado etapa "modelado" + departamento "props"',
    filtrarAssets(ASSETS_3D, { etapa: 'modelado', departamento: 'props' })
  );

  // Caso 2: casos limite - aprobar sin llegar a 100%, subir a 100% y aprobar,
  // aprobar algo ya aprobado, aprobar id inexistente y progreso invalido.
  console.log('\nCaso 2 - validaciones y casos limite:');
  let assets = ASSETS_3D;

  const aprobarSinTerminar = marcarComoAprobado(assets, 2);
  console.log('Aprobar "Escenario bosque" con 40%:', aprobarSinTerminar.exito ? 'aprobado' : aprobarSinTerminar.motivo);

  const subirProgreso = actualizarProgreso(assets, 2, 100);
  assets = subirProgreso.assets;
  console.log('Subir progreso de "Escenario bosque" a 100%:', subirProgreso.exito ? 'ok' : subirProgreso.motivo);

  const aprobarAhora = marcarComoAprobado(assets, 2);
  assets = aprobarAhora.assets;
  console.log('Aprobar "Escenario bosque" con 100%:', aprobarAhora.exito ? 'aprobado' : aprobarAhora.motivo);

  const aprobarDeNuevo = marcarComoAprobado(assets, 2);
  console.log('Aprobar de nuevo el mismo asset:', aprobarDeNuevo.exito ? 'aprobado' : aprobarDeNuevo.motivo);

  const idInexistente = marcarComoAprobado(assets, 999);
  console.log('Aprobar id inexistente:', idInexistente.exito ? 'aprobado' : idInexistente.motivo);

  const progresoInvalido = actualizarProgreso(assets, 3, 150);
  console.log('Actualizar progreso a 150:', progresoInvalido.exito ? 'ok' : progresoInvalido.motivo);

  console.log('\nResumen final de produccion:', generarResumenProduccion(assets));

  return { assetsFinales: assets };
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', iniciarAplicacionDOM);
} else {
  resolverEjercicio();
}
