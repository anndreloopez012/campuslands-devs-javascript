const libros = [
  { titulo: "Cien años de soledad", autor: "Gabriel García Márquez", paginas: 471 },
  { titulo: "1984", autor: "George Orwell", paginas: 328 },
  { titulo: "El Hobbit", autor: "J.R.R. Tolkien", paginas: 310 },
  { titulo: "Crónica de una muerte anunciada", autor: "Gabriel García Márquez", paginas: 156 },
  { titulo: "Fahrenheit 451", autor: "Ray Bradbury", paginas: 249 }
];

const peliculas = [
  { titulo: "Inception", director: "Christopher Nolan", año: 2010 },
  { titulo: "The Matrix", director: "Lana y Lilly Wachowski", año: 1999 },
  { titulo: "Interstellar", director: "Christopher Nolan", año: 2014 },
  { titulo: "Pulp Fiction", director: "Quentin Tarantino", año: 1994 },
  { titulo: "Parasite", director: "Bong Joon-ho", año: 2019 }
];

const jsonlibro = JSON.stringify(libros)
const jsonpeliculas = JSON.stringify(peliculas)

console.log("libros: ",JSON.parse(jsonlibro))
console.log("peliculas: ",JSON.parse(jsonpeliculas))