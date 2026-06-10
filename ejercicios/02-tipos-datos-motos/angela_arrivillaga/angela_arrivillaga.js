// variables con diferentes tipos de datos
const marca = "Ducati";
const cilindraje = 955;
const esModerna = true;
const dueñoAnterior = null;
let fechaUltimoMantenimiento;
const caracteristicas = ["ABS", "Control de tracción", "Modos de manejo"]; // Array

//valores y tipos
console.log("--- INFORMACIÓN DE LA MOTO ---");
console.log("Marca:", marca, "| Tipo:", typeof marca);
console.log("Cilindraje:", cilindraje, "cc | Tipo:", typeof cilindraje);
console.log("¿Es moderna?:", esModerna, "| Tipo:", typeof esModerna);
console.log("Dueño anterior:", dueñoAnterior, "| Tipo:", typeof dueñoAnterior);
console.log("Último mantenimiento:", fechaUltimoMantenimiento, "| Tipo:", typeof fechaUltimoMantenimiento);
console.log("Características:", caracteristicas, "| ¿Es un arreglo?:", Array.isArray(caracteristicas));

// Reto extra
console.log("\n--- VALIDACIÓN (RETO EXTRA) ---");
if (cilindraje >= 500) {
    console.log(`La moto ${marca} es de alto cilindraje (${cilindraje}cc).`);
} else {
    console.log(`La moto ${marca} es de bajo/medio cilindraje (${cilindraje}cc).`);
}