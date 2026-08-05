// 68. Playlist interactiva - Resolucion Maria Montepeque

const canciones = [
  { id: 1, titulo: 'Ignition', artista: 'Nova' },
  { id: 2, titulo: 'Firestorm', artista: 'Blaze' },
  { id: 3, titulo: 'Slow Burn', artista: 'Ember' },
  { id: 4, titulo: 'Wildfire', artista: 'Nova' },
  { id: 5, titulo: 'Fade Out', artista: 'Echo' }
];

function esCancionValida(cancion) {
  return (
    cancion &&
    typeof cancion.id !== 'undefined' &&
    typeof cancion.titulo === 'string' &&
    cancion.titulo.trim() !== '' &&
    typeof cancion.artista === 'string' &&
    cancion.artista.trim() !== ''
  );
}

function esListaValida(listaCanciones) {
  return Array.isArray(listaCanciones) && listaCanciones.length > 0 && listaCanciones.every(esCancionValida);
}

function crearReproductor(cancionesBase) {
  if (!esListaValida(cancionesBase)) {
    return { valido: false, motivo: 'lista de canciones invalida o vacia' };
  }
  return { valido: true, canciones: cancionesBase, indiceActual: 0, favoritos: [] };
}

function obtenerCancionActual(estado) {
  return estado.canciones[estado.indiceActual];
}

function siguiente(estado) {
  return { ...estado, indiceActual: (estado.indiceActual + 1) % estado.canciones.length };
}

function anterior(estado) {
  return { ...estado, indiceActual: (estado.indiceActual - 1 + estado.canciones.length) % estado.canciones.length };
}

function alternarFavorito(estado, cancionId) {
  const yaFavorito = estado.favoritos.includes(cancionId);
  const favoritos = yaFavorito ? estado.favoritos.filter((id) => id !== cancionId) : [...estado.favoritos, cancionId];
  return { ...estado, favoritos };
}

function reproducirAleatoria(estado, generadorAleatorio = Math.random) {
  if (estado.canciones.length <= 1) return estado;

  let nuevoIndice;
  do {
    nuevoIndice = Math.floor(generadorAleatorio() * estado.canciones.length);
  } while (nuevoIndice === estado.indiceActual);

  return { ...estado, indiceActual: nuevoIndice };
}

function crearGeneradorSecuencial(valores) {
  let indice = 0;
  return () => {
    const valor = valores[indice % valores.length];
    indice += 1;
    return valor;
  };
}

function renderizarReproductor(estado) {
  if (typeof document === 'undefined') return;
  const cancionActual = obtenerCancionActual(estado);
  const elTitulo = document.querySelector('#reproductor-titulo');
  const elArtista = document.querySelector('#reproductor-artista');
  const elFavorito = document.querySelector('#reproductor-favorito');
  if (!elTitulo) return;

  elTitulo.textContent = cancionActual.titulo;
  if (elArtista) elArtista.textContent = cancionActual.artista;
  if (elFavorito) elFavorito.textContent = estado.favoritos.includes(cancionActual.id) ? 'Favorito: si' : 'Favorito: no';
}

function inicializarReproductor(cancionesBase) {
  if (typeof document === 'undefined') return;

  let estado = crearReproductor(cancionesBase);
  if (!estado.valido) return;
  renderizarReproductor(estado);

  const botonSiguiente = document.querySelector('#boton-siguiente');
  const botonAnterior = document.querySelector('#boton-anterior');
  const botonFavorito = document.querySelector('#boton-favorito');
  const botonShuffle = document.querySelector('#boton-shuffle');

  if (botonSiguiente) {
    botonSiguiente.addEventListener('click', () => {
      estado = siguiente(estado);
      renderizarReproductor(estado);
    });
  }

  if (botonAnterior) {
    botonAnterior.addEventListener('click', () => {
      estado = anterior(estado);
      renderizarReproductor(estado);
    });
  }

  if (botonFavorito) {
    botonFavorito.addEventListener('click', () => {
      estado = alternarFavorito(estado, obtenerCancionActual(estado).id);
      renderizarReproductor(estado);
    });
  }

  if (botonShuffle) {
    botonShuffle.addEventListener('click', () => {
      estado = reproducirAleatoria(estado);
      renderizarReproductor(estado);
    });
  }
}

console.log('Caso 1: siguiente x2, anterior x1, marcar favorito y wrap-around al llegar al final');
let estado1 = crearReproductor(canciones);
estado1 = siguiente(estado1);
estado1 = siguiente(estado1);
estado1 = anterior(estado1);
estado1 = alternarFavorito(estado1, obtenerCancionActual(estado1).id);
console.log('Cancion actual tras siguiente/anterior:', JSON.stringify(obtenerCancionActual(estado1)));
console.log('Favoritos:', JSON.stringify(estado1.favoritos));

let estado1WrapAround = { ...estado1, indiceActual: canciones.length - 1 };
estado1WrapAround = siguiente(estado1WrapAround);
console.log('Wrap-around al pasar la ultima cancion:', JSON.stringify(obtenerCancionActual(estado1WrapAround)));

console.log('\nCaso 2: shuffle deterministico y lista invalida (vacia)');
const generadorDeterminista = crearGeneradorSecuencial([0.9, 0.1]);
let estado2 = crearReproductor(canciones);
estado2 = reproducirAleatoria(estado2, generadorDeterminista);
console.log('Cancion tras shuffle:', JSON.stringify(obtenerCancionActual(estado2)));
console.log('Reproductor con lista vacia:', JSON.stringify(crearReproductor([])));

inicializarReproductor(canciones);
