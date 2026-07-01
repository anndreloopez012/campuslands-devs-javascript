// Ejercicio 02: Tipos de datos - motos
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 02: Tipos de datos");

// Escribe tu solucion aqui.

const marca = "Yamaha";
const cilindrada = 600;
const encendida = false;
const accidentes = null;
let proximoService;
const accesorios = ["casco", "alforjas", "GPS"];

console.log("Marca:", marca, "->", typeof marca);
console.log("Cilindrada:", cilindrada, "->", typeof cilindrada);
console.log("Encendida:", encendida, "->", typeof encendida);
console.log("Accidentes:", accidentes, "->", typeof accidentes);
console.log("Proximo service:", proximoService, "->", typeof proximoService);
console.log("Accesorios:", accesorios, "->", typeof accesorios);

console.log("Es array?", Array.isArray(accesorios));
console.log("Cantidad de accesorios:", accesorios.length);
console.log(encendida ? "La moto esta encendida." : "La moto esta apagada.");
