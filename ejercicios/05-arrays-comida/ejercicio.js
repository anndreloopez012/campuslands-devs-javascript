// Ejercicio 05: Arrays - comida
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 05: Arrays");

// Escribe tu solucion aqui.

console.log("========== Arrays - comida ==========");

const comida = ["Pizza", "Hamburguesa", "Tacos", "Sushi", "Ensalada"];

console.log(comida)

comida.push("Pasta");

comida.forEach((platillo, index) => {
  console.log(`${index + 1}. ${platillo}`);
});

console.log("Platillo favorito en poscion 3:", comida[2]);