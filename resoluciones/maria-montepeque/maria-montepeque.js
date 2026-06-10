// Ejercicio 13: JSON - libros y peliculas

console.log("Ejercicio 13: JSON");

// Escribe tu solucion aqui.

const favoritos = [
  { titulo: "Dune", tipo: "libro", anio: 1965 },
  { titulo: "Interstellar", tipo: "pelicula", anio: 2014 },
  { titulo: "1984", tipo: "libro", anio: 1949 },
];

const texto = JSON.stringify(favoritos, null, 2);
console.log("Como JSON:\n" + texto);

const recuperados = JSON.parse(texto);
console.log("\nRecuperados desde JSON:");
recuperados.forEach((f) => console.log(`- ${f.titulo} (${f.tipo}, ${f.anio})`));

const libros = recuperados.filter((f) => f.tipo === "libro");
console.log(
  `\nTienes ${libros.length} libros y ${recuperados.length - libros.length} peliculas.`,
);
