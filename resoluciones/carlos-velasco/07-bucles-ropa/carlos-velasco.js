
const prendas = ["Camiseta", "Pantalón", "Chaqueta", "Gorra", "Calcetines"];

console.log("--- Inventario Inicial ---");
for (let i = 0; i < prendas.length; i++) {
    console.log(`Prenda ${i + 1}: ${prendas[i]}`);
}
let inventarioTotal = prendas.length;
console.log("\n--- Simulando Ventas ---");
while (inventarioTotal > 0) {
    console.log(`Venta realizada. Prendas restantes: ${inventarioTotal - 1}`);
    inventarioTotal--; 
}