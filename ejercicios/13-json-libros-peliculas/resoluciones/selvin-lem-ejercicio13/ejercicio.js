// Ejercicio 13: JSON - libros y peliculas
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 13: JSON");

// Escribe tu solucion aqui.

const coleccionFavorita = [
  { tipo: "Libro", titulo: "El Señor de los Anillos", calificacion: 9.5 },
  { tipo: "Película", titulo: "Interstellar", calificacion: 9.8 },
  { tipo: "Libro", titulo: "Don Quijote de la Mancha", calificacion: 8.8 }
]

console.log("===OBJETO JAVASCRIPT ORIGINAL ===")
console.log("Tipo de dato original:", typeof coleccionFavorita)
console.log("Estructura en memoria:", coleccionFavorita)

const cadenaJSON = JSON.stringify(coleccionFavorita);

console.log("\n===TEXTO EN FORMATO JSON ===")
console.log("Tipo de dato actual:", typeof cadenaJSON)
console.log("Texto plano listo para enviar o guardar:", cadenaJSON)

const objetoRegresado = JSON.parse(cadenaJSON);

console.log("\n===RETORNO A OBJETO JAVASCRIPT ===")
console.log("Tipo de dato recuperado:", typeof objetoRegresado)

// extra: validar títulos excelentes 
console.log("\n=== REPORTE DE EXCELENCIA ===")
objetoRegresado.forEach((obra) => {
  if (obra.calificacion > 9.0) {
    console.log("Recomendación Destacada [", obra.tipo, "]:", obra.titulo, "- Nota:", obra.calificacion)
  } else {
    console.log("Obra Estándar [", obra.tipo, "]:", obra.titulo, "- Nota:", obra.calificacion)
  }
});