// 42. Outfit segun clima - Resolucion Maria Montepeque

const CATEGORIAS = ['superior', 'inferior', 'calzado', 'abrigo'];

const prendas = [
  { nombre: 'Camiseta ligera', categoria: 'superior', tempMin: 22, tempMax: 40, resistenteLluvia: false, formal: false },
  { nombre: 'Camisa de vestir', categoria: 'superior', tempMin: 15, tempMax: 30, resistenteLluvia: false, formal: true },
  { nombre: 'Sueter', categoria: 'superior', tempMin: 5, tempMax: 18, resistenteLluvia: false, formal: false },
  { nombre: 'Jean', categoria: 'inferior', tempMin: 10, tempMax: 30, resistenteLluvia: false, formal: false },
  { nombre: 'Pantalon de vestir', categoria: 'inferior', tempMin: 10, tempMax: 30, resistenteLluvia: false, formal: true },
  { nombre: 'Shorts', categoria: 'inferior', tempMin: 24, tempMax: 40, resistenteLluvia: false, formal: false },
  { nombre: 'Tenis', categoria: 'calzado', tempMin: -10, tempMax: 40, resistenteLluvia: false, formal: false },
  { nombre: 'Zapatos formales', categoria: 'calzado', tempMin: -10, tempMax: 40, resistenteLluvia: false, formal: true },
  { nombre: 'Botas impermeables', categoria: 'calzado', tempMin: -10, tempMax: 40, resistenteLluvia: true, formal: false },
  { nombre: 'Impermeable', categoria: 'abrigo', tempMin: -10, tempMax: 25, resistenteLluvia: true, formal: false },
  { nombre: 'Abrigo grueso', categoria: 'abrigo', tempMin: -10, tempMax: 10, resistenteLluvia: false, formal: false },
  { nombre: 'Blazer', categoria: 'abrigo', tempMin: 10, tempMax: 25, resistenteLluvia: false, formal: true }
];

function esPrendaValida(prenda) {
  return (
    prenda &&
    typeof prenda.nombre === 'string' &&
    prenda.nombre.trim() !== '' &&
    CATEGORIAS.includes(prenda.categoria) &&
    typeof prenda.tempMin === 'number' &&
    typeof prenda.tempMax === 'number' &&
    prenda.tempMin <= prenda.tempMax &&
    typeof prenda.resistenteLluvia === 'boolean' &&
    typeof prenda.formal === 'boolean'
  );
}

function esClimaValido(clima) {
  return (
    clima &&
    typeof clima.temperatura === 'number' &&
    typeof clima.lluvia === 'boolean' &&
    (clima.tipoEvento === 'casual' || clima.tipoEvento === 'formal')
  );
}

function cumpleTemperatura(prenda, temperatura) {
  return temperatura >= prenda.tempMin && temperatura <= prenda.tempMax;
}

function cumpleFormalidad(prenda, tipoEvento) {
  return tipoEvento === 'formal' ? prenda.formal : !prenda.formal;
}

function filtrarPrendasRecomendadas(prendasValidas, clima) {
  return prendasValidas.filter((prenda) => cumpleTemperatura(prenda, clima.temperatura) && cumpleFormalidad(prenda, clima.tipoEvento));
}

function elegirMejorPrenda(candidatas, clima) {
  if (candidatas.length === 0) return null;
  if (clima.lluvia) {
    const resistente = candidatas.find((prenda) => prenda.resistenteLluvia);
    if (resistente) return resistente;
  }
  return candidatas[0];
}

function construirOutfit(prendasBase, clima) {
  if (!esClimaValido(clima)) {
    return { valido: false, motivo: 'datos de clima invalidos' };
  }

  const prendasValidas = prendasBase.filter(esPrendaValida);
  const recomendadas = filtrarPrendasRecomendadas(prendasValidas, clima);

  const outfit = CATEGORIAS.reduce((resultado, categoria) => {
    const candidatas = recomendadas.filter((prenda) => prenda.categoria === categoria);
    const elegida = elegirMejorPrenda(candidatas, clima);
    resultado[categoria] = elegida ? elegida.nombre : null;
    return resultado;
  }, {});

  return {
    valido: true,
    totalPrendas: prendasBase.length,
    prendasInvalidas: prendasBase.length - prendasValidas.length,
    clima,
    prendasRecomendadasDisponibles: recomendadas.length,
    outfit,
    abrigoNecesario: clima.temperatura < 18 || clima.lluvia
  };
}

const climaFrioLluvioso = { temperatura: 12, lluvia: true, tipoEvento: 'casual' };

console.log('Caso 1: clima frio y lluvioso, evento casual');
console.log(JSON.stringify(construirOutfit(prendas, climaFrioLluvioso), null, 2));

const prendasConCasoLimite = [...prendas, { nombre: 'Corbata sin rango', categoria: 'accesorio', formal: true }];
const climaCalidoFormal = { temperatura: 20, lluvia: false, tipoEvento: 'formal' };

console.log('\nCaso 2: clima calido, evento formal, incluye prenda invalida (sin rango de temperatura)');
console.log(JSON.stringify(construirOutfit(prendasConCasoLimite, climaCalidoFormal), null, 2));
