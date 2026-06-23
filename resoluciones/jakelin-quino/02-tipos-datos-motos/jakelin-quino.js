// Ejercicio 02: Tipos de datos - motos
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 02: Tipos de datos");

//-------------SOLUCION-----------------
const marcaModelo = "Yamaha R1";
const año = 2006;
const precio = null;
const garantia = undefined;
const accesorios = ["casco", "guantes", "rodilleras"];
let encendido = false;

console.log("\n=== ESPECIFICACIONES DE LA MOTO ===");
console.log(`Moto: ${marcaModelo} -> Tipo: ${typeof marcaModelo}`);
console.log(`Año: ${año} -> Tipo: ${typeof año}`);
console.log(`Precio: Q${precio} -> Tipo: ${typeof precio}`);
console.log(`Garantía: ${garantia} -> Tipo: ${typeof garantia}`);
console.log(`Accesorios: ${accesorios} -> Tipo: ${typeof accesorios}`);
console.log("\n------------------------------------\n");

console.log("... Iniciando viaje en carretera ...");
encendido = true;
let velocidadActual = 95;
const limiteVelocidad = 90;

console.log(`¿Moto encendida?: ${encendido}`);
console.log(`Límite de velocidad: ${limiteVelocidad} km/h`);
console.log(`Velocidad actual: ${velocidadActual} km/h`);

if (velocidadActual > limiteVelocidad) {
    console.log("ALERTA: Has superado el límite de velocidad en carretera.");
} else {
    console.log("Velocidad segura.");
}
console.log("====================================\n");