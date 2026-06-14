// Ejercicio 02: Tipos de datos - motos
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 02: Tipos de datos");

// 1. STRING (Texto): Para nombres, marcas o categorías.
const marca = "Ducati";
const modelo = "Panigale V4";

// 2. NUMBER (Número): Para valores cuantificables (enteros o decimales).
let cilindraje = 1103; // cc
let velocidadMaxima = 299.5; // km/h
let combustibleLitros = 16; 

// 3. BOOLEAN (Verdadero/Falso): Para estados de tipo "sí/no" o "encendido/apagado".
let estaEncendida = false;
let tieneFrenosABS = true;

// 4. NULL (Nulo): Representa la ausencia intencional de valor. 
// Significa que el dato existe, pero actualmente está vacío (por ejemplo, no tiene dueño asignado aún).
let propietarioActual = null; 

// 5. UNDEFINED (Indefinido): El valor no ha sido asignado. 
// Dejamos la variable declarada pero vacía. JavaScript le asigna 'undefined' automáticamente.
let proximoMantenimiento; 

// 6. ARRAY (Arreglo/Lista): Para almacenar una colección de elementos del mismo o diferente tipo.
const modosDeConduccion = ["Race", "Sport", "Street", "Wet"];


// ==========================================
// PRUEBA DE FUNCIONAMIENTO (LOGS)
// ==========================================
console.log(`--- FICHA TÉCNICA DE LA MOTO ---`);
console.log(`Vehículo: ${marca} ${modelo}`);
console.log(`Cilindraje: ${cilindraje} cc`);
console.log(`¿Está encendida?: ${tieneFrenosABS}`);
console.log(`Modo de conducción actual: ${modosDeConduccion[1]}`); // Accede a "Sport"
console.log(`Dueño asignado: ${propietarioActual}`);
console.log(`Alerta de mantenimiento: ${proximoMantenimiento}`); // Imprimirá 'undefined'

