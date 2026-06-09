// Ejercicio 07: Bucles for/while - ropa
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 07: Bucles for/while");
 
// ----------------SOLUCIÓN----------------
console.log("TIENDA DE ROPA");
console.log("-----------------------------------------------------");
const inventarioPrendas = ["Camiseta", "Pantalón Jean", "Chaqueta de Cuero", "Blusa", "Medias"];
console.log("Catálogo de prendas disponibles:");
for (let i = 0; i < inventarioPrendas.length; i++) {
    console.log(`${i + 1}. ${inventarioPrendas[i]}`);
}
console.log("-----------------------------------------------------");

let stockCamisetas = 5;
let ventasRealizadas = 0;
console.log(`Simulación de ventas (Stock inicial: ${stockCamisetas} camisetas):`);
while (stockCamisetas > 0) {
    ventasRealizadas++;
    stockCamisetas--; 
    console.log(`¡Venta #${ventasRealizadas} realizada! Quedan ${stockCamisetas} camisetas en stock.`);
}
console.log("Alerta: Las camisetas se han agotado por completo.");
console.log("-----------------------------------------------------");

const prendaAComprobar = "Chaqueta de Cuero";
let tieneDescuento = false;
for (let i = 0; i < inventarioPrendas.length; i++) {
    if (inventarioPrendas[i] === prendaAComprobar && prendaAComprobar.includes("Chaqueta")) {
        tieneDescuento = true;
        break; 
    }
}
if (tieneDescuento) {
    console.log(`¡Atención! La prenda "${prendaAComprobar}" tiene un 30% de descuento por fin de invierno.`);
} else {
    console.log(`La prenda "${prendaAComprobar}" mantiene su precio regular.`);
}
console.log("-----------------------------------------------------");