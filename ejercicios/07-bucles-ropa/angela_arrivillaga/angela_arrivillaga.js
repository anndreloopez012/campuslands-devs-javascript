// Ejercicio 07: Inventario de tienda de ropa

let prendas = ["Camisa", "Pantalón", "Chaqueta", "Gorra"];
let stock = 3;

// listar el inventario con for
console.log("--- Inventario disponible ---");
for (let i = 0; i < prendas.length; i++) {
    console.log(`Prenda ${i + 1}: ${prendas[i]}`);
}

// simular venta con while
console.log("\n--- Simulando ventas ---");
while (stock > 0) {
    console.log(`Vendiendo una prenda. Quedan ${stock} en stock.`);
    stock--;
}
console.log("¡Tienda vacía!");

// Reto extra
// validacion de talla
let tallaDisponible = "M";
let tallaBuscada = "L";

if (tallaBuscada !== tallaDisponible) {
    console.log(`\nAviso: No tenemos stock en talla ${tallaBuscada}, solo ${tallaDisponible}.`);
}