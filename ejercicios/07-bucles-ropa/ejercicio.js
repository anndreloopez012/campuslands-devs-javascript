// Ejercicio 07: Bucles for/while - ropa
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 07: Bucles for/while");

// Escribe tu solucion aqui.

console.log("Ejercicio 07: Bucles for/while");

// Lista de prendas
let prendas = ["Camisa", "Pantalón", "Chaqueta", "Vestido", "Sudadera"];

// Recorrer prendas con for
console.log("Prendas disponibles:");

for (let i = 0; i < prendas.length; i++) {
    console.log(prendas[i]);
}

// Inventario de la tienda
let inventario = 5;

console.log("Inventario inicial:", inventario);

// Simular ventas con while
while (inventario > 0) {
    inventario--;
    console.log("Se vendió una prenda. Quedan:", inventario);
}

console.log("Inventario agotado.");

// Reto extra: validar talla
let talla = "M";

if (talla === "S" || talla === "M" || talla === "L" || talla === "XL") {
    console.log("Talla disponible:", talla);
} else {
    console.log("Talla no disponible.");
}