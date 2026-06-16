// Ejercicio 05: Arrays - comida
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 05: Arrays");

// --------------------SOLUCIÓN--------------------
let comida = ["Pizza", "Hamburguesa", "Ensalada", "Sushi", "Tacos"];
console.log('Lista de comidas:', comida);

let agregarComida = comida.push("Pasta");
console.log('Lista de comidas actualizada:', comida);

console.log('Número de comidas en la lista:', comida.length);
console.log('Primer comida en la lista:', comida[0]);
console.log('Última comida en la lista:', comida[comida.length - 1]);
console.log('Comida en la posición 2:', comida[1]);

console.log('Recorriendo la lista de comidas:');
comida.forEach((item, index) => {
    console.log(`${index + 1}. ${item}`);
});

let eliminarComida = comida.pop();
console.log('Lista de comidas después de eliminar la última comida:', comida);