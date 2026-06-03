// Ejercicio 06: Objetos - viajes
console.log("Ejercicio 06: Objetos");
// creacion del objeto
const viaje = {
    destino: "Costa Rica",
    dias: 7,
    presupuesto: 1200,

    mostrarResumen() {
        console.log(`  Resumen: Viaje a ${this.destino} por ${this.dias} días. Presupuesto total: $${this.presupuesto}.`);
    }
};

console.log("\n--- Detalles del viaje ---");
console.log(`Destino seleccionado: ${viaje.destino}`);
viaje.mostrarResumen();

console.log("\n--- Presupuesto diario para el viaje ---");
viaje.esGastoAlto = (viaje.presupuesto / viaje.dias) > 150;
console.log(`Presupuesto diario promedio: $${(viaje.presupuesto / viaje.dias).toFixed(2)} por día.`);
console.log(`¿Es un viaje de presupuesto alto?: ${viaje.esGastoAlto}`);