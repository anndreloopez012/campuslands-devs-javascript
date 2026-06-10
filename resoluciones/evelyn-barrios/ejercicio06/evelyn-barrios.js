// Ejercicio 06: Objetos - viajes
// Completa el codigo siguiendo las instrucciones del README.md.


console.log("Ejercicio 06: Objetos");


// Escribe tu solucion aqui.


const viaje = {
   destino: "París",
   dias: 7,
   presupuesto: 2000,
   transporte: "Avión",
   resumen: function() {
       return "Viaje a " + this.destino + " por " + this.dias + " días con un presupuesto de " + this.presupuesto + " quetzales.";
   }
};


console.log(viaje.resumen());
console.log("Medio de transporte: " + viaje.transporte + " - Tipo: " + typeof viaje);


if (viaje.presupuesto > 2000) {
   console.log("Este es un viaje de categoría Premium.");
}
