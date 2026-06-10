// Ejercicio 02: Tipos de datos - motos
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 02: Tipos de datos");

// Datos de la moto (Tipos primitivos)
const marcaMoto = "Yamaha";
let linea = "R15 Versión 4.0";

// Tipos: Number (entero y decimal)
let cilindraje = 155;
let precioQuetzales = 28990.00;

// Tipos: Boolean y Null
let esDeAgencia = true;
let multasPendientes = null;

// Visualización de datos en consola
console.log(`--- FICHA TÉCNICA ---`);
console.log(`Vehículo: ${marcaMoto} ${linea}`);
console.log(`Motor: ${cilindraje}cc | Precio: Q${precioQuetzales}`);
console.log(`Origen: ${esDeAgencia ? "Nueva de agencia" : "Rodada / Usada"}`);
console.log(`Estado legal: ${multasPendientes ?? "Solvente / Sin multas"}`);