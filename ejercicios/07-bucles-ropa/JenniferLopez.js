// Ejercicio 07: Bucles for/while - ropa
console.log("Ejercicio 07: Bucles for/while");
const prendas = ["camiseta", "pantalones", "falda", "vestido", "chaqueta"];
let stockDisponible = 10;
console.log("Prendas disponibles:");
for(const prenda of prendas) {
    console.log(` ${prenda}`);
}
console.log('\nSimulador de ventas:\n');
while(stockDisponible > 0) {
    console.log('Venta realizada. Stock restante: ' + (stockDisponible - 1));
    stockDisponible--;
}
console.log('¡Stock agotado! No se pueden realizar más ventas.');
console.log("\n--------Promociones-----------\n")
const preciOriginal=200;
const precioFinal = stockDisponible === 0 ? preciOriginal * 0.8 : preciOriginal;
console.log(`Precio original: Q${preciOriginal} | Precio con descuento de liquidación: Q${precioFinal}`);