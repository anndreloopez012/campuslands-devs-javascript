// 27. Validador de formulas quimicas - Resolucion Maria Montepeque

const REGEX_FORMULA_VALIDA = /^([A-Z][a-z]?\d*)+$/;
const REGEX_TOKEN_ELEMENTO = /([A-Z][a-z]?)(\d*)/g;

function esFormulaValida(formula) {
  return typeof formula === 'string' && formula.trim() !== '' && REGEX_FORMULA_VALIDA.test(formula.trim());
}

function contarElementos(formula) {
  const conteo = {};
  let coincidencia;

  REGEX_TOKEN_ELEMENTO.lastIndex = 0;
  while ((coincidencia = REGEX_TOKEN_ELEMENTO.exec(formula)) !== null) {
    const simbolo = coincidencia[1];
    const cantidad = coincidencia[2] ? Number(coincidencia[2]) : 1;
    conteo[simbolo] = (conteo[simbolo] || 0) + cantidad;
  }

  return conteo;
}

function calcularTotalAtomos(conteo) {
  return Object.values(conteo).reduce((total, cantidad) => total + cantidad, 0);
}

function analizarFormula(formula) {
  if (!esFormulaValida(formula)) {
    return { formula, valida: false, conteo: {}, totalAtomos: 0, motivo: 'formato no reconocido' };
  }

  const formulaLimpia = formula.trim();
  const conteo = contarElementos(formulaLimpia);

  return {
    formula: formulaLimpia,
    valida: true,
    conteo,
    totalAtomos: calcularTotalAtomos(conteo),
    motivo: null
  };
}

function analizarFormulas(formulas) {
  return formulas.map(analizarFormula);
}

function acumularConteoGlobal(analisisValidos) {
  return analisisValidos.reduce((acumulado, item) => {
    Object.entries(item.conteo).forEach(([simbolo, cantidad]) => {
      acumulado[simbolo] = (acumulado[simbolo] || 0) + cantidad;
    });
    return acumulado;
  }, {});
}

function validarFormulasQuimicas(formulas) {
  const analisis = analizarFormulas(formulas);
  const validas = analisis.filter((item) => item.valida);
  const invalidas = analisis.filter((item) => !item.valida);

  return {
    totalFormulas: formulas.length,
    formulasValidas: validas.length,
    formulasInvalidas: invalidas.map((item) => item.formula),
    conteoGlobalElementos: acumularConteoGlobal(validas),
    detalle: analisis
  };
}

const formulas = ['H2O', 'CO2', 'NaCl', 'C6H12O6'];

console.log('Caso 1: formulas quimicas validas');
console.log(JSON.stringify(validarFormulasQuimicas(formulas), null, 2));

const formulasConCasosLimite = ['H2O', '', 'naCl', 'Fe2O3', '123'];

console.log('\nCaso 2: incluye formulas invalidas (vacia, minuscula inicial, solo numeros)');
console.log(JSON.stringify(validarFormulasQuimicas(formulasConCasosLimite), null, 2));
