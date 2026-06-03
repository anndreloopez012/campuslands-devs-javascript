// Ejercicio 02: Tipos de datos - motos
console.log("Ejercicio 02: Tipos de datos");

//creacion de datos
const marca = "Kawasaki Ninja ZX-10R";           
const cilindraje = 998;                   
const tieneFrenosAbs = true;              
let propietarioAnterior = null;           
let proximoMantenimiento;                 
const Disponibles = ["Rojo", "Negro", "Gris"]; 

// mostrara valores y tipos de datos
console.log("\n--- Datos DE LA MOTO ---\n");
console.log(`Moto: ${marca} | Tipo de dato: ${typeof marca}`);
console.log(`Cilindraje: ${cilindraje}cc | Tipo de dato: ${typeof cilindraje}`);
console.log(`¿Tiene ABS?: ${tieneFrenosAbs} | Tipo de dato: ${typeof tieneFrenosAbs}`);
console.log(`Propietario anterior: ${propietarioAnterior} | Tipo de dato: ${typeof propietarioAnterior}`);
console.log(`Próximo mantenimiento: ${proximoMantenimiento} | Tipo de dato: ${typeof proximoMantenimiento}`);
console.log(`Colores de fábrica: ${Disponibles} | Tipo de dato: ${typeof Disponibles}`);
