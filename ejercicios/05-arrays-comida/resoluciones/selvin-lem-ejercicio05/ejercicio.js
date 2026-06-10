// Ejercicio 05: Arrays - comida
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 05: Arrays");

// Escribe tu solucion aqui.

const menuComidas = ["Saq' ik", "Kaq'ik", "K'aj"];

console.log("=== MENÚ INICIAL ===");
console.log("Platillo principal recomendado:", menuComidas[0]);
console.log("Cantidad de platillos disponibles:", menuComidas.length);

//nuevo platillo 
const nuevoPlatillo = "Pollo en crema";
menuComidas.push(nuevoPlatillo);

console.log("\n=== MENÚ ACTUALIZADO ===");
console.log("Se ha agregado:", nuevoPlatillo);

console.log("\n--- Carta de Platillos ---");
menuComidas.forEach((platillo, indice) => {
  const numeroPlatillo = indice + 1;
  console.log("Platillo número", numeroPlatillo, ":", platillo);
});

// extra: validación del menu
console.log("\n=== VALIDACIÓN DEL SISTEMA ===");
const limiteMaximo = 4;

if (menuComidas.length > limiteMaximo) {
  console.log("Advertencia: El menú excede la capacidad máxima permitida de", limiteMaximo, "platillos.");
} 
else if (menuComidas.length === limiteMaximo) {
  console.log("Estado: Menú lleno. Se ha alcanzado el límite de", limiteMaximo, "platillos tradicionales.");
} 
else {
  console.log("Estado: Menú operativo. Aún quedan espacios disponibles para la venta.");
}
