// Ejercicio 06: Objetos - viajes
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 06: Objetos");

// Escribe tu solucion aqui.

// Ejercicio 06: Objeto de viajes

let viaje = {
    destino: "Tokio",
    dias: 7,
    presupuesto: 2000,
    
    // metodo de resumen
    resumen: function() {
        return `Viaje a ${this.destino} por ${this.dias} días con un presupuesto de $${this.presupuesto}.`;
    }
};

// Consultar propiedades
console.log(viaje.resumen());

// Reto extra
// validacion de presupuesto
viaje.esAsequible = function(costoEstimado) {
    if (this.presupuesto >= costoEstimado) {
        return "¡El presupuesto es suficiente!";
    } else {
        return "Necesitas ahorrar un poco más.";
    }
};

console.log(viaje.esAsequible(1500));