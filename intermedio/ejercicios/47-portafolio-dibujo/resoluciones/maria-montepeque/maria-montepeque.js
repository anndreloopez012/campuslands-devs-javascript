// 47. Portafolio de dibujo - Resolucion Maria Montepeque

const ESTADOS_VALIDOS = ['terminada', 'en progreso'];

const obras = [
  { titulo: 'Retrato en carboncillo', tecnica: 'carboncillo', etiquetas: ['retrato', 'realismo'], estado: 'terminada', dificultad: 8 },
  { titulo: 'Paisaje acuarela', tecnica: 'acuarela', etiquetas: ['paisaje', 'naturaleza'], estado: 'terminada', dificultad: 5 },
  { titulo: 'Boceto de manos', tecnica: 'lapiz', etiquetas: ['anatomia', 'boceto'], estado: 'en progreso', dificultad: 6 },
  { titulo: 'Dragon fantasia', tecnica: 'digital', etiquetas: ['fantasia', 'criatura'], estado: 'terminada', dificultad: 9 },
  { titulo: 'Estudio de retrato', tecnica: 'lapiz', etiquetas: ['retrato', 'estudio'], estado: 'en progreso', dificultad: 4 }
];

function esObraValida(obra) {
  return (
    obra &&
    typeof obra.titulo === 'string' &&
    obra.titulo.trim() !== '' &&
    typeof obra.tecnica === 'string' &&
    obra.tecnica.trim() !== '' &&
    Array.isArray(obra.etiquetas) &&
    obra.etiquetas.length > 0 &&
    ESTADOS_VALIDOS.includes(obra.estado) &&
    typeof obra.dificultad === 'number' &&
    obra.dificultad >= 1 &&
    obra.dificultad <= 10
  );
}

function buscarPorEtiqueta(obrasValidas, etiqueta) {
  return obrasValidas.filter((obra) => obra.etiquetas.includes(etiqueta));
}

function filtrarTerminadas(obrasValidas) {
  return obrasValidas.filter((obra) => obra.estado === 'terminada');
}

function calcularDificultadPromedio(listaObras) {
  const suma = listaObras.reduce((total, obra) => total + obra.dificultad, 0);
  return Number((suma / listaObras.length).toFixed(1));
}

function resumirObra(obra) {
  return { titulo: obra.titulo, tecnica: obra.tecnica, estado: obra.estado, dificultad: obra.dificultad };
}

function generarResumenPortafolio(obrasBase, etiquetaBusqueda) {
  const obrasValidas = obrasBase.filter(esObraValida);
  const terminadas = filtrarTerminadas(obrasValidas);
  const resultadosBusqueda = buscarPorEtiqueta(obrasValidas, etiquetaBusqueda);

  return {
    totalObras: obrasBase.length,
    obrasInvalidas: obrasBase.length - obrasValidas.length,
    obrasTerminadas: terminadas.length,
    obrasEnProgreso: obrasValidas.length - terminadas.length,
    dificultadPromedioGeneral: obrasValidas.length > 0 ? calcularDificultadPromedio(obrasValidas) : 0,
    dificultadPromedioTerminadas: terminadas.length > 0 ? calcularDificultadPromedio(terminadas) : 0,
    busqueda: {
      etiqueta: etiquetaBusqueda,
      resultados: resultadosBusqueda.map(resumirObra)
    }
  };
}

console.log('Caso 1: portafolio de 5 obras, busqueda por etiqueta "retrato"');
console.log(JSON.stringify(generarResumenPortafolio(obras, 'retrato'), null, 2));

const obrasConCasosLimite = [
  ...obras,
  { titulo: 'Sin dificultad', tecnica: 'oleo', etiquetas: ['bodegon'], estado: 'terminada' },
  { titulo: 'Sin etiquetas', tecnica: 'tinta', etiquetas: [], estado: 'en progreso', dificultad: 3 }
];

console.log('\nCaso 2: incluye obras invalidas (sin dificultad, sin etiquetas) y busqueda de etiqueta inexistente');
console.log(JSON.stringify(generarResumenPortafolio(obrasConCasosLimite, 'acuarela-marina'), null, 2));
