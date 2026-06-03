// Ejercicio 02: Tipos de datos - motos
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 02: Tipos de datos");

// Escribe tu solucion aqui.

const marca = "Yamaha";
const modelo = "MT-07";
const cilindrada = 689;
const esDeportiva = false;
const precio = 8500;

let kilometraje = null;
let propietario = undefined;

const caracteristicas = ["ABS", "Control de tracción", "Pantalla TFT", "Escape Akrapovic"];

console.log("=== INFORMACIÓN DE LA MOTO ===");
console.log("Marca:", marca, "- Tipo:", typeof marca);
console.log("Modelo:", modelo, "- Tipo:", typeof modelo);
console.log("Cilindrada:", cilindrada, "cc - Tipo:", typeof cilindrada);
console.log("Es deportiva:", esDeportiva, "- Tipo:", typeof esDeportiva);
console.log("Precio: $", precio, "- Tipo:", typeof precio);
console.log("Kilometraje:", kilometraje, "- Tipo:", typeof kilometraje);
console.log("Propietario:", propietario, "- Tipo:", typeof propietario);

console.log("\n=== CARACTERÍSTICAS ===");
console.log(caracteristicas);

// Reto extra
const velocidadMaxima = 210;
const puedeSuperar200 = velocidadMaxima > 200;

console.log(`\n=== DATO EXTRA ==`);
console.log("Velocidad máxima",velocidadMaxima, "km/h");
console.log("¿Puede superar los 200 km/h", puedeSuperar200);