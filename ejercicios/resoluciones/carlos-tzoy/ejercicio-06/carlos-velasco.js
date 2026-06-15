const viaje = {
    destino: "Hawaii", 
    dias: 50,
    presupuesto: 15000,
    resumen() {
        console.log(`Resumen del viaje:`);
        console.log(`Destino: ${this.destino}`);
        console.log(`Duración: ${this.dias} días`);
        console.log(`Presupuesto: $${this.presupuesto}`);
    }
};

viaje.resumen();