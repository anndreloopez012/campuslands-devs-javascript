// 30. Draft inteligente MOBA - Resolucion Maria Montepeque

const ROLES_REQUERIDOS = ['tanque', 'soporte', 'dano'];

const poolHeroes = [
  { id: 1, nombre: 'Aegis', rol: 'tanque' },
  { id: 2, nombre: 'Lyra', rol: 'soporte' },
  { id: 3, nombre: 'Kaelen', rol: 'dano' },
  { id: 4, nombre: 'Thorne', rol: 'tanque' },
  { id: 5, nombre: 'Vex', rol: 'dano' },
  { id: 6, nombre: 'Mira', rol: 'soporte' }
];

function esHeroeValido(heroe) {
  return (
    heroe &&
    typeof heroe.nombre === 'string' &&
    heroe.nombre.trim() !== '' &&
    typeof heroe.rol === 'string' &&
    heroe.rol.trim() !== ''
  );
}

function filtrarPoolDisponible(pool, baneados) {
  const setBaneados = new Set(baneados.map((nombre) => nombre.toLowerCase()));
  return pool.filter(esHeroeValido).filter((heroe) => !setBaneados.has(heroe.nombre.toLowerCase()));
}

function procesarPicks(poolDisponible, nombresPick) {
  const disponiblesPorNombre = new Map(poolDisponible.map((heroe) => [heroe.nombre.toLowerCase(), heroe]));
  const yaSeleccionados = new Set();
  const equipoFinal = [];
  const picksRechazados = [];

  nombresPick.forEach((nombrePick) => {
    const clave = typeof nombrePick === 'string' ? nombrePick.toLowerCase() : '';
    const heroe = disponiblesPorNombre.get(clave);

    if (!heroe) {
      picksRechazados.push({ pick: nombrePick, motivo: 'no disponible o baneado' });
      return;
    }

    if (yaSeleccionados.has(clave)) {
      picksRechazados.push({ pick: nombrePick, motivo: 'pick repetido' });
      return;
    }

    yaSeleccionados.add(clave);
    equipoFinal.push(heroe);
  });

  return { equipoFinal, picksRechazados };
}

function validarRolesMinimos(equipoFinal) {
  const rolesCubiertos = new Set(equipoFinal.map((heroe) => heroe.rol));
  const rolesFaltantes = ROLES_REQUERIDOS.filter((rol) => !rolesCubiertos.has(rol));
  return { equipoCompleto: rolesFaltantes.length === 0, rolesFaltantes };
}

function construirDraft(pool, baneados, nombresPick) {
  const poolDisponible = filtrarPoolDisponible(pool, baneados);
  const { equipoFinal, picksRechazados } = procesarPicks(poolDisponible, nombresPick);
  const { equipoCompleto, rolesFaltantes } = validarRolesMinimos(equipoFinal);

  return {
    heroesDisponibles: poolDisponible.length,
    heroesBaneados: baneados,
    equipoFinal,
    picksRechazados,
    equipoCompleto,
    rolesFaltantes
  };
}

console.log('Caso 1: draft sin bans, picks validos que cubren todos los roles');
console.log(JSON.stringify(construirDraft(poolHeroes, [], ['Aegis', 'Lyra', 'Kaelen']), null, 2));

console.log('\nCaso 2: incluye ban, pick repetido y pick de heroe inexistente (equipo incompleto)');
console.log(
  JSON.stringify(
    construirDraft(poolHeroes, ['Aegis'], ['Aegis', 'Lyra', 'Lyra', 'Vex', 'Zephyr']),
    null,
    2
  )
);
