// 05. Arrays - Comida

// 1. Crear arreglo inicial
const menu = ["Pizza", "Tacos", "Hamburguesa"];

// 2. Agregar elementos (push)
menu.push("Pasta");

// 3. Consultar posiciones e índices
const primerPlato = menu[0];
const totalPlatos = menu.length;

console.log("Primer plato: " + primerPlato);
console.log("Cantidad total de platos: " + totalPlatos);

// 4. Recorrer el menú (forEach)
console.log("--- Menú de Comidas ---");
menu.forEach(function(plato, indice) {
    console.log((indice + 1) + ". " + plato);
});

// 5. Validación adicional (Reto extra)
const platoBuscado = "Tacos";
const existePlato = menu.includes(platoBuscado);

if (existePlato) {
    console.log("Validación: El plato " + platoBuscado + " está disponible hoy");
} else {
    console.log("Validación: Lo sentimos, " + platoBuscado + " no está en el menú");
}