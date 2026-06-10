// 06. Objetos - Viajes

// 1. Crear el objeto viaje con propiedades y métodos
const viaje = {
    destino: "Tokio",
    dias: 7,
    presupuesto: 1500,
    transporte: "Avión", // Reto extra: Dato adicional

    // Método resumen usando 'this'
    resumen: function() {
        return "Viaje a " + this.destino + " por " + this.dias + " días. Presupuesto: $" + this.presupuesto;
    }
};

// 2. Mostrar el resumen en consola
console.log(viaje.resumen());

// 3. Validación adicional (Reto extra)
// Calcular el presupuesto diario para validar si es un viaje económico o costoso
const presupuestoDiario = viaje.presupuesto / viaje.dias;

console.log("Presupuesto diario: $" + presupuestoDiario.toFixed(2));
console.log("Medio de transporte: " + viaje.transporte);

if (presupuestoDiario > 200) {
    console.log("Validación: Este es un viaje de categoría Premium");
} else {
    console.log("Validación: Este es un viaje de categoría Estándar/Económico");
}