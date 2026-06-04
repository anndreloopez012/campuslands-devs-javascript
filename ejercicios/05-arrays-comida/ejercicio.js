// Ejercicio 05: Arrays - comida
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 05: Arrays");

// Escribe tu solucion aqui.

console.log("Ejercicio 05: Arrays");

// Crear arreglo de comidas favoritas
let menu = ["Pizza", "Hamburguesa", "Tacos"];

// Agregar elementos
menu.push("Pasta");
menu.push("Sushi");

// Mostrar arreglo completo
console.log("Menú:", menu);

// Consultar posiciones
console.log("Primera comida:", menu[0]);
console.log("Última comida:", menu[menu.length - 1]);

// Mostrar cantidad de elementos
console.log("Cantidad de comidas:", menu.length);

// Recorrer el arreglo
menu.forEach((comida, indice) => {
    console.log(`${indice + 1}. ${comida}`);
});

// Reto extra
let comidaFavorita = "Pizza";

if (menu.includes(comidaFavorita)) {
    console.log(comidaFavorita + " está en el menú.");
} else {
    console.log(comidaFavorita + " no está en el menú.");
}