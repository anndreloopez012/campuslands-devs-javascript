// 19. Itinerario de viaje - Resolucion Maria Montepeque

function validarActividad(actividad) {
  return (
    actividad &&
    typeof actividad.nombre === 'string' &&
    typeof actividad.fecha === 'string' &&
    !Number.isNaN(new Date(actividad.fecha).getTime()) &&
    typeof actividad.costo === 'number' &&
    actividad.costo >= 0
  );
}

function ordenarCronologicamente(actividades) {
  return [...actividades].sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
}

function calcularPresupuestoTotal(actividades) {
  return actividades.reduce((total, actividad) => total + actividad.costo, 0);
}

function contarActividadesPorDia(actividades) {
  return actividades.reduce((conteo, actividad) => {
    conteo[actividad.fecha] = (conteo[actividad.fecha] ?? 0) + 1;
    return conteo;
  }, {});
}

function detectarDiasSobrecargados(actividades, maximoPorDia) {
  return Object.entries(contarActividadesPorDia(actividades))
    .filter(([, cantidad]) => cantidad > maximoPorDia)
    .map(([fecha, cantidad]) => ({ fecha, cantidad }));
}

function generarItinerario(actividades, maximoPorDia = 2) {
  const validas = actividades.filter(validarActividad);
  const ordenadas = ordenarCronologicamente(validas);

  return {
    itinerario: ordenadas.map((actividad) => ({
      nombre: actividad.nombre,
      fecha: actividad.fecha,
      costo: actividad.costo
    })),
    presupuestoTotal: calcularPresupuestoTotal(validas),
    diasSobrecargados: detectarDiasSobrecargados(validas, maximoPorDia),
    actividadesInvalidas: actividades.length - validas.length
  };
}

const actividades = [
  { nombre: 'Museo de Arte', fecha: '2026-08-02', costo: 15 },
  { nombre: 'City Tour', fecha: '2026-08-01', costo: 40 },
  { nombre: 'Cena Tipica', fecha: '2026-08-01', costo: 25 },
  { nombre: 'Playa', fecha: '2026-08-01', costo: 0 },
  { nombre: 'Museo Historico', fecha: '2026-08-02', costo: 10 }
];

console.log('Caso 1: itinerario ordenado, con un dia sobrecargado (3 actividades el 2026-08-01)');
console.log(JSON.stringify(generarItinerario(actividades), null, 2));

const actividadesConInvalida = [...actividades, { nombre: 'Actividad sin fecha', costo: 20 }];

console.log('\nCaso 2: incluye una actividad invalida (sin fecha valida)');
console.log(JSON.stringify(generarItinerario(actividadesConInvalida), null, 2));
