// 56. Mercado de fichajes futbol - Resolucion Maria Montepeque

const jugadoresMercado = [
  { nombre: 'Diaz', posicion: 'delantero', precio: 40, rating: 82 },
  { nombre: 'Fernandez', posicion: 'delantero', precio: 25, rating: 75 },
  { nombre: 'Torres', posicion: 'medio', precio: 30, rating: 80 },
  { nombre: 'Molina', posicion: 'medio', precio: 15, rating: 68 },
  { nombre: 'Rojas', posicion: 'defensa', precio: 20, rating: 74 },
  { nombre: 'Silva', posicion: 'defensa', precio: 10, rating: 65 },
  { nombre: 'Paredes', posicion: 'portero', precio: 18, rating: 77 }
];

const posicionesNecesarias = ['delantero', 'medio', 'defensa', 'portero'];

function esJugadorValido(jugador) {
  return (
    jugador &&
    typeof jugador.nombre === 'string' &&
    jugador.nombre.trim() !== '' &&
    typeof jugador.posicion === 'string' &&
    jugador.posicion.trim() !== '' &&
    typeof jugador.precio === 'number' &&
    jugador.precio > 0 &&
    typeof jugador.rating === 'number' &&
    jugador.rating > 0
  );
}

function calcularValorPorPrecio(jugador) {
  return Number((jugador.rating / jugador.precio).toFixed(2));
}

function filtrarPorPosicion(jugadoresValidos, posicion) {
  return jugadoresValidos.filter((jugador) => jugador.posicion === posicion);
}

function ordenarPorValor(jugadoresPosicion) {
  return [...jugadoresPosicion].sort((a, b) => calcularValorPorPrecio(b) - calcularValorPorPrecio(a));
}

function resumirFichaje(jugador) {
  return {
    nombre: jugador.nombre,
    posicion: jugador.posicion,
    precio: jugador.precio,
    rating: jugador.rating,
    valorPorPrecio: calcularValorPorPrecio(jugador)
  };
}

function seleccionarPlantilla(jugadoresBase, posiciones, presupuestoTotal) {
  const jugadoresValidos = jugadoresBase.filter(esJugadorValido);
  let presupuestoRestante = presupuestoTotal;
  const plantilla = [];
  const posicionesSinCubrir = [];

  posiciones.forEach((posicion) => {
    const candidatos = ordenarPorValor(filtrarPorPosicion(jugadoresValidos, posicion));
    const elegible = candidatos.find((jugador) => jugador.precio <= presupuestoRestante);

    if (elegible) {
      plantilla.push(elegible);
      presupuestoRestante = Number((presupuestoRestante - elegible.precio).toFixed(2));
    } else {
      posicionesSinCubrir.push(posicion);
    }
  });

  return {
    totalJugadores: jugadoresBase.length,
    jugadoresInvalidos: jugadoresBase.length - jugadoresValidos.length,
    presupuestoTotal,
    presupuestoRestante,
    plantilla: plantilla.map(resumirFichaje),
    ratingTotal: plantilla.reduce((total, jugador) => total + jugador.rating, 0),
    posicionesSinCubrir
  };
}

console.log('Caso 1: presupuesto de 70, alcanza para cubrir las 4 posiciones');
console.log(JSON.stringify(seleccionarPlantilla(jugadoresMercado, posicionesNecesarias, 70), null, 2));

const jugadoresConCasoLimite = [...jugadoresMercado, { nombre: 'Jugador Gratis', posicion: 'medio', precio: 0, rating: 50 }];

console.log('\nCaso 2: presupuesto ajustado de 30 (solo alcanza delantero) e incluye jugador invalido (precio 0)');
console.log(JSON.stringify(seleccionarPlantilla(jugadoresConCasoLimite, posicionesNecesarias, 30), null, 2));
