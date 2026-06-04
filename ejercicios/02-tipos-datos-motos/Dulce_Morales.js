// Ejercicio 02: Tipos de datos - motos
console.log("Ejercicio 02: Tipos de datos");

// 1. Datos iniciales (Tipos de datos básicos y compuestos)
const marcaModelo = "Yamaha MT-07";
const cilindrada = 689; 
let kilometraje = 12500.5; 
let motorEncendido = false;
const modosManejo = ["Eco", "Standard", "Sport"];
let propietarioAnterior = null;
let fechaProximoServicio; 

// 2. Reto Extra (Objeto y Validación de licencia)
const especificaciones = { frenosABS: true, capacidadTanqueGalones: 3.7 };
let tipoLicencia = cilindrada > 125 ? "Tipo A" : "Tipo M";

// 3. Mostrar resultados y comprobación con typeof
console.log("Moto: " + marcaModelo + " | Tipo: " + typeof marcaModelo);
console.log("Cilindrada: " + cilindrada + "cc | Tipo: " + typeof cilindrada);
console.log("Kilometraje: " + kilometraje + " km | Tipo: " + typeof kilometraje);
console.log("¿Motor encendido?: " + motorEncendido + " | Tipo: " + typeof motorEncendido);
console.log("Modos: " + modosManejo.join(", ") + " | Tipo: " + typeof modosManejo);
console.log("¿Es arreglo?: " + (Array.isArray(modosManejo) ? "Sí" : "No"));
console.log("Propietario anterior: " + propietarioAnterior + " | Tipo: " + typeof propietarioAnterior);
console.log("Próximo servicio: " + fechaProximoServicio + " | Tipo: " + typeof fechaProximoServicio);

// 4. Resultados del Reto Extra
console.log("Licencia requerida: " + tipoLicencia);
console.log("¿Tiene ABS?: " + (especificaciones.frenosABS ? "Sí" : "No"));