// Ejercicio 06: Objetos - viajes
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 06: Objetos");

// ---------------SOLUCIÓN-----------------
let viaje = {
    destino: "Paris",
    dias: 7,
    presupuesto: 11500,
    metodoPago: "Tarjeta de crédito",
    actividades: ["Visitar la Torre Eiffel", "Pasear por el Sena", "Visitar el Louvre"],
    mostrarInfo: function() {
        console.log("----------------------------------------")
        console.log(`Destino: ${this.destino}`);
        console.log(`Duración: ${this.dias} días`);
        console.log(`Presupuesto: Q${this.presupuesto}`);
        console.log(`Método de pago: ${this.metodoPago}`);
        console.log("Actividades:");
        this.actividades.forEach(actividad => {
            console.log(`- ${actividad}`);
        });
        console.log("----------------------------------------")
    }
}

viaje.mostrarInfo();
