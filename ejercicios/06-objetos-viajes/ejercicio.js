// Ejercicio 06: Objetos - viajes
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 06: Objetos");

// Escribe tu solucion aqui.

const viaje = {
    destino: "Paris",
    duracion: 7,
    presupuesto: 1500,
    actividades: ["visitar museos", "pasear por la ciudad", "probar comida local"],
    motivo : function() {
        return "voy de vacaciones a " + this.destino;
    }
};

console.log(viaje);

console.log(viaje.destino);

console.log(viaje.motivo());