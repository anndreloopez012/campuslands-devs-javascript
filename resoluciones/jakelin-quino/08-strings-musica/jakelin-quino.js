// Ejercicio 08: Strings y metodos - musica
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 08: Strings y metodos");

// ------------------SOLUCIÓN------------------
console.log("-----------------------------------------------");
const cancion = "    el sonido del silencio - alex campos    ";
console.log(`Texto original recibido: "${cancion}"`);

const cancionLimpia = cancion.trim();
console.log(`1. Después de .trim(): "${cancionLimpia}"`);

const cancionMayusculas = cancionLimpia.toUpperCase();
console.log(`2. Después de .toUpperCase(): "${cancionMayusculas}"`);

const formatoFormateado = cancionMayusculas.replace("-", "👉");
console.log(`3. Después de .replace(): "${formatoFormateado}"`);

const posicionGuion = cancionMayusculas.indexOf("-");
const soloNombreCancion = cancionMayusculas.slice(0, posicionGuion).trim();
console.log(`4. Después de .slice() (Solo canción): "${soloNombreCancion}"`);

const buscarArtista = "ALEX CAMPOS";
const tieneArtista = cancionMayusculas.includes(buscarArtista);
console.log(`5. ¿El string contiene al artista ${buscarArtista}?: ${tieneArtista}`);
console.log("-----------------------------------------------------");

const cancionFormateada = cancionLimpia.toUpperCase();
const inicialesCancion = cancionFormateada.slice(0, 2);
const finalArtista = cancionFormateada.slice(-3);
const idGenerado = `${inicialesCancion}-${finalArtista}-2026`;
console.log(`ID de pista generado: ${idGenerado}`);
if (cancionLimpia.length > 10) {
    console.log("Nota: El título es largo");
} else {
    console.log("Longitud de título aceptable.");
}