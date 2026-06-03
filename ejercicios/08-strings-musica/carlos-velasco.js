let titulo = "  bohemian rhapsody  ";
let artista = "queen";
let tituloLimpio = titulo.trim();
let artistaMayus = artista.toUpperCase();
let tituloCorregido = tituloLimpio.replace("bohemian", "BOHEMIAN");
let abreviacion = tituloLimpio.slice(0, 3);
let esQueen = artistaMayus.includes("QUEEN");
console.log(`sin espacios extras ${tituloLimpio}`)
console.log(`Título procesado: ${tituloCorregido}`);
console.log(`Artista procesado: ${artistaMayus}`);
console.log(`¿Es artista Queen?: ${esQueen}`);
console.log(`Abreviación: ${abreviacion}`);