// Ejercicio 08: Strings y metodos - musica
// Completa el codigo siguiendo las instrucciones del README.md.


console.log("Ejercicio 08: Strings y metodos");


// Escribe tu solucion aqui.
const cancionOriginal = "   Alaba a Dios - Danny Berrios   ";
const cancionLimpia = cancionOriginal.trim();
const enMayusculas = cancionLimpia.toUpperCase();
const esDanny = cancionLimpia.includes("Danny Berrios");
const nuevaVersion = cancionLimpia.replace("Danny Berrios", "Cantante Cristiano");
const soloNombre = cancionLimpia.slice(0, 13);


console.log("Original: " + cancionOriginal);
console.log("Limpia: " + cancionLimpia);
console.log("Mayusculas: " + enMayusculas);
console.log("¿Es de Danny Berrios?: " + esDanny);
console.log("Version editada: " + nuevaVersion);
console.log("Solo el titulo: " + soloNombre);


if (cancionLimpia.length > 5) {
   console.log("Reto Extra: La cancion cristiana tiene un mensaje positivo.");
}
