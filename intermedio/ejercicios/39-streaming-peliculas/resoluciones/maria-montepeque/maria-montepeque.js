// 39. Recomendador de streaming - Resolucion Maria Montepeque

const catalogo = [
  { id: 1, titulo: 'Horizonte Estelar', generos: ['ciencia ficcion', 'aventura'], duracionMin: 128, rating: 8.2 },
  { id: 2, titulo: 'Risas de Verano', generos: ['comedia', 'romance'], duracionMin: 95, rating: 7.1 },
  { id: 3, titulo: 'Sombra Final', generos: ['terror', 'suspenso'], duracionMin: 105, rating: 6.5 },
  { id: 4, titulo: 'Codigo Rojo', generos: ['accion', 'ciencia ficcion'], duracionMin: 140, rating: 7.8 },
  { id: 5, titulo: 'Cafe Nocturno', generos: ['drama', 'romance'], duracionMin: 110, rating: 8.5 }
];

const perfilUsuario = {
  generosFavoritos: ['ciencia ficcion', 'aventura', 'accion'],
  duracionMaxima: 135,
  ratingMinimo: 7
};

function esPeliculaValida(pelicula) {
  return (
    pelicula &&
    typeof pelicula.titulo === 'string' &&
    pelicula.titulo.trim() !== '' &&
    Array.isArray(pelicula.generos) &&
    pelicula.generos.length > 0 &&
    typeof pelicula.duracionMin === 'number' &&
    pelicula.duracionMin > 0 &&
    typeof pelicula.rating === 'number' &&
    pelicula.rating >= 0 &&
    pelicula.rating <= 10
  );
}

function esPerfilValido(perfil) {
  return (
    perfil &&
    Array.isArray(perfil.generosFavoritos) &&
    perfil.generosFavoritos.length > 0 &&
    typeof perfil.duracionMaxima === 'number' &&
    perfil.duracionMaxima > 0 &&
    typeof perfil.ratingMinimo === 'number'
  );
}

function obtenerGenerosCoincidentes(pelicula, generosFavoritos) {
  return pelicula.generos.filter((genero) => generosFavoritos.includes(genero));
}

function calcularScore(pelicula, perfil, generosCoincidentes) {
  const puntajeGeneros = generosCoincidentes.length * 30;
  const puntajeRating = pelicula.rating * 5;
  const bonoDuracion = pelicula.duracionMin <= perfil.duracionMaxima ? 10 : 0;
  return Number((puntajeGeneros + puntajeRating + bonoDuracion).toFixed(1));
}

function cumpleFiltrosMinimos(pelicula, perfil) {
  return pelicula.rating >= perfil.ratingMinimo && pelicula.duracionMin <= perfil.duracionMaxima;
}

function generarRecomendaciones(catalogoBase, perfil) {
  if (!esPerfilValido(perfil)) {
    return { valido: false, motivo: 'perfil de usuario invalido' };
  }

  const peliculasValidas = catalogoBase.filter(esPeliculaValida);
  const candidatas = peliculasValidas.filter((pelicula) => cumpleFiltrosMinimos(pelicula, perfil));

  const recomendaciones = candidatas
    .map((pelicula) => {
      const generosCoincidentes = obtenerGenerosCoincidentes(pelicula, perfil.generosFavoritos);
      return {
        titulo: pelicula.titulo,
        generosCoincidentes,
        rating: pelicula.rating,
        duracionMin: pelicula.duracionMin,
        score: calcularScore(pelicula, perfil, generosCoincidentes)
      };
    })
    .sort((a, b) => b.score - a.score);

  return {
    valido: true,
    totalPeliculas: catalogoBase.length,
    peliculasInvalidas: catalogoBase.length - peliculasValidas.length,
    peliculasDescartadasPorFiltro: peliculasValidas.length - candidatas.length,
    recomendaciones
  };
}

console.log('Caso 1: catalogo de 5 peliculas con perfil de ciencia ficcion/aventura/accion');
console.log(JSON.stringify(generarRecomendaciones(catalogo, perfilUsuario), null, 2));

const catalogoConCasoLimite = [...catalogo, { id: 6, titulo: 'Sin generos' }];
const perfilExigente = { generosFavoritos: ['documental'], duracionMaxima: 60, ratingMinimo: 9 };

console.log('\nCaso 2: incluye pelicula invalida (sin generos) y perfil muy exigente (sin coincidencias)');
console.log(JSON.stringify(generarRecomendaciones(catalogoConCasoLimite, perfilExigente), null, 2));
