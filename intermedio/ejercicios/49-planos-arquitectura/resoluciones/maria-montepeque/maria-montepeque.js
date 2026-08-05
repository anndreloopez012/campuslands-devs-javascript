// 49. Control de planos 3D - Resolucion Maria Montepeque

const planos = [
  {
    id: 1,
    nombre: 'Planta Baja - Casa Roble',
    versiones: [
      { numero: 1, fecha: '2026-06-01', aprobado: true },
      { numero: 2, fecha: '2026-06-15', aprobado: false }
    ]
  },
  {
    id: 2,
    nombre: 'Fachada Norte - Edificio Prisma',
    versiones: [{ numero: 1, fecha: '2026-05-20', aprobado: false }]
  },
  {
    id: 3,
    nombre: 'Corte Estructural - Torre Aria',
    versiones: [
      { numero: 1, fecha: '2026-04-10', aprobado: true },
      { numero: 2, fecha: '2026-04-25', aprobado: true },
      { numero: 3, fecha: '2026-05-05', aprobado: true }
    ]
  }
];

function esVersionValida(version) {
  return (
    version &&
    typeof version.numero === 'number' &&
    version.numero > 0 &&
    !Number.isNaN(new Date(version.fecha).getTime()) &&
    typeof version.aprobado === 'boolean'
  );
}

function esPlanoValido(plano) {
  return (
    plano &&
    typeof plano.id !== 'undefined' &&
    typeof plano.nombre === 'string' &&
    plano.nombre.trim() !== '' &&
    Array.isArray(plano.versiones) &&
    plano.versiones.length > 0 &&
    plano.versiones.every(esVersionValida)
  );
}

function obtenerVersionMasReciente(plano) {
  return [...plano.versiones].sort((a, b) => new Date(b.fecha) - new Date(a.fecha))[0];
}

function resumirPlano(plano) {
  const versionReciente = obtenerVersionMasReciente(plano);
  return {
    id: plano.id,
    nombre: plano.nombre,
    totalVersiones: plano.versiones.length,
    versionReciente: versionReciente.numero,
    fechaVersionReciente: versionReciente.fecha,
    aprobado: versionReciente.aprobado
  };
}

function filtrarPendientesRevision(resumenes) {
  return resumenes.filter((resumen) => !resumen.aprobado);
}

function marcarAprobado(planosValidos, idBuscado) {
  return planosValidos.map((plano) => {
    if (plano.id !== idBuscado) return plano;
    const versionReciente = obtenerVersionMasReciente(plano);
    return {
      ...plano,
      versiones: plano.versiones.map((version) =>
        version.numero === versionReciente.numero ? { ...version, aprobado: true } : version
      )
    };
  });
}

function gestionarPlanos(planosBase, idAprobar) {
  const planosValidos = planosBase.filter(esPlanoValido);
  const resumenInicial = planosValidos.map(resumirPlano);

  const planoEncontrado = planosValidos.find((plano) => plano.id === idAprobar);
  const planosActualizados = planoEncontrado ? marcarAprobado(planosValidos, idAprobar) : planosValidos;
  const resumenFinal = planosActualizados.map(resumirPlano);

  return {
    totalPlanos: planosBase.length,
    planosInvalidos: planosBase.length - planosValidos.length,
    resumenInicial,
    pendientesRevisionInicial: filtrarPendientesRevision(resumenInicial).map((resumen) => resumen.nombre),
    idAprobar,
    planoEncontrado: Boolean(planoEncontrado),
    resumenFinal,
    pendientesRevisionFinal: filtrarPendientesRevision(resumenFinal).map((resumen) => resumen.nombre)
  };
}

console.log('Caso 1: aprobar la version mas reciente del plano con id 1');
console.log(JSON.stringify(gestionarPlanos(planos, 1), null, 2));

const planosConCasoLimite = [...planos, { id: 4, nombre: 'Plano sin versiones', versiones: [] }];

console.log('\nCaso 2: incluye plano invalido (sin versiones) e intento de aprobar un id inexistente (99)');
console.log(JSON.stringify(gestionarPlanos(planosConCasoLimite, 99), null, 2));
