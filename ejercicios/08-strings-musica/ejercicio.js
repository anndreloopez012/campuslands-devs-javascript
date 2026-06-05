// Ejercicio 08: Strings y metodos - musica
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 08: Strings y metodos");

// Escribe tu solucion aqui.

// 08. Strings y metodos - musica

const titulo  = "   Hotel California   ";
const artista = "   eagles   ";

// trim — quitar espacios
const tituloLimpio  = titulo.trim();
const artistaLimpio = artista.trim();
console.log("trim:", tituloLimpio, "-", artistaLimpio);

// toUpperCase — convertir a mayusculas
const tituloMayus = tituloLimpio.toUpperCase();
console.log("toUpperCase:", tituloMayus);

// includes — buscar si contiene una palabra
const tieneRock = genero.includes("rock");
console.log("includes rock:", tieneRock);

// replace — reemplazar texto
const generoFormato = genero.replace("/", " | ");
console.log("replace:", generoFormato);

// slice — extraer parte del texto
const preview = letra.slice(0, 22) + "...";
console.log("slice:", preview);