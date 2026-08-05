// 46. Catalogo de estilos tattoo - Resolucion Maria Montepeque

const estilos = [
  { nombre: 'Minimalista', zonas: ['muneca', 'tobillo', 'nuca'], tamanoCm: 5, precioBase: 60, nivelDolor: 3 },
  { nombre: 'Blackwork', zonas: ['brazo', 'espalda', 'pierna'], tamanoCm: 20, precioBase: 180, nivelDolor: 7 },
  { nombre: 'Acuarela', zonas: ['brazo', 'hombro'], tamanoCm: 12, precioBase: 140, nivelDolor: 5 },
  { nombre: 'Tribal', zonas: ['brazo', 'pantorrilla', 'espalda'], tamanoCm: 15, precioBase: 120, nivelDolor: 6 },
  { nombre: 'Fine Line', zonas: ['muneca', 'clavicula', 'costilla'], tamanoCm: 6, precioBase: 70, nivelDolor: 4 },
  { nombre: 'Realismo', zonas: ['brazo', 'espalda', 'pierna'], tamanoCm: 25, precioBase: 250, nivelDolor: 8 }
];

const perfilCliente = { zonaDeseada: 'brazo', presupuestoMax: 150, toleranciaDolor: 6 };

function esEstiloValido(estilo) {
  return (
    estilo &&
    typeof estilo.nombre === 'string' &&
    estilo.nombre.trim() !== '' &&
    Array.isArray(estilo.zonas) &&
    estilo.zonas.length > 0 &&
    typeof estilo.tamanoCm === 'number' &&
    estilo.tamanoCm > 0 &&
    typeof estilo.precioBase === 'number' &&
    estilo.precioBase > 0 &&
    typeof estilo.nivelDolor === 'number' &&
    estilo.nivelDolor >= 1 &&
    estilo.nivelDolor <= 10
  );
}

function esPerfilValido(perfil) {
  return (
    perfil &&
    typeof perfil.zonaDeseada === 'string' &&
    perfil.zonaDeseada.trim() !== '' &&
    typeof perfil.presupuestoMax === 'number' &&
    perfil.presupuestoMax > 0 &&
    typeof perfil.toleranciaDolor === 'number' &&
    perfil.toleranciaDolor >= 1 &&
    perfil.toleranciaDolor <= 10
  );
}

function clasificarDolor(nivelDolor) {
  if (nivelDolor <= 3) return 'bajo';
  if (nivelDolor <= 6) return 'medio';
  return 'alto';
}

function esCompatibleConZona(estilo, zonaDeseada) {
  return estilo.zonas.includes(zonaDeseada);
}

function cumplePresupuesto(estilo, presupuestoMax) {
  return estilo.precioBase <= presupuestoMax;
}

function esToleranciaDolorAceptable(estilo, toleranciaDolor) {
  return estilo.nivelDolor <= toleranciaDolor;
}

function resumirEstilo(estilo) {
  return {
    nombre: estilo.nombre,
    precioBase: estilo.precioBase,
    nivelDolor: estilo.nivelDolor,
    clasificacionDolor: clasificarDolor(estilo.nivelDolor)
  };
}

function recomendarEstilos(estilosBase, perfil) {
  if (!esPerfilValido(perfil)) {
    return { valido: false, motivo: 'perfil de cliente invalido' };
  }

  const estilosValidos = estilosBase.filter(esEstiloValido);
  const compatiblesZona = estilosValidos.filter((estilo) => esCompatibleConZona(estilo, perfil.zonaDeseada));
  const dentroPresupuesto = compatiblesZona.filter((estilo) => cumplePresupuesto(estilo, perfil.presupuestoMax));
  const recomendados = dentroPresupuesto.filter((estilo) => esToleranciaDolorAceptable(estilo, perfil.toleranciaDolor));

  return {
    valido: true,
    totalEstilos: estilosBase.length,
    estilosInvalidos: estilosBase.length - estilosValidos.length,
    compatiblesConZona: compatiblesZona.length,
    dentroDePresupuesto: dentroPresupuesto.length,
    recomendados: recomendados.map(resumirEstilo)
  };
}

console.log('Caso 1: cliente quiere tatuaje en brazo, presupuesto $150, tolerancia al dolor 6');
console.log(JSON.stringify(recomendarEstilos(estilos, perfilCliente), null, 2));

const estilosConCasoLimite = [...estilos, { nombre: 'Sin precio', zonas: ['brazo'], tamanoCm: 10, nivelDolor: 5 }];
const perfilSinCoincidencias = { zonaDeseada: 'rostro', presupuestoMax: 200, toleranciaDolor: 8 };

console.log('\nCaso 2: incluye estilo invalido (sin precio) y zona deseada sin ningun estilo compatible');
console.log(JSON.stringify(recomendarEstilos(estilosConCasoLimite, perfilSinCoincidencias), null, 2));
