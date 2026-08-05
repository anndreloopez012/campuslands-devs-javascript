// 25. Revision de renders arquitectura - Resolucion Maria Montepeque

const CRITERIOS = ['iluminacion', 'materiales', 'escala', 'entrega'];
const NOTA_MINIMA = 6;

function validarRender(render) {
  return (
    render &&
    typeof render.nombre === 'string' &&
    render.criterios &&
    typeof render.criterios === 'object' &&
    CRITERIOS.every(
      (criterio) =>
        typeof render.criterios[criterio] === 'number' &&
        render.criterios[criterio] >= 0 &&
        render.criterios[criterio] <= 10
    )
  );
}

function calcularPromedio(render) {
  const suma = CRITERIOS.reduce((total, criterio) => total + render.criterios[criterio], 0);
  return Number((suma / CRITERIOS.length).toFixed(2));
}

function cumpleMinimo(render) {
  return CRITERIOS.every((criterio) => render.criterios[criterio] >= NOTA_MINIMA);
}

function detectarCriteriosBajoMinimo(render) {
  return CRITERIOS.filter((criterio) => render.criterios[criterio] < NOTA_MINIMA);
}

function ordenarPorCalidad(renders) {
  return [...renders].sort((a, b) => calcularPromedio(b) - calcularPromedio(a));
}

function revisarRenders(renders) {
  const validos = renders.filter(validarRender);

  return {
    ranking: ordenarPorCalidad(validos).map((render) => ({
      nombre: render.nombre,
      promedio: calcularPromedio(render),
      aprobado: cumpleMinimo(render),
      criteriosBajoMinimo: detectarCriteriosBajoMinimo(render)
    })),
    rendersInvalidos: renders.length - validos.length
  };
}

const renders = [
  { nombre: 'Sala Minimalista', criterios: { iluminacion: 9, materiales: 8, escala: 7, entrega: 9 } },
  { nombre: 'Fachada Moderna', criterios: { iluminacion: 5, materiales: 6, escala: 8, entrega: 7 } },
  { nombre: 'Cocina Rustica', criterios: { iluminacion: 6, materiales: 6, escala: 6, entrega: 6 } }
];

console.log('Caso 1: ranking de renders ordenado por calidad');
console.log(JSON.stringify(revisarRenders(renders), null, 2));

const rendersConInvalido = [...renders, { nombre: 'Render sin datos', criterios: { iluminacion: 8 } }];

console.log('\nCaso 2: incluye un render invalido (faltan criterios)');
console.log(JSON.stringify(revisarRenders(rendersConInvalido), null, 2));
