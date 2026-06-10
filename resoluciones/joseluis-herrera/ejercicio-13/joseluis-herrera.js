
const Libros = [{ tipo: "libro", titulo: "El señor de los anillos" }, { tipo: "Libro", titulo: "llama llama red pajama" }];

const Peliculas = [{ tipo: "Pelicula", titulo: "Rendirse Jamas" }, { tipo: "Libro", titulo: "Spider-verse" }];

//Funcion de JSON
let libros2 = JSON.stringify(Libros)

let libros3 = JSON.parse(libros2)

let peliculas2 = JSON.stringify(Peliculas)

let peliculas3 = JSON.parse(peliculas2)