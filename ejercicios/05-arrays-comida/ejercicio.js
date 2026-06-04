// Ejercicio 05: Arrays - comida
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 05: Arrays");

// Escribe tu solucion aqui.

const comidas_fav = ["pizza", "hamburguesa", "sushi", "tacos", "atun"];

console.log(comidas_fav);
// imprime la longitud del array 
console.log(comidas_fav.length);

// agrega un nuevo elemento al final del array
comidas_fav.push("pasta");
console.log(comidas_fav);
console.log(comidas_fav.length);

// accede al tercer elemento del array
console.log(comidas_fav[2]);

// recorre el array e imprima cada comida favorita en una nueva linea
comidas_fav.forEach((comidas) => {
    console.log(comidas);
});
