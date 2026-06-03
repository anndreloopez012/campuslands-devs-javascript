// Ejercicio 06: Objetos - viajes
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 06: Objetos");

// Escribe tu solucion aqui.

console.log("========== Objetos - Viajes ==========");

const viaje = {
    destino: "Paris",
    dias: 7,
    presupuesto: 1500,
    resumen () {
        return `Viaje a ${this.destino} por ${this.dias} días con un presupuesto de Q${this.presupuesto}.`;
    }
}

console.log(viaje.resumen());
