// 07. Bucles for/while - Ropa

// 1. Datos iniciales (Inventario de prendas)
const prendas = ["Camisa", "Pantalón", "Chaqueta", "Vestido"];
let stockDisponible = 5; // Cantidad total de prendas para vender

// 2. Bucle FOR: Listar las prendas del catálogo
console.log("--- Catálogo de Prendas ---");
for (let i = 0; i < prendas.length; i++) {
    console.log("Prenda " + (i + 1) + ": " + prendas[i]);
}

// 3. Bucle WHILE: Simular ventas hasta agotar stock
console.log("\n--- Simulador de Ventas ---");
while (stockDisponible > 0) {
    console.log("Venta realizada. Prendas restantes en stock: " + stockDisponible);
    stockDisponible--; // Reduce el contador de stock
}

// 4. Validación adicional y dato extra (Reto extra)
console.log("\n--- Estado Final del Inventario ---");
if (stockDisponible === 0) {
    console.log("Validación: Alerta de stock. Es necesario reponer inventario de ropa.");
}

// Dato extra: Clasificación de tienda según cantidad de modelos diferentes
const variedadModelos = prendas.length;
console.log("Modelos diferentes registrados: " + variedadModelos);