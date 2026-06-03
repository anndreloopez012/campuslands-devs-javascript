// Ejercicio 06: Objetos - viajes
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 06: Objetos");

// Escribe tu solucion aqui.

const viaje = {
    destino: "Japon",
    dias: 10,
    presupuesto: 3000,
    gastoPorDia() {
        return this.presupuesto / this.dias;
    },
    resumen() {
        return `Viaje a ${this.destino}: ${this.dias} dias, $${this.presupuesto} ($${this.gastoPorDia()}/dia)`;
    }
};

console.log(viaje.resumen());

if (viaje.gastoPorDia() > 250) {
    console.log("Presupuesto alto, considera mas dias o menos gasto.");
} else {
    console.log("Presupuesto diario razonable.");
}