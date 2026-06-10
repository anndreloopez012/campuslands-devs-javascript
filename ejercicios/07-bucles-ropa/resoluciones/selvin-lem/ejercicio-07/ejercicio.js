// Ejercicio 07: Bucles for/while - ropa
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 07: Bucles for/while");

// Escribe tu solucion aqui.

const prendasCatalogo = ["Chaqueta", "Saco", "Sudadera"];
const ventasPorCiclo = 2;
const limiteCritico = 4;
let stockInventario = 10;

console.log("=== CATÁLOGO DE PRENDAS ===");
for (let i = 0; i < prendasCatalogo.length; i++) {
  const numeroItem = i + 1;
  console.log("Artículo", numeroItem, ":", prendasCatalogo[i]);
}

console.log("\n=== INICIO DE SIMULACIÓN DE VENTAS ===");
console.log("Stock inicial de la tienda:", stockInventario, "unidades.");

while (stockInventario > 0) {
  stockInventario = stockInventario - ventasPorCiclo;
  console.log("Se vendieron", ventasPorCiclo, "prendas. Stock restante:", stockInventario);

  // extra: validación de stovk critico
  if (stockInventario === limiteCritico) {
    console.log("ALERTAS DEL SISTEMA: ¡Stock Crítico alcanzado! Solo quedan", stockInventario, "unidades.");
  }
}

console.log("\nSimulación finalizada: Inventario completamente agotado.");