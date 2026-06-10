// Ejercicio 05: Arrays - comida

console.log("Ejercicio 05: Arrays");

// Escribe tu solucion aqui.

const menu = ["pizza", "tacos", "sushi"];
menu.push("ramen", "arepas");

console.log("Menu completo:", menu);
console.log("Total de platos:", menu.length);
console.log("Primer plato:", menu[0]);
console.log("Ultimo plato:", menu[menu.length - 1]);

menu.forEach((plato, i) => console.log(`${i + 1}. ${plato}`));

const buscado = "sushi";
console.log(
  menu.includes(buscado)
    ? `Si hay ${buscado} (posicion ${menu.indexOf(buscado)})`
    : `No hay ${buscado}`,
);
